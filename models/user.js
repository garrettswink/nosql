const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
{
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            ],
    },
    friends: [
        {
            type: Schema.Types.ObjectID,
            ref: 'User',
        },
    ],
    thoughts: [
        {
            type: Schema.Types.ObjectID,
            ref: 'Thought',
        },
    ],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
}
);

userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;