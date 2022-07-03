import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import store from './store'
import { createI18n } from 'vue-i18n'
import messages from './plugins/i18n'
import axios from 'axios'

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
const useLanguageSwitcher = store.useLanguageSwitcher()

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$languages = useLanguageSwitcher.$state.setLanguage;



//multiple languages
const i18n = createI18n({
  locale: app.config.globalProperties.$languages,
  fallbackLocale:'en', // set locale
  messages, // set locale messages
})







app.use(router).use(i18n).mount('#app')
