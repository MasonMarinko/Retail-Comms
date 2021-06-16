var express = require('express')
var router = express.Router()
const { pick } = require('lodash')
const { User } = require("../models")
const authService = require("../utils/auth")

// define the home page route
router.get('/', async function (req, res) {
  const users = await User.find({})
  .exec()
  res.json({users})
})
// define the about route
router.get('/test', function (req, res) {
  res.send('Get Users By ID')
})

router.post('/login', async function (req, res){
  // find user
  const {username, password} = req.body
  const user = await User.findOne({username})
  if (!user){
    return res.status(404).json({message: username + " not found"})
  }
  if (!user.verifyPassword(password)) {
    return res.status(400).json({message: "Username and/or password invalid"})
  }
  // return token
  const token = authService.createUserToken(user)
  res.json({token})
})

router.post('/', async function (req, res) {
  // validation here
  const data = {
      quantity: 1,
      ...pick(req.body, ["firstName", "lastName", "password", "username", "department"])
  }

  const user = new User
  user.set(data)
  try {
    await user.save()
  } catch (err) {
    return res.status(400).json({message: err.message})
  }
  res.json({
      user: user.toJSON()
  })
})

module.exports = router