
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

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
    userType: localStorage.getItem('userType') || "null"
  }),
  getters: {
    getToken: (state) => state.accessToken,
    getUserType: (state) => state.userType,
    isAuth: (state) => state.accessToken !== null,
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
        const userType = JSON.stringify(userRole);
        localStorage.setItem('userType', userType);
        localStorage.setItem('accessToken', token);
        location.reload();
      } catch (error) {
        console.log(error)
      }
    },
    async logOut() {
     localStorage.removeItem("accessToken");
     localStorage.removeItem("userType");
      router.push({ name: "Login" });
      location.reload();

    }
  }
})


export default {
  useLanguageSwitcher,
  useAuthStore,

}
