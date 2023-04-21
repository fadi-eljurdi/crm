<template>

<section v-if="!isLogedIn" class="w-100 h-100 bg-light position-fixed top-0 start-0 z-3">
    <div class="container my-5">
        <div class="row justify-content-center p-3">
        <section class="col-12 col-md-8 col-lg-5 shadow-sm px-3 py-4 bg-light rounded d-flex flex-column gap-2 align-items-center">
            
            <img src="./assets/logo.svg" alt="logo" width="70" height="70" class="img-fluid rounded-pill skeleton">
            <h6 class="pop fs-4 text-secondary text-center"><strong>JURDI</strong></h6>
            <div class="w-100 d-flex flex-column gap-2 pop mt-3">
            <div class="form-floating">
                <input v-model="username" type="text" class="form-control" id="username" @keyup.enter="focus('password')"
                placeholder="username">
                <label for="username">Username</label>
            </div>
            <div class="form-floating">
                <input v-model="password" @keyup.enter="login" type="password" class="form-control" id="password"
                placeholder="Password">
                <label for="password">Password</label>
            </div>
            <button class="btn btn-primary ls-1 w-100" @click="login">
                <span v-if="loginSpinner" class="spinner-grow text-light spinner-grow-sm"></span>
                <span v-else>Login</span>
            </button>
            <small class="fs-xsmall text-secondary pop text-center mt-2">Access your account and start
                exploring !</small>
            </div>
        </section>
        </div>
    </div>
</section>
<header v-if="isLogedIn"  class="w-100 p-3 z-3 position-fixed top-0 start-0 d-flex justify-content-between align-items-center bg-light shadow-sm">
    <section>
        <h3 class="pop m-0">JURDI CRM</h3>
    </section>
    <nav class="pop d-none d-md-flex align-items-center gap-3">
        <router-link to="/contact" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Contact</router-link>
        <router-link to="/links" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Links</router-link>
        <router-link to="/blogs" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Blogs</router-link>
        <router-link to="/services" class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover">Services</router-link>
    </nav>
    <i class="bi bi-three-dots-vertical d-block d-md-none fs-3 text-secondary" type="button" data-bs-toggle="dropdown"></i>
    <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="/contact">Contact</a></li>
        <li><a class="dropdown-item" href="/links">Links</a></li>
        <li><a class="dropdown-item" href="/blogs">Blogs</a></li>
        <li><a class="dropdown-item" href="/services">Services</a></li>
    </ul>
</header>
<main v-if="isLogedIn"  style="margin-top:100px;">
    <router-view></router-view>
</main>
<message></message>

</template>
<script>
import utilities from './utilities.js'
import {useProfile} from './stores/profile'
import message from './components/message.vue'
export default {
  components: { message },
  setup(){
    const store = useProfile()
    return {store}
  },
  data(){
    return{
        utilities,
        idLogedIn:false,
        loginSpinner:false,
        showMessage:false,
        alertMessage:'Meshe l7al',
    }
  },    
  methods:{
    
    newMessage(title){
        this.showMessage = true
        this.alertMessage = title

    },
    login() {
      this.loginSpinner = true;
      var api = this.api
      api += this.store.loginQuery()

      fetch(api).then(res => res.json()).then(res => {
        // console.log(res)
        if (res == 'loged in') {
          this.isLogedIn = true;
          this.loginSpinner = false;
          this.github = res
          this.store.setProfile(res)

        } else {

          document.getElementById('username').classList.add('is-invalid')
          document.getElementById('password').classList.add('is-invalid')
          this.username = ''
          this.password = ''
          this.loginSpinner = false;
        }
      }).catch(e => {
        console.log(e)
        this.newMessage('Weak network')
        this.loginSpinner = false;

      })
    },
    async getProfile(){
        var api = this.store.api
        api += `?getProfile=1`

    }
  }
}
</script>
