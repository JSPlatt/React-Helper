// Dependencies used Backend Express.js
//     1. express - npm i express --save
//     2. cors: npm i cors
//     3. axios: npm i axios
//     4. express-jwt: npm i express-jwt 
//     5.jwks-rsa: npm i jwks-rsa
//     6. nodemon: npm i --save-dev nodemon 

const express = require('express')
const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const axios = require('axios')

const app = express()
app.use(cors())

const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://helper-react-5.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'this is a unique identifier',
  issuer: 'https://helper-react-5.us.auth0.com/',
  algorithms: ['RS256']
}).unless({path:['/']})

app.use(jwtCheck);

app.get('/', (req,res) => {
    res.send('Index Route')
})

app.get ('/protected', async (req, res) => {
try{
    const accessToken = req.headers.authorization.split(' ')[1]
    const response = await axios.get('https://helper-react-5.us.auth0.com/userinfo', {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    const userinfo = response.data
    console.log(userinfo)
    res.send(userinfo)
} catch (error){}
    res.send(error.message)
})

app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

app.use((error,req,res,next) => {
    const status = error.status || 500
    const message = error.message || 'Internal server error'
    res.status(status).send(message)
})

app.listen(4000, () => console.log('Server on port 4000'))
