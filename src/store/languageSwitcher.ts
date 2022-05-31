
import {defineStore} from 'pinia'

export  const useLanguageSwitcher = defineStore({
    id:'language',
    state: ()=>({
        setLanguage: localStorage.getItem('language') || 'la',
    }),
    actions:{
      async  languageSwitch(val: string){
            const language = val
            localStorage.setItem('language', language)
            location.reload()
        }
    }
})

