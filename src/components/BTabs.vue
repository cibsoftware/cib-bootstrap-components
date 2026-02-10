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
  <div :class="customClass">
    <nav aria-label="Tabs">
      <div class="nav nav-tabs" role="tablist" @keydown="handleKeydown">
        <button v-for="(tab, index) in tabs" :key="tab.id"
          class="nav-link" :class="[titleLinkClass, { active: activeTab === tab.id }]"
          :id="'nav-' + tab.id + '-tab'"
          :ref="'tab-' + index"
          data-bs-toggle="tab" :data-bs-target="'#nav-' + tab.id"
          type="button" role="tab"
          :tabindex="activeTab === tab.id ? 0 : -1"
          :aria-controls="'nav-' + tab.id" :aria-selected="activeTab === tab.id"
          @click="selectTab(tab.id)">
          {{ tab.title }}
        </button>
      </div>
    </nav>
    <div class="tab-content" :class="contentClass">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BTabs',
  props: {
    class: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    },
    titleLinkClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tabs: [],
      activeTab: null,
      tabClickHandlers: []
    }
  },
  computed: {
    customClass() {
      return this.class
    }
  },
  methods: {
    selectTab(tabId) {
      this.activeTab = tabId
      this.notifyTabClick(tabId)
    },
    registerTab(tab) {
      this.tabs.push(tab)
      if (this.tabs.length === 1) {
        this.activeTab = tab.id
      }
    },
    registerClickHandler(callback) {
      this.tabClickHandlers.push(callback)
    },
    notifyTabClick(tabId) {
      this.tabClickHandlers.forEach(callback => callback(tabId))
    },
    handleKeydown(event) {
      const currentIndex = this.tabs.findIndex(tab => tab.id === this.activeTab)
      let nextIndex = currentIndex

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          nextIndex = currentIndex > 0 ? currentIndex - 1 : this.tabs.length - 1
          break
        case 'ArrowRight':
          event.preventDefault()
          nextIndex = currentIndex < this.tabs.length - 1 ? currentIndex + 1 : 0
          break
        case 'Home':
          event.preventDefault()
          nextIndex = 0
          break
        case 'End':
          event.preventDefault()
          nextIndex = this.tabs.length - 1
          break
        default:
          return
      }

      if (nextIndex !== currentIndex && this.tabs[nextIndex]) {
        this.selectTab(this.tabs[nextIndex].id)
        this.$nextTick(() => {
          const tabRef = this.$refs['tab-' + nextIndex]
          if (tabRef && tabRef[0]) {
            tabRef[0].focus()
          }
        })
      }
    }
  },
  provide() {
    return {
      registerTab: this.registerTab,
      activeTab: () => this.activeTab,
      registerClickHandler: this.registerClickHandler
    }
  },
  mounted() {
    if (this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id
    }
  }
}
</script>
