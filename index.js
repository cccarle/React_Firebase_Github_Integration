require('dotenv').config()
const restify = require('restify')
const mongoose = require('mongoose')
const config = require('./config/config')
const rjwt = require('restify-jwt-community')

const server = restify.createServer()

// Middleware
server.use(restify.plugins.bodyParser({ requestBodyOnGet: true }))
server.use(restify.plugins.queryParser())

// Start server and conncection to DB
server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false)
  mongoose.connect(
    config.MONGODB_URI,
    { useNewUrlParser: true }
  )
})

const db = mongoose.connection

db.on('error', err => console.log(err))

db.once('open', () => {
  require('./routes/auth')(server)
  console.log(`Server started on port ${config.PORT}`)
})
