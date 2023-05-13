<template>
    <section class="container my-5 scale-up-center ">
        <div class="row">
            <h3 class="pop text-secondary fs-3">Update your terms</h3>
            <p class="text-secondary fs-small">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam vel quis facilis quos quas obcaecati!</p>
        
        </div>
        <div class="row justify-content-center g-3">
            <div class="col-12">
                <GrammarlyEditorPlugin clientId="client_6ew5WLrroWWr7Jv1eqyr91" class="w-100">
                    <p contenteditable id="terms-editor" class="form-control pop text-secondary py-3" style="overflow: auto; resize: vertical; min-height:400px;height:fit-content;" ></p>
                </GrammarlyEditorPlugin>
            </div>
            <div class="col-12 col-md-6 col-lg-2"><button @click="saveTerms" class="w-100 btn btn-sm btn-primary">save changes</button></div>
        </div>
    </section>
    <message v-show="store.showMessage" :title="store.theMessage" :callback="store.callback" :spinner="spinner"></message>

    <section v-if="spinner" class="w-100 h-100 position-fixed top-0 start-0 z-3 bg-glass d-flex justify-content-center align-items-center">
        <span class="spinner-grow"></span>
    </section>
</template>
<script>
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-vue'
import message from '../components/message.vue'
import {useProfile} from '../stores/profile'
import utilities from '../utilities.js'
import Terms from '../Terms'
export default {

    setup(){
        const store = useProfile()
        return {store}
    },
    components:{GrammarlyEditorPlugin,message},
    data(){
        return{
            utilities,
            spinner:false,
            terms:''
        }
    },
    
    beforeUnmount(){
        // save blog to local store
        this.store.terms = document.getElementById('terms-editor').innerText
    },
    methods:{
        saveTerms(){
            this.store.alertMessage(`Save terms to ${this.store.domain}`).setAction(async ()=>{
                try{
                    this.spinner = true
                    var terms = utilities.compile('terms-editor')
                    var repo = ()=>{
                        if(this.store.domain == 'www.jurdilaw.com') return 'LLC'
                        return 'app'
                    }
                    var page = new Terms(terms,this.store.domain).render()  
                    var res = await utilities.githubPush({
                        authToken:this.store.github,
                        owner:'fadi-eljurdi',
                        repo:repo(),
                        path:'terms.html',
                        message:'updated terms from crm',
                        newContent:utilities.text64(page),
                        sha:await utilities.getFileSha({
                            authToken:this.store.github,
                            owner:'fadi-eljurdi',
                            repo:repo(),
                            path:'terms.html',
                        })
                    })
                    this.spinner = false
                    this.store.alertMessage('Meshe l7al').endAction()
                }catch(err){
                    console.log(err);
                    this.spinner = false
                    this.store.alertMessage('Ma Meshe l7al').endAction()
                }
                
            })
        

        },
        getOldTerms(){
            this.spinner = true
            fetch('https://fadi-eljurdi.github.io/app/terms').then(res => res.text()).then(res => {
                // console.log(res);
                res = utilities.extractTextContent(res)
                document.getElementById('terms-editor').innerText = res
                this.spinner = false
                
            })
        }
        
    },
    mounted(){
        if(this.store.terms != ''){
            document.getElementById('terms-editor').innerText = this.store.terms
        }

    }
}
</script>
<style scoped>
#terms-editor{
    min-height: 2rem;
    height: fit-content;
    
}
</style>