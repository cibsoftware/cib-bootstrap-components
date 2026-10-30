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
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { BBadge } from '@/library'

describe('BBadge', () => {
  it('is not a live region by default, so screen readers do not announce every change', () => {
    const wrapper = mount(BBadge, { props: { pill: true, variant: 'light' }, slots: { default: '3' } })

    expect(wrapper.attributes('role')).toBeUndefined()
    expect(wrapper.classes()).toEqual(expect.arrayContaining(['badge', 'text-bg-light', 'rounded-pill']))
    expect(wrapper.text()).toBe('3')
  })

  it('takes a role from the consumer when a live badge is wanted', () => {
    const wrapper = mount(BBadge, { attrs: { role: 'status' } })
    expect(wrapper.attributes('role')).toBe('status')
  })
})
