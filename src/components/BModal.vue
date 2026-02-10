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
  <div class="modal fade" ref="modal" tabindex="-1" role="dialog" :aria-labelledby="'modal-title'">
    <div class="modal-dialog" :class="modalClasses" role="document">
      <div class="modal-content" :class="{ 'modal-dialog-scrollable': scrollable }">
        <div class="modal-header" :class="headerClass">
          <h5 class="modal-title" :id="'modal-title'">{{ title }}</h5>
          <button type="button" class="btn-close" @click="hide('headerclose')" :aria-label="$t('confirm.close')"></button>
        </div>
        <div class="modal-body" :class="bodyClass">
          <slot></slot>
        </div>
        <div v-if="!hideFooter" class="modal-footer" :class="footerClass">
          <slot name="modal-footer" :cancel="cancel" :ok="ok">
            <BButton variant="primary" @click="hide('ok')">{{$t('confirm.ok')}}</BButton>
            <BButton v-if="!okOnly" variant="secondary" @click="hide('cancel')">{{$t('confirm.cancel')}}</BButton>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Bootstrap from 'bootstrap'
import BButton from './BButton.vue'

export default {
  name: 'BModal',
  components: {
    BButton
  },
  props: {
    okOnly: Boolean,
    title: String,
    size: String,
    scrollable: Boolean,
    fullscreen: Boolean,
    hideFooter: Boolean,
    bodyClass: String,
    headerClass: String,
    footerClass: [String, Object]
  },
  data() {
    return {
      lastFocused: null
    }
  },
  mounted() {
    this.modal = new Bootstrap.Modal(this.$refs.modal, {
      backdrop: 'static',
      keyboard: true
    })

    if (this.$refs.modal.parentNode !== document.body) {
      document.body.appendChild(this.$refs.modal)
    }

    this.$refs.modal.addEventListener('show.bs.modal', () => { this.$emit('show') })
    this.$refs.modal.addEventListener('shown.bs.modal', () => this.$emit('shown'))
    this.$refs.modal.addEventListener('hide.bs.modal', () => { this.$emit('hide') })
    this.$refs.modal.addEventListener('hidden.bs.modal', () => {
      this.$emit('hidden')
      this.restoreFocus()
    })
    this.$refs.modal.addEventListener('hidePrevented.bs.modal', () => this.hide('close'))
  },
  computed: {
    sizeClass() {
      return ['sm', 'lg', 'xl'].includes(this.size) ? `modal-${this.size}` : ''
    },
    modalClasses() {
      return [
  		  this.sizeClass,
	      { 'modal-dialog-scrollable': this.scrollable, 'modal-fullscreen': this.fullscreen }
      ]
    }
  },
  methods: {
    cancel() {
      this.hide('cancel')
    },
    ok() {
      this.hide('ok')
    },
    hide(trigger) {
      this.modal.hide()
      this.$emit('hide', trigger)
    },
    restoreFocus() {
      this.$nextTick(() => {
        if (this.lastFocused && typeof this.lastFocused.focus === 'function') {
          // Check if the original element still exists AND is visible/focusable
          if (document.body.contains(this.lastFocused) && this.isElementVisible(this.lastFocused)) {
            this.lastFocused.focus()
          } else {
            // Otherwise, find the closest focusable ancestor or related element
            const fallbackElement = this.findFocusableFallback(this.lastFocused)
            if (fallbackElement) {
              fallbackElement.focus()
            }
          }
        }
        this.lastFocused = null
      })
    },
    isElementVisible(element) {
      // Check if element or any parent is hidden
      if (!element.offsetParent && element !== document.body) {
        return false
      }
      
      // Check if element is inside a collapsed/hidden dropdown menu
      const dropdownMenu = element.closest('.dropdown-menu')
      if (dropdownMenu) {
        const isShown = dropdownMenu.classList.contains('show')
        if (!isShown) {
          return false
        }
      }
      
      // Check if element is inside a collapsed navbar
      const navbarCollapse = element.closest('.navbar-collapse')
      if (navbarCollapse) {
        const isShown = navbarCollapse.classList.contains('show')
        if (!isShown) {
          return false
        }
      }
      
      return true
    },
    findFocusableFallback(element) {
      // Check if element was inside a dropdown menu
      const dropdownItem = element.closest('.dropdown-item')
      if (dropdownItem) {
        // Find the dropdown toggle button
        const dropdown = dropdownItem.closest('.dropdown')
        if (dropdown) {
          const toggle = dropdown.querySelector('[data-bs-toggle="dropdown"]')
          if (toggle && document.body.contains(toggle)) {
            return toggle
          }
        }
      }
      
      // General fallback: traverse up looking for a focusable parent that still exists
      let parent = element.parentElement
      while (parent && parent !== document.body) {
        if (document.body.contains(parent) && this.isElementVisible(parent)) {
          // Check if parent is focusable
          if (parent.tabIndex >= 0 || parent.tagName === 'BUTTON' || parent.tagName === 'A') {
            return parent
          }
          // Keep looking up
          parent = parent.parentElement
        } else {
          // Parent is also removed, try its parent
          parent = parent.parentElement
        }
      }
      
      return null
    },
    show() {
      this.lastFocused = document.activeElement
      this.modal.show()
    }
  }
}
</script>
