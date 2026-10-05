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
import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BDPopover from '@/components/BDPopover.vue'

// The directive renders its content as HTML so callers can pass markup. These
// tests pin the sanitisation that keeps that from becoming an injection point
// (CIB7-2008): dropping `sanitize` must not pass silently.
function mountWithContent(content) {
  return mount(
    { template: '<div v-b-popover.hover.top="content"></div>', props: ['content'] },
    { props: { content }, attachTo: document.body, global: { directives: { 'b-popover': BDPopover } } }
  )
}

function showPopover(wrapper) {
  wrapper.element._bs_popover.show()
  return document.querySelector('.popover-body')
}

describe('BDPopover', () => {
  let wrapper

  afterEach(() => {
    if (wrapper) wrapper.unmount()
    document.body.innerHTML = ''
  })

  it('renders markup in the content as HTML', () => {
    wrapper = mountWithContent('a <strong>bold</strong> hint')

    const body = showPopover(wrapper)
    expect(body.querySelector('strong')).not.toBeNull()
    expect(body.textContent).toContain('bold')
  })

  it.each([
    ['an img/onerror payload', '<img src="x" onerror="alert(1)">'],
    ['a script tag', '<script>alert(1)</script>'],
    ['an svg/onload payload', '<svg onload="alert(1)"></svg>'],
  ])('strips %s from the content', (_name, content) => {
    wrapper = mountWithContent(content)

    const body = showPopover(wrapper)
    expect(body.querySelector('script')).toBeNull()
    expect(body.innerHTML).not.toContain('onerror')
    expect(body.innerHTML).not.toContain('onload')
  })

  it('does not create a popover without content', () => {
    wrapper = mountWithContent('')

    expect(wrapper.element._bs_popover).toBeUndefined()
  })
})
