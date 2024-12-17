/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// css
import '@/assets/mycss.css'
import * as monaco from "monaco-editor";

const app = createApp(App)

registerPlugins(app)

app.mount('#app')

monaco.editor.defineTheme("myTheme", {
  base: "vs",
  inherit: true,
  rules: [],
  colors: {
    "editor.background": "#ffffff30",
    "editor.selectionBackground": "#d4d4d4",
    "editor.lineHighlightBackground": "#f5f5f5",
    "editorWidget.border": "#f5f5f5",
  }
})
