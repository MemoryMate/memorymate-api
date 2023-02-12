const { Schema, model } = require('mongoose')

const ReminderSchema = new Schema ({
    
    senderName:{
        type: String,
        required: true
    },
    senderImage:{
        type: String,
        required: true
    },
    isReoccuring: {
        type: Boolean,
        required: true
    },
    title:{
        type: String,
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