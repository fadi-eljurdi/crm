import utilities from './utilities.js'
class Blog {
    constructor(template,title, media,domain) {
        this.title = title
        this.media = media
        this.date = new Date()
        this.domain = domain
        this.htmlPage = template
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
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_title', this.title.replace(/['"`]/g, ''))
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_header', this.title)
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_description', this.seoDescription.replace(/['"`]/g, ''))
        htmlPageCopy = htmlPageCopy.replace('##blog_page_keywords', this.seoKeywords.replace(/['"`]/g, ''))
        htmlPageCopy = htmlPageCopy.replace('##blog_date', this.date)
        if(this.domain == 'www.incugamecon.media'){
            htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_url', `https://incugamecon.media/blogs/${utilities.titlePath(this.title)}.html`)
        }else{
            if(this.domain == 'www.jurdilaw.com'){
                htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_url', `https://jurdilaw.com/blogs/${utilities.titlePath(this.title)}.html`)
            }else{
                htmlPageCopy = htmlPageCopy.replaceAll('##blog_page_url', `https://jurdiconsult.media/blogs/${utilities.titlePath(this.title)}.html`)
            }    
        }

        htmlPageCopy = htmlPageCopy.replaceAll('##blog_thubnail', this.thubnail)

        // replace media
        
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_media', this.media)

        // replace blog article
        htmlPageCopy = htmlPageCopy.replaceAll('##blog_article', this.article)

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
    setArabicLang(lang){
        this.isArabic = lang
        return this

    }

}

export default Blog