
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

// function optimizeImageQuality2(imageDataURI, quality) {
//     return new Promise((resolve, reject) => {
//         const img = new Image();
//         img.onload = () => {
//             const canvas = document.createElement('canvas');
//             canvas.width = img.width;
//             canvas.height = img.height;
//             const ctx = canvas.getContext('2d');
//             ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
//             ctx.drawImage(img, 0, 0);
//             const optimizedImageDataURI = canvas.toDataURL('image/jpeg', quality);
//             resolve(optimizedImageDataURI);
//         };
//         img.onerror = (err) => {
//             reject(err);
//         };
//         img.src = imageDataURI;
//     });
// }


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

    content = content.replace(/(?<name>[^\s]+)::(?<url>[^\s]+)/gm, '<a href="$2" title="$2">$1</a>')
    // content = content.replace(/(https?:\/\/\S+)/gi, `<a href="$1" class="dotlink">$1</a>`);
    content = content.replace(/_([^*]+)_/g, `<u>$1</u>`);
    content = content.replace(/~([^*]+)~/g, `<s>$1</s>`);
    content = content.replace(/\.\.\.\.(.+?)\.\.\.\./g, "<i>$1</i>");
    content = content.replace(/\.\.\.(.+?)\.\.\./g, "<code class='user-select-all'>$1</code>");
    content = content.replace(/\.\.(.+?)\.\./g, "<b>$1</b>");
    content = content.replace(/!!([\w-]+)/g, `<i class="bi bi-$1"></i>`);

    return content
}

function isArabic(text) {
    var arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text)
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
    // const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^\s&]+)/;
    // const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([^\s&]+)/;
    // const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/|youtube\.com\/live\/)([^\s&]+)/;
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/\?v=)|youtu\.be\/)([^\s&]+)/;


    const match = url.match(regex);
    // if(match) {
    //     const regex = /(?:live\/|channel\/\w+\/live\/|watch\?v=)(\w+)/;
    //     const match = url.match(regex);
    //     return match ? match[1] : null;
    // }
    return match ? match[1] : null;
    
}

async function getYouTubeVideoDetails(videoUrl) {
    return new Promise( async (resolve,reject) => {
        const videoId = this.getYouTubeId(videoUrl);
        console.log(videoId);
        const apiKey = "AIzaSyAM6IGBPEtFrI8w62LSSlpV18LvdJtWRaE";
        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet%2C+contentDetails`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
            // const captions = data.items[0].captions;
            const title = data.items[0].snippet.title;
            const description = data.items[0].snippet.description;
            const thumbnail = data.items[0].snippet.thumbnails.default.url;

            const youtube = { title, description, thumbnail };
            // console.log(youtube)
            // return youtube;
            resolve(youtube)
        } catch (error) {
            console.error(error);
            reject(err)
        }
    })
}

function openFiles() {
    return new Promise((res, rej) => {
        try {
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
        } catch (err) {
            console.log(err);
            rej(500)
        }
    })
}

function noQuotes(str) {
    if (str.startsWith('"') && str.endsWith('"')) {
        return str.substring(1, str.length - 1);
    }
    return str;
}

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 != "object" || obj1 == null ||
        typeof obj2 != "object" || obj2 == null) {
        return false;
    }
    let keys1 = Object.keys(obj1);
    let keys2 = Object.keys(obj2);
    if (keys1.length != keys2.length) {
        return false;
    }
    for (let key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
    return true;
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
    openFiles,
    noQuotes,
    isArabic,
    deepEqual,
    getYouTubeVideoDetails
}