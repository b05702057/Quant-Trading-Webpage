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

const u = new User({
    email: 'b05702057@ntu.edu.tw', 
    password: 'Zack860927'
})
// using the seed file to initialize a database

u.save()
    .then(u => {
        console.log(u)
    })
    .catch(e => {
        console.log(e)
    })
