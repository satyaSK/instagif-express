const express = require("express")
const path = require('path')
const cors = require('cors')
const {fetchGifs} = require('./utils/fetchGifs')
const {fetchMusic, getrandom} = require('./utils/fetchMusic')

var port = process.env.PORT || 3000

const PATH = path.join(__dirname,"../public")
app = express()
app.use(cors()) 
app.use(express.static(PATH))

// app.get('/', (req, res) => {
//     console.log("heyy")
//     res.render('index')
// })


app.get('/:instaSearch',async (req,res)=>{
    const query = req.params.instaSearch
    let music = await fetchMusic(query)
    let gifs = await fetchGifs(query)
    res.status(201).send({music,gifs})  
})

app.listen(port,()=>{
    console.log(`Server live at port: ${port}`)
})