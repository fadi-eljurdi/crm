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
            if(this.domain == 'www.jurdiconsult.media') return "https://script.google.com/macros/s/AKfycbzDbrGNqQ_ww6kOZ2ZAtGxfFeEdgeHXXbEo8WNDuzv6O1db_8i6fU8QLUljbavxl1Co/exec"
            if(this.domain == 'www.incugamecon.media') return "https://script.google.com/macros/s/AKfycbwAjf6wyWlzz_Qmm5Tr7cHIL6Ubl9dEgX_gvz_VCN5Wy0H0lAvFYALclnlKeIIoMWSo/exec"
            return "https://script.google.com/macros/s/AKfycbxA-zbaxGfvru0pEHqtkHUIFogEbIW-AMwbwtoxqYqxn6Z_5_vifRUr3n_XKHaSXBvD/exec"
        },



    }
})