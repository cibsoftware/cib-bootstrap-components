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
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { findComponents } from './utils.js'

function getTranslation(lang) {
  // eslint-disable-next-line no-undef
  const filePath = resolve(__dirname, `../assets/translations_${lang}.json`)
  const translation = JSON.parse(readFileSync(filePath, 'utf-8'))
  return translation
}

function haveSameProperties(objBase, objTest, path) {
  // Check if both are objects and not null
  expect(objBase).not.toBeNull()
  expect(objTest).not.toBeNull()

  if (typeof objBase === 'string' && typeof objTest === 'string') {
    // nothing to check
  }
  else {
    expect(objBase).toBeTypeOf('object')
    expect(objTest).toBeTypeOf('object')

    const keysBase = Object.keys(objBase)
    const keysTest = Object.keys(objTest)

    // Compare key sets
    const keysBaseSorted = keysBase.sort().join(',')
    const keysTestSorted = keysTest.sort().join(',')
    expect(keysBaseSorted, `Missing/extra key for "${path}" path`).toBe(keysTestSorted)

    // Recurse into nested objects
    for (const key of keysBase) {
      if (!haveSameProperties(objBase[key], objTest[key], path + '.' + key)) {
        return false
      }
    }
  }

  return true
}

function skipPath(path) {
  return path.includes('.operators.') || path.includes('.cib-header.')
    || path.includes('.flowModalSupport.phoneNumber')
    || path.includes('.flowModalSupport.email')
}

function skipValue(value, lang) {
  const ignoreWords = {
    '': [
      '',
      'ok',
    ],
    'de': [
      'avatar',
      'minute'
    ],
    'es': [
      'avatar'
    ],
    'ua': [
    ],
    'ru': [
    ]
  }

  const lower = value.toLowerCase()
  return ignoreWords[''].includes(lower) || ignoreWords[lang].includes(lower) || value.startsWith('@')
}

function reportSameValues(objBase, objTest, path, lang) {
  var status = true

  // Check if both are objects and not null
  expect(objBase).not.toBeNull()
  expect(objTest).not.toBeNull()

  if (typeof objBase === 'string' && typeof objTest === 'string') {
    if (!skipPath(path)) {
      if (objBase === objTest && ! skipValue(objBase, lang)) {
        console.log(`Error: Not translated: "${path}" = "${objBase}"`)
        status = false
      }
    }
  }
  else {
    expect(objBase).toBeTypeOf('object')
    const keysBase = Object.keys(objBase)

    // Recurse into nested objects
    for (const key of keysBase) {
      if (!reportSameValues(objBase[key], objTest[key], path + '.' + key, lang)) {
        status = false
      }
    }
  }

  return status
}

var hasHeader = false
function reportSameValuesTable(objBase, objTest, languages, path) {
  // Check if both are objects and not null
  expect(objBase).not.toBeNull()
  expect(objTest).not.toBeNull()

  if (typeof objBase === 'string') {
    if (!skipPath(path)) {

      const hasSameValues = objTest.map(
        (v, index) => objBase === v && !skipValue(objBase, languages[index])
      ).find(v => v)
      if (hasSameValues) {

        if (!hasHeader) {
          console.log(`Error: Next strings have the same values comparing to EN`)
          hasHeader = true
        }

        const v = objTest.map(
          (v, index) => (objBase === v && !skipValue(objBase, languages[index])) ? languages[index] : '  '
        ).join(' | ')
        console.log(`| en | ${v} | ${path} |`)
      }
    }
  }
  else {
    expect(objBase).toBeTypeOf('object')
    const keysBase = Object.keys(objBase)

    // Recurse into nested objects
    for (const key of keysBase) {
      if (!reportSameValuesTable(objBase[key], objTest.map(k => k[key]), languages, path + '.' + key)) {
        return false
      }
    }
  }

  return true
}

describe('i18n', () => {
  const languages = ['de', 'en', 'es', 'ru', 'ua']

  describe('loadable', () => {
    languages.forEach(lang => {
      it(`${lang}`, () => {
        const translations = getTranslation(lang)
        expect(translations).toBeDefined()
      })
    })
  })

  describe('compare en with', () => {
    const translationEn = getTranslation('en')
    languages.filter(lang => lang !== 'en').forEach(lang => {
      it(`${lang}`, () => {
        const translationLang = getTranslation(lang)
        expect(haveSameProperties(translationEn, translationLang, lang)).toBeTruthy()
      })
    })

    languages.filter(lang => lang !== 'en').forEach(lang => {
      it(`${lang}, report same values`, () => {
        const translationLang = getTranslation(lang)
        expect(reportSameValues(translationEn, translationLang, lang, lang)).toBeTruthy()
      })
    })

    it(`same values as table`, () => {
      const filteredLanguages = languages.filter(lang => lang !== 'en')
      const translations = filteredLanguages.map(lang => getTranslation(lang))
      expect(reportSameValuesTable(translationEn, translations, filteredLanguages, '')).toBeTruthy()
    })
  })

  describe('usage', () => {
    it(`all en keys should be used`, () => {
      const translationEn = getTranslation('en')

      // convert transaltion object to flat list of keys
      const stringKeys = []
      const extractKeys = (obj, path) => {
        if (typeof obj === 'string') {
          stringKeys.push({ path: path, value: obj })
        } else if (typeof obj === 'object' && obj !== null) {
          for (const key of Object.keys(obj)) {
            extractKeys(obj[key], path.concat(key))
          }
        }
      }
      extractKeys(translationEn, [])

      // Find all .vue files in /src/
      const vueFiles = findComponents('src', '.vue')
      expect(vueFiles.length).toBeGreaterThan(0)

      // Check usage of each key in .vue files
      // When found in any file, we consider it used => remove from list
      for (const file of vueFiles) {
        const content = readFileSync(file, 'utf-8')

        for (let i = stringKeys.length - 1; i >= 0; i--) {
          const keyPath = stringKeys[i].path.join('.')
          const usagePattern = new RegExp(`\\$t\\(\\s*['"\`]${keyPath}['"\`]`)
          if (usagePattern.test(content)) {
            // Found usage, remove from list
            stringKeys.splice(i, 1)
          }
        }
      }

      // Report unused keys
      if (stringKeys.length > 0) {
        console.log(`Unused translation keys in en (checked ${vueFiles.length} .vue files):\n`, '\n' + stringKeys.map(k => `- ${k.path.join('.')} = "${k.value}"`).join('\n'))
      }
      expect(stringKeys.length).toBe(0)
    })
  })
})
