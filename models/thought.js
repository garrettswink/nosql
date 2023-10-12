const { Schema, model, Types } = require('mongoose');
const reactionSchema = require('./reaction');


const thoughtSchema = new Schema(
    {
        username:{
            type: String,
            require: true,
        },
        thoughtText:{
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200,
        },
        createdAt:{
            type: Date,
            default: Date.now,
            get: timestamp => new Date(timestamp).to
        },
        reactions:[reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;