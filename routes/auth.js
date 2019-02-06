require('dotenv').config()
let request = require('request')
let querystring = require('querystring')

module.exports = server => {
  server.get('/', (req, res, next) => {
    res.send({ msg: 'hello' })
  })

  server.get('/login', (req, res, next) => {
    res.redirect(
      'https://github.com/login/oauth/authorize?' +
        querystring.stringify({
          client_id: process.env.CLIENT_ID,
          redirect_uri: process.env.REDIRECT_URI
        }),
      next
    )
  })

  server.get('/callback/signin', (req, res, next) => {
    let code = req.query.code

    request.post(
      {
        url: 'https://github.com/login/oauth/access_token',
        form: {
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          code: code
        },
        json: true
      },
      function (err, response, body) {
        if (err) throw err

        let accessToken = body.access_token
        let uri = 'http://localhost:3000'
        res.redirect(uri + '?access_token=' + accessToken, next)
      }
    )

    return next()
  })
}
