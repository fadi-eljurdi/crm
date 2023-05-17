class CustomPage {
    constructor(data,template){
        this.data = data
        this.template = template
        
    }

    render(){
        
        var page = this.template
        page = page.replace('<!-- page content -->',this.data)
        return page
    }
}

export default CustomPage