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

const seedUsers =[
    { 
        email: 'ccl010@ucsd.edu',
        password: 'Zack860927'
    },
    { 
        email: 'zackm509mh@gmail.com',
        password: 'Acescastle'
    }
]

User.insertMany(seedUsers)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })
// the function only inserts when every element complies with the rules
