var express = require('express')
var router = express.Router()
const { Comment, User } = require("../models")
const { pick } = require('lodash')
const authService = require ('../utils/auth')

// define the home page route
router.get('/', async function (req, res) {
  const comments = await Comment.find({})
  .populate('users', 'id firstName lastName')
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
      ...pick(req.body, ["commentType", "employeeName", "message", "readBy"])
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

router.post('/read/:id', async function (req, res) {
  const comment = await Comment.findById(req.params.id)
  if (!comment) {
    return res.status(404).json({message: 'Comment not found'})
  }
  let payload = null
  try {
    payload = authService.decodeToken(req.headers.authorization)
  } catch (err) {
  }
  if (!payload || !payload.id) {
    return res.status(401).json({ message: 'Invalid Authorization'})
  }
  const user = await User.findById(payload.id)
  if (!user) {
    return res.status(404).json({message: 'User not found'})
  }
  res.json({message: "User Added"})
  comment.readBy.push(user.id)
  await comment.save()
})

router.delete('/:commentNumber', async function (req, res) {
  const commentNumber = req.params.id

  Comment.deleteMany({ commentNumber }, function(err) {
    if (err) return console.error(err);
    console.log("Success, comment deleted")
  })

  res.json({
    deleted:true
  })
})

module.exports = router