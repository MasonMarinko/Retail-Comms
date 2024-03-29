const mongoose = require('mongoose');
const { Schema } = mongoose;
const Types = Schema.Types

const commentSchema = new Schema({
    // author: { type: 'ObjectId', ref: 'Person' }
    commentType: {
        type: Types.String,
        required: true
    },
    employeeName: {
        type:  Types.String,
        required: true,
    },
    message: {
        type:  Types.String,
        required: true,
    },
    readBy: [{
        type: Types.ObjectId,
        ref: 'user',
        default: []
    }],
    createdBy: {
        type: Types.ObjectId,
        ref:'user',
        required: true
    },
    createdAt: {
        type: Types.Date,
        default: Date.now,
    }
});

commentSchema.virtual('users', {
    ref: 'user',
    localField: 'readBy',
    foreignField: '_id',
    justOne: false
  });

commentSchema.set('toJSON', { 
    getters: true, 
    virtuals: true,
    transform: function(doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment