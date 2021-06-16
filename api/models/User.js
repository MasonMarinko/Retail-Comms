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
    username: { 
        type:  Types.String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    department: {
        type: Types.String,
        required: true
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    }
});
userSchema.methods={
    verifyPassword(password) {
        return this.password == password
    }
}
const User = mongoose.model('user', userSchema);
module.exports = User