<template>
    <section class="container d-flex flex-column gap-2 my-5 scale-up-center ">
        
        
        <div class="row">
            <h3 class="pop text-secondary fs-3">Manage your profile</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        
        <div class="row">
            <div class="col-12 col-md-2 pb-2">New Logo</div>
            <div class="col-12 col-md-10 d-flex flex-column gap-2">
                <img v-show="contact.logo" :src="contact.logo" alt="logo" class="img-fluid object-fit-cover rounded" width="100">
                <input type="file" @change="uploadLogo" accept="Image/png,Image/jpeg,Image/jpg" class="form-control">
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Youtube video URL</div>
            <div class="col-12 col-md-10 d-flex flex-column gap-2">
                <input type="text" class="form-control" v-model="contact.video">
            </div>
        </div>
        
        <hr class="my-3">
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Main Heading</div>
            <div class="col-12 col-md-10"><textarea v-model="contact.heading" class="form-control"></textarea></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Main Bio</div>
            <div class="col-12 col-md-10"><textarea v-model="contact.bio" class="form-control"></textarea></div>
        </div>
        <progress v-if="spinner" style="width:100%;height:.5rem;" class="my-3"></progress>
        <hr v-else class="my-3">
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Services Heading</div>
            <div class="col-12 col-md-10"><textarea v-model="contact.sHeading" class="form-control"></textarea></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Services Tagline</div>
            <div class="col-12 col-md-10"><textarea v-model="contact.sTagline" class="form-control"></textarea></div>
        </div>
        
        <hr class="my-3">
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Blogs Heading</div>
            <div class="col-12 col-md-10"><textarea v-model="contact.bHeading" class="form-control"></textarea></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Blogs Tagline</div>
            <div class="col-12 col-md-10"><textarea v-model="contact.bTagline" class="form-control"></textarea></div>
        </div>
        <hr class="my-3">

        <div class="row">
            <div class="col-12 col-md-2 pb-2">Email</div>
            <div class="col-12 col-md-10"><input v-model="contact.email" type="email" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Number</div>
            <div class="col-12 col-md-10"><input v-model="contact.number"  type="number" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Whatsapp ( without + )</div>
            <div class="col-12 col-md-10"><input v-model="contact.whatsapp"  type="url" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">LinkedIn URL</div>
            <div class="col-12 col-md-10"><input v-model="contact.linkedIn"  type="url" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Address</div>
            <div class="col-12 col-md-10"><input v-model="contact.address"  type="text" class="form-control"></div>
        </div>
        <div class="row justify-content-center my-3">
            <div class="col-12 col-md-2">
                <button :disabled="spinner || onEdit" class="w-100 btn btn-primary btn-sm" @click="save">
                    <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                    <span v-else>Save changes</span>
                </button>
            </div>
        </div>
        
    </section>
    <message v-show="store.showMessage" :title="store.theMessage" :callback="store.callback" :spinner="spinner">
        <button class="btn btn-outline-light btn-sm" @click="store.showMessage = !store.showMessage">close</button>
    </message>

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
            contact:{
                email:'',
                number:'',
                whatsapp:'',
                linkedIn:'',
                address:'',
                logo:'',
                heading:'',
                bio:'',
                video:'',
                bHeading:'',
                bTagline:'',
                sHeading:'',
                sTagline:''
            }
        }
    },
    watch:{
        contact: {
            handler(newValue, oldValue) {
                // Note: `newValue` will be equal to `oldValue` here
                // on nested mutations as long as the object itself
                // hasn't been replaced.
                const contact = {
                    email:'',
                    number:'',
                    whatsapp:'',
                    linkedIn:'',
                    address:'',
                    logo:false,
                    heading:'',
                    bio:'',
                    video:'',
                    bHeading:'',
                    bTagline:'',
                    sHeading:'',
                    sTagline:''
                }
                if(utilities.deepEqual(contact,newValue)) this.onEdit = true
                else this.onEdit = false
                
                
            },
            deep: true
        }
    },
    computed:{
        video(){
            if(this.contact.video != ''){
                try{
                   return utilities.convertGoogleDriveLink(this.contact.video == '' ? '' : this.contact.video)
                }catch(err){
                   console.log(err);
                   this.store.alertMessage('Invalid Drive URL')
                }
            }
            // return utilities.convertGoogleDriveLink(this.contact.video)
        }
    },
    methods:{
        save(){
            
            this.store.alertMessage(`Save to ${this.store.domain}`).setAction(async ()=>{
                await this.setProfile()
                this.store.endAction()
            })
        },
        async setProfile(){
            try{
                
                this.spinner = true
                this.store.closeAction()
                var api = this.store.api()
                api += `${this.store.loginQuery()}&setContact=1`
                // if(this.contact.video){
                //     this.contact.video = this.utilities.convertGoogleDriveLink(this.contact.video)
                // }
                // console.log(this.contact.video);
                var data = JSON.stringify(this.contact)
                var res = await fetch(api,{
                    method:'POST',
                    headers:{
                        "Content-Type":"text/plain"
                    },
                    body:data
                })

                res = await res.json()
                // console.log(res)
                this.store.alertMessage('Meshe l7al')
                this.spinner = false
            }catch(err){
                
                this.store.alertMessage('Ma Meshe l7al')
                this.spinner = false
            }
        },
        async uploadLogo(e){
            var files = e.target.files
            this.spinner = true
            var files64 = [];// turn to b64
            for(let i = 0 ; i < files.length ; i++){
                files64.push({
                    alt:`JURDI-Logo-${utilities.getCurrentDate()}`,
                    src64: await utilities.file64(files[i])
                    // src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]),this.store.quality)
                })
            }
            // hosting images
            var api = this.store.api()
            api += this.store.loginQuery()
            api += `&uploadImagesToDrive=1&folderId=${utilities.getFolderId(this.store.domain,'thumbnail')}`
            
            var urls = await utilities.hostImages(api,files64)
            this.spinner = false
            this.contact.logo = urls[0].src
        },
    },
    mounted(){
        // console.log(utilities.convertGoogleDriveLink('https://drive.google.com/file/d/1-72u4014iEOirq5ewLn7lcc_E2H2JyKb/view?usp=share_link'));
    }
}
</script>