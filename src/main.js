import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Global styles
import './assets/styles/main.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
