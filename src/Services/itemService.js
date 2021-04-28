const apiService = require('./apiService');
const axios = require('axios');

const ItemService = {
    create:(data) => {
       return apiService.post("/item", data)
       .then(result => result.data)
    }
}

// const getData = {
//     get:(data) => {
//         return apiService.get('/item', data)
//         .then (result => result.data)
//     }
// }

// function getData(){
//     return axios.get('/item').then( (res) => {
//             console.log(res.data);
//         })
//         .catch( (err) => {
//             console.log(err)
//         })
// }

module.exports = ItemService