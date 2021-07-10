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
    delete:(itemNumber) => {
        return apiService.delete(`/item/${itemNumber}`)
        .then (result=>result.data)
    }
    
}

module.exports = ItemService