import { defineStore } from "pinia";

export const useProfile = defineStore('profile',{
    state:() => ({
        username:'jurdi',
        password:'2023',
        profile:'',
        api:'https://script.google.com/macros/s/AKfycbyPqDKChAtZ2EU3AwC75wR26yILKs2sMcWGGW47zyUZoG6V06ZfBZZVEqMF__V7y139/exec',
        

    }),
    actions:{
        setProfile(profile){
            this.profile = profile
        },
        loginQuery(){
            return `?username=${this.username}&password=${this.password}`
        }

    }
})