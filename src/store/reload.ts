import { defineStore } from 'pinia'

export const useReload = defineStore('reload',{
    state: () =>({
        isReload: false
    }),
    getters:{
        getIsReload: (state) => state.isReload,
    },
    actions:{
       async setReload(state:boolean) {
        this.isReload = state
       }
    }
})

export default {
    useReload
  
  }