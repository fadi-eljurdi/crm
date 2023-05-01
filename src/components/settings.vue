<template>
  <section class="w-100 h-100 bg-light position-fixed top-0 start-0 z-3">
    <section class="container my-5  d-flex flex-column gap-5">
      <div class="row">
        <div class="col-12">
            <h3 class="pop text-secondary fs-3">Settings</h3>
            <p class="text-secondary fs-small">
            Effortlessly configure your CRM platform to match your business goals and preferences with our intuitive and flexible settings options.
            </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
            <h6 class="fs-6 text-primary">AI Rules:</h6>
            <div class="d-flex align-items-center gap-2 my-3 flex-wrap">
                <div @dblclick="removeRule(rule)" class="fs-small shadow-sm px-3 py-1 rounded bg-abyad point" title="double click to remove" v-for="rule in store.settings.rules" :key="rule">
                    <span>{{rule}}</span>
                </div>
            </div>
            <input @keyup.enter="addRule" v-model="newRule" type="text" class="form-control" placeholder="Add a rule">
        </div>
      </div>
      <div class="row">
        <div class="col-12">
            
            <h6 class="fs-6 text-primary">NB of words: {{words}}</h6>
            <input @change="setWordsRange" v-model="words" type="range" class="form-range shadow-sm rounded-pill" min="100" max="1000" step="50" >
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
        <div class="col-6 col-lg-2"><slot></slot></div>
      </div>
    </section>
  </section>
</template>

<script>
import {useProfile} from '../stores/profile'
export default {
    
    setup(){
        const store = useProfile()
        return {store}
    },
    data(){
        return{
            newRule:'',
            words:100,
            spinner:false
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
            var api = this.store.api
            api += this.store.loginQuery()
            api += `&setSettings=1`
            if(this.store.settings.useYoutubeTitle){
                // await this.setYoutubePrompt()
                this.store.blog.title = this.store.youtube.title
            }
            if(this.store.settings.useYoutubeDescription){
                // await this.setYoutubePrompt()
                this.store.blog.seoDescription = this.store.youtube.description
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
        }
    },
    mounted(){
        this.words = this.store.settings.words
    }
};
</script>
