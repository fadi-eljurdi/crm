<template>

<section v-if="!isLogedIn" class="w-100 h-100 bg-light z-3 position-fixed top-0 start-0 d-flex justify-content-center align-items-center">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-5">
        <section class="d-flex flex-column gap-2 shadow rounded px-4 py-4 align-items-center">
          <img src="./assets/logo.svg" alt="logo" class="img-fluid rounded" width="50">
          <h5 class="text-center pop fs-5 text-primary">JURDI CRM</h5>
          <div class="w-100 my-3 d-flex flex-column gap-2">
            <input type="text" @keyup.enter="utilities.focus('password')" id="username" placeholder="Username" class="form-control loginInput" v-model="username">
            <input type="password" @keyup.enter="Login" placeholder="Password" id="password" class="form-control loginInput" v-model="password">
            <button @click="Login" class="w-100 btn btn-primary">
              <span v-if="loginSpinner" class="spinner-grow spinner-grow-sm"></span>
              <span v-else>Login</span>
            </button>
          </div>
          <small class="fs-xsmall pop text-secondary text-center">Developed by <a href="https://libancode.com">Libancode</a> - version 1.1.0</small>
        </section>
      </div>
    </div>
  </div>
</section>

<header v-if="isLogedIn" class="w-100 p-3 z-2 position-fixed top-0 start-0 d-flex justify-content-between align-items-center bg-light shadow-sm">
    <section>
        <router-link to="/" class="link-underline link-underline-opacity-0"><h3 class="pop m-0">JURDI CRM</h3></router-link>
    </section>
    <nav class="pop d-none d-md-flex align-items-center gap-3">
        <router-link to="/contact" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Contact</router-link>
        <router-link to="/links" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Links</router-link>
        <router-link to="/blogs" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Blogs</router-link>
        <router-link to="/services" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Services</router-link>
        
        <!-- <span class="material-symbols-outlined point" @click="refresh">cached</span> -->
    </nav>
    <i class="bi bi-three-dots-vertical d-block d-md-none fs-3 text-secondary" type="button" data-bs-toggle="dropdown"></i>
    <ul class="dropdown-menu">
        <li><router-link class="dropdown-item" to="/contact">Contact</router-link></li>
        <li><router-link class="dropdown-item" to="/links">Links</router-link></li>
        <li><router-link class="dropdown-item" to="/blogs">Blogs</router-link></li>
        <li><router-link class="dropdown-item" to="/services">Services</router-link></li>
    </ul>
</header>
<main v-if="isLogedIn" style="margin-top:100px;">
    <router-view></router-view>
</main>

</template>
<script>
import utilities from './utilities.js'
import {useProfile} from './stores/profile'
export default {
  setup(){
    const store = useProfile()
    return {store}
  },
  data(){
    return{
      utilities,
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
        var api = this.store.api
        api += `?username=${this.username}&password=${this.password}`
        var res = await fetch(api)
        res = await res.json()
        // console.log(res)
        
        this.store.setCredentials(this.username,this.password,res)
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
  mounted(){
  }
}
</script>
