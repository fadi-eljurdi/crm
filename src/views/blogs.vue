<template>
    <section class="container">
        
        <div class="row">
            <h3 class="pop text-secondary fs-3">Create new blog</h3>
            <p class="text-secondary fs-small">Our platform offers an easy and seamless way to manage your contact information, ensuring that you're always up-to-date and never miss out on important opportunities.</p>
        </div>
        <div class="row my-3 px-3">
            <nav class="w-100 p-2 d-flex justify-content-between align-items-center font-monospace">
                <div class="d-flex gap-4">
                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">youtube_activity</span>
                    <button class="btn btn-sm btn-outline-secondary d-none d-lg-block">+Youtube</button>

                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">add_photo_alternate</span>
                    <button class="btn btn-sm btn-outline-secondary d-none d-lg-block">+Image</button>

                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">auto_awesome</span>
                    <button class="btn btn-sm btn-outline-secondary d-none d-lg-block">AI-Generator</button>

                    <span class="material-symbols-outlined d-block d-lg-none text-secondary fs-3">preview</span>
                    <button class="btn btn-sm btn-outline-secondary d-none d-lg-block">Preview changes</button>
                </div>
                <span class="material-symbols-outlined d-block d-lg-none text-primary fs-3">upload</span>
                <button class="col-1 btn btn-sm btn-primary d-none d-lg-block">DEPLOY</button>
            </nav>
        </div>
        <hr class="my-3">
        <section class="d-flex flex-column gap-2">
            
            <div class="row">
                <div class="col-12 col-md-2 pb-2">Title</div>
                <div class="col-12 col-md-10"><input type="text" class="form-control"></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">SEO - Description</div>
                <div class="col-12 col-md-10"><textarea rows="3" type="text" class="form-control"></textarea></div>
            </div>
            <div class="row">
                <div class="col-12 col-md-2 pb-2">SEO - Keywords</div>
                <div class="col-12 col-md-10"><input type="text" class="form-control"></div>
            </div>
        </section>
    </section>
</template>