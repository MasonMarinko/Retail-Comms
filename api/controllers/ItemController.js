var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('Items home page')
})
// define the about route
router.get('/test', function (req, res) {
  res.send('About Items')
})

module.exports = router