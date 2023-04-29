<template>
  <section class="w-100 h-100 bg-light position-fixed top-0 start-0 z-3">
    <section class="container my-5  d-flex flex-column gap-5">
      <div class="row">
        <div class="col-12">
            <h3 class="pop text-secondary fs-3">Settings</h3>
            <p class="text-secondary fs-small">
            Our platform offers an easy and seamless way to manage your contact
            information, ensuring that you're always up-to-date and never miss out
            on important opportunities.
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
                <input class="form-check-input" type="checkbox" value="" >
                <label class="form-check-label" for="flexCheckDefault">
                    useYoutubeTitle
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value=""  >
                <label class="form-check-label" for="flexCheckChecked">
                    useYoutubeCaptions
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value=""  >
                <label class="form-check-label" for="flexCheckChecked">
                    useYoutubeDescription
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="">
                <label class="form-check-label" for="flexCheckChecked">
                    generateTitle
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="">
                <label class="form-check-label" for="flexCheckChecked">
                    generateSEOKeywords
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="">
                <label class="form-check-label" for="flexCheckChecked">
                    generateSEODescription
                </label>
            </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-6 col-lg-2">
            <button class="w-100 btn btn-sm btn-success">save changes</button>
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
            words:'100'
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
        }
    }
};
</script>
