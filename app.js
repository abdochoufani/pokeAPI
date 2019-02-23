const express= require("express")
const hbs= require("hbs")
const app =express()
const axios = require('axios')
var Pokedex = require('pokedex-promise-v2');
var options = {
    protocol: 'https',
    hostName: 'localhost:3000',
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
}
var P = new Pokedex();
const path=require('path')


app.set('view engine', 'hbs')
app.set('views',__dirname +'/views')
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + "/views/partials")

app.get("/", (req,res)=>{
    res.render(__dirname +"/views/home.hbs");
})

app.get("/all-pokemon",(req,res,next)=>{
    var interval = {
        limit: 150
      }
      P.getPokemonsList(interval)
        .then(function(response) {
            res.render(__dirname +"/views/all.hbs", {response})
            console.log(response.results)       
            })
},(req,res)=>{
    
})



app.get("/pokemon", (req,res)=> {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${req.query.pokemon}`)
        .then((response)=> {
            console.log(response)
            res.render(__dirname +"/views/pokemon.hbs", {response})
        })
})


app.listen(3000);