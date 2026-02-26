<!--

    Copyright CIB software GmbH and/or licensed to CIB software GmbH
    under one or more contributor license agreements. See the NOTICE file
    distributed with this work for additional information regarding copyright
    ownership. CIB software licenses this file to you under the Apache License,
    Version 2.0; you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

     Unless required by applicable law or agreed to in writing, software
     distributed under the License is distributed on an "AS IS" BASIS,
     WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
     See the License for the specific language governing permissions and
     limitations under the License.

-->
<template>
  <div class="datepicker-container position-relative flex-fill" @click.stop role="group" aria-labelledby="datepicker-label">
  <label id="datepicker-label" class="visually-hidden" for="date-selected">{{ $t('bcomponents.datepicker.label') }}</label>
  <div class="input-group" :class="inputGroupClassComputed">
    <slot name="prepend"></slot>
    <input id="date-selected" type="text" :value="formattedDate" class="form-control" :class="inputClassComputed"
      @focus="openPicker" readonly :aria-label="$t('bcomponents.datepicker.selectedDate')"
      :placeholder="formattedDate === '' ? $t('bcomponents.datepicker.noDate') : ''" />
    <slot name="append"></slot>
  </div>
  <div v-if="showPicker" class="datepicker-dropdown bg-white border rounded p-2 position-absolute shadow-sm z-1 w-100"
    role="dialog" aria-modal="true" aria-label="Calendar">
      <div class="calendar-header d-flex justify-content-between align-items-center mb-2">
        <button class="btn btn-sm btn-outline-secondary" @click="prevMonth" :aria-label="$t('bcomponents.datepicker.prevMonth')">‹</button>
        <span class="month-year" aria-live="polite">{{ formattedMonthYear }}</span>
        <button class="btn btn-sm btn-outline-secondary" @click="nextMonth" :aria-label="$t('bcomponents.datepicker.nextMonth')">›</button>
      </div>
      <div class="calendar-grid border rounded" role="grid">
        <div class="row g-0" role="row">
          <div class="col text-center" v-for="day in daysOfWeek" :key="day" role="columnheader">{{ day }}</div>
        </div>
        <div v-for="(week, weekIndex) in weeksInMonth" :key="weekIndex" class="row g-0" role="row">
          <button class="border-0 col py-2" v-for="(day, dayIndex) in week"
              :key="dayIndex" :disabled="isDisabled(day.date)" :class="[
                isSelected(day.date) ? 'bg-primary text-white fw-bold' : '',
                !isSelected(day.date) && day.isOtherMonth && !isDisabled(day.date) ? 'bg-light text-dark' : '',
                !isSelected(day.date) && !day.isOtherMonth && !isDisabled(day.date) ? 'bg-white text-dark' : ''
              ]"
              @click="!isDisabled(day.date) && selectDate(day.date)"
              role="gridcell"
              :aria-selected="isSelected(day.date) ? 'true' : 'false'"
              :aria-label="formatDateForAccessibility(day.date)"
              >
                {{ day.day }}
          </button>
        </div>
      </div>
      <div class="datepicker-footer mt-3 d-flex">
        <button class="btn btn-sm btn-outline-primary" @click="selectToday" :aria-label="$t('bcomponents.datepicker.selectToday')">
          {{ $t('bcomponents.datepicker.selectToday') }}
        </button>
        <button class="btn btn-sm btn-outline-danger ms-auto" @click="clearSelection"
                :aria-label="$t('bcomponents.datepicker.clearSelection')">
                {{ $t('bcomponents.datepicker.clearSelection') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BFormDatepicker',
  props: {
    modelValue: { type: [String, Date], default: () => new Date() },
    dateDisabledFn: { type: Function, default: null },
    size: { type: String, default: null },
    inputClass: { type: String, default: null },
    inputGroupClass: { type: String, default: null }
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.selectedDate = this.parseToDate(newVal)
      },
      immediate: true
    }
  },
  data() {
    return {
      showPicker: false,
      currentDate: this.parseToDate(this.modelValue) || new Date(),
      selectedDate: this.parseToDate(this.modelValue)
    }
  },
  computed: {
    inputClassComputed() {
      return [this.inputClass, this.size ? `form-control-${this.size}` : '']
        .filter(Boolean)
        .join(' ')
    },
    inputGroupClassComputed() {
      return [this.inputGroupClass, this.size ? `input-group-${this.size}` : '']
        .filter(Boolean)
        .join(' ')
    },
    formattedDate() {
      return this.selectedDate ? this.selectedDate.toLocaleDateString() : ''
    },
    formattedMonthYear() {
      return this.currentDate.toLocaleString(this.$i18n.locale, { month: 'long', year: 'numeric' })
    },
    daysOfWeek() {
      return this.$t('bcomponents.datepicker.daysOfWeek').split(',')
    },
    weeksInMonth() {
      const weeks = []
      let week = []

      this.daysInMonth.forEach((day, index) => {
        week.push(day)
        if ((index + 1) % 7 === 0) {
          weeks.push(week)
          week = []
        }
      })

      return weeks
    },
    daysInMonth() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDayOfMonth = new Date(year, month, 1)
      const lastDayOfMonth = new Date(year, month + 1, 0)
      const startDay = (firstDayOfMonth.getDay() + 6) % 7 // Adjust to start from monday (optional)

      let days = []
      // Add days from the previous month to complete the initial week
      for (let i = startDay - 1; i >= 0; i--) {
        const prevDate = new Date(year, month, i - startDay + 1)
        days.push({ date: prevDate, day: prevDate.getDate(), isOtherMonth: true })
      }

      // Add days from the current month
      for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        days.push({ date: new Date(year, month, day), day, isOtherMonth: false })
      }

      return days
    }
  },
  methods: {
    openPicker() {
      this.showPicker = true
      this.$eventBus.emit('datepicker-opened', this)
      document.addEventListener('click', this.handleDocumentClick)
      document.addEventListener('keydown', this.handleEscapeKey)
    },
    closePicker() {
      this.showPicker = false
      document.removeEventListener('click', this.handleDocumentClick)
      document.removeEventListener('keydown', this.handleEscapeKey)
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        this.closePicker()
      }
    },
    handleDocumentClick(event) {
      if (this.showPicker && !this.$el.contains(event.target)) {
        this.closePicker()
      }
    },
    prevMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
    },
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
    },
    selectDate(date) {
      this.selectedDate = date
      this.updateModel()
      this.closePicker()
    },
    selectToday() {
      this.selectDate(new Date())
    },
    clearSelection() {
      this.selectedDate = null
      this.updateModel()
      this.closePicker()
    },
    isSelected(date) {
      return this.selectedDate && this.selectedDate.toDateString() === date.toDateString()
    },
    isDisabled(date) {
      return this.dateDisabledFn && this.dateDisabledFn(date.toISOString().split('T')[0], date)
    },
    updateModel() {
      const value = this.selectedDate ? this.selectedDate.toISOString() : null
      this.$emit('update:modelValue', value)
    },
    parseToDate(value) {
      if (!value) return null
      if (value instanceof Date) return value
      if (typeof value === 'string') return new Date(value)
      return null
    },
    formatDateForAccessibility(date) {
      return date.toLocaleDateString(this.$i18n.locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
  },
  created() {
    this.$eventBus.on('datepicker-opened', (openedPicker) => {
      if (openedPicker !== this) {
        this.closePicker()
      }
    })
  },
  beforeUnmount() {
    this.$eventBus.off('datepicker-opened')
    document.removeEventListener('click', this.handleDocumentClick)
  }
}
</script>