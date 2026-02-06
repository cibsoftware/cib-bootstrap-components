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
  <div class="about">
    <h1>Datepickers</h1>
  </div>
  <div>
    <h2>Basic Datepicker</h2>
    <BFormDatepicker v-model="basicDate" style="width: 250px"/>
    <p class="mt-2">Selected date: {{ basicDate || 'None' }}</p>

    &nbsp;

    <h2>Datepicker with prepend slot</h2>
    <BFormDatepicker v-model="prependDate" style="width: 250px">
      <template #prepend>
        <span class="input-group-text">📅</span>
      </template>
    </BFormDatepicker>
    <p class="mt-2">Selected date: {{ prependDate || 'None' }}</p>

    &nbsp;

    <h2>Datepicker with append slot</h2>
    <BFormDatepicker v-model="appendDate" style="width: 250px">
      <template #append>
        <button class="btn btn-outline-secondary" @click="appendDate = null">Clear</button>
      </template>
    </BFormDatepicker>
    <p class="mt-2">Selected date: {{ appendDate || 'None' }}</p>

    &nbsp;

    <h2>Small Datepicker</h2>
    <BFormDatepicker v-model="smallDate" size="sm" style="width: 250px" />
    <p class="mt-2">Selected date: {{ smallDate || 'None' }}</p>

    &nbsp;

    <h2>Large Datepicker</h2>
    <BFormDatepicker v-model="largeDate" size="lg" style="width: 250px" />
    <p class="mt-2">Selected date: {{ largeDate || 'None' }}</p>

    &nbsp;

    <h2>Datepicker with disabled dates (weekends disabled)</h2>
    <BFormDatepicker v-model="disabledDate" :date-disabled-fn="disableWeekends" style="width: 250px" />
    <p class="mt-2">Selected date: {{ disabledDate || 'None' }}</p>

    &nbsp;

    <h2>Datepicker with custom input class</h2>
    <BFormDatepicker v-model="customDate" input-class="border-primary" style="width: 250px" />
    <p class="mt-2">Selected date: {{ customDate || 'None' }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BFormDatepicker from "@/components/BFormDatepicker.vue"

const basicDate = ref(new Date().toISOString())
const prependDate = ref(null)
const appendDate = ref(null)
const smallDate = ref(null)
const largeDate = ref(null)
const disabledDate = ref(null)
const customDate = ref(null)

const disableWeekends = (ymd, date) => {
  const day = date.getDay()
  return day === 0 || day === 6
}
</script>
