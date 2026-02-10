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
  <div :class="avatarClasses" :style="avatarStyles" role="img" :aria-label="computedAriaLabel">
      <img v-if="src" :src="src" :alt="alt || computedAriaLabel" class="img-fluid" />
      <span v-else class="d-flex align-items-center justify-content-center">{{ initials }}</span>
  </div>
</template>

<script>
export default {
  name: 'BAvatar',
  props: {
    src: { type: String, default: '' },
    alt: { type: String, default: '' },
    text: { type: String, default: '' },
    size: { type: String, default: 'md' }, // 'sm', 'md', 'lg'
    variant: { type: String, default: 'primary' }, // Bootstrap color variants like 'primary', 'secondary', etc.
    rounded: { type: Boolean, default: true } // If true, avatar will be rounded-circle
  },
  computed: {
    avatarClasses() {
      return [
        'd-inline-flex', 'align-items-center', 'justify-content-center',
        `bg-${this.variant}`,
        this.rounded ? 'rounded-circle' : 'rounded',
        'overflow-hidden'
      ]
    },
    avatarStyles() {
      return {
        width: this.computedSize,
        height: this.computedSize,
        fontSize: this.computedFontSize,
        textAlign: 'center'
      }
    },
    computedSize() {
      switch (this.size) {
        case 'sm':
          return '32px'
        case 'lg':
          return '64px'
        default:
          return '48px'
      }
    },
    computedFontSize() {
      switch (this.size) {
        case 'sm':
          return '14px'
        case 'lg':
          return '28px'
        default:
          return '20px'
      }
    },
    computedAriaLabel() {
      return this.alt || (this.text ? this.$t('bcomponents.avatar.avatarFor', { name: this.text }) : this.$t('bcomponents.avatar.defaultAvatar'))
    },
    initials() {
      return this.text ? this.text.substring(0, 2).toUpperCase() : ''
    }
  }
}
</script>
