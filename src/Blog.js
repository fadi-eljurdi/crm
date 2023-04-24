class Blog {
    constructor(title, mediaType, isArabic,commentIndex) {
        this.title = title
        this.mediaType = mediaType
        this.isArabic = isArabic
        this.date = new Date()
        this.commentIndex = commentIndex

        this.htmlPage =
        /*html*/
        `
        
        `
       
        return this
    }
    getPage() {
        var htmlPageCopy = this.htmlPage

        // embed media is true
        // replace meta tags
        htmlPageCopy = htmlPageCopy.replaceAll(`<!-- Icon -->`,`<link rel="shortcut icon" href="${this.icon}" type="image/x-icon">`)
        if (this.isArabic) {
            htmlPageCopy = htmlPageCopy.replaceAll('<html lang="en">', '<html lang="ar">')
            htmlPageCopy = htmlPageCopy.replaceAll('text-fade', 'text-fade-arb')
        }
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_title', this.title)
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_description', this.seoDescription)
        htmlPageCopy = htmlPageCopy.replace('##blog_page_keywords', this.seoKeywords)
        htmlPageCopy = htmlPageCopy.replace('##blog_date', this.date)
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_url', `https://mashoun.github.io/app/blogs/${(this.title).replaceAll(' ', '-')}.html`)

        if (this.mediaType) {
            // replace embed section
            htmlPageCopy = htmlPageCopy.replaceAll('##blog_thubnail', this.thubnail)
            htmlPageCopy = htmlPageCopy.replaceAll('<!--blog embed-->', `<section class="mt-3">${this.embed}</section>`)
        }
        else {
            htmlPageCopy = htmlPageCopy.replaceAll('##blog_thubnail', this.thubnail)
            htmlPageCopy = htmlPageCopy.replaceAll('<!--swiper-->', `<swiper :imgs='${this.slides}'></swiper>`)

        }

        // replace blog article
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_article', `${this.article}`)

        // replace comment section 
        htmlPageCopy = htmlPageCopy.replaceAll('<!--comment-section-->', `<comments :api="API" index="${this.title}"></comments>`)

        // Copy the text inside the text field
        // navigator.clipboard.writeText(htmlPageCopy);

        this.htmlPage = htmlPageCopy
        return this.htmlPage
    }

    copyToClipboard(){
        navigator.clipboard.writeText(this.htmlPage);
        return this
    }

    // setters
    setArticle(article) { this.article = article; return this }

    setSEO(description, keywords) { this.seoDescription = description; this.seoKeywords = keywords; return this }

    embed(code) { this.embed = code; return this }

    setThubnail(thubnail) { this.thubnail = thubnail; return this }

    setIcon(icon){this.icon = icon; return this}

    addSlides(slides) { this.slides = JSON.stringify(slides); return this }




}

export default Blog