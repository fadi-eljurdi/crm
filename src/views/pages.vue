<template>
  <section class="container scale-up-center">
    <div class="row gap-2">
        <div class="col-12">
            <h3 class="pop text-secondary fs-3">Manage your pages</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your policies and terms information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        
        <div class="col-12">
          <div class="input-group">
            <select class="form-select" v-model="path">
              <option value="terms">Terms</option>
              <option value="privacy-policy">Privacy-policy</option>
              <option value="acceptable-usage">Acceptable-Usage</option>
              <option value="disclaimer">Disclaimer</option>
              <option value="cookie-policy">Cookie Policy</option>
            </select>
            <button class="btn btn-sm btn-primary" @click="savePage">Save page</button>
          </div>
        </div>
        
        <div class="col-12">
          <GrammarlyEditorPlugin clientId="client_6ew5WLrroWWr7Jv1eqyr91" class="w-100">
              <p contenteditable id="page-editor" class="form-control pop text-secondary py-3" style="overflow: auto; resize: vertical; min-height:400px;height:fit-content;" >paste the termly code snippet here ...</p>
          </GrammarlyEditorPlugin>
        </div>
    </div>
    

  </section>

  <section v-if="spinner" class="w-100 h-100 position-fixed top-0 start-0 z-3 bg-glass d-flex justify-content-center align-items-center">
      <span class="spinner-grow"></span>
  </section>
  <message v-show="store.showMessage" :title="store.theMessage" :callback="store.callback" :spinner="spinner"></message>
</template>
<script>
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-vue'
import message from '../components/message.vue'
import {useProfile} from '../stores/profile'
import utilities from '../utilities.js'
import CustomPage from '../CustomPage'
export default {
  setup(){
      const store = useProfile()
      return {store}
  },
  components:{GrammarlyEditorPlugin,message},
  data(){
    return{
      template:'',
      spinner:false,
      content:'',
      path:'terms'
    }
  },
  computed:{
    domain(){
        return this.store.domain
    },
  },
  watch:{
    domain: {
        async handler(newValue, oldValue) {
            // alert(this.store.domain)
            // this.spinner = true
            this.template = await utilities.fetchTemplate(this.store.domain == 'www.jurdilaw.com' ? 'https://fadi-eljurdi.github.io/LLC/custom-page.html' : 'https://fadi-eljurdi.github.io/app/custom-page.html')
            // this.spinner = false
        },
        deep: true
    }
  },
  methods:{
    // get template
    // compile content
    // generate page
    // push to github
    async savePage(){
      this.store.alertMessage(`save to ${this.domain}`).setAction(async () => {
        try{
          
          this.spinner = true
          this.store.closeAction()
          // this.content = utilities.compile('page-editor')
          this.content = document.getElementById('page-editor').innerText
          var page = new CustomPage(this.content,this.template).render()
          // console.log(page);
          await utilities.githubPush({
            authToken:this.store.github,
            owner:'fadi-eljurdi',
            repo: this.store.domain == 'www.jurdilaw.com' ? 'LLC' : 'app',
            path:`${this.path}.html`,
            message:`modified ${this.path}.html from crm`,
            newContent:utilities.text64(page),
            sha: await utilities.getFileSha({
              
              authToken:this.store.github,
              owner:'fadi-eljurdi',
              repo: this.store.domain == 'www.jurdilaw.com' ? 'LLC' : 'app',
              path:`${this.path}.html`,
            })
          })
          this.spinner = false
          this.store.alertMessage('Meshe l7al').endAction()
        }catch(err){
          this.spinner = false
          console.log(err);
          this.store.alertMessage(`Something wrong happened : ${err}`).endAction()
        }
      })
      
    }
  },
  async mounted(){
    this.template = await utilities.fetchTemplate(this.store.domain == 'www.jurdilaw.com' ? 'https://fadi-eljurdi.github.io/LLC/custom-page.html' : 'https://fadi-eljurdi.github.io/app/custom-page.html')
    var editor = document.getElementById('page-editor')
    editor.addEventListener('paste',e=>{
      e.preventDefault()
      editor.innerText += e.clipboardData.getData('text/plain')
    })
  }
}
</script>
<style scoped>
#page-editor{
  min-height: 2rem;
  height: fit-content;
    
}
</style>
