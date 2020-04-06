const fetch = require('node-fetch')

async function fetchGifs(gifQuery){   
    const gif_url = 'https://api.giphy.com/v1/gifs/search?api_key=Upu1PbcVEcikCbr4wFjRcrND4OeSfbIS&limit=7&q='+ encodeURIComponent(gifQuery)
    const  gif_data = await fetch(gif_url)
    const  payload = await gif_data.json()
    return {payload}
}

//const x = fetchGifs('a')
//x.then(data=>console.log(data))

module.exports = {fetchGifs}