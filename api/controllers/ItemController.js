var express = require('express')
var router = express.Router()
const { Item } = require("../models")
const { pick } = require('lodash')
const { deleteMany } = require('../models/User')

// define the home page route
router.get('/', async function (req, res) {
    const items = await Item.find({})
    .exec()
    res.json({items})
})

// define the about route
router.get('/:id', function (req, res) {
  res.send('Get Item by ID')
})

router.post('/', async function (req, res) {
    // validation here
    const data = {
        quantity: 1,
        ...pick(req.body, ["employeeName", "itemName", "itemNumber", "itemPrice", "itemNotes", "itemQuantity"])
    }

    const item = new Item
    item.set(data)
    try {
      await item.save()
    } catch (err) {
      return res.status(400).json({message: err.message})
    }
    res.json({
        item: item.toJSON()
    })
  })

  router.delete('/:itemNumber', async function (req, res) {
    // validation here
    const itemNumber = req.params.itemNumber

    Item.deleteMany({ itemNumber }, function(err) {
      if (err) return console.error(err);
      console.log("Success, its a miracle")
    })

    res.json({
        deleted:true
    })
  })



module.exports = router