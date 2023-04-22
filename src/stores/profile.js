import { defineStore } from "pinia";

export const useProfile = defineStore('profile',{
    state:() => ({
        profile:'',
        username:'',
        password:'',
        api:'https://script.google.com/macros/s/AKfycbwC9S-9LrdGnosjv0onP4E1r5BeMoGMcUvwPcgrCaLU070fGCiexjXlUzSnZ95uI2ky/exec',
        

    }),
    actions:{
        setCredentials(username,password){
            this.username = username
            this.password = password
        },
        loginQuery(){
            return `?username=${this.username}&password=${this.password}`
        },
        async getProfile(){
            
            var api = this.api
            api += `?getProfile=1`
            var result = await fetch(api)
            result = await result.json()
            this.profile = result
        }

    }
})