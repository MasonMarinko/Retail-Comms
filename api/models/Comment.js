const mongoose = require('mongoose');
const { Schema } = mongoose;
const Types = Schema.Types

const commentSchema = new Schema({
    // author: { type: 'ObjectId', ref: 'Person' }
    fullName: { 
        type:  Types.String,
        required: true,
    },
    commentBody: { 
        type:  Types.String,
        required: true,
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    }
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment