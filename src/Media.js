import utilities from './utilities.js'
class Media{
    constructor(alt,type,src){
        this.type = type
        this.alt = alt
        if(this.type == 'youtube'){
            this.src = utilities.getYouTubeId(src)
        }else{
            this.src = src
        }
        return this
    }
}

export default Media