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
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js'
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: path.resolve(__dirname, 'src/library.js'),
      name: 'bootstrap-components',
      formats: ['es', 'umd'],
      fileName: (format) => `bootstrap-components.${format}.js`
    },
    rollupOptions: {
      external: ['vue', 'bootstrap', 'vue-i18n', 'vue-router'],
      output: {
        globals: {
          vue: 'Vue',
          bootstrap: 'bootstrap',
          'vue-i18n': 'VueI18n',
          'vue-router': 'VueRouter'
        },
        // Ensure CSS is extracted and placed in the dist folder
        assetFileNames: 'bootstrap-components.[ext]',
      }
    },
    cssCodeSplit: true, // Ensure CSS is extracted into a separate file
  }
})
