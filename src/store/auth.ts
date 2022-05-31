// import { defineStore } from 'pinia'
// import axios from 'axios'

// export const useAuthStore = defineStore('auth', {
//     state: () => ({
//         accessToken: localStorage.getItem('accessToken') || null,
//     }),
//     getters: {
//         getToken: (state) => state.accessToken,
//         isAuth: (state) => state.accessToken !== null,
//     },
//     actions: {
//         async authLogin(email: String, password: String) {
//          try{
//            console.log('start 1' , email, password);
//           const res = await axios.post(
//             `http://127.0.0.1:4000/auth/admin-api/admin-login`,
//             {
//                 email:email, password: password
//             }
            
//         )
        
//         console.log('start 2')
//         const token = res.data.accessToken;
//         localStorage.setItem('accessToken', token);
//          }catch (error) {
//           console.log(error)
//         }
//         }
//     }
// })