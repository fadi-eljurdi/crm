<template>
    <section class="container">
        <div class="row">
            <h3 class="pop text-secondary fs-3">Add your custom links</h3>
            <p class="text-secondary fs-small">Expand your CRM functionality by adding custom links to your favorite tools and resources for enhanced productivity.</p>
        </div>
        <div class="row g-3">
            <div class="col-12 col-lg-5"><input v-model="link.text" type="text" class="form-control form-control-sm" placeholder="Link text"></div>
            <div class="col-12 col-lg-5"><input v-model="link.url" type="text" class="form-control form-control-sm" placeholder="Link url"></div>
            <div class="col-12 col-lg-2 d-flex align-items-center">
                <button class="flex-fill btn btn-primary btn-sm" @click="addLink" :disabled="spinner || onEdit">
                    
                    <span>Add link</span>
                </button>
            </div>
        </div>
        <progress v-if="spinner" style="width:100%;height:.5rem;" class="my-3"></progress>
        <hr v-else class="my-5">
        <div class="row">
            <h3 class="pop text-secondary fs-3">Remove links</h3>
            <p class="text-secondary fs-small">Keep your CRM organized and clutter-free by easily removing unwanted links that distract from your workflow.</p>
        </div>
        <div class="row g-3">
            <div class="col-12 col-lg-10">
                <select class="form-select form-select-sm" aria-label="Default select example" id="selectedLink">
                    <!-- <option selected>Select a link</option> -->
                    <option v-for="link in profile.links" selected :key="link" :value="link.text">{{link.text}}</option>
                </select>
            </div>
            <div class="col-12 col-lg-2 d-flex align-items-center">
                <button class="flex-fill btn btn-outline-danger btn-sm" @click="removeLink" :disabled="spinner">
                    <span>Remove Link</span>
                </button>
                <!-- <button class="flex-fill btn btn-outline-danger btn-sm" @click="removeLink" :disabled="spinner2">Remove</button> -->
            </div>
        </div>
       
    </section>
    
    <message v-show="store.showMessage" :title="store.theMessage">
        <button class="btn btn-outline-light btn-sm" @click="store.showMessage = !store.showMessage">close</button>
    </message>
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
            spinner2:false,
            profile:'',
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
            try{
                this.spinner = true
                const data = {
                    text:this.link.text,
                    url:this.link.url
                }
                var api = this.store.api
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
                    
                    this.profile.links.push(data)
                    this.spinner = false
                    this.store.alertMessage('Meshe l7al') 
                }else{
                    
                this.spinner = false
                this.store.alertMessage('Ma Meshe l7al')
                }
            }catch(err){
                console.log(err);
                this.spinner = false
                this.store.alertMessage('Ma Meshe l7al')
            }
       },
       async removeLink(){
        try{
            this.spinner = true
            const link = document.getElementById('selectedLink').value
            var api = this.store.api
            api += this.store.loginQuery()
            api += `&removeLink=1&linkText=${link}`
            var res = await fetch(api)
            res = await res.json()
            // console.log(res)
            if(res == '200'){
                //remove from client side
                this.profile.links = this.profile.links.filter(l=>l.text != link )
                this.spinner = false
                this.store.alertMessage('Meshe l7al')
            }else{
                
                this.spinner = false
                this.store.alertMessage('Mafe link aslan')
            }
        }catch(err){
            this.spinner = false
           console.log(err);
           this.store.alertMessage(err)
        }

       }
    },
    async mounted(){
        this.spinner = true
        this.profile = await this.store.getProfile()
        this.spinner = false
    }
}
</script>