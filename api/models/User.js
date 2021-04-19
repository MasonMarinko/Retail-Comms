const mongoose = require('mongoose');
const { Schema } = mongoose;
const Types = Schema.Types

const userSchema = new Schema({
    // author: { type: 'ObjectId', ref: 'Person' }
    firstName: { 
        type:  Types.String,
        required: true,
    },
    lastName: { 
        type:  Types.String,
        required: true,
    },
    email: { 
        type:  Types.String,
        required: true,
        index: true,
        unique: true,
        set: function(email) {
            return email.toLowerCase().trim()
        }
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    }
});

const User = mongoose.model('user', userSchema);
module.exports = User