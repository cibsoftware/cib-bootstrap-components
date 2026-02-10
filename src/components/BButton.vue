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
  <component
    :is="tag"
    ref="button"
    class="btn"
    :class="[sizeClass, classes]"
    :href="computedHref"
    :to="isRouterLink ? to : null"
    :role="tag === 'button' ? 'button' : null"
    :aria-disabled="disabled ? 'true' : null"
    :disabled="disabled && tag === 'button'">
      <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BButton',
  props: {
    variant: { type: String, default: 'primary' },
    block: { type: Boolean, default: false },
    href: { type: String, default: null },
    to: { type: [String, Object], default: null },
    size: { type: String, default: null },
    disabled: { type: Boolean, default: false }
  },
  computed: {
    tag() {
      if (this.href) {
        return 'a'
      }
      return this.to ? 'router-link' : 'button'
    },
    classes() {
      const res = []
      res.push(`btn-${this.variant}`)
      if (this.block) res.push('w-100')
      return res
    },
    sizeClass() {
      return ['sm', 'lg'].includes(this.size) ? `btn-${this.size}` : ''
    },
    computedHref() {
      return this.href ? this.href : null
    },
    isRouterLink() {
      return !!this.to
    }
  },
  methods: {
    click(event) {
      if (this.disabled) {
        event.preventDefault()
        event.stopImmediatePropagation()
        return
      }
      if (!this.href && !this.to) {
        this.$emit('click', event)
      }
    },
    submit(event) {
      if (this.disabled) {
        event.preventDefault()
        event.stopImmediatePropagation()
        return
      }
      if (!this.href && !this.to) {
        this.$emit('submit', event)
      }
    },
    focus() {
      const element = this.$refs.button
      if (element && element.focus) {
        element.focus()
      }
    }
  }
}
</script>
