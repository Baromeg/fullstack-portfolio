require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = process.env.secret

function secureRoute(req, res, next) {
  const authToken = req.headers.authorization

  if (!authToken || !authToken.startsWith('Bearer')) {
    return res.status(401).send({
      message:
        "Unauthorised - There's no token or you're missing the word 'Bearer'"
    })
  }

  const token = authToken.replace('Bearer ', '')

  jwt
    .verify(token, secret, (err, payload) => {
      if (err)
        return res
          .status(401)
          .send({ message: "Unauthorised - The token isn't valid" })
      const userId = payload.sub
      console.log(userId)
      User.findById(userId).then((user) => {
        if (!user)
          return res
            .status(401)
            .send({ message: 'Unauthorised - User not found' })
      })
      req.currentUser = user
      next()
    })
    .catch(() => {
      res.status(401).send({ message: 'Unauthorised - error related to user' })
    })
}

module.exports = secureRoute
