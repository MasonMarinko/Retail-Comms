const mongoose = require('mongoose');
const { Schema } = mongoose;
const Types = Schema.Types

const itemSchema = new Schema({
    // author: { type: 'ObjectId', ref: 'Person' }
    employeeName: { 
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
    price: {
        type: Types.Number,
        required: false

    },
    quantity: {
        type: Types.Number,
        required: true
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    }
});

itemSchema.set('toJSON', { 
    getters: true, 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

const Item = mongoose.model('item', itemSchema);
module.exports = Item