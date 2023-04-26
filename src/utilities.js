
function optimizeImageQuality(imageDataURI, quality) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // const quality = 0.7; 
            const optimizedImageDataURI = canvas.toDataURL('image/jpeg', quality);
            resolve(optimizedImageDataURI);
        };
        img.onerror = (err) => {
            reject(err);
        };
        img.src = imageDataURI;
    });
}

function file64(path) {
    return new Promise((yes, no) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(path)
            reader.onload = () => {
                yes(reader.result)
            }
        } catch (err) {
            no(err)
        }
    })
}

function timo(date) {
    dayjs.extend(window.dayjs_plugin_relativeTime);
    dayjs();
    const futureDate = dayjs(date);
    // console.log(futureDate.fromNow());
    return futureDate.fromNow()
}

function focus(id) {
    document.getElementById(id).focus()
}


function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function compile(id) {
    var editor = document.getElementById(id)
    var content = editor.innerText
    
    
    
    // content = content.replace(/ /g, "&nbsp");
    content = content.replace(/(\r\n|\n|\r)/g, "<br>");

    content = content.replace(/(https?:\/\/\S+)/gi, `<a href="$1">$1</a>`);
    content = content.replace(/_([^*]+)_/g, `<u>$1</u>`);
    content = content.replace(/~([^*]+)~/g, `<s>$1</s>`);
    content = content.replace(/\.\.\.\.(.+?)\.\.\.\./g, "<i>$1</i>");
    content = content.replace(/\.\.\.(.+?)\.\.\./g, "<code class='user-select-all'>$1</code>");
    content = content.replace(/\.\.(.+?)\.\./g, "<b>$1</b>");
    content = content.replace(/!!([\w-]+)/g, `<i class="bi bi-$1"></i>`);
    
    // content = content.replace(/(?<name>[^\s]+)::(?<url>[^\s]+)/gm, '<a href="$2" title="$2" >$1</a>')
    return content
}

function text64(htmlString) {
    const encoder = new TextEncoder();
    const binaryData = encoder.encode(htmlString);
    const base64Data = btoa(String.fromCharCode(...new Uint8Array(binaryData.buffer)));
    return base64Data;
}
function parseHTML(id, value) { document.getElementById(id).innerHTML = value }

async function hostImages(api, images) {

    var res = await fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain",
        },
        body: JSON.stringify(images)
    })
    res = await res.json()
    return res
}

function getYouTubeId(url) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function openFiles() {
    return new Promise((res,rej) => {
        try{
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/png, image/jpeg');
            input.setAttribute('multiple', true);
            // document.appendChild(input)
            console.log(input);
            input.click();
            input.addEventListener('change', e => {
                console.log(e.target.files);
                res(e.target.files)
            })
        }catch(err){
           console.log(err);
           rej(500)
        }
    })
}


export default {
    optimizeImageQuality,
    file64,
    timo,
    focus,
    getCurrentDate,
    compile, parseHTML,
    hostImages,
    text64,
    getYouTubeId,
    openFiles
}