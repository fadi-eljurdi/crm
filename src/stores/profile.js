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
        customPage:'',

        templateLLC:'',
        templateAPP:'',
        templateIGC:'',
        blog:{
            baas:false,
            baap:false,
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
            if(this.domain == 'www.jurdiconsult.media') return "https://script.google.com/macros/s/AKfycbwkigrNbFALD0u2-gx_yk1JmyIhIPWMSZqrKjXnVKep_L5KHKoSQGh4AdITKvlh4ZQ/exec"
            if(this.domain == 'www.incugamecon.media') return "https://script.google.com/macros/s/AKfycbxMB8RC2igaemgHr5Nkg_-vDx-csV7l3fD7AQ-BhA18Rvpug3M6l8D8Z-x-NzXasECk/exec"
            return "https://script.google.com/macros/s/AKfycbwh0vDqoKM_uLaHwxPoaN1Qm5PHr5VJ2EmwP4Cc8AQurKDLGGZJoeGnCy2GVRT_yiA/exec"
        },



    }
})