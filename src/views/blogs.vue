<template>
    <section v-show="!preview" class="container">
        <div class="row">
            <h3 class="pop text-secondary fs-3">Create new blog</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        <div class="row my-3 px-3">
            <nav class="w-100 p-2 d-flex justify-content-between align-items-center font-monospace">
                <div class="d-flex gap-4">
                    <span @click="addMedia('youtube')" class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">youtube_activity</span>
                    <button @click="addMedia('youtube')" class="btn btn-sm btn-outline-secondary d-none d-lg-block">+Youtube</button>

                    <span @click="addMedia('image')" class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">add_photo_alternate</span>
                    <button @click="addMedia('image')" class="btn btn-sm btn-outline-secondary d-none d-lg-block">+Image</button>

                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">auto_awesome</span>
                    <button class="btn btn-sm btn-outline-secondary d-none d-lg-block">AI-Generator</button>

                    <span @click="previewBlog" class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">preview</span>
                    <button :disabled="spinner" @click="previewBlog" class="btn btn-sm btn-outline-secondary d-none d-lg-block">Preview changes</button>
                </div>
                <span class="material-symbols-outlined d-block d-lg-none text-primary fs-3">upload</span>
                <button @click="deploy" :disabled="spinner || !validateInput" class="col-1 btn btn-sm btn-primary d-none d-lg-block">DEPLOY</button>
            </nav>
        </div>
        <progress v-if="spinner" style="width:100%;height:.5rem;" class="my-3"></progress>
        <hr v-else class="my-3">
       
        <section class="d-flex flex-column gap-2">
            
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Thumbnail</div>
                <div class="col-12 col-md-10"><input accept="image/png, image/jpeg, image/jpeg" @change="generateThumbnail" type="file" class="form-control"></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Title</div>
                <div class="col-12 col-md-10"><input v-model="title" type="text" class="form-control" :class="{'is-invalid':(title.length == 0)}"></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">SEO - Description</div>
                <div class="col-12 col-md-10"><textarea v-model="seoDescription"  :class="{'is-invalid':(seoDescription.length == 0)}" rows="3" type="text" class="form-control"></textarea></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">SEO - Keywords</div>
                <div class="col-12 col-md-10"><input v-model="seoKeywords"  :class="{'is-invalid':(seoKeywords.length == 0)}" type="text" class="form-control"></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Article</div>
                <div class="col-12 col-md-10">
                    
                    <p contenteditable id="editor" class="form-control pop text-secondary" style="overflow: auto; resize: vertical; height: 200px;" ></p>
                    <!-- <textarea v-model="article" id="editor" class="form-control pop text-secondary" style="overflow: auto; resize: vertical; height: 200px;"></textarea> -->
                </div>
            </div>
        </section>
    </section>
    <section v-show="preview" class="container my-5">
        <div class="row justify-content-center">
            <figure class="col-12 col-lg-8">
                
                <div class="swiper w-100 h-100">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" style="height:fit-content;" v-for="m in mediaBox" :key="m">
                            <section class="ratio ratio-16x9" v-if="m.type == 'youtube'">
                                <iframe class="img-fluid object-fit-cover rounded" :src="`https://www.youtube.com/embed/${m.src}`" :title="m.alt" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                            </section>
                            <section v-if="m.type == 'image'" >
                                <div class="ratio ratio-16x9"> 
                                    <img :src="m.src" :alt="m.alt" class="img-fluid rounded object-fit-contain">
                                </div>
                            </section>
                        </div>
                    </div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-pagination"></div>
                </div>
            </figure>
        </div>
        <div class="row justify-content-center">
            <article  class="col-12 col-lg-8">
                <h1 class="text-primary fs-1">{{title}}</h1>
                <div id="blogArticle" class="text-secondary"></div>
            </article>
        </div>
        <div class="row justify-content-center my-5">
            <div class="col-12 col-lg-8">
                <button class="w-100 btn btn-secondary btn-sm" @click="preview = !preview">back</button>
            </div>
        </div>
    </section>
</template>
<script>

import {useProfile} from '../stores/profile'
import Media from '../Media'
import Blog from '../Blog'
import utilities from '../utilities.js'
export default {
    setup(){
        const store = useProfile()
        return {store}
    },
    data(){
        return{
            thumbnail:'',
            seoDescription:'...',
            seoKeywords:'...',
            quality:0.7,
            page:'',
            article:'',
            mediaBox:[],
            preview:false,
            title:'...',
            spinner:false,
            utilities,
            
        }
    },
    computed:{

        validateInput(){
            if(this.thumbnail && this.title && this.seoDescription && this.seoKeywords && (this.mediaBox.length > 0) && (document.getElementById('editor').innerText.length > 0)) return true
            return false
        },
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
                        src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]))
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
        },
        previewBlog(){
            this.preview = true
            console.log(document.getElementById('editor').innerText);
            utilities.parseHTML('blogArticle',utilities.compile('editor'))
        },
        async generateThumbnail(e){
            this.spinner = true
            var api = this.store.api
            api += this.store.loginQuery()
            api += `&uploadImagesToDrive=1&folderId=1Z73hzjMWM8U3tsuiULJP6UA1eQY_cHJV`
            var array = []
            array.push({
                alt:`JURDI-Thumbnail-${utilities.getCurrentDate()}`,
                src64: await utilities.optimizeImageQuality(await utilities.file64(e.target.files[0]))
            })
            var url = await utilities.hostImages(api,array)
            console.log(url);
            this.thumbnail = url[0].src
            this.spinner = false
        },
        async generateBlog(){
            const page = new Blog(this.title,JSON.stringify(this.mediaBox))
            page
            .setArticle(utilities.compile('editor'))
            .setIcon('https://picsum.photos/100')
            .setThubnail(this.thumbnail)
            .setSEO(this.seoDescription,this.seoKeywords)
            .generatePage()

            this.page = page.htmlPage
        },
        
        async githubPush(token, content, filename) {

            var data = JSON.stringify({
                "message": "html file",
                "content": `${content}`
            });

            var headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            var url = `https://api.github.com/repos/fadi-eljurdi/app/contents/blogs/${filename}.html`;

            var config = {
                method: 'PUT',
                headers: headers,
                body: data
            };

            var res = await fetch(url, config);
            var res = await res.json();
            console.log(res);
            // return data.content.sha;
        },
        async deploy(){
            this.spinner = true
            await this.generateBlog()
            await this.githubPush(this.store.token1,utilities.text64(this.page),(this.title.replaceAll(' ','-')))
            this.spinner = false
        }
    },
    mounted(){
        var swiper = new Swiper('.swiper', {
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            spaceBetween:20,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
        });
    }
}
</script>