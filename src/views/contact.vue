<template>
    <section class="container d-flex flex-column gap-2">
        <div class="row">
            <h3 class="pop text-primary fs-3">Manage your contact info</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Email</div>
            <div class="col-12 col-md-10"><input v-model="contact.email" type="email" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Number</div>
            <div class="col-12 col-md-10"><input v-model="contact.number"  type="number" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Whatsapp</div>
            <div class="col-12 col-md-10"><input v-model="contact.whatsapp"  type="url" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">LinkedIn</div>
            <div class="col-12 col-md-10"><input v-model="contact.linkedIn"  type="url" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Address</div>
            <div class="col-12 col-md-10"><input v-model="contact.address"  type="text" class="form-control"></div>
        </div>
        <div class="row">
            <div class="col-12 col-md-2 pb-2">Open hours</div>
            <div class="col-12 col-md-10"><input v-model="contact.openHours"  type="text" class="form-control"></div>
        </div>
        <div class="row justify-content-center my-3">
            <button :disabled="spinner" class="col-12 col-md-2 btn btn-primary btn-sm" @click="setContact">
                <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                <span v-else>Save changes</span>
            </button>
        </div>
        
    </section>
    <message v-show="showMessage" :title="alertMessage">
        <button class="btn btn-outline-light btn-sm" @click="showMessage = !showMessage">close</button>
    </message>
</template>
<script>
import message from '../components/message.vue'
import {useProfile} from '../stores/profile'
export default {
    setup(){
        const store = useProfile()
        return {store}
    },
    components:{message},
    data(){
        return{
            spinner:false,
            showMessage:false,
            alertMessage:'Meshe l7al',
            contact:{
                email:'',
                number:'',
                whatsapp:'',
                linkedIn:'',
                address:'',
                openHours:''
            }
        }
    },
    methods:{
        newMessage(title){
            this.showMessage = true
            this.alertMessage = title

        },
        async setContact(){
            try{
                
                this.spinner = true
                var api = this.store.api
                api += `${this.store.loginQuery()}&setContact=1`
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
                this.newMessage('Meshe l7al')
                this.spinner = false
            }catch(err){
                
                this.newMessage('No ma meshe l7al')
                this.spinner = false
            }
        }
    }
}
</script>