<template>
    <section v-show="!preview" class="container">
        <div class="row">
            <h3 class="pop text-secondary fs-3">Create new blog</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        <div class="row my-3">
            <nav class="w-100 py-2 d-flex justify-content-between align-items-center font-monospace">
                <div class="d-flex gap-4">
                                        
                    <button @click="addMedia('youtube')" :disabled="spinner" class="btn btn-sm btn-outline-danger d-flex justify-content-center align-items-center d-lg-none">
                        <span class="material-symbols-outlined fs-3">youtube_activity</span>
                    </button>
                    <button @click="addMedia('youtube')" class="btn btn-sm btn-outline-danger d-none d-lg-block">+Youtube</button>


                    <button @click="addMedia('image')" :disabled="spinner" class="btn btn-sm btn-outline-info d-flex justify-content-center align-items-center d-lg-none">
                        <span class="material-symbols-outlined fs-3">add_photo_alternate</span>
                    </button>
                    <button @click="addMedia('image')" class="btn btn-sm btn-outline-info d-none d-lg-block">+Image</button>


                    <button @click="generateContent" :disabled="spinner" class="btn btn-sm btn-outline-success d-flex justify-content-center align-items-center d-lg-none">
                        <!-- <span v-if="gptSpinner" class="spinner spinner-grow spinner-grow-sm"></span> -->
                        <span class="material-symbols-outlined fs-3">auto_awesome</span>
                    </button>
                    <button @click="generateContent" class="btn btn-sm btn-outline-success d-none d-lg-block">AI-Generator</button>


                    <button @click="previewBlog" :disabled="spinner" class="btn btn-sm btn-outline-primary d-flex justify-content-center align-items-center d-lg-none">
                        <span class="material-symbols-outlined fs-3">preview</span>
                    </button>
                    <button :disabled="spinner" @click="previewBlog" class="btn btn-sm btn-outline-primary d-none d-lg-block">Preview changes</button>
                

                    <button @click="showSettings = !showSettings" :disabled="spinner" class="btn btn-sm btn-outline-secondary d-flex justify-content-center align-items-center d-lg-none"><span class="material-symbols-outlined fs-3">settings</span></button>
                    <button @click="showSettings = !showSettings" :disabled="spinner" class="btn btn-sm btn-outline-secondary d-none d-lg-block">Settings</button>

                </div>
                
                <button @click="deploy" :disabled="spinner || !validateInput" class="btn btn-sm btn-primary d-flex justify-content-center align-items-center d-lg-none"><span class="material-symbols-outlined fs-3">upload</span></button>
                <button @click="deploy" :disabled="spinner || !validateInput" class="col-1 btn btn-sm btn-primary d-none d-lg-block">DEPLOY</button>
                
            </nav>
        </div>

        <progress v-if="spinner" style="width:100%;height:.5rem;" class="my-3"></progress>
        <hr v-else class="my-3">
       
        <section class="d-flex flex-column gap-2">
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Media</div>
                <div class="col-12 col-md-10 d-flex flex-wrap gap-2">
                    <div style="width:100px" v-for="m in store.blog.mediaBox" :key="m" @dblclick="mediaPop(m)">
                        <section class="ratio ratio-16x9" v-if="m.type == 'youtube'">
                            <img :src="`https://img.youtube.com/vi/${m.src}/maxresdefault.jpg`" alt="youtube" class="img-fluid object-fit-cover" >
                        </section>
                        <section v-if="m.type == 'image'" >
                            <div class="ratio ratio-16x9"> 
                                <img :src="m.src" :alt="m.alt" class="img-fluid rounded object-fit-cover">
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Domain</div>
                <div class="col-12 col-md-10">
                    <select class="form-select" aria-label="Default select example">
                        <option value="jurdiconsult.media" selected>Jurdiconsult.media</option>
                        <option value="jurdilaw.com">Jurdilaw.com</option>
                        <option value="both">Both</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Thumbnail</div>
                <div class="col-12 col-md-10 d-flex flex-column gap-2">
                    <div style="width:100px" v-if="store.blog.thumbnail">
                        <div class="ratio ratio-16x9" >
                            <img :src="store.blog.thumbnail" alt="thumbnail" class="img-fluid object-fit-cover">
                        </div>
                    </div>
                    <input accept="image/png, image/jpeg, image/jpeg" @change="generateThumbnail" type="file" class="form-control">
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Title</div>
                <div class="col-12 col-md-10"><input v-model="store.blog.title" type="text" class="form-control"></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">SEO - Description</div>
                <div class="col-12 col-md-10"><textarea v-model="store.blog.seoDescription" rows="3" type="text" class="form-control"></textarea></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">SEO - Keywords</div>
                <div class="col-12 col-md-10"><input v-model="store.blog.seoKeywords" type="text" class="form-control"></div>
            </div>
            <div class="row mb-5">
                <div class="col-12 col-md-2 pb-2">Article</div>
                <div class="col-12 col-md-10">
                    
                    <p contenteditable id="editor" class="form-control pop text-secondary" style="overflow: auto; resize: vertical; height: 500px;" ></p>
                    <!-- <textarea v-model="article" id="editor" class="form-control pop text-secondary" style="overflow: auto; resize: vertical; height: 200px;"></textarea> -->
                </div>
            </div>
        </section>
        <settings v-if="showSettings"><button class="w-100 btn btn-sm btn-outline-secondary" @click="showSettings = !showSettings">back</button></settings>
    </section>
    <section v-show="preview" class="container my-5">
        <div class="row justify-content-center">
            <figure class="col-12 col-lg-8">
                
                <div class="swiper w-100 h-100">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" style="height:fit-content;" v-for="m in store.blog.mediaBox" :key="m">
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
                    
                            <!-- <i class="bi bi-trash"></i> -->
                </div>
            </figure>
        </div>
        <div class="row justify-content-center">
            <article  class="col-12 col-lg-8">
                <h1 class="text-primary fs-1">{{store.blog.title}}</h1>
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
import settings from '../components/settings.vue'
export default {
    setup(){
        const store = useProfile()
        return {store}
    },
    components:{settings},
    data(){
        return{
            page:'',
            preview:false,
            spinner:false,
            utilities,
            showSettings:false
            
        }
    },
    computed:{

        validateInput(){
            if(this.store.blog.thumbnail && this.store.blog.title && this.store.blog.seoDescription && this.store.blog.seoKeywords && (this.store.blog.mediaBox.length > 0) && (document.getElementById('editor').innerText.length > 0)) return true
            return false
        },
    },
    methods:{
        async addMedia(type){
            if(type == 'youtube'){
                const url = prompt('Enter the youtube URL')
                if(url !== null){
                    this.store.blog.mediaBox.push(new Media('Youtube video','youtube',url))
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
                        src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]),this.store.quality)
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
                    this.store.blog.mediaBox.push(new Media((urls[i].alt),'image',(urls[i].src)))
                }
                this.spinner = false
            }
        },
        previewBlog(){
            this.preview = true
            // console.log(document.getElementById('editor').innerText);
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
                src64: await utilities.optimizeImageQuality(await utilities.file64(e.target.files[0]),this.store.quality)
            })
            var url = await utilities.hostImages(api,array)
            console.log(url);
            this.store.blog.thumbnail = url[0].src
            this.spinner = false
        },
        async generateBlog(){
            const page = new Blog(this.store.blog.title,JSON.stringify(this.store.blog.mediaBox))
            page
            .setArticle(utilities.compile('editor'))
            .setIcon('https://picsum.photos/100')
            .setThubnail(this.store.blog.thumbnail)
            .setSEO(this.store.blog.seoDescription,this.store.blog.seoKeywords)
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
            await this.githubPush(this.store.github,utilities.text64(this.page),(this.title.replaceAll(' ','-')))
            this.spinner = false
        },
        mediaPop(m){
            this.store.blog.mediaBox = this.store.blog.mediaBox.filter(media => m.src != media.src)
        },

        textCortext(){
            // this.spinner = true
            var data = {
                max_tokens:256,
                model:'velox-1',
                n:1,
                source_lang:'en',
                target_lang:'en',
                temperature:0.7,
                text:`generate a blog about "${this.store.blog.title}" considering these rules [about 500 words, formal]`
            }
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer gAAAAABkSU9HeA3Ll1dWuF4IIp0sY11mSN1flxIvRyY1wF_UqWM7V8v3dCEbnXOIiA1ujy35Tyhku1AUAIZhKAyaCX4tL71b5kqQoK6W5Vul2tfKGEos9rbrikwtVZFw-9C9uPSWjUTt'
                },
                body: JSON.stringify(data)
            };

            fetch('https://api.textcortex.com/v1/texts/expansions', options)
            .then(response => response.json())
            .then(res => {
                console.log(res);
                console.log(res.data.outputs[0].text);
                this.store.blog.article = res.data.outputs[0].text
            })
            .catch(err => console.error(err));
        },

        generateContent(){
            this.spinner = true
            const OPENAI_API_KEY = this.store.gptToken
            fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + OPENAI_API_KEY
                },
                body: JSON.stringify({
                    "model": "gpt-3.5-turbo",
                    "messages": [{ "role": "user", "content": `generate a blog about "${this.store.blog.title}" considering these rules "formal, about 500 words"` }]
                })
            })
            .then(response => response.json())
            .then(data => {
                // Do something with the response data
                console.log(data);
                document.getElementById('editor').innerText = data.choices[0].message.content
                this.store.blog.article += data.choices[0].message.content
                this.spinner = false
            })
            .catch(error => {
                console.error(error)
                this.spinner = false
            });
        }
    },
    beforeUnmount(){
        // save blog to local store
        this.store.blog.article = document.getElementById('editor').innerText


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

        if(this.store.blog.article != ''){
            document.getElementById('editor').innerText = this.store.blog.article
        }

        console.log(JSON.stringify("a,b,c".split(',')));
    }
}
</script>