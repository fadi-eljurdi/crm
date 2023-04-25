class Blog {
    constructor(title, media) {
        this.title = title
        this.media = media
        this.date = new Date()

        this.htmlPage =
        /*html*/
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>##blog_page_title</title>
            
            <meta name="title" content="##blog_page_title">
            <meta name="description" content="##blog_page_description">
            <meta name="keywords" content="##blog_page_keywords">
            <meta name="robots" content="index, follow">
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
            <meta name="revisit-after" content="1 days">
            <meta name="author" content="Fadi ElJurdi">
        
            <!-- Open Graph / Facebook -->
            <meta property="og:type" content="website">
            <meta property="og:url" content="##blog_page_url">
            <meta property="og:title" content="##blog_page_title">
            <meta property="og:description" content="##blog_page_description">
            <meta property="og:image" content="##blog_thubnail">
        
            <!-- Twitter -->
            <meta property="twitter:card" content="summary_large_image">
            <meta property="twitter:url" content="##blog_page_url">
            <meta property="twitter:title" content="##blog_page_title">
            <meta property="twitter:description" content="##blog_page_description">
            <meta property="twitter:image" content="##blog_thubnail">
            <!-- Icon -->
            <link rel="stylesheet" href="../assets/css/app.css">
            <link rel="stylesheet" href="../assets/css/responsive.css">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
            <link  rel="stylesheet"  href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"/>
            
            <!-- Dayjs -->
            <script src="https://cdn.jsdelivr.net/npm/dayjs@1.10.6/dayjs.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/dayjs@1.10.6/plugin/relativeTime.min.js"></script>
            <!-- VUE JS -->
            <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>

        </head>
        <body id="app" class="bg-blight">
            
            <blog-navigation :utilities="utilities">##blog_page_title</blog-navigation>
            <main style="margin: 80px 0px ;">
                <section class="container">
                    <div class="row g-3">
                        <div class="col-12 col-lg-8">
                            <article class="shadow-sm bg-light p-3 rounded">
                                <blog-media :media='##blog_media'></blog-media>
                                <h1 class="pop text-primary">##blog_page_title</h1>
                                <p class="text-secondary">##blog_article
                                    <i class="bi bi-dot"></i>
                                    <u class="opacity-75">see translation</u>
                                </p>
                                <hr>
                                <div class="d-flex justify-content-between align-items-center">
                                    <time class="fs-xsmall">{{utilities.timo('##blog_date')}}</time>
                                    <i class="bi bi-share-fill text-secondary" @click="utilities.shareBlog('##blog_page_title','##blog_page_url')"></i>
                                </div>
                            </article>
                        </div>
                        <div class="col-12 col-lg-4">
                            <check-also :blogs="profile.blogs" :utilities="utilities"></check-also>
                        </div>
                    </div>
                </section>
            </main>
            
            <footer-section :services="profile.services" :links="profile.links" :utilities="utilities" :contact="profile.contact"></footer-section>
            
            <section v-if="spinner" class="w-100 h-100 z-3 position-fixed top-0 start-0 bg-glass d-flex justify-content-center align-items-center">
                <span class="spinner spinner-grow"></span>
            </section>
            
            <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
            <script type="module" src="../assets/js/app.js"></script>


        </body>
        </html>        
        `
       
        return this
    }
    generatePage() {
        var htmlPageCopy = this.htmlPage

        // embed media is true
        // replace meta tags
        htmlPageCopy = htmlPageCopy.replaceAll(`<!-- Icon -->`,`<link rel="shortcut icon" href="${this.icon}" type="image/x-icon">`)
        if (this.isArabic) {
            htmlPageCopy = htmlPageCopy.replaceAll('<html lang="en">', '<html lang="ar">')
        }
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_title', this.title)
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_description', this.seoDescription)
        htmlPageCopy = htmlPageCopy.replace('##blog_page_keywords', this.seoKeywords)
        htmlPageCopy = htmlPageCopy.replace('##blog_date', this.date)
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_url', `https://fadi-eljurdi.github.io/app/blogs/${(this.title).replaceAll(' ', '-')}.html`)

        htmlPageCopy = htmlPageCopy.replaceAll('##blog_thubnail', this.thubnail)

        // replace media
        
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_media', this.media)

        // replace blog article
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_article', `${this.article}`)

        // Copy the text inside the text field
        // navigator.clipboard.writeText(htmlPageCopy);

        this.htmlPage = htmlPageCopy
        return this
    }

    // setters
    setArticle(article) { this.article = article; return this }

    setSEO(description, keywords) { this.seoDescription = description; this.seoKeywords = keywords; return this }

    setThubnail(thubnail) { this.thubnail = thubnail; return this }

    setIcon(icon){this.icon = icon; return this}

}

export default Blog