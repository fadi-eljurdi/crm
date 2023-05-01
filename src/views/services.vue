<template>
    <section class="container d-flex flex-column gap-2 mb-5">

        
        <div class="row">
            <h3 class="pop text-secondary fs-3">Remove service</h3>
            <p class="text-secondary fs-small">Streamline your service offerings and optimize your business by easily removing outdated or redundant services from your CRM.</p>
        </div>
        <div class="row g-3">
            <div class="col-12 col-lg-10">
                <select class="form-select form-select-sm" aria-label="Default select example" id="selectedService">
                    <option selected>Select a service</option>
                    <option v-for="s in profile.services" :key="s" :value="s.title">{{s.title}}</option>
                </select>
            </div>
            <div class="col-12 col-lg-2 d-flex align-items-center">
                <button class="flex-fill btn btn-outline-danger btn-sm" @click="removeService" :disabled="spinner2">
                    <span v-if="spinner2" class="spinner-grow spinner-grow-sm"></span>
                    <span v-else>Remove Link</span>
                </button>
                <!-- <button class="flex-fill btn btn-outline-danger btn-sm" @click="removeLink" :disabled="spinner2">Remove</button> -->
            </div>
        </div>
        
        <hr class="my-3">
        
        <div class="row">
            <h3 class="pop text-secondary fs-3">Add new services</h3>
            <p class="text-secondary fs-small">Stay ahead of the competition by adding new and innovative services to your CRM platform and staying ahead of industry trends.</p>
        </div>
        
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Title</div>
            <div class="col-12 col-md-10"><input v-model="service.title" type="text" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Description</div>
            <div class="col-12 col-md-10"><textarea v-model="service.description" rows="3" type="text" class="form-control"></textarea></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Thumbnail</div>
            <div class="col-12 col-md-10"><input @change="uploadThumbnail" type="file" id="service-thumbnail" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">URL</div>
            <div class="col-12 col-md-10"><input v-model="service.url" type="url" class="form-control"></div>
        </div>
        <div class="row justify-content-center mt-3">
            <div class="col-12 col-md-2">
                <button @click="addService" class="w-100 btn btn-success btn-sm">
                    <span class="spinner-grow spinner-grow-sm" v-if="spinner"></span>
                    <span v-else>save changes</span>
                </button>
            </div>
        </div>

        
    </section>
    <message v-if="showMessage" :title="alertMessage"> <i class="bi bi-x-lg text-light fs-5 point" @click="showMessage = !showMessage"></i> </message>
</template>
<script>
import message from '../components/message.vue'
import {useProfile} from '../stores/profile'
import utilities from '../utilities'
export default {
    
    setup(){
        const store = useProfile()
        return {store}
    },
    components:{message},
    data(){
        return{
            spinner:false,
            spinner2:false,
            showMessage:false,
            alertMessage:'Meshe l7al',
            service:{
                title:'',
                description:'',
                thumbnail:'',
                url:''
            },
            profile:""
            
            
        }
    },
    async mounted(){
        this.profile = await this.store.getProfile()
    },
    methods:{
        async uploadThumbnail(e){
            // console.log(e.target.files[0])
            var img64 = await utilities.file64(e.target.files[0])
            
            img64 = await utilities.optimizeImageQuality(img64,0.7)
            // console.log(img64)
            this.service.thumbnail = img64
        },
        async addService(){
            try{
                this.spinner = true
                var api = this.store.api
                api += this.store.loginQuery()
                api += `&addService=1`

                var res = await fetch(api,{
                    method:'POST',
                    headers:{
                        "Content-Type":"text/plain"
                    },
                    body:JSON.stringify(this.service)
                })

                res = await res.json()
                console.log(res)
                if(res == '201'){
                    this.showMessage = true
                    this.alertMessage = 'meshe l7al'
                    this.spinner = false
                    this.profile.services.push(this.service)
                }
            }catch(err){
                console.log(err)
                    this.showMessage = true
                    this.alertMessage = 'ma meshe l7al'
                    this.spinner = false
            }
        },

        async removeService(){
            var title = document.getElementById('selectedService').value
            try{
                
                this.spinner2 = true
                var api = this.store.api
                api += this.store.loginQuery()
                api += `&removeService=1&title=${title}`

                var res = await fetch(api)
                // console.log(res)
                res = await res.json()
                if(res == '200'){
                    this.spinner2 = false
                    this.showMessage = true
                    this.alertMessage = 'meshe l7al'
                    // remove from list
                    this.profile.services = this.profile.services.filter(s => s.title != title)
                }
            }catch(err){
                console.log(err)
                this.spinner2 = false
                this.showMessage = true
                this.alertMessage = 'ma meshe l7al'

            }
            
        }
    }
}
</script>

