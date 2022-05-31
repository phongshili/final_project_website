
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

export const useLanguageSwitcher = defineStore({
  id: 'language',
  state: () => ({
    setLanguage: localStorage.getItem('language') || 'la',
  }),
  actions: {
    async languageSwitch(val: string) {
      const language = val
      localStorage.setItem('language', language)
      location.reload()
    }
  }
})

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
  }),
  getters: {
    getToken: (state) => state.accessToken,
    isAuth: (state) => state.accessToken !== null,
  },
  actions: {
    async authLogin(email: String, password: String) {
      try {
        const res = await axios.post(
          `http://127.0.0.1:4000/auth/admin-api/admin-login`,
          {
            email: email, password: password
          }
        )
        const token = await res.data.accessToken;
        localStorage.setItem('accessToken', token);
        router.push({ name: "JobPostIndex" });
      } catch (error) {
        console.log(error)
      }
    },
    async logOut() {
     localStorage.removeItem("accessToken");
      router.push({ name: "Login" });
    }
  }
})

export default {
  useLanguageSwitcher,
  useAuthStore

}
