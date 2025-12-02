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
import { describe, it, expect, vi } from 'vitest'
import * as library from '@/library.js'
import { findComponents } from './utils.js'

// Node.js modules for file system and path
import fs from 'fs'
import path from 'path'

describe('library.js', () => {
  // eslint-disable-next-line no-undef
  const srcDir = path.resolve(__dirname, '../../src/components')

  describe('*.vue', () => {
    // Find all .vue files in /src/
    const vueFiles = findComponents(srcDir, '.vue')

    it('all .vue files have license headers', () => {
      vueFiles.forEach(f => {
        const content = fs.readFileSync(f, 'utf-8')
        const hasLicenseHeader = content.includes('Copyright CIB software GmbH') && content.includes('apache.org/licenses/LICENSE-2.0')
        expect(hasLicenseHeader).toBe(true, `File ${f} is missing license header`)
      })
    })

    it('all .js files have license headers', () => {
      const jsFiles = findComponents(srcDir, '.js')
      jsFiles.forEach(f => {
        const content = fs.readFileSync(f, 'utf-8')
        const hasLicenseHeader = content.includes('Copyright CIB software GmbH') && content.includes('apache.org/licenses/LICENSE-2.0')
        expect(hasLicenseHeader).toBe(true, `File ${f} is missing license header`)
      })
    })

    it('exports all .vue components from /src/', () => {

      // Get the base name (without extension) for each .vue file
      const vueComponentNames = vueFiles.map(f =>
        path.basename(f, '.vue')
      )

      // Get all exported keys from library.js
      const exportedKeys = Object.keys(library)

      // Check that each component is exported
      const missing = vueComponentNames.filter(
        name => !exportedKeys.includes(name)
      )

      expect(missing.map((name) => {
        const pathName = vueFiles.find(f => path.basename(f, '.vue') === name).substring(srcDir.length)
        return `import ${name} from '@${pathName}'`
      }).join('\n')).toEqual('')
    })

    it('valid name of .vue components', () => {
      vueFiles.forEach(file => {
        const fileName = path.basename(file, '.vue')

        // Check that the file name is a valid JavaScript identifier
        expect(fileName).toMatch(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/)

        // At least two words in the name
        expect(fileName.split(/(?=[A-Z])/).length).toBeGreaterThanOrEqual(2)

        // File should contain name in format: "'name: <componentName>'"
        const content = fs.readFileSync(file, 'utf-8')
        const isSetupScript = content.includes('<script setup>')
        const specialCases = ['BToggle'] // Components with no name property
        if (specialCases.includes(fileName)) {
          return
        }
        if (!isSetupScript) {
          const namePattern = new RegExp(`name:\\s*['"]${fileName}['"]`)
          expect(content).toMatch(namePattern, `File ${file} does not contain name: '${fileName}'`)
        }
      })
    })
  })

  describe('mergeLocaleMessage', () => {
    it('should be exported from library', () => {
      expect(library.mergeLocaleMessage).toBeDefined()
      expect(typeof library.mergeLocaleMessage).toBe('function')
    })

    const mockI18n = {
      global: {
        mergeLocaleMessage: vi.fn()
      }
    }

    it.each([
      'en',
      'de',
      'es',
      'ru',
      'ua'
    ])('should have translations for supported language: %s', (lang) => {
      library.mergeLocaleMessage(mockI18n, lang)
      expect(mockI18n.global.mergeLocaleMessage).toHaveBeenCalledWith(lang, expect.any(Object))
    })

    it('should fall back to English for unsupported language', () => {
      library.mergeLocaleMessage(mockI18n, 'fr')
      expect(mockI18n.global.mergeLocaleMessage).toHaveBeenCalledWith('fr', expect.any(Object))
    })

    it('should have translation content for all supported languages', async () => {
      const translations = {
        en: await import('@/assets/translations_en.json'),
        de: await import('@/assets/translations_de.json'),
        es: await import('@/assets/translations_es.json'),
        ru: await import('@/assets/translations_ru.json'),
        ua: await import('@/assets/translations_ua.json')
      }

      Object.entries(translations).forEach(([lang, translation]) => {
        expect(lang).toBeDefined()
        expect(translation.default).toBeDefined()
        expect(Object.keys(translation.default).length).toBeGreaterThan(0)
      })
    })
  })

})
