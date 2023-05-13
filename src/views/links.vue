<template>
    <section class="container my-5 scale-up-center ">
        <div class="row">
            <h3 class="pop text-secondary fs-3">Add your custom links</h3>
            <p class="text-secondary fs-small">Expand your CRM functionality by adding custom links to your favorite tools and resources for enhanced productivity.</p>
        </div>
        <div class="row g-3">
            <div class="col-12 col-lg-5"><input v-model="link.text" type="text" class="form-control form-control-sm" placeholder="Link text"></div>
            <div class="col-12 col-lg-5"><input v-model="link.url" type="text" class="form-control form-control-sm" placeholder="http://"></div>
            <div class="col-12 col-lg-2 d-flex align-items-center">
                <button class="flex-fill btn btn-primary btn-sm" @click="addLink" :disabled="spinner || onEdit">
                    
                    <span>Add link</span>
                </button>
            </div>
        </div>
       
    </section>
    
    
    <message v-show="store.showMessage" :title="store.theMessage" :callback="store.callback" :spinner="spinner">
        <button class="btn btn-outline-light btn-sm" @click="store.showMessage = !store.showMessage">close</button>
    </message>
    <section v-if="spinner" class="w-100 h-100 position-fixed top-0 start-0 z-3 bg-glass d-flex justify-content-center align-items-center">
        <span class="spinner-grow"></span>
    </section>
</template>
<script>

import message from '../components/message.vue'
import utilities from '../utilities.js'
import {useProfile} from '../stores/profile'
export default {
    setup(){
        const store = useProfile()
        return {store}
    },
    
    components:{message},
    data(){
        return{
            utilities,
            link:{
                text:'',
                url:''
            },
            spinner:false,
            onEdit:true
            
        }
    },
    watch:{
        link: {
            handler(newValue, oldValue) {
                // Note: `newValue` will be equal to `oldValue` here
                // on nested mutations as long as the object itself
                // hasn't been replaced.
                const link={
                    text:'',
                    url:''
                }
                if(utilities.deepEqual(link,newValue)) this.onEdit = true
                else this.onEdit = false
            },
            deep: true
        }
    },
    methods:{
       async addLink(){
        this.store.alertMessage(`Add to ${this.store.domain}`).setAction(async ()=>{
            try{
                    this.spinner = true
                    const data = {
                        text:this.link.text,
                        url:`http://${this.link.url}`
                    }
                    var api = this.store.api()
                    api += this.store.loginQuery()
                    api += `&addLink=1`
                    var res = await fetch(api,{
                        method:'POST',
                        headers:{
                            "Content-Type":"text/plain"
                        },
                        body:JSON.stringify(data)

                    })

                    res = await res.json()
                    console.log(res)
                    if(res == '200'){
                        this.spinner = false
                        this.store.alertMessage('Meshe l7al').endAction()
                    }else{
                        
                        this.spinner = false
                        this.store.alertMessage('Ma Meshe l7al').endAction()
                    }
                }catch(err){
                    console.log(err);
                    this.spinner = false
                    this.store.alertMessage('Ma Meshe l7al').endAction()
                }
            })
       },
    },
}
</script>