require('dotenv').config();
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const connect = require('./connection/connection')
const routes = require('./routes')
const session = require('express-session')
const path = require('path')
const port = process.env.PORT || 4001


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}))

app.use('/public', express.static(__dirname + '/public'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })

 

routes(app)

connect()


app.listen(port, () => {
 console.log(`Express is running on http://localhost:${port}`)
})