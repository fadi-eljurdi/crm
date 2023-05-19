<template>
  <section v-if="store.domain == 'www.jurdilaw.com'" class="container scale-up-center d-flex flex-column gap-2">
    <div class="row">
      <div class="col-12">
          <h3 class="pop text-secondary fs-3">Manage your team</h3>
          <p class="text-secondary fs-small">Effortlessly streamline teamwork, boost productivity, and achieve success with our powerful team management solution.</p>
      </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2 pb-2">Profile Picture</div>
        <div class="col-12 col-md-10"><input @change="uploadImage" type="file" class="form-control"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2 pb-2">Name</div>
        <div class="col-12 col-md-10"><input v-model="team.name" type="text" class="form-control"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2 pb-2">Job title</div>
        <div class="col-12 col-md-10"><input v-model="team.job" type="text" class="form-control"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2 pb-2">Bio</div>
        <div class="col-12 col-md-10"><textarea v-model="team.bio" class="form-control"></textarea></div>
    </div>
    <div class="row justify-content-center my-3"><button :disabled="onEdit || spinner" @click="setTeam" class="col-12 col-lg-2 btn btn-sm btn-primary">add</button></div>
  
  </section>
  <section v-else class="container">
    <h6>Please select the "www.jurdilaw.com" domain</h6>
  </section>
      
  <section v-if="spinner" class="w-100 h-100 position-fixed top-0 start-0 z-3 bg-glass d-flex justify-content-center align-items-center">
      <span class="spinner-grow"></span>
  </section>
</template>
<script>
import message from '../components/message.vue'
import {useProfile} from '../stores/profile'
import utilities from '../utilities'
export default {
  setup(){
      const store = useProfile()
      return {store}
  },
  components:{message},
  watch:{
      team: {
          handler(newValue, oldValue) {
              // Note: `newValue` will be equal to `oldValue` here
              // on nested mutations as long as the object itself
              // hasn't been replaced.
              const team = {
                image:'',
                name:'',
                job:'',
                bio:''
              }
              if(utilities.deepEqual(team,newValue)) this.onEdit = true
              else this.onEdit = false
              
              
          },
          deep: true
      }
  },
  data(){
    return{      
      spinner:false,
      onEdit:true,
      team:{
        image:'',
        name:'',
        job:'',
        bio:''
      }
    }
  },
  methods:{
    async uploadImage(e){
      
      var files = e.target.files
      this.spinner = true
      var files64 = [];// turn to b64
      for(let i = 0 ; i < files.length ; i++){
          files64.push({
              alt:`JURDI-Team-${utilities.getCurrentDate()}`,
              src64: await utilities.file64(files[i])
              // src64: await utilities.optimizeImageQuality(await utilities.file64(files[i]),this.store.quality)
          })
      }
      // hosting images
      var api = this.store.api()
      api += this.store.loginQuery()
      api += `&uploadImagesToDrive=1&folderId=${utilities.getFolderId(this.store.domain,'thumbnail')}`
      
      var urls = await utilities.hostImages(api,files64)
      this.spinner = false
      this.team.image = urls[0].src
    },
    async setTeam(){
      this.store.alertMessage('Save changes ?').setAction(async () => {
        try{
                
            this.spinner = true
            this.store.closeAction()
            var api = this.store.api()
            api += `${this.store.loginQuery()}&setTeam=1`
            var data = JSON.stringify(this.team)
            var res = await fetch(api,{
                method:'POST',
                headers:{
                    "Content-Type":"text/plain"
                },
                body:data
            })

            res = await res.json()
            // console.log(res)
            this.store.alertMessage('Meshe l7al').endAction()
            this.spinner = false
          }catch(err){
              
            this.store.alertMessage('Ma Meshe l7al').endAction()
            this.spinner = false
        }
      })
    }
  }
}
</script>
