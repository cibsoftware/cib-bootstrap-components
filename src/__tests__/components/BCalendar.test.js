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
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import i18n from '@/app/i18n'
import { BCalendar } from '@/library'

function mountCalendar(modelValue = '2024-01-15T00:00:00.000Z') {
  return mount(BCalendar, {
    global: {
      plugins: [i18n]
    },
    props: {
      modelValue
    }
  })
}

describe('BCalendar', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mountCalendar()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('daysInMonth', () => {
    it('returns exactly all days of each month for multiple years', () => {
      for (let year = 1996; year <= 2032; year++) {
        for (let month = 0; month < 12; month++) {
          wrapper.vm.currentDate = new Date(year, month, 1)

          const expectedMonthDays = new Date(year, month + 1, 0).getDate()
          const currentMonthDays = wrapper.vm.daysInMonth.filter(day => !day.isOtherMonth)

          expect(currentMonthDays).toHaveLength(expectedMonthDays)
          expect(currentMonthDays.map(day => day.day)).toEqual(
            Array.from({ length: expectedMonthDays }, (_, index) => index + 1)
          )
          expect(currentMonthDays.every(day => day.date.getFullYear() === year)).toBe(true)
          expect(currentMonthDays.every(day => day.date.getMonth() === month)).toBe(true)
          expect(wrapper.vm.daysInMonth.length % 7).toBe(0)
        }
      }
    })

    it('handles february in leap and non-leap years correctly', () => {
      wrapper.vm.currentDate = new Date(2024, 1, 1)
      let februaryDays = wrapper.vm.daysInMonth.filter(day => !day.isOtherMonth)
      expect(februaryDays).toHaveLength(29)
      expect(februaryDays[februaryDays.length - 1].day).toBe(29)

      wrapper.vm.currentDate = new Date(2023, 1, 1)
      februaryDays = wrapper.vm.daysInMonth.filter(day => !day.isOtherMonth)
      expect(februaryDays).toHaveLength(28)
      expect(februaryDays[februaryDays.length - 1].day).toBe(28)
    })
  })
})
