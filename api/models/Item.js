const mongoose = require('mongoose');
const { Schema } = mongoose;
const Types = Schema.Types

const itemSchema = new Schema({
    // author: { type: 'ObjectId', ref: 'Person' }
    fullName: { 
        type:  Types.String,
        required: true,
    },
    itemNumber: { 
        type:  Types.Number,
        required: true,
        unique: true
    },
    itemName: { 
        type:  Types.String,
        required: true
    },
    itemPrice: {
        type: Types.Number,
        required: false

    },
    itemQuantity: {
        type: Types.Number,
        required: true
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    }
});

const Item = mongoose.model('item', itemSchema);
module.exports = Item