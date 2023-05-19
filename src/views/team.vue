<template>
  <section class="container scale-up-center d-flex flex-column gap-2">
    <div class="row">
      <div class="col-12">
          <h3 class="pop text-secondary fs-3">Manage your team</h3>
          <p class="text-secondary fs-small">Effortlessly streamline teamwork, boost productivity, and achieve success with our powerful team management solution.</p>
      </div>
    </div>
    
    <div class="row">
        <div class="col-12 col-md-2 pb-2">Profile Picture</div>
        <div class="col-12 col-md-10"><input type="file" class="form-control"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2 pb-2">Name</div>
        <div class="col-12 col-md-10"><input type="text" class="form-control"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2 pb-2">Job title</div>
        <div class="col-12 col-md-10"><input type="text" class="form-control"></div>
    </div>
    <div class="row">
        <div class="col-12 col-md-2 pb-2">Bio</div>
        <div class="col-12 col-md-10"><textarea class="form-control"></textarea></div>
    </div>
    <div class="row justify-content-center my-3"><button class="col-12 col-lg-2 btn btn-sm btn-primary">add</button></div>
  
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
  }
}
</script>
