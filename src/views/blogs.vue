<template>
    <section v-if="!preview" class="container">
        
        
        <div class="row">
            <h3 class="pop text-secondary fs-3">Create new blog</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        <div class="row my-3 px-3">
            <nav class="w-100 p-2 d-flex justify-content-between align-items-center font-monospace">
                <div class="d-flex gap-4">
                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">youtube_activity</span>
                    <button @click="addMedia('youtube')" class="btn btn-sm btn-outline-secondary d-none d-lg-block">+Youtube</button>

                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">add_photo_alternate</span>
                    <button @click="addMedia('image')" class="btn btn-sm btn-outline-secondary d-none d-lg-block">+Image</button>

                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">auto_awesome</span>
                    <button @click="preview = !preview" class="btn btn-sm btn-outline-secondary d-none d-lg-block">AI-Generator</button>

                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">preview</span>
                    <button class="btn btn-sm btn-outline-secondary d-none d-lg-block">Preview changes</button>
                </div>
                <span class="material-symbols-outlined d-block d-lg-none text-primary fs-3">upload</span>
                <button class="col-1 btn btn-sm btn-primary d-none d-lg-block">DEPLOY</button>
            </nav>
        </div>
        <progress v-if="spinner" style="width:100%;height:.5rem;" class="my-3"></progress>
        <hr v-else class="my-3">
        <section class="d-flex flex-column gap-2">
            
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Title</div>
                <div class="col-12 col-md-10"><input v-model="title" type="text" class="form-control"></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">SEO - Description</div>
                <div class="col-12 col-md-10"><textarea rows="3" type="text" class="form-control"></textarea></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">SEO - Keywords</div>
                <div class="col-12 col-md-10"><input type="text" class="form-control"></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Article</div>
                <div class="col-12 col-md-10">
                    <p contenteditable id="editor" class="form-control pop text-secondary" style="overflow: auto; resize: vertical; height: 200px;"></p>
                </div>
            </div>
        </section>
        {{mediaBox}}
    </section>
    <preview-changes v-else :media="mediaBox" :title="title"> <button class="btn btn-outline-secondary btn-sm" @click="preview = !preview">back</button> </preview-changes>
</template>
<script>

import {useProfile} from '../stores/profile'
import previewChanges from '../components/preview-changes.vue'
import Media from '../Media'
import utilities from '../utilities'
export default {
    components:{previewChanges},
    setup(){
        const store = useProfile()
        return {store}
    },
    data(){
        return{
            mediaBox:[],
            preview:false,
            title:'',
            spinner:false

        }
    },
    methods:{
        async addMedia(type){
            if(type == 'youtube'){
                const url = prompt('Enter the youtube URL')
                if(url !== null){
                    this.mediaBox.push(new Media('Youtube video','youtube',url))
                }else{
                    console.log('Invalid');
                }
            }else{
                // select image > base64 > host > get url
                var files = await utilities.openFiles() // we selected the files
                console.log(files)
                this.spinner = true
                var files64 = [];// turn to b64
                for(let i = 0 ; i < files.length ; i++){
                    files64.push({
                        alt:`JURDI-Image-${utilities.getCurrentDate()}`,
                        src64: await utilities.file64(files[i])
                    })
                }
                console.log(files64);
                // hosting images
                var api = this.store.api
                api += this.store.loginQuery()
                api += `&uploadImagesToDrive=1&folderId=1e2g3ajgOnFv4-sljLYqRTq9s-7GLPcgH`
                
                var urls = await utilities.hostImages(api,files64)
                console.log(urls)

                // pushing to media box

                for(let i = 0 ; i < urls.length ; i++){
                    this.mediaBox.push(new Media((urls[i].alt),'image',(urls[i].src)))
                }
                this.spinner = false
            }
        }
    },
    mounted(){

        
    }
}
</script>