require('dotenv').config();
const express = require('express')
const { Mongoose } = require('mongoose')
const app = express()
const mongoose = require('mongoose')
//const {PORT, mongoUri} = require('./config')
const PORT = 3000
const mongoUri = process.env.MONGO_URI
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const UserRoutes = require('./routes/api/users')
const ReminderRoutes = require('./routes/api/reminders')
app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose.connect(mongoUri, {
})
.then(() => console.log('MongoDB database connected...'))
.catch((err) => console.log(err))

app.use('/api/reminders', ReminderRoutes)
app.use('/api/users', UserRoutes)
app.get('/', (req, res) => res.send('Hello world'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`))