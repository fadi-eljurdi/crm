<template>
  <section class="container my-5  d-flex flex-column gap-3">
      
      <div class="row">
        <div class="col-12">
            <h3 class="pop text-secondary fs-3">Settings</h3>
            <p class="text-secondary fs-small">
            Effortlessly configure your CRM platform to match your business goals and preferences with our intuitive and flexible settings options.
            </p>
        </div>
        <div class="col-12">
            <h6 class="fs-6 text-primary">AI Rules:</h6>
            <div class="d-flex align-items-center gap-2 my-3 flex-wrap">
                <div @dblclick="removeRule(rule)" class="fs-small shadow-sm px-3 py-1 rounded bg-light point" title="double click to remove" v-for="rule in store.settings.rules" :key="rule">
                    <span>{{rule}}</span>
                </div>
            </div>
            <input @keyup.enter="addRule" v-model="newRule" type="text" class="form-control form-control-sm" placeholder="Add a rule">
        </div>
      </div>
      <div class="row">
        
        <h6 class="fs-6 text-primary">Reset credentials {{cred}}</h6>
        <div class="col-12 col-lg-5">
            <input type="text" v-model="cred.username" placeholder="username" class="form-control form-control-sm">
        </div>
        <div class="col-12 col-lg-5">
            <input type="text" v-model="cred.password" placeholder="password" class="form-control form-control-sm">
        </div>
        <div class="col-12 col-lg-2">
            <button class="btn btn-sm btn-primary w-100" :disabled="onEdit" @click="resetCredentials">Reset</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
            
            <h6 class="fs-6 text-primary">NB of words: {{words}}</h6>
            <input @change="setWordsRange" v-model="words" type="range" class="form-range rounded-pill" min="100" max="1000" step="50" >
        </div>
      </div>
      <div class="row">
        <div class="col-12">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="store.settings.useYoutubeTitle" >
                <label class="form-check-label" for="flexCheckDefault">
                    useYoutubeTitle
                </label>
            </div>
            <!-- <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="store.settings.useYoutubeCaptions" >
                <label class="form-check-label" for="flexCheckChecked">
                    useYoutubeCaptions
                </label>
            </div> -->
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="store.settings.useYoutubeDescription" >
                <label class="form-check-label" for="flexCheckChecked">
                    useYoutubeDescription
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="store.settings.generateTitle" >
                <label class="form-check-label" for="flexCheckChecked">
                    generateTitle with Chat GPT
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="store.settings.generateSEOKeywords" >
                <label class="form-check-label" for="flexCheckChecked">
                    generateSEOKeywords with Chat GPT
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="store.settings.generateSEODescription" >
                <label class="form-check-label" for="flexCheckChecked">
                    generateSEODescription with Chat GPT
                </label>
            </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-6 col-lg-2">
            <button @click="saveSettings" class="w-100 btn btn-sm btn-success">
                <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                <span v-else>save changes</span>
            </button>
        </div>
        <!-- <div class="col-6 col-lg-2"><slot></slot></div> -->
      </div>
    </section>
    
    <message v-show="store.showMessage" :title="store.theMessage" :callback="store.callback" :spinner="spinner">
        <button class="btn btn-outline-light btn-sm" @click="store.showMessage = !store.showMessage">close</button>
    </message>
</template>

<script>

import message from './message.vue'
import utilities from '../utilities.js'
import {useProfile} from '../stores/profile'
export default {
    
    components:{message},
    setup(){
        const store = useProfile()
        return {store}
    },
    data(){
        return{
            newRule:'',
            words:100,
            spinner:false,
            cred:{
                username:'',
                password:''
            },
            onEdit:true
        }
    },
    watch:{

        cred: {
            handler(newValue, oldValue) {
                // Note: `newValue` will be equal to `oldValue` here
                // on nested mutations as long as the object itself
                // hasn't been replaced.
                const credentials = {
                    username:'',
                    password:''
                }
                if(utilities.deepEqual(credentials,newValue)) this.onEdit = true
                else this.onEdit = false
                
                
            },
            deep: true
        }
    },
    methods:{
        addRule(){
            this.store.settings.rules.push(`${this.newRule} `)
            this.newRule = ''
        },
        removeRule(rule){
            this.store.settings.rules = this.store.settings.rules.filter(r => r != rule)
        },
        setWordsRange(){
            console.log(this.words);
            this.store.settings.words = this.words
        },
        saveSettings(){
            this.spinner = true
            var api = this.store.api()
            api += this.store.loginQuery()
            api += `&setSettings=1`
            if(this.store.settings.useYoutubeTitle){
                // await this.setYoutubePrompt()
                this.store.blog.title += this.store.youtube.title
            }
            if(this.store.settings.useYoutubeDescription){
                // await this.setYoutubePrompt()
                this.store.blog.seoDescription += this.store.youtube.description
            }
            fetch(api,{
                method:"POST",
                headers:{
                    "Content-Type":"text/plain"
                },
                body:JSON.stringify(this.store.settings)
            }).then(res => res.json()).then(res => {
                console.log(res);
                
                this.spinner = false
            }).catch(err => {
                console.log(err);
            })
        },
        
        resetCredentials(){
            
            this.store.alertMessage('Are you sure ?').setAction(async ()=>{
                var username = encodeURI(this.cred.username)
                var password = encodeURI(this.cred.password)
                if(username && password){

                try{
                        this.spinner = true
                        var api = this.store.api()
                        api += this.store.loginQuery()
                        api += `&resetCredentials=1`
                        var res = await fetch(api,{
                            method:"POST",
                            headers:{
                                "Content-Type":"text/plain"
                            },
                            body:JSON.stringify({
                                username,password
                            })
                        })
                        res = await res.json()
                        if(res == '200'){
                            this.spinner = false
                            // this.store.alertMessage('Meshe l7al')
                            
                            location.reload()
                        }
                    }catch(err){
                        this.spinner = false
                        console.log(err);
                        this.store.alertMessage('Ma meshe l7al').endAction()
                    }
                }
            })

        }
    },
    mounted(){
        this.words = this.store.settings.words
    }
};
</script>
