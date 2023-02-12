const {Router} = require ('express')
const Reminder = require('../../models/Reminder')
var apn = require('@parse/node-apn');
const router = Router()

router.get('/', async (req, res) => {

    try {
        const reminders = await Reminder.find()
    if (!reminders) throw new Error('No reminders')
    res.status(200).json(reminders)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

router.post('/', async (req, res) => {
    const newReminder = new Reminder(req.body)
    try {
        const reminder = await newReminder.save()
        if(!reminder) throw new Error('Something went wrong with saving the reminder.')
        res.status(200).json(reminder)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const response = await Reminder.findByIdAndUpdate(id, req.body)
        if(!response) throw Error('Something went wrong trying to update')
        const updated = { ... response._doc, ...req.body}
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
     try {
        const removed = await Reminder.findByIdAndDelete(id)
        if(!removed) throw Error('Something went wrong when trying to delete')
        res.status(200).json(removed)
     } catch (error) {
        res.status(500).json({ message: error.message})
     }
    
})

module.exports = router