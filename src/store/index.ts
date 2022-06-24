
import { defineStore } from 'pinia'
import axios from 'axios'
import router from '../router'

export const useLanguageSwitcher = defineStore({
  id: 'language',
  state: () => ({
    setLanguage: localStorage.getItem('language') || 'la',
  }),
  getters:{
    getLanguage: (state) => state.setLanguage,
  },
  actions: {
    async languageSwitch(val: string) {
      const language = val
      localStorage.setItem('language', language)
      location.reload()
    }
  }
})

export  const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    userStatus : localStorage.getItem('userStatus' )|| null
  }),
  getters: {
    getToken: (state) => state.accessToken,
    isAuth: (state) => state.accessToken !== null,
    getUserStatus : (state) => state.userStatus
  },
  actions: {
    async authLogin(email: String, password: String) {
      try {
        let userRole;
        const res = await axios.post(
          `http://127.0.0.1:4000/auth/admin-api/admin-login`,
          {
            email, password
          }
        )
        const token = await res.data.accessToken;
        const type = await res.data.type;
        const headers = { 
          "Content-Type": "application/json",
          "Authorization": token,
        };
        if(type ==="admin"){
          const resUserTypeAdmin = await axios.get(
            `http://127.0.0.1:4000/admin-api/admin-find-id/`,
            {
              headers
            },)
            userRole = resUserTypeAdmin.data.findAdminId 
        }else if(type ==="employee"){
          const resUserTypeEmp = await axios.get(
            `http://127.0.0.1:4000/emp-api/employee-find-id`,{
              headers
            }
         )
         userRole = resUserTypeEmp.data.findEmpId
        }
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userStatus',type)
        location.reload();
      } catch (error) {
        console.log(error)
      }
    },
    async logOut() {
     localStorage.removeItem("accessToken");
     localStorage.removeItem("userStatus");
      router.push({ name: "Login" });
      location.reload();

    }
  }
})


export default {
  useLanguageSwitcher,
  useAuthStore,

}
