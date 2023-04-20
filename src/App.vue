<template>

<header class="w-100 p-3 z-3 position-fixed top-0 start-0 d-flex justify-content-between align-items-center bg-light shadow-sm">
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
<main style="margin-top:100px;">
    <router-view></router-view>
</main>

</template>
