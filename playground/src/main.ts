import { createApp } from 'vue'
import { createFatree } from "./app"
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "./assets/scss/tailwind.scss"
import "./assets/scss/app.scss"

const app = createApp(App)

app.config.performance = true;
app.use(createPinia())
app.use(router)
app.mount('#app')
