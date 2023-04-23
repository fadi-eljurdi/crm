<template>
    <section class="container d-flex flex-column gap-2 mb-5">
        
        <div class="row">
            <h3 class="pop text-primary fs-3">Add new services</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
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
                <button class="w-100 btn btn-success btn-sm">save changes</button>
            </div>
        </div>

        
        <hr class="my-5">
        <div class="row">
            <h3 class="pop text-primary fs-3">Remove service</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
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
    </section>
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
            console.log(img64)
            img64 = await utilities.optimizeImageQuality(img64,0.7)
            this.service.thumbnail = img64
        }
    }
}
</script>

