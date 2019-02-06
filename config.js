module.exports = {
  ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 9000,
  URL: process.env.BASE_URL || 'http://localhost:6000',
  MONGODB_URI: process.env.MONGODB_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
}
