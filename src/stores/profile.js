import { defineStore } from "pinia";

export const useProfile = defineStore('profile',{
    state:() => ({
        profile:'',
        username:'',
        password:'',
        github:'',
        gptToken:'',
        quality:0.7,
        callback:'',
        showMessage:false,
        theMessage:'',
        youtube:'',
        terms:'',
        privacy:'',
        templateLLC:'',
        templateAPP:'',
        blog:{
            baas:false,
            title:'',
            seoDescription:'',
            seoKeywords:'',
            thumbnail:'',
            url:'',
            mediaBox:[],
            article:''
        },
        domain:'www.jurdiconsult.media',
        settings:'',
    
        

    }),
    actions:{
        setCredentials(username,password,github,gptToken,settings){
            this.username = username
            this.password = password
            this.github = github
            this.gptToken = gptToken
            this.settings = settings
            
        },
        loginQuery(){
            return `?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`
        },
        getProfile(){
            return new Promise(async (res,rej)=>{
                try{
                    var api = this.api()
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
        },
        alertMessage(msg){
            this.showMessage = true
            this.theMessage = msg
            return this
        },
        setAction(action){
            this.callback = action
            return this
        },
        endAction(){
            this.callback = false
            // this.showMessage = false
            return this
        },
        closeAction(){
            this.showMessage = false
            return this
        },
        api(){
            if(this.domain == 'www.jurdiconsult.media') return "https://script.google.com/macros/s/AKfycbzNIqlCdmiGJA_W1b-uDGVe28MbC5J08IZcPOJxuy8rNYGhS0SnwsXitn0YHaF8Z5_w/exec"
            return "https://script.google.com/macros/s/AKfycby-Qs1kX_QsE0pya57wAMJZd-DYnfqrSYJsLEweLLq9BJ3MsAC9F7DEcCTRo-YT9dSK/exec"
        },



    }
})