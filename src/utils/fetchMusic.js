const fetch = require('node-fetch')

async function fetchMusic(musicQuery){
    const music_url = "https://api.deezer.com/search?lang=en,hi&limit=3&output=json&q="+ encodeURIComponent(musicQuery)
    //fetch the music
    try{
    const  music_data = await fetch(music_url)
    const music_json = await music_data.json()
    let rand = await getrandom(music_json.data)
    return {music:music_json.data[rand].preview}//returns a promise ... to access use .then() 
    }catch(err){
        console.log("Music Error")
    }
}

async function getrandom(jsonfiledata){
    return Math.floor(Math.random() * jsonfiledata.length)
}

//const hey = fetchMusic("hey")//testing done --> is successfully executed
//LESSONS LEARNT
//fetch will always return a promise...things after it will get executed
//and if you try to print 'hey'...it will show up as a pending promise...this can be accessed by
//using .then() on the result... EUREKA  moment here!!
//cracked by myself --> console.log(hey.then(data=>console.log(data)))

module.exports = {fetchMusic, getrandom}