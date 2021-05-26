require('dotenv').config()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const secret = process.env.secret

function createUser(req, res) {
  const body = req.body
  console.log(body)
  User.create(body)
    .then((user) => {
      console.log(user)
      res.send(user)
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
}

function loginUser(req, res) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).send({ message: 'Email not found!' })
      }
      if (!user.validatePassword(req.body.password)) {
        return res
          .status(401)
          .send({ message: "Unauthorised: Password doesn't match email" })
      }
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })

      const userId = user._id
      const userName = user.username

      res
        .status(202)
        .send({ token, userId, userName, message: 'Login was successful!' })
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    })
}

function getUsers(req, res) {
  User.find()
    .populate('user')
    .then((userList) => {
      res.send(userList)
    })
    .catch((error) => res.send(error))
}

function getUser(req, res) {
  User.findById(req.params.userId)
    .populate('user')
    .then((user) => {
      res.send(user)
    })
    .catch((error) => res.send(error))
  console.log('test')
}

module.exports = {
  createUser,
  loginUser,
  getUser,
  getUsers
}
