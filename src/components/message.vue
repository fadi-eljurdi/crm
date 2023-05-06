<template>
    <section class="w-100 h-100 bg-glass position-fixed z-3 top-0 start-0">
        <div class="container">
            <div class="row justify-content-center my-5">
                <div class="col-11 col-lg-8 bg-dark rounded p-3 d-flex flex-column gap-3 flex-lg-row justify-content-between align-items-center">
                    <div class="d-flex gap-2 align-items-center flex-column flex-lg-row">
                        <h5 class="fs-5 text-info m-0 pop text-center"> {{title}} </h5>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <button v-if="callback" :disabled="spinner" @click="runCallback()" class="btn btn-sm btn-info">Confirm</button>
                        <div class=""><slot></slot></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    props:['title','callback','spinner'],
    methods:{
        runCallback(){
            this.callback()
        }
    },
    
}
</script>