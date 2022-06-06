
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
    userType: localStorage.getItem('userType') || ''
  }),
  getters: {
    getToken: (state) => state.accessToken,
    getUserType: (state) => state.userType,
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
        const headers = { 
          "Content-Type": "application/json",
          "Authorization": token,
        };
        const resUserType = await axios.get(
          `http://127.0.0.1:4000/admin-api/admin-find-id/`,
          {
            headers
          },)
        const userType = JSON.stringify(resUserType.data.findAdminId);
        localStorage.setItem('userType', userType);
        localStorage.setItem('accessToken', token);
        router.push({ name: "Dashboard" });
      } catch (error) {
        console.log(error)
      }
    },
    async logOut() {
     localStorage.removeItem("accessToken");
     localStorage.removeItem("userType");

      router.push({ name: "Login" });
    }
  }
})

export default {
  useLanguageSwitcher,
  useAuthStore,

}
