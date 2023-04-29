import { defineStore } from "pinia";

export const useProfile = defineStore('profile',{
    state:() => ({
        profile:'',
        username:'',
        password:'',
        github:'',
        gptToken:'',
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
        settings:'',
        api:'https://script.google.com/macros/s/AKfycbzLGrV_1y1EqqA4Ft2Vd46AIW6r86h8FDeyZgFzbf5xy-z2u02vdpFluT6NynphZXfU/exec',
        // settings:{
        //     quality:0.7,
        //     rules:['formal'],
        //     words:100,
        //     useYoutubeTitle:false,
        //     useYoutubeCaptions:false,
        //     useYoutubeDescription:false,
        //     generateTitle:false,
        //     generateSEOKeywords:false,
        //     generateSEODescription:false
        // }
    
        

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