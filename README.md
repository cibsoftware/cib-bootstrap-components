# bootstrap-components

## Installation

```sh
npm install @cib/bootstrap-components
```

**Note:** This library requires Bootstrap 5.3.8+ as a peer dependency. Install it in your project:

```sh
npm install bootstrap
```

## Usage

In your main application entry file (e.g., `main.js`):

```javascript
import { createApp } from 'vue'
import App from './App.vue'

// Import Bootstrap CSS (once in your app)
import 'bootstrap/dist/css/bootstrap.min.css'

// Import the component library
import { registerComponents } from '@cib/bootstrap-components'
// Optionally import component-specific styles if needed
// import '@cib/bootstrap-components/dist/bootstrap-components.css'

const app = createApp(App)

// Register all components
registerComponents(app)

app.mount('#app')
```

**Alternative: Import individual components**

```javascript
import { BButton, BCard, BModal } from '@cib/bootstrap-components'

app.component('b-button', BButton)
app.component('b-card', BCard)
app.component('b-modal', BModal)
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm dev
```

### Compile and Minify for Production

```sh
npm build
```

## Publish as NPM library

```sh
npm publish
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm build
npm test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm lint
```
