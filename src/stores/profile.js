import { defineStore } from "pinia";

export const useProfile = defineStore('profile',{
    state:() => ({
        profile:'',
        username:'',
        password:'',
        api:'https://script.google.com/macros/s/AKfycbxLT_LaScyCKMWg_4tF2LAQzOX5YH8EvJD57ZdEobekr-Yh0AlFgYl2vAWDPLnWYeXX/exec',
        

    }),
    actions:{
        setCredentials(username,password){
            this.username = username
            this.password = password
        },
        loginQuery(){
            return `?username=${this.username}&password=${this.password}`
        },
        getProfile(){
            return new Promise(async (res,rej)=>{
                try{
                    var api = this.api
                    api += `?getProfile=1`
                    var result = await fetch(api)
                    result = await result.json()
                    this.profile = result
                    res(result)
                }catch(err){
                    console.log(err)
                    rej(err)
                }
            })
        }

    }
})