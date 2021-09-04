const express = require('express')
const path = require('path')
const { NOTFOUND } = require('dns')
const app = express()
const window = require('window')
const alert = require('alert')

const mongoose = require('mongoose')
const User = require('./models/user.js')

mongoose.connect('mongodb://localhost:27017/users', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('CONNECTION OPEN')
    })
    .catch(err => {
        console.log('ERROR')
        console.log(err)
    })
// use the new parser and the new connection management engine to place the deprecated ones

// app.use((req, res) => {
//     console.log("we have a new request!")
//     res.send("<h1>hello</h1>")// sending strings, html texts, or other objects to the webpage of the requester
// }) // this will run whenever we get any request, including get request, post request, and other requests
// // We can only get a response when we send a request, so we cannot use app.use((req, res)) with other funtions

app.set('view engine', 'ejs') // allowing emdedded javascript in html texts
app.set('views', path.join(__dirname, '/views')) // ＿＿dirname is the directory of this file (index.js)
// if the current directory is not same as the directory of index.js, nodemon cannot find views automatically

app.use(express.static(path.join(__dirname, 'public'))) // linking css files
// same directory issue as views

app.use(express.urlencoded({extended: true})) // reading requests as urls
app.use(express.json()) // reading requests as json files
// express has different ways of parsing requests

app.post('/home', (req, res) => {
    res.send('please use a get request!!!') // the response can be different even though the urls are the same
})

app.get('/home', (req, res) => {
    const cssPaths = ["/home/home.css"]
    res.render('home.ejs', {cssPaths}) // views is the defualt folder when ejs is used, and the function is res.render
}) // we can send only get request via a webpage, but we can send other kinds of requests with postman

app.get('/products', (req, res) => {
    const cssPaths = ["/products/products.css"]
    res.render('products.ejs', {cssPaths}) // home.css only contain the basic styles
}) // only response when the string after localhost:3000 is exactly /products

app.get('/account', (req, res) => {
    const cssPaths = ["/account/account.css"]
    res.render('account.ejs', {cssPaths})
})

app.get('/maintenance', (req, res) => {
    const cssPaths = ["/maintenance/maintenance.css"]
    res.render('maintenance.ejs', {cssPaths})
})

app.get('/join/:reason', (req, res) => {
    const cssPaths = ["/account/account.css"]
    const {reason} = req.params 
    res.render('join.ejs', {cssPaths, reason})
}) // :reason is different from * because it does not include empty strings and slashes

app.get('/database', (req, res) => {
    const cssPaths = ["/maintenance/maintenance.css", "/database/database.css"]
    res.render('database.ejs', {cssPaths})
})

app.post('/database', async (req, res) => {
    const {email, password, confirmation} = req.body
    const users = await User.find({email: email})

    if (users.length != 0){
        res.redirect('/join/accountRepeated') // res.redirect will generate a get request instead of a post request
        // the action to store the information in the database will not be repeated
    }
    else if (password.length < 8){
        res.redirect('join/passwordTooShort')
    }
    else if (password != confirmation){ 
        res.redirect('/join/confirmationError')
    }
    else{
        const newUser = {email: email, password: password}
        User.create(newUser)
        res.redirect('/database')
    }
})

app.get('*', (req, res) => {
    const {q} = req.query
    console.log(q)
    res.send(`${q}`)// the star can match everthing
}) // this has to be placed here because the res.send funtion works like "return" in a function

app.listen(3000, () => {
    console.log('listening on port 3000')
}) // the app is set up and will listen to incoming requests
