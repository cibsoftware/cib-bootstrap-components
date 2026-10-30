/*
 * Copyright CIB software GmbH and/or licensed to CIB software GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. CIB software licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import { BListGroupItem } from '@/library'

describe('BListGroupItem', () => {
  let router

  beforeEach(async () => {
    router = createRouter({
      history: createWebHashHistory(),
      routes: [{ path: '/', component: { template: '<div />' } }, { path: '/tasks/:id', component: { template: '<div />' } }]
    })
    await router.push('/')
    await router.isReady()
  })

  const mountItem = (props = {}) => mount(BListGroupItem, {
    props,
    slots: { default: 'Filter 1' },
    global: { plugins: [router] }
  })

  describe('as a link', () => {
    it('renders a list item with a real link instead of a link with the listitem role', () => {
      const wrapper = mountItem({ to: '/tasks/1' })

      expect(wrapper.element.tagName).toBe('LI')
      expect(wrapper.attributes('role')).toBeUndefined()
      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe('#/tasks/1')
      expect(link.attributes('role')).toBeUndefined()
      expect(link.text()).toBe('Filter 1')
    })

    // The webclient's profile pages switch tabs with links like '?tab=groups' on the current page
    it('resolves a query-only link against the current page', async () => {
      router.addRoute({ path: '/account/:userId', component: { template: '<div />' } })
      await router.push('/account/demo?tab=profile')

      expect(mountItem({ to: '?tab=groups' }).find('a').attributes('href')).toBe('#/account/demo?tab=groups')
    })

    it('marks only the active link as the current page', () => {
      expect(mountItem({ to: '/tasks/1', active: true }).find('a').attributes('aria-current')).toBe('page')
      expect(mountItem({ to: '/tasks/1' }).find('a').attributes('aria-current')).toBeUndefined()
    })

    it('navigates through the router on a plain click', async () => {
      const push = vi.spyOn(router, 'push')
      const wrapper = mountItem({ to: '/tasks/1' })

      await wrapper.find('a').trigger('click', { button: 0 })

      expect(push).toHaveBeenCalledWith('/tasks/1')
    })

    it('leaves a modified click to the browser so the link can open in a new tab', async () => {
      const push = vi.spyOn(router, 'push')
      const wrapper = mountItem({ to: '/tasks/1' })

      await wrapper.find('a').trigger('click', { button: 0, ctrlKey: true })

      expect(push).not.toHaveBeenCalled()
    })

    it('does not navigate when disabled and takes the link out of the tab order', async () => {
      const push = vi.spyOn(router, 'push')
      const wrapper = mountItem({ to: '/tasks/1', disabled: true })
      const link = wrapper.find('a')

      await link.trigger('click', { button: 0 })

      expect(push).not.toHaveBeenCalled()
      expect(link.attributes('aria-disabled')).toBe('true')
      expect(link.attributes('tabindex')).toBe('-1')
    })

    it('uses a plain href without the router', async () => {
      const push = vi.spyOn(router, 'push')
      const wrapper = mountItem({ href: 'https://example.org/' })

      await wrapper.find('a').trigger('click', { button: 0 })

      expect(wrapper.find('a').attributes('href')).toBe('https://example.org/')
      expect(push).not.toHaveBeenCalled()
    })

    it('keeps the item classes on the list item', () => {
      const wrapper = mountItem({ to: '/tasks/1', active: true })
      expect(wrapper.classes()).toEqual(expect.arrayContaining(['list-group-item', 'list-group-item-action', 'active']))
    })
  })

  it('passes mouse listeners through to the root element', async () => {
    const onMouseenter = vi.fn()
    const wrapper = mount(BListGroupItem, {
      props: { to: '/tasks/1' },
      attrs: { onMouseenter },
      global: { plugins: [router] }
    })

    await wrapper.trigger('mouseenter')

    expect(onMouseenter).toHaveBeenCalledTimes(1)
  })

  it('renders a button when button is set', () => {
    const wrapper = mountItem({ button: true })
    expect(wrapper.element.tagName).toBe('BUTTON')
    expect(wrapper.find('a').exists()).toBe(false)
  })

  it('renders a plain list item without to or href', () => {
    const wrapper = mountItem()
    expect(wrapper.element.tagName).toBe('LI')
    expect(wrapper.find('a').exists()).toBe(false)
  })
})
