<template>
  <section class="container my-5">
    <div class="row">
        
        <figure>
            <!-- Swiper -->
            <div class="swiper w-100 h-100">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="m in media" :key="m">
                        <section class="ratio ratio-16x9" v-if="m.type == 'youtube'">
                            <iframe class="img-fluid object-fit-cover rounded" :src="`https://www.youtube.com/embed/${m.src}`" :title="m.alt" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                        </section>
                        <section v-if="m.type == 'image'">
                            <img :src="m.src" :alt="m.alt" class="img-fluid rounded">
                        </section>

                    </div>
                </div>
                
                <!-- Add Arrows -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination position-static my-3"></div>
        </figure>
        <article>
            <h1>{{title}}</h1>
        </article>
    </div>
    <div class="row">
        <slot class="col-12 col-lg-4"></slot>
    </div>
  </section>
</template>

<script>
export default {
    props:['media','title'],
    mounted(){
        
        var swiper = new Swiper('.swiper', {
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
        });
    }
}
</script>