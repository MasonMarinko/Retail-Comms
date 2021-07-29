const mongoose = require('mongoose');
const { Schema } = mongoose;
const Types = Schema.Types
const bcrypt = require('bcrypt')

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

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }
})

const User = mongoose.model('user', userSchema);
module.exports = User