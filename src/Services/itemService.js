const apiService = require('./apiService');

const ItemService = {
    create:(data) => {
       return apiService.post("/item", data)
       .then(result => result.data)
    },
    getAllItems:(data) => {
        return apiService.get('/item', data)
        .then (result => result.data)
    },
    delete:(data) => {
        console.log(data)
        return apiService.delete('/item/${id}', data)
        .then (result=>result.data)
    }

    //   delete item
//     deleteItem({ params }, res) {
//         data.findOneAndDelete({ _id: params.id })
//         .then(dbItemData => {
//         if (!dbItemData) {
//             res.status(404).json({ message: 'No Item found with this id!' });
//         return;
//       }
//       res.json(dbItemData);
//     })
//     .catch(err => res.status(400).json(err));
// }
    
}

module.exports = ItemService