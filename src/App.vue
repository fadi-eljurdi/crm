<template>

<section v-if="devi" class="w-100 h-100 bg-light z-3 position-fixed top-0 start-0 d-flex justify-content-center align-items-center">
  <h5 class="user-select-none">CRM is under <span @dblclick="devi = false">development</span> ...</h5>
</section>
<section v-if="!isLogedIn" class="w-100 h-100 bg-light z-1 position-fixed top-0 start-0 d-flex justify-content-center align-items-center">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-5">
        <section class="d-flex flex-column gap-2 shadow rounded px-4 py-4 align-items-center">
          <img src="./assets/logo.svg" alt="logo" class="img-fluid rounded" width="50">
          <h5 class="text-center pop fs-5 text-primary">JURDI CRM</h5>
          <div class="w-100 my-3 d-flex flex-column gap-2">
            <input type="text" @keyup.enter="utilities.focus('password')" id="username" placeholder="Username" class="form-control loginInput" v-model="username">
            <input type="password" @keyup.enter="Login" placeholder="Password" id="password" class="form-control loginInput" v-model="password">
            <button :disabled="loginSpinner" @click="Login" class="w-100 btn btn-primary">
              <span v-if="loginSpinner" class="spinner-grow spinner-grow-sm"></span>
              <span v-else>Login</span>
            </button>
          </div>
          <small class="fs-xsmall pop text-secondary text-center">Developed by 
            <a href="https://libancode.com">Libancode</a> - last update 2023-9-21
          </small>
        </section>
      </div>
    </div>
  </div>
</section>

<header v-if="isLogedIn" class="w-100 p-3 z-2 position-fixed top-0 start-0 d-flex justify-content-between align-items-center bg-light shadow-sm">
    <section class="d-flex align-items-center gap-2">
        <router-link to="/" class="link-underline link-underline-opacity-0"><h5 class="text-success m-0 text-uppercase">@{{username}}</h5></router-link>
    </section>
    <nav class="pop d-none d-lg-flex align-items-center gap-3">
      <router-link to="/profile" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">+Profile</router-link>
      <!-- <router-link to="/pages" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">+Pages</router-link> -->

      <router-link to="/team" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">+Team</router-link>
      <!-- <router-link to="/privacy" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">+Privacy Policy</router-link> -->
      <router-link to="/links" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">+Links</router-link>
      <router-link to="/blogs" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">+Blog</router-link>
      <router-link to="/settings" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">+Settings</router-link>
      <router-link to="/termination" class="link-offset-2 link-offset-3-hover link-danger link-underline-danger link-underline-opacity-0 link-underline-opacity-75-hover">-Termination</router-link>
      <div class="d-none d-lg-flex gap-2 align-items-center ms-3">
            <i class="bi bi-globe"></i>
            <select class="form-select form-select-sm" v-model="store.domain">
              <option value="www.jurdiconsult.media" selected>www.jurdiconsult.media</option>
              <option value="www.jurdilaw.com">www.jurdilaw.com</option>
              <option value="www.incugamecon.media">www.incugamecon.media</option>
            </select>
      </div>
    </nav>
    
    <i class="bi bi-three-dots-vertical d-block d-lg-none fs-3 text-secondary" type="button" data-bs-toggle="dropdown"></i>
    <ul class="dropdown-menu">
        <li>
          <span class="dropdown-item">
            <select class="form-control" v-model="store.domain">
              <option value="www.jurdiconsult.media" selected>www.jurdiconsult.media</option>
              <option value="www.jurdilaw.com">www.jurdilaw.com</option>
              <option value="www.incugamecon.media">www.incugamecon.media</option>
            </select>
          </span>
        </li>
        <li><hr class="dropdown-divider"></li>
        <li><router-link class="dropdown-item" to="/profile">+Profile</router-link></li>
        <!-- <li><router-link class="dropdown-item" to="/pages">+Pages</router-link></li> -->
        <li><router-link class="dropdown-item" to="/team">+Team</router-link></li>
        <!-- <li><router-link class="dropdown-item" to="/privacy">+Privacy Policy</router-link></li> -->
        <li><router-link class="dropdown-item" to="/links">+Links</router-link></li>
        <li><router-link class="dropdown-item" to="/blogs">+Blogs</router-link></li>
        <li><router-link class="dropdown-item" to="/settings">+Settings</router-link></li>
        <li><router-link class="dropdown-item" to="/termination">-Termination</router-link></li>
    </ul>
</header>
<main v-if="isLogedIn" style="margin-top:100px;">
    <router-view></router-view>
</main>
<message v-show="store.showMessage" :title="store.theMessage" :callback="store.callback" :spinner="loginSpinner"></message>
</template>
<script>

import message from './components/message.vue'
import utilities from './utilities.js'
import {useProfile} from './stores/profile'
export default {
  setup(){
    const store = useProfile()
    return {store}
  },
  components:{message},
  data(){
    return{
      utilities,
      devi:false,
      username:'',
      password:'',
      isLogedIn:false,
      loginSpinner:false,
      profile:{},
      showMessage:false,
      alertMessage:'Meshe l7al',
    }
  },    
  methods:{
    async Login(){  
      try{
        this.loginSpinner = true
        var api = this.store.api()
        api += `?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`
        // console.log(api);
        var res = await fetch(api)
        res = await res.json()
        // console.log(res)
        
        this.store.setCredentials(this.username,this.password,res.githubToken,res.gptApiKey,res.settings)
        this.isLogedIn = true
        this.loginSpinner = false

      }catch(err){
        console.log(err);
        
        document.querySelectorAll('.loginInput').forEach(e=>{
          // console.log(e);
          e.classList.add('is-invalid')
        })
        this.loginSpinner = false
      }
    }
  },
  async mounted(){
    utilities.checkNetwork()
    try{
      this.store.templateAPP = await utilities.fetchTemplate('https://jurdiconsult.media/blogs/template.html')
      this.store.templateLLC = await utilities.fetchTemplate('https://jurdilaw.com/blogs/template.html')
      this.store.templateIGC = await utilities.fetchTemplate('https://incugamecon.media/blogs/template.html')
      console.log(this.store.templateIGC);
    }catch(err){
      // console.log(err);
      this.store.alertMessage(err)
    }



  }
}
</script>
