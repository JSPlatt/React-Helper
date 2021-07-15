// Dependencies used Backend Express.js
//     1. express - npm i express --save
//     2. cors: npm i cors
//     3. axios: npm i axios
//     4. express-jwt: npm i express-jwt 
//     5.jwks-rsa: npm i jwks-rsa

const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

app.get('/', (req,res) => {
    res.send('Index Route')
})

app.get ('/protected', (req, res) => {
    res.send('Protected Route')
})

app.listen(4000, () => console.log('Server on port 4000'))
