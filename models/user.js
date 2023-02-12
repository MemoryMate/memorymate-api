const { Schema, model } = require('mongoose')

const UserSchema = new Schema ({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    apnToken: {
        type: String,
        required: true
    },
    isLoggedIn: {
        type: Boolean,
        required: true
    },
    mates: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = model('user', UserSchema)

module.exports = User