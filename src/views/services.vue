<template>
    <section class="container d-flex flex-column gap-2 my-5">
        
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
                <button :disabled="onEdit" @click="addService" class="w-100 btn btn-primary btn-sm">
                    <span class="spinner-grow spinner-grow-sm" v-if="spinner"></span>
                    <span v-else>save changes</span>
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
            onEdit:true,
            service:{
                title:'',
                description:'',
                thumbnail:'',
                url:''
            },
            profile:""
            
            
        }
    },
    watch:{
        service: {
            handler(newValue, oldValue) {
                // Note: `newValue` will be equal to `oldValue` here
                // on nested mutations as long as the object itself
                // hasn't been replaced.
                // alert(newValue)
                // console.log(newValue);
                const service={
                    title:'',
                    description:'',
                    thumbnail:'',
                    url:''
                }
                if(utilities.deepEqual(service,newValue)) this.onEdit = true
                else this.onEdit = false
            },
            deep: true
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
            this.store.alertMessage('Are you sure ?').setAction(async () => {
                try{
                    this.spinner = true
                    var api = this.store.api()
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
                        this.store.alertMessage('Meshe l7al').endAction()
                        this.spinner = false
                        this.profile.services.push(this.service)
                    }
                }catch(err){
                    console.log(err)
                    this.store.alertMessage('Ma meshe l7al').endAction()
                    this.spinner = false
                }
            })
        },
        
    }
}
</script>

