import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import "./assets/scss/tailwind.scss"
import "./assets/scss/app.scss"
import Toast from './plugins/toast/toast'

const app = createApp(App)

app.config.performance = true;
app.use(createPinia())
app.use(Toast)
app.use(router)
app.mount('#app')
