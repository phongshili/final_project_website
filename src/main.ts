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
const userTypeStore = store.useAuthStore()

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$api = 'http://127.0.0.1:4000'
app.config.globalProperties.$languages = useLanguageSwitcher.$state.setLanguage;
app.config.globalProperties.$userInfo = JSON.parse(userTypeStore.getUserType);


//multiple languages
const i18n = createI18n({
  locale: app.config.globalProperties.$languages,
  fallbackLocale:'en', // set locale
  messages, // set locale messages
})




app.use(router).use(i18n).mount('#app')
