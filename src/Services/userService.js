const apiService = require('./apiService');

const UserService = {
    create:(data) => {
       return apiService.post("/user", data)
       .then(result => result.data)
    },
    getAllUsers:(data) => {
        return apiService.get('/user', data)
        .then (result => result.data)
    },
    login:(data) => {
        return apiService.post('/user/login', data)
        .then(result=>result.data)
    }
    // delete:(itemNumber) => {
    //     console.log(itemNumber)
    //     return apiService.delete(`/item/${itemNumber}`)
    //     .then (result=>result.data)
    // }

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

module.exports = UserService