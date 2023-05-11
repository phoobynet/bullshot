import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from '@/routes/router'
import '@/style.scss'

createApp(App).use(router).mount('#app')
