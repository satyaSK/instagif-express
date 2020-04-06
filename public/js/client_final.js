//Custom API was created to fetch gifs and music - used express - got a fair understanding of promises and async/await.

//works fine, except chrome is disallowing play() without DOM interaction. So, the music playing
//is kinda inconsistent. typing needs to be done in an "unmuted" mode for DOM to play music after a key press
//an alternative way could be by using const audio = new Audio(".mp3 file") but using this
//causes audios to overlap...so everytime this is called...maybe a deconstructor should do the job


const button = document.querySelector('#search')
const gifInput = document.querySelector('#gif')
const trendingBtn = document.querySelector('#trends')
const instagif = document.querySelector('#joey')
const body = document.querySelector('#body')
const musicBtn = document.querySelector('#musicbtn')
const gifurl = 'https://api.giphy.com/v1/gifs/search?api_key=Upu1PbcVEcikCbr4wFjRcrND4OeSfbIS&limit=7&q='
let imgs = document.getElementsByTagName("img")

function loadData(){
    const query = gifInput.value
    fetch('http://127.0.0.1:3000/'+ encodeURIComponent(query))
    .then((res)=>{
        return res.json()
    })
    .then((data)=>{
        console.log(data)
        playMusic(data.music)
        playGifs(data.gifs)
    })
    .catch((err)=>{
        console.log("Error occured: "+err)
    })
    
}


window.addEventListener('load', (e)=>{
    //e.preventDefault()
    setTimeout(()=>{
        loadIntro()
    }, 1500)
})

gifInput.addEventListener('keyup',(e)=>{
    //e.preventDefault()
    if ( (e.which==32)||(e.which==8)||(e.which <= 90 && e.which >= 48)){
        loadData()
    }
    
})

playGifs = (gifs_json)=>{
    
        //console.log(JSON.parse(mygiphy.responseText))
        document.querySelector('#title').innerHTML = gifs_json.payload.data[0].title.replace("GIF","").toLowerCase()
        .split(' ')
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
        //document.querySelector('#gifholder_link').href = payload.data[0].images.downsized_medium.url
        document.querySelector('#gifholder').src = gifs_json.payload.data[0].images.fixed_height.url
        document.querySelector('#gifholder').title = gifs_json.payload.data[0].title
        createHTML(gifs_json.payload.data)
}

createHTML = (a)=>{
    //console.log("crazyy")
    for(var i=1; i<a.length;i++){
        var s = i.toString(10)
        //document.querySelector('#gifholder'+s+'_link').href = a[i].images.original.url
        document.querySelector('#gifholder'+s).src = a[i].images.fixed_width.url
        document.querySelector('#gifholder'+s).title = a[i].title
    }
}


instagif.addEventListener('click',(e)=>{
    e.preventDefault()
    random = ["Joey","Trump","Beiber","Macklemore","putin","Game of Thrones","Tom Cruise","Chandler","Uptown Funk","Sacred Games","The Office","Mark Zuckerburg","Facepalm","Dab","Bollywood","Cute Baby","The Social Network"]
    gifInput.value =  random[Math.floor(Math.random() * random.length)]
    loadData()
    
})

playMusic = (music_json)=>{
    // console.log(music_json.music)
    document.querySelector('#music').src = music_json.music
}


// getrandom = (jsonfiledata)=>{
//     return Math.floor(Math.random() * jsonfiledata.length)
// }

function loadIntro(){
    
        random = ["dostana","sholay","kabir singh","ariana","dil chahta hai","pewdiepie","eminem","kal ho na ho","hotline bling","koi mil gaya","dilwale","miguel herrera"]
        gifInput.value = random[Math.floor(Math.random() * random.length)];
        loadData()
    
}

var toggle = 0
var firstTimeOnLoad = true

musicBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    if ( toggle == 0)
    {   
        
        document.getElementById('musicbtn').style.color = '#bdbdbd'
        document.getElementById('musicbtn').style.backgroundColor = 'white'
        document.getElementById('music').muted = false
        document.getElementById('musicbtn').innerHTML = "||||||||||"
        setTimeout(()=>{document.getElementById('musicbtn').innerHTML = "Mute"},100)
        toggle = 1
        
    }
    else{
        document.getElementById('musicbtn').style.color ='white' 
        document.getElementById('musicbtn').style.backgroundColor = '#bdbdbd'
        document.getElementById('music').muted = true
        document.getElementById('musicbtn').innerHTML = "||||||||"
        setTimeout(()=>{document.getElementById('musicbtn').innerHTML = "Music"},100)
        toggle = 0
    }
})


//var inputElem = document.getElementsByTagName('input');
arr = []

for(var i = 0; i < imgs.length; i++) {
    imgs[i].addEventListener('click', function(e){
        if (e.target && e.target.id){ //dynamic loading...event delegation
            e.preventDefault()
            let giftitle = document.getElementById(e.target.id).title
            giftitle = giftitle.replace("GIF","").replace("By","")
            //console.log(giftitle)
            let words = giftitle.split(" ")
            let query = giftitle
            if ( words.length > 0 ){
                query = words.splice(0,2).join(" ")
            }
            gifInput.value = query
            //console.log(gifInput.value)
            loadData()
    } 
    }, true);
}