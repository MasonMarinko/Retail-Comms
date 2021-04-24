var express = require('express')
var router = express.Router()
const { Item } = require("../models")
const { pick } = require('lodash')

// define the home page route
router.get('/',async function (req, res) {
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
        ...pick(req.body, ["employeeName", "itemName", "itemNumber", "price", "quantity"])
    }

    const item = new Item
    item.set(data)
    await item.save()
    res.json({
        item: item.toJSON()
    })

  })


// const itemController = {
    // get all pizzas
    // getAllPizza(req, res) {
    //   Pizza.find({})
    //   .populate({
    //     path: 'comments',
    //     select: '-__v'
    //   })
    //   .select('-__v')
    //   .sort({ _id: -1})
    //     .then(dbPizzaData => res.json(dbPizzaData))
    //     .catch(err => {
    //       console.log(err);
    //       res.status(500).json(err);
    //     });
    // },
  
// get one pizza by id
// getPizzaById({ params }, res) {
//   Pizza.findOne({ _id: params.id })
//     .populate({
//       path: 'comments',
//       select: '-__v'
//     })
//     .select('-__v')
//     .then(dbPizzaData => res.json(dbPizzaData))
//     .catch(err => {
//       console.log(err);
//       res.sendStatus(400);
//     });
// },


// createPizza
// createItem({ body }, res) {
//   console.log("req body: ", body)
//     Item.create(body)
//       .then(dbItemData => res.json(dbItemData))
//       .catch(err => res.status(400).json(err));
//   }
    // // update pizza by id
    // updatePizza({ params, body}, res) {
    //     Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
    //         .then(dbPizzaData => {
    //             if (!dbPizzaData) {
    //                 res.status(404).json({ message: 'No pizza found with this id!'});
    //                 return;
    //             }
    //             res.json(dbPizzaData);
    //         })
    //         .catch(err => res.status(400).json(err));
    // },

// update pizza by id
// updatePizza({ params, body }, res) {
//     Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
//       .then(dbPizzaData => {
//         if (!dbPizzaData) {
//           res.status(404).json({ message: 'No pizza found with this id!' });
//           return;
//         }
//         res.json(dbPizzaData);
//       })
//       .catch(err => res.status(400).json(err));
//   },
// delete pizza
// deletePizza({ params }, res) {
//     Pizza.findOneAndDelete({ _id: params.id })
//       .then(dbPizzaData => {
//         if (!dbPizzaData) {
//           res.status(404).json({ message: 'No pizza found with this id!' });
//           return;
//         }
//         res.json(dbPizzaData);
//       })
//       .catch(err => res.status(400).json(err));
//   }
// }

module.exports = router