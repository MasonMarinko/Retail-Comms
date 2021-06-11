var express = require('express')
var router = express.Router()
const { pick } = require('lodash')
const { User } = require("../models")

// define the home page route
router.get('/', function (req, res) {
  res.send('Users home page')
})
// define the about route
router.get('/test', function (req, res) {
  res.send('About Users')
})
router.post('/', async function (req, res) {
  // validation here
  const data = {
      quantity: 1,
      ...pick(req.body, ["firstName", "lastName", "password", "department"])
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