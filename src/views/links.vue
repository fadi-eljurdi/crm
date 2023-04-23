<template>
    <section class="container">
        <div class="row">
            <h3 class="pop text-primary fs-3">Add your custom links</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        <div class="row g-3">
            <div class="col-12 col-lg-5"><input v-model="link.text" type="text" class="form-control form-control-sm" placeholder="Link text"></div>
            <div class="col-12 col-lg-5"><input v-model="link.url" type="text" class="form-control form-control-sm" placeholder="Link url"></div>
            <div class="col-12 col-lg-2 d-flex align-items-center">
                <button class="flex-fill btn btn-primary btn-sm" @click="addLink" :disabled="spinner">
                    <span v-if="spinner" class="spinner-grow spinner-grow-sm"></span>
                    <span v-else>Add link</span>
                </button>
            </div>
        </div>
        <hr class="my-5">
        <div class="row">
            <h3 class="pop text-primary fs-3">Remove links</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        <div class="row g-3">
            <div class="col-12 col-lg-10">
                <select class="form-select form-select-sm" aria-label="Default select example" id="selectedLink">
                    <option selected>Select a link</option>
                    <option v-for="link in profile.links" :key="link" :value="link.text">{{link.text}}</option>
                </select>
            </div>
            <div class="col-12 col-lg-2 d-flex align-items-center">
                <button class="flex-fill btn btn-outline-danger btn-sm" @click="removeLink" :disabled="spinner2">
                    <span v-if="spinner2" class="spinner-grow spinner-grow-sm"></span>
                    <span v-else>Remove Link</span>
                </button>
                <!-- <button class="flex-fill btn btn-outline-danger btn-sm" @click="removeLink" :disabled="spinner2">Remove</button> -->
            </div>
        </div>
       
    </section>
</template>
<script>
import utilities from '../utilities.js'
import {useProfile} from '../stores/profile'
export default {
    setup(){
        const store = useProfile()
        return {store}
    },
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
            
        }
    },
    methods:{
       async addLink(){
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
        this.profile.links.push(data)
        this.spinner = false
       },
       async removeLink(){
        this.spinner2 = true
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
            this.spinner2 = false

        }

       }
    },
    async mounted(){
        this.profile = await this.store.getProfile()
    }
}
</script>