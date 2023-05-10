class Terms {
    constructor(data,domain){
        this.domain = domain
        this.data = data
        this.template =
        /*html */
        `
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Jurdi</title>
    <link rel="stylesheet" href="./assets/css/app.css">
    <link rel="stylesheet" href="./assets/css/responsive.css">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <!-- VUE JS -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
</head>

<body id="app">
    <header-section  :utilities="utilities" :logo="logo" :contact="contact" ></header-section>
    <main style="margin-top: 100px;">
        <section class="container my-5">
            <div class="row">
                <div class="col-12">
                    <section>##terms</section>
                </div>
            </div>
        </section>
    </main>
    
    <footer-section :services="services" :links="links" :utilities="utilities" :contact="contact"></footer-section>
    
    <section v-if="blogSpinner" class="w-100 h-100 z-2 position-fixed top-0 start-0 bg-glass d-flex justify-content-center align-items-center">
        <span class="spinner spinner-grow"></span>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3"
        crossorigin="anonymous"></script>

    <script type="module" src="./assets/js/app.js"></script>
    <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
</body>

</html>
        `
    }

    render(){
        
        var page = this.template
        if(this.domain == 'www.jurdilaw.com'){
            page =
            /*html */
            `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>JURDI & CO LLC</title>
    <link rel="stylesheet" href="./assets/css/main.css">
    <link rel="stylesheet" href="./assets/css/animations.css">
    <link rel="stylesheet" href="./assets/css/responsive.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    
    <!-- Day js -->
    <script src="https://cdn.jsdelivr.net/npm/dayjs@1.10.6/dayjs.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dayjs@1.10.6/plugin/relativeTime.min.js"></script>
    <!-- VUE JS -->
    <script src="https://unpkg.com/vue@3/dist/vue.global.prod.js"></script>
  </head>
  <body class="bg-aswad" id="app">
    <header-section :services="profile.services" :contact="contact" :utilities="utilities"></header-section>
    <main style="margin-top: 80px;" class="text-heading">
        <section class="container my-5">
            <div class="row">
                <div class="col-12">
                    <section>##terms</section>
                </div>
            </div>
        </section>
    </main>
    <footer-section :services="profile.services" :contact="contact" :links="profile.links" :utilities="utilities"></footer-section>
    <section v-if="blogSpinner" class="w-100 h-100 position-fixed start-0 top-0 z-3 bg-glass d-flex justify-content-center align-items-center">
      <span class="spinner-grow text-heading"></span>
    </section>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ENjdO4Dr2bkBIFxQpeoTz1HIcje39Wm4jDKdf19U8gI4ddQ3GYNS7NTKfAdVQSZe" crossorigin="anonymous"></script>
    <script src="./assets/js/vue.js" type="module"></script>
</body>
</html>
            `
        }
        page = page.replace('##terms',this.data)
        return page
    }
}

export default Terms