<template>
    <section class="container scale-up-center ">
        <div class="row">
            <h3 class="pop text-secondary fs-3">DBL CLICK for termination</h3>
            <p class="text-secondary fs-small">Expand your CRM functionality by adding custom links to your favorite tools and resources for enhanced productivity.</p>
            <!-- <progress v-if="spinner" style="width:100%;height:.5rem;" class="my-3"></progress> -->
        </div>
    </section>
    
    <section class="container d-flex flex-column gap-3 my-5 scale-up-center ">
        
        <div class="row g-3">
            <div class="col-12"> <h5 class="pop text-secondary">Remove Links</h5> </div>
            <div v-for="link in profile.links" :key="link" class="col-12 col-md-6 col-lg-3 point">
                <div @dblclick="removeItem(link.text,'Links')" class="d-flex align-items-center gap-2 px-3 py-1 bg-light shadow-sm rounded ">
                    <span class="material-symbols-outlined text-primary">link</span>
                    <span class="text-secondary">{{link.text}}</span>
                </div>
            </div>
        </div>
        
        <div class="row g-3">
            <div class="col-12"> <h5 class="pop text-secondary">Remove Blogs</h5> </div>
            <div v-for="blog in profile.blogs" :key="blog" class="col-12 col-md-6 col-lg-3 point">
                <div title="double click to delete" @dblclick="removeItem(blog.title,'Blogs')" class="d-flex flex-column gap-2 bg-light shadow-sm rounded p-3">
                    <div class="ratio ratio-4x3">
                        <img :src="blog.thumbnail" :alt="blog.title" class="img-fluid object-fit-cover">
                    </div>
                    <h5 style="min-height:50px;" class="text-primary text-fade-2">{{blog.title}}</h5>
                    <p style="min-height:30px;" class="fs-small text-secondary text-fade-4 m-0">{{blog.description}}</p>
                    <hr>
                    <small class="text-secondary fs-xsmall">{{utilities.timo(blog.date)}} <i class="bi bi-dot"></i> <u @click="copyURL(blog.url)">COPY URL</u></small>
                    
                </div>
            </div>
        </div>
        <div class="row g-3">
            <div class="col-12"> <h5 class="pop text-secondary">Remove Services</h5> </div>
            <div v-for="service in profile.services" :key="service" class="col-12 col-md-6 col-lg-3 point">
                <div title="double click to delete" @dblclick="removeItem(service.title,'Services')" class="d-flex flex-column gap-2 bg-light shadow-sm rounded p-3">
                    <div class="ratio ratio-4x3">
                        <img :src="service.thumbnail" :alt="service.title" class="img-fluid object-fit-cover">
                    </div>
                    <h5 style="min-height:50px;" class="text-primary text-fade-2">{{service.title}}</h5>
                    <p style="min-height:30px;" class="fs-small text-secondary m-0 text-fade-4">{{service.description}}</p>
                    <hr>
                    <!-- <u class="fs-xsmall" @click="copyURL(service.url)">COPY URL</u> -->
                    <small class="text-secondary fs-xsmall">{{utilities.timo(service.date)}} <i class="bi bi-dot"></i> <u @click="copyURL(service.url)">COPY URL</u></small>

                </div>
            </div>
        </div>
        <div class="row g-3" v-show="profile.team">
            <div class="col-12"> <h5 class="pop text-secondary">Remove Teammate</h5> </div>
            <div v-for="t in profile.team" :key="t" class="col-12 col-md-6 col-lg-3 point">
                <div title="double click to delete" @dblclick="removeItem(t.name,'Team')" class="d-flex flex-column gap-2 bg-light shadow-sm rounded p-3">
                    <div class="ratio ratio-4x3">
                        <img :src="t.image" :alt="t.name" class="img-fluid object-fit-cover">
                    </div>
                    <h5 style="min-height:50px;" class="text-primary text-fade-2">{{t.name}} / {{t.job}}</h5>
                    <p style="min-height:30px;" class="fs-small text-secondary m-0 text-fade-4">{{t.bio}}</p>
                    
                </div>
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
    data(){
        return{
            utilities,
            profile:{},
            spinner:false,
            
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
                this.spinner = true
                this.profile = await this.store.getProfile()
                this.spinner = false
            },
            deep: true
        }
    },
    methods:{
        copyURL(url){
            navigator.clipboard.writeText(url)
            this.store.alertMessage('URL Copied successfuly')
        },
        removeItem(titleIndex,sheet){
            this.store.alertMessage(`Delete: ${titleIndex} ?`).setAction(async ()=>{
                this.spinner = true
                
                this.store.closeAction()
                try{
                    if(sheet == "Links"){
                        await this.removeItemFromSheets(titleIndex,sheet)
                        this.profile.links = this.profile.links.filter(l => l.text != titleIndex)
                        this.store.alertMessage('Meshe l7al').endAction()
                        this.spinner = false
                    }else{
                        if(sheet == 'Blogs'){
                            
                            // remove from github
                            var repo = "app"
                            if(this.store.domain == 'www.jurdilaw.com') repo = "LLC"
                            if(this.store.domain == 'www.incugamecon.media') repo = "igcdev"
                            await this.removePageFromGithub(repo,'blogs',utilities.titlePath(titleIndex),await this.getFileSha(repo,utilities.titlePath(titleIndex)))


                            // remove from sheets
                            await this.removeItemFromSheets(titleIndex,sheet)
                            this.profile.blogs = this.profile.blogs.filter(b => b.title != titleIndex)
                            this.store.alertMessage('Meshe l7al').endAction()
                            this.spinner = false
                        }else{
                            
                            if(sheet == 'Services'){
                                var repo = "app"
                                if(this.store.domain == 'www.jurdilaw.com') repo = "LLC"
                                if(this.store.domain == 'www.incugamecon.media') repo = "igcdev"
                                await this.removePageFromGithub(repo,'blogs',utilities.titlePath(titleIndex),await this.getFileSha(repo,utilities.titlePath(titleIndex)))

                                await this.removeItemFromSheets(titleIndex,sheet)
                                this.profile.services = this.profile.services.filter(s => s.title != titleIndex)
                                this.store.alertMessage('Meshe l7al').endAction()
                                this.spinner = false
                            }else {
                                
                                await this.removeItemFromSheets(titleIndex,sheet)
                                this.profile.team = this.profile.team.filter(s => s.name != titleIndex)
                                this.store.alertMessage('Meshe l7al').endAction()
                                this.spinner = false
                            }
                        }
                    }
                }catch(err){
                    this.spinner = false
                    console.log(err);
                    this.store.alertMessage(err)
                }
            })
        },
        removeItemFromSheets(titleIndex,sheet){
            console.log(titleIndex);
            console.log(sheet);
            return new Promise((resolve,reject)=>{
                try{
                //    var api = this.store.apiQuery()
                    var api = this.store.api()
                    api += this.store.loginQuery()
                    api += `&removeItem=1`
                    fetch(api,{
                        method:"POST",
                        headers:{
                            "Content-Type":"text/plain"
                        },
                        body:JSON.stringify({
                            titleIndex,
                            sheet
                        })
                    }).then(res=>res.json()).then(res=>{
                        if(res == '200') resolve(res)
                        reject(res)
                    })
                }catch(err){
                   console.log(err);
                   reject(err)

                }
            })
        },
        
        getFileSha(repo,path) {

            return new Promise((resolve,reject) => {
                
                fetch(`https://api.github.com/repos/fadi-eljurdi/${repo}/contents/blogs/${path}.html`,{
                headers:{
                    'Authorization': `Bearer ${this.store.github}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github.v3+json'
                }
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    resolve(res.sha)
                }).catch(err=>{
                    console.log(err);
                    reject(err)
                })
                
            })
        },
        async removePageFromGithub(repo,folder,path, sha) {
            return new Promise((resolve,reject)=>{        
                var data = {
                    message: 'Delete file',
                    branch: "main", // The branch from which you want to delete the file
                    sha: sha // The SHA of the file you want to delete (can be obtained using the GET /repos/:owner/:repo/contents/:path endpoint)
                }
                fetch(`https://api.github.com/repos/fadi-eljurdi/${repo}/contents/${folder}/${path}.html`,{
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${this.store.github}`,
                        'Content-Type': 'application/json',
                        'Accept': 'application/vnd.github.v3+json'
                    },
                    body: JSON.stringify(data)
                }).then(res => res.json()).then(res => {
                    console.log(res);
                    resolve(res)
                }).catch(err=>{
                    console.log(err);
                    reject(err)
                })
                
            })
        },
    },
    components:{message},
    async mounted(){
        this.spinner = true
        this.profile = await this.store.getProfile()
        this.spinner = false

        // console.log(await utilities.getFileSha('app','Patents-and-Trademarks-for-Developers'));
    }
}
</script>