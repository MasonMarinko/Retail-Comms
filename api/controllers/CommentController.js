var express = require('express')
var router = express.Router()

// define the home page route
router.get('/', function (req, res) {
  res.send('Comments home page')
})
// define the about route
router.get('/test', function (req, res) {
  res.send('About Comment')
})

router.post('/', async function (req, res) {
  // validation here
  const data = {
      ...pick(req.body, ["fullName", "commentBody"])
  }

  const comment = new Comment
  comment.set(data)
  try {
    await comment.save()
  } catch (err) {
    return res.status(400).json({message: err.message})
  }
  res.json({
      comment: comment.toJSON()
  })
})

module.exports = router