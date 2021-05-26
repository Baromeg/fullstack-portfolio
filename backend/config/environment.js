// * Heroku port customisation
const port = process.env.PORT || 8000
// * Environment customisation
const env = process.env.NODE_ENV || 'development'
const dbURI =
  env === 'production'
    ? process.env.MONGODB_URI
    : `mongodb://localhost/portfolioDB-${env}`

module.exports = {
  port,
  dbURI
}
