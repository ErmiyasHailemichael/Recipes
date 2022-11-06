// DEPENDENCIES
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const Recipes = require('./models/recipes')

require('dotenv').config()

const PORT = process.env.PORT

mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

// DATABASE connection
const db = mongoose.connection
db.on('error',(err) => console.log(err.message))
db.on('connected',()=> console.log('mongo connected'))
db.on('disconnected',()=>console.log('mongo disconnected'))

// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

// I        N       D       U       C       E       S
// INDEX    NEW     DELETE  UPDATE  CREATE  EDIT    SHOW
// INDEX
app.get("/recipes",(req, res)=>{
    Recipes.find({},(error, allrecipes)=>{
        res.render("index.ejs",{
            recipes: allrecipes,
        })
    })
})
// NEW
app.get('/recipes/new', (req, res)=>{
    res.render('new.ejs')
    // res.send('New works')
})
// CREATE ROUTE
app.post("/recipes",(req, res)=>{
    Recipes.create(req.body,(error, Createdrecipes)=>{
        res.send(Createdrecipes);
    })
})



app.listen(PORT,()=>console.log(`Server is live on port :${PORT}`))