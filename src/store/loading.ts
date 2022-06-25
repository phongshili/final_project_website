import { defineStore } from 'pinia'

export const useLoading = defineStore('loading',{
    state: () =>({
        isLoading: false
    }),
    getters:{
        getIsLoading: (state) => state.isLoading,
    },
    actions:{
       async setloading(state:boolean) {
        this.isLoading = state
       }
    }
})

export default {
    useLoading
  }