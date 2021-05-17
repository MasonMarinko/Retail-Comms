var express = require('express')
var router = express.Router()
const { Comment } = require("../models")
const { pick } = require('lodash')

// define the home page route
router.get('/', async function (req, res) {
  const comments = await Comment.find({})
  .exec()
  res.json({comments})
})
// define the about route
router.get('/:id', function (req, res) {
  res.send('Get Comment By ID')
})

router.post('/', async function (req, res) {
  // validation here
  const data = {
      ...pick(req.body, ["employeeName", "message"])
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

router.delete('/:commentNumber', async function (req, res) {
  const commentNumber = req.params.commentNumber

  Comment.deleteMany({ commentNumber }, function(err) {
    if (err) return console.error(err);
    console.log("Success, comment deleted")
  })

  res.json({
    deleted:true
  })
})

module.exports = router