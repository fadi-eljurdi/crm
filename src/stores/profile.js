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
        blog:{
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
            return `?username=${this.username}&password=${this.password}`
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
        },
        api(){
            if(this.domain == 'www.jurdiconsult.media') return "https://script.google.com/macros/s/AKfycbxYqtGjp9MvEaf9jbwu3HcExdvPhNypd1jQtGgN9HinpK7_Lvt0tb6mcgpsMXK_Ut3m/exec"
            return "https://script.google.com/macros/s/AKfycbycOa0V0SO8EkZiMORD9gqG_CATaFM39uG1D4gus1EZVYl2F6t4YBE-2JuyAcV0Lch4/exec"
        }



    }
})