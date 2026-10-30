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
  <li v-if="isLink" :class="['list-group-item', itemClasses]">
    <a :href="linkHref" class="d-block stretched-link text-reset text-decoration-none"
      :aria-current="active ? 'page' : null" :aria-disabled="disabled ? 'true' : null" :tabindex="disabled ? -1 : null"
      @click="handleLinkClick">
      <slot></slot>
    </a>
  </li>
  <component v-else
    :is="itemTag" :class="['list-group-item', itemClasses]"
    :role="isButton ? 'button' : 'listitem'" :aria-current="active ? 'true' : null"
    :aria-disabled="disabled ? 'true' : null" :tabindex="disabled ? -1 : 0"
    @click="handleClick" style="cursor: pointer"
    @keydown.space.prevent="handleClick" @keydown.enter.prevent="handleClick">
      <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BListGroupItem',
  // mousedown, mouseenter and mouseleave listeners fall through to the root element
  emits: [],
  props: {
    to: { type: [String, Object], default: null },
    href: { type: String, default: null },
    button: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    variant: { type: String, default: 'light' }
  },
  computed: {
    itemClasses() {
      const classes = {
        'list-group-item-action': this.isButton || this.isLink,
        active: this.active,
        disabled: this.disabled
      }
      if (this.variant) {
        classes[`list-group-item-${this.variant}`] = true
      }
      return classes
    },
    isLink() {
      return this.to || this.href
    },
    isButton() {
      return this.button
    },
    linkHref() {
      return this.to ? this.$router?.resolve(this.to).href : this.href
    },
    itemTag() {
      return this.isButton ? 'button' : 'li'
    }
  },
  methods: {
    handleClick(event) {
      if (this.disabled) event.preventDefault()
    },
    handleLinkClick(event) {
      if (this.disabled) {
        event.preventDefault()
        return
      }
      // Leave modified clicks (new tab, new window) to the browser
      if (!this.to || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return
      event.preventDefault()
      this.$router.push(this.to)
    }
  }
}
</script>
