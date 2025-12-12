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
import { findComponents } from './utils.js'

// Node.js modules for file system and path
import fs from 'node:fs'
import path from 'node:path'

describe('package', () => {
  // eslint-disable-next-line no-undef
  const srcDir = path.resolve(__dirname, '../')

  describe('license header', () => {

    it('all .vue files have license headers', () => {
      const vueFiles = findComponents(srcDir, '.vue')
      expect(vueFiles.length).toBeGreaterThan(0)
      for (const f of vueFiles) {
        const content = fs.readFileSync(f, 'utf-8')
        const hasLicenseHeader = content.includes('Copyright CIB software GmbH') && content.includes('apache.org/licenses/LICENSE-2.0')
        expect(hasLicenseHeader).toBe(true, `File ${f} is missing license header`)
      }
    })

    it('all .js files have license headers', () => {
      const jsFiles = findComponents(srcDir, '.js')
      expect(jsFiles.length).toBeGreaterThan(0)
      for (const f of jsFiles) {
        const content = fs.readFileSync(f, 'utf-8')
        const hasLicenseHeader = content.includes('Copyright CIB software GmbH') && content.includes('apache.org/licenses/LICENSE-2.0')
        expect(hasLicenseHeader).toBe(true, `File ${f} is missing license header`)
      }
    })
  })
})
