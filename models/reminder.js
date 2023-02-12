const { Schema, model } = require('mongoose')

const ReminderSchema = new Schema ({
    isReoccuring: {
        type: Boolean,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    sendTo: {
        type: String,
        required: true
    }
})

const Reminder = model('reminder', ReminderSchema)

module.exports = Reminder