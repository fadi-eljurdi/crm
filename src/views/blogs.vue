<template>
    <section v-show="!preview" class="container scale-up-center ">
        <div class="row">
            <h3 class="pop text-secondary fs-3">Create new blog</h3>
            <p class="text-secondary fs-small">Craft compelling blog posts in minutes with our powerful and streamlined blog creation software</p>
            
        </div>
        <div class="row my-3">
            <nav class="w-100 py-2 d-flex justify-content-between align-items-center font-monospace">
                <div class="d-flex gap-2">
                                        
                    <button @click="addMedia('youtube')" :disabled="spinner" class="btn btn-sm btn-outline-dark d-flex justify-content-center align-items-center d-lg-none">
                        <span class="material-symbols-outlined fs-3">youtube_activity</span>
                    </button>
                    <button @click="addMedia('youtube')" :disabled="spinner"  class="btn btn-sm btn-outline-dark d-none d-lg-block">+Youtube</button>


                    <button @click="addMedia('image')" :disabled="spinner" class="btn btn-sm btn-outline-dark d-flex justify-content-center align-items-center d-lg-none">
                        <span class="material-symbols-outlined fs-3">add_photo_alternate</span>
                    </button>
                    <button @click="addMedia('image')" :disabled="spinner"  class="btn btn-sm btn-outline-dark d-none d-lg-block">+Image</button>


                    <button @click="runGPT" :disabled="spinner || store.blog.title.length == 0" class="btn btn-sm btn-outline-dark d-flex justify-content-center align-items-center d-lg-none">
                        <span class="material-symbols-outlined fs-3">auto_awesome</span>
                    </button>
                    <button @click="runGPT" :disabled="spinner || store.blog.title.length == 0" class="btn btn-sm btn-outline-dark d-none d-lg-block">AI-Generator</button>

                    <button @click="clearBlog"  :disabled="spinner" class="btn btn-sm btn-outline-dark d-flex justify-content-center align-items-center d-lg-none">
                        <span class="material-symbols-outlined fs-3">clear</span>
                    </button>
                    <button @click="clearBlog" :disabled="spinner"  class="btn btn-sm btn-outline-dark d-none d-lg-block">clear page</button>

                    <button @click="previewBlog" :disabled="spinner" class="btn btn-sm btn-outline-dark d-flex justify-content-center align-items-center d-lg-none">
                        <span class="material-symbols-outlined fs-3">preview</span>
                    </button>
                    <button @click="previewBlog" :disabled="spinner"  class="btn btn-sm btn-outline-dark d-none d-lg-block">Preview changes</button>
                    
                    <!-- <button class="btn btn-sm btn-outline-dark">Edit Blog</button> -->

                </div>
                
                <button @click="deploy" :disabled="spinner || !validateInput" class="btn btn-sm btn-primary d-flex justify-content-center align-items-center d-lg-none"><span class="material-symbols-outlined fs-3">upload</span></button>
                <button @click="deploy" :disabled="spinner || !validateInput" class="col-1 btn btn-sm btn-primary d-none d-lg-block">DEPLOY</button>
                
            </nav>
        </div>

        <progress v-if="spinner" style="width:100%;height:.5rem;" class="my-3"></progress>
        <hr v-else class="my-3">
        
        <section class="d-flex flex-column gap-2">
            
            <div class="row">
                <div class="col-12 col-md-2 pb-2">1. Blog type</div>
                <div class="col-12 col-md-10 d-flex flex-column gap-2">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" v-model="store.blog.baas" >
                        <label class="form-check-label" for="flexCheckDefault">
                            Consider as a service
                        </label>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2" @click="setYoutubePrompt">2. Media <strong class="text-danger" v-show="store.blog.mediaBox.length == 0">*</strong></div>
                <div class="col-12 col-md-10 d-flex flex-wrap gap-2">
                    <div style="width:100px" v-for="m in store.blog.mediaBox" :key="m" @dblclick="mediaPop(m)">
                        <section class="ratio ratio-16x9" v-if="m.type == 'youtube'">
                            <img :src="`https://img.youtube.com/vi/${m.src}/default.jpg`" alt="youtube" class="img-fluid object-fit-cover" >
                        </section>
                        <section v-if="m.type == 'image'" >
                            <div class="ratio ratio-16x9"> 
                                <img :src="m.src" :alt="m.alt" class="img-fluid rounded object-fit-cover">
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <!-- <div class="row">
                <div class="col-12 col-md-2 pb-2">Thumbnail</div>
                <div class="col-12 col-md-10 d-flex flex-column gap-2">
                    <div style="width:100px" v-if="store.blog.thumbnail">
                        <div class="ratio ratio-16x9" >
                            <img :src="store.blog.thumbnail" alt="thumbnail" class="img-fluid object-fit-cover">
                        </div>
                    </div>
                    <input accept="image/png, image/jpeg, image/jpeg" @change="generateThumbnail" type="file" class="form-control">
                </div>
            </div> -->
            <div class="row">
                <div class="col-12 col-md-2 pb-2">3. Title <strong class="text-danger" v-show="store.blog.title.length == 0">*</strong></div>
                <div class="col-12 col-md-10 d-flex flex-column gap-2">
                    
                    <div class="input-group">
                        <!-- <span class="input-group-text point" title="revise with GPT" @click="generateBlogTitle">
                            <span class="material-symbols-outlined">auto_awesome</span>
                        </span> -->
                        <GrammarlyEditorPlugin clientId="client_6ew5WLrroWWr7Jv1eqyr91" class="w-100">
                            <input autocomplete="off" @load="alignRight('blog-title')" @focus="alignRight('blog-title')" id="blog-title" v-model="store.blog.title" type="text" class="form-control">
                        </GrammarlyEditorPlugin>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">4. SEO - Keywords <strong class="text-danger" v-show="store.blog.seoKeywords.length == 0">*</strong></div>
                <div class="col-12 col-md-10">
                    <div class="input-group">
                        <!-- <span class="input-group-text point" title="revise with GPT" @click="generateSEOKeywords">
                            <span class="material-symbols-outlined">auto_awesome</span>
                        </span> -->
                        <GrammarlyEditorPlugin clientId="client_6ew5WLrroWWr7Jv1eqyr91" class="w-100">
                        <input  autocomplete="off"  @focus="alignRight('blog-seo-keywords')" id="blog-seo-keywords"  v-model="store.blog.seoKeywords" type="text" class="form-control">
                        </GrammarlyEditorPlugin>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">5. SEO - Description <strong class="text-danger" v-show="store.blog.seoDescription.length == 0">*</strong></div>
                <div class="col-12 col-md-10">
                    <div class="input-group">
                        <!-- <span class="input-group-text point" title="revise with GPT" @click="generateSEODescription">
                            <span class="material-symbols-outlined">auto_awesome</span>
                        </span> -->
                        <GrammarlyEditorPlugin clientId="client_6ew5WLrroWWr7Jv1eqyr91" class="w-100">
                        <textarea  autocomplete="off"  @focus="alignRight('blog-seo-description')" id="blog-seo-description" v-model="store.blog.seoDescription" rows="4" type="text" class="form-control"></textarea>
                        </GrammarlyEditorPlugin>
                    </div>
                </div>
            </div>
            <div class="row mb-5">
                <div class="col-12 col-md-2 pb-2">6. Article</div>
                <div class="col-12 col-md-10">
                    <GrammarlyEditorPlugin clientId="client_6ew5WLrroWWr7Jv1eqyr91" class="w-100">
                    <p contenteditable @focus="alignRight('editor')" id="editor" class="form-control pop text-secondary py-4" style="overflow: auto; resize: vertical; min-height:500px;height:fit-content;" ></p>
                    </GrammarlyEditorPlugin>
                </div>
            </div>
        </section>
        <settings v-if="showSettings"><button class="w-100 btn btn-sm btn-outline-secondary" @click="showSettings = !showSettings">back</button></settings>
    </section>
    <section v-show="preview" class="container my-5  scale-up-center ">
        
        <div class="row justify-content-center my-5">
            <div class="col-12 col-lg-8">
                <button class="w-100 btn btn-outline-secondary btn-sm" @click="preview = !preview">back to blogs</button>
            </div>
        </div>
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
                    
                </div>
            </figure>
        </div>
        <div class="row justify-content-center">
            <article class="col-12 col-lg-8">
                <div v-show="!showTranslation" id="original">
                    <h1 class="text-primary">{{store.blog.title}}</h1>
                    <div id="blogArticle"></div>
                </div>
                <div v-show="showTranslation" id="showTranslation" dir="rtl" class="arb"></div>
                
                <progress v-if="spinner" style="width:100%;height:.5rem;" class="my-3"></progress>
                <hr v-else class="my-3">
                <u v-show="!showTranslation" @click="translate" class="point"> see translation</u>
                <u v-show="showTranslation" @click="showTranslation = !showTranslation" class="point">see original</u>
                <i class="bi bi-dot mx-1"></i>
                <u @click="preview = !preview" class="point" >back to blogs</u>
            </article>
            
        </div>
    </section>
    
    
    <message v-show="store.showMessage" :title="store.theMessage" :callback="store.callback" :spinner="spinner">
        <button class="btn btn-outline-light btn-sm" @click="store.showMessage = !store.showMessage">close</button>
    </message>
    
    
</template>
<script>
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-vue'
import {useProfile} from '../stores/profile'
import Media from '../Media'
import Template from '../Template'
import utilities from '../utilities.js'
import settings from '../components/settings.vue'
import message from '../components/message.vue'
export default {
    setup(){
        const store = useProfile()
        return {store}
    },
    components:{settings,GrammarlyEditorPlugin,message},
    data(){
        return{
            page:'',
            preview:false,
            spinner:false,
            utilities,
            showSettings:false,
            showTranslation:false
            
        }
    },
    computed:{

        validateInput(){
            if(this.store.blog.title && this.store.blog.seoDescription && this.store.blog.seoKeywords && (this.store.blog.mediaBox.length >= 1)) return true
            return false
        },
        blogTitle(){
            // return this.store.blog.title.replaceAll('/','|')
            return utilities.titlePath(this.store.blog.title)
        }
    },
    methods:{
        clearBlog(){
            this.store.alertMessage('Start new blog ?').setAction(()=>{
                this.store.blog = {
                    baas:false,
                    title:'',
                    seoDescription:'',
                    seoKeywords:'',
                    thumbnail:'',
                    url:'',
                    mediaBox:[],
                    article:''
                }
                document.getElementById('editor').innerText = ''
                this.store.endAction().closeAction()
            })
        },
        async addMedia(type){
            if(type == 'youtube'){
                const url = prompt('Enter the youtube URL')
                if(url !== null){
                    this.store.blog.mediaBox.push(new Media('Youtube video','youtube',url))
                    this.store.youtube = await utilities.getYouTubeVideoDetails(url)
                    if(this.store.settings.useYoutubeTitle){
                        // await this.setYoutubePrompt()
                        this.store.blog.title += this.store.youtube.title
                    }
                    if(this.store.settings.useYoutubeDescription){
                        // await this.setYoutubePrompt()
                        this.store.blog.seoDescription += this.store.youtube.description
                    }
                }
            }else{
                try{
                    // select image > base64 > host > get url
                    var files = await utilities.openFiles() // we selected the files
                    // console.log(files)
                    this.spinner = true
                    var files64 = [];// turn to b64
                    for(let i = 0 ; i < files.length ; i++){
                        files64.push({
                            alt:`JURDI-Image-${utilities.getCurrentDate()}`,
                            // src64: await utilities.file64(files[i])
                            src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]),this.store.quality)
                        })
                    }
                    console.log(files64);
                    // hosting images
                    var api = this.store.api()
                    api += this.store.loginQuery()
                    api += `&uploadImagesToDrive=1&folderId=${utilities.getFolderId(this.store.domain,this.store.blog.baas)}`
                    
                    var urls = await utilities.hostImages(api,files64)
                    // console.log(urls)

                    // pushing to media box

                    for(let i = 0 ; i < urls.length ; i++){
                        this.store.blog.mediaBox.push(new Media((urls[i].alt),'image',(urls[i].src)))
                    }
                    this.spinner = false
                }catch(err){
                   console.log(err);
                   this.store.alertMessage('Weak network , please refresh and try again')
                   this.spinner = false
                }
            }
        },
        previewBlog(){
            this.preview = true
            // console.log(document.getElementById('editor').innerText);
            utilities.parseHTML('blogArticle',utilities.compile('editor'))
        },
        async generateThumbnail(e){
            // this.spinner = true
            // var api = this.store.api()
            // api += this.store.loginQuery()
            // api += `&uploadImagesToDrive=1&folderId=1Z73hzjMWM8U3tsuiULJP6UA1eQY_cHJV`
            // var array = []
            // array.push({
            //     alt:`JURDI-Thumbnail-${utilities.getCurrentDate()}`,
            //     src64: await utilities.file64(e.target.files[0])
            //     // src64: await utilities.optimizeImageQuality(await utilities.file64(e.target.files[0]),this.store.quality)
            // })
            // var url = await utilities.hostImages(api,array)
            // this.store.blog.thumbnail = url[0].src
            // this.spinner = false
            var media = this.store.blog.mediaBox[0]
            if(media.type == 'youtube'){
                this.store.blog.thumbnail = utilities.getYouTubeThumbnailUrl(media.src)
            }else{
                this.store.blog.thumbnail = media.src
            }
        },
        async generateBlog(){
            
            // const page = new Blog(this.store.blog.title,JSON.stringify(this.store.blog.mediaBox),this.store.domain)
            // page
            // .setArticle(utilities.compile('editor'))
            // .setIcon(this.store.blog.thumbnail)
            // .setThubnail(this.store.blog.thumbnail)
            // .setSEO(this.store.blog.seoDescription,this.store.blog.seoKeywords)
            // .setArabicLang(utilities.isArabic(document.getElementById('editor').innerText))
            // .generatePage()

            // this.page = page.htmlPage
            const chooseTemplate = () => {
                if(this.store.domain == 'www.jurdilaw.com') return this.store.templateLLC
                else {
                    if(this.store.domain == 'www.incugamecon.media') return this.store.templateIGC
                    else{

                        return this.store.templateAPP
                    }

                }

            }
            console.log(chooseTemplate());

            var page = new Template(chooseTemplate(),this.store.blog.title,JSON.stringify(this.store.blog.mediaBox),this.store.domain)
            page
            .setArticle(utilities.compile('editor'))
            .setIcon(this.store.blog.thumbnail)
            .setThubnail(this.store.blog.thumbnail)
            .setSEO(this.store.blog.seoDescription,this.store.blog.seoKeywords)
            .setArabicLang(utilities.isArabic(document.getElementById('editor').innerText))
            .generatePage()

            
            this.page = page.htmlPage

        },
        async saveBlog(){
            // saves to google sheet
            return new Promise(async (resolve,reject) => {
                var api = this.store.api()
                api += this.store.loginQuery()
                api += `&saveBlog=1`
                var res = await fetch(api,{
                    method:"POST",
                    headers:{
                        "Content-Type":"text/plain",
                    },
                    body:JSON.stringify({
                        baas:this.store.blog.baas,
                        title:this.store.blog.title,
                        description:this.store.blog.seoDescription,
                        thumbnail:this.store.blog.thumbnail,
                        url: this.store.blog.url
                    })
                })
                res = await res.json()
                console.log(res);
                if(res == '200'){
                    resolve(res)
                }else{
                    reject(res)
                }
            })
        },
        async  githubPush(token, content, filename) {

            var data = JSON.stringify({
                "message": "html file",
                "content": `${content}`
            });

            var headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            };

            

            var url ;
            if(this.store.domain == 'www.incugamecon.media') url = `https://api.github.com/repos/fadi-eljurdi/igcdev/contents/blogs/${filename}.html`;
            else {
                if(this.store.domain == 'www.jurdilaw.com') url = `https://api.github.com/repos/fadi-eljurdi/LLC/contents/blogs/${filename}.html`;
                else {
                    url = `https://api.github.com/repos/fadi-eljurdi/app/contents/blogs/${filename}.html`;
                }
            }

            var config = {
                method: 'PUT',
                headers: headers,
                body: data
            };

            var res = await fetch(url, config);
            var res = await res.json();
            // console.log(res);
            // return data.content.sha;
        },
        async deploy(){
            this.store.alertMessage(`Publish blog to ${this.store.domain} ? ${this.store.blog.baas ? 'As a service ?' : ''}`).setAction(async ()=>{
                try{
                    this.spinner = true
                    this.store.closeAction()
                    this.generateThumbnail()
                    await this.generateBlog()
                    await this.githubPush(this.store.github,utilities.text64(this.page),(this.blogTitle))

                    if(this.store.domain == 'www.incugamecon.media') this.store.blog.url = `https://fadi-eljurdi.github.io/igcdev/blogs/${this.blogTitle}.html`
                    else {

                        if(this.store.domain == 'www.jurdilaw.com') this.store.blog.url = `https://jurdilaw.com/blogs/${this.blogTitle}.html`
                        this.store.blog.url = `https://jurdiconsult.media/blogs/${this.blogTitle}.html`
                    }
                    // save to sheets
                    await this.saveBlog()
                    this.spinner = false
                    
                    this.store.alertMessage(`${this.store.blog.url}`).endAction()
                }catch(err){
                    console.log(err);
                    this.spinner = false
                    this.store.closeAction()
                    this.store.alertMessage(`ERROR : ${err}`).endAction()
                }
                
                
            })
        },
        mediaPop(m){
            this.store.blog.mediaBox = this.store.blog.mediaBox.filter(media => m.src != media.src)
        },

        async generateArticle(){
            return new Promise(async (resolve,reject) => {
                try{
                    // var description = ''
                    // if(this.store.settings.useYoutubeDescription){
                    //     description = `using these keywords "${this.store.blog.seoKeywords}"`
                    // }
                    var useKeywords = ''
                    if(this.store.blog.seoKeywords.length > 0){
                        useKeywords = `using these keywords "${this.store.blog.seoKeywords}" `
                    }
                    const prompt = `generate a ${this.store.settings.words} words blog about "${this.store.blog.title}" ${useKeywords}and considering these rules "${this.store.settings.rules.toString()}"`
                    console.log(prompt);
                    const OPENAI_API_KEY = this.store.gptToken
                    var res = await fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + OPENAI_API_KEY
                        },
                        body: JSON.stringify({
                            "model": "gpt-3.5-turbo",
                            "messages": [{ "role": "user", "content": prompt }]
                        })
                    })
                    var data = await res.json()
                    resolve(data.choices[0].message.content)
                }catch(err){
                   console.log(err);
                   reject(err)
                }
            })
            
        },
        generateBlogTitle(){
            return new Promise(async (resolve,reject) => {
                try{
                   const prompt = `generate a blog title about "${this.store.blog.title}"`
                    const OPENAI_API_KEY = this.store.gptToken
                    var res = await fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + OPENAI_API_KEY
                        },
                        body: JSON.stringify({
                            "model": "gpt-3.5-turbo",
                            "messages": [{ "role": "user", "content": prompt }]
                        })
                    })
                    var data = await res.json()
                    resolve(data.choices[0].message.content)
                }catch(err){
                   console.log(err);
                   reject(err)
                }
            })
        },
        generateSEOKeywords(){
            return new Promise(async (resolve,reject) => {
                try{
                   const prompt = `generate a brief SEO keywords (comma seperated) about "${this.store.blog.title}"`
                    const OPENAI_API_KEY = this.store.gptToken
                    var res = await fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + OPENAI_API_KEY
                        },
                        body: JSON.stringify({
                            "model": "gpt-3.5-turbo",
                            "messages": [{ "role": "user", "content": prompt }]
                        })
                    })
                    var data = await res.json()
                    resolve(data.choices[0].message.content)
                }catch(err){
                   console.log(err);
                   reject(err)
                }
            })
        },
        async generateSEODescription(){
            return new Promise(async (resolve,reject) => {
                try{
                   const prompt = `generate a brief SEO description about "${this.store.blog.title}"`
                    const OPENAI_API_KEY = this.store.gptToken
                    var res = await fetch("https://api.openai.com/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + OPENAI_API_KEY
                        },
                        body: JSON.stringify({
                            "model": "gpt-3.5-turbo",
                            "messages": [{ "role": "user", "content": prompt }]
                        })
                    })
                    var data = await res.json()
                    resolve(data.choices[0].message.content)
                }catch(err){
                   console.log(err);
                   reject(err)
                }
            })
        },
        
        async runGPT(){
            
            try {
                this.spinner = true
                var content = await this.generateArticle()
                document.getElementById('editor').innerText = content
                // this.alignRight('editor')
                this.store.blog.article += content

                if(this.store.settings.generateSEOKeywords) {
                    content = await this.generateSEOKeywords()
                    this.store.blog.seoKeywords = utilities.noQuotes(content)
                    // this.alignRight('blog-seo-keywords')
                }
                if(this.store.settings.generateTitle) {
                    content = await this.generateBlogTitle()
                    this.store.blog.title = utilities.noQuotes(content)
                }
                if(this.store.settings.generateSEODescription) {
                    content = await this.generateSEODescription()
                    this.store.blog.seoDescription = utilities.noQuotes(content)
                    // this.alignRight('blog-seo-description')
                }
                this.spinner = false
            }catch(err){
                
                this.spinner = false
                console.log(err);
                this.store.alertMessage('Check your openai account usage limit')
            }
        },
        alignRight(id){
            if(document.getElementById(id).tagName === 'INPUT' || document.getElementById(id).tagName === 'TEXTAREA'){
                if(utilities.isArabic(document.getElementById(id).value)) {
                    document.getElementById(id).dir = 'rtl'
                }else{
                    document.getElementById(id).dir = 'ltr'
                }

            }else{
                if(utilities.isArabic(document.getElementById(id).innerText)) {
                    document.getElementById(id).dir = 'rtl'
                }else{
                    document.getElementById(id).dir = 'ltr'
                }
            }
        },
        async translate(){
            this.showTranslation = true
            this.spinner = true
            var api = this.store.api()
            api += `?translate=1`
            var res = await fetch(api,{
                method:"POST",
                headers:{
                    "Content-Type":"text/plain",
                },
                body:JSON.stringify({
                    text:document.getElementById('original').innerHTML,
                    source:'en',
                    target:'ar'
                })
            })
            res = await res.json()
            console.log(res);
            document.getElementById('showTranslation').innerHTML = (utilities.fixClosingTags(res)).replaceAll(' & nbsp؛ ',' ')

            this.spinner = false
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
        var editor = document.getElementById('editor')
        editor.addEventListener('paste',e=>{
        e.preventDefault()
        editor.innerText += e.clipboardData.getData('text/plain')
        })
        // this.store.alertMessage('Welcome')

    }
}
</script>