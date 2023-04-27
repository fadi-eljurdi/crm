import { defineStore } from "pinia";

export const useProfile = defineStore('profile',{
    state:() => ({
        profile:'',
        username:'',
        password:'',
        token1:'',
        quality:0.7,
        blog:{
            title:'',
            seoDescription:'',
            seoKeywords:'',
            thumbnail:'',
            url:'',
            mediaBox:[],
            article:''
        },
        api:'https://script.google.com/macros/s/AKfycbxDii_vOXi8sFnLzlcglpxOD0v9ofc3GgW-9wu0CGQm0DRw_VqhG9KpGbTWJMCZoDQt/exec',
        

    }),
    actions:{
        setCredentials(username,password,token1){
            this.username = username
            this.password = password
            this.token1 = token1
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