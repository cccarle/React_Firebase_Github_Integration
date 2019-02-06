require('dotenv').config()

const clientID = process.env.CLIENT_ID
const redirectURI = process.env.REDIRECT_URI

module.exports = server => {
  server.get('/login', (req, res, next) => {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}`,
      next
    )
  })
}
