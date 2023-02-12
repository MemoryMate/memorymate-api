const {Router} = require ('express')
const User = require('../../models/User')
var apn = require('@parse/node-apn');
const router = Router()

router.get('/', async (req, res) => {

    try {
        const users = await User.find()
    if (!users) throw new Error('No users')
    res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message})
    }

})

router.post('/', async (req, res) => {
    const newUser = new User(req.body)
    try {
        const user = await newUser.save()
        if(!user) throw new Error('Something went wrong with saving the user.')
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const response = await User.findByIdAndUpdate(id, req.body)
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
        const removed = await User.findByIdAndDelete(id)
        if(!removed) throw Error('Something went wrong when trying to delete')
        res.status(200).json(removed)
     } catch (error) {
        res.status(500).json({ message: error.message})
     }
    
})

router.post('/set_token/:id', async (req, res)=>{
    const { id } = req.params
    try{
        // var user = await User.findById(id)
        console.log("token", req.body.token)
        const response = await User.findByIdAndUpdate(id, {apnToken: req.body.token})
        console.log("user", response)
        res.status(200).json(response)
    }catch(err){
        res.status(500).json({ message: error.message})
    }
})

router.post('/send_notification/:id', async (req, res)=>{

    const { id } = req.params
    try{
        let user = await User.findById(id)
        console.log(user)
        var token = user.apnToken;
        var options = {
            cert: __dirname + '/cert.pem',
            key: __dirname + '/key.pem'
        };
        console.log(token)
        var apnConnection = new apn.Provider(options)
        // var apnConnection = new apn.Connection(options);
        apnConnection.on('error', function(error) {
            console.error(error);
        });
        // var myDevice = new apn.Device(token);
    
        var note = new apn.Notification();
    
        note.expiry = Math.floor(Date.now() / 1000) + 3600;
        note.badge = 3;
        note.sound ="beep-beep.caf"
        note.alert = "\uD83D\uDCE7 \u2709 hey chris";
        note.payload = {'messageFrom': 'Caroline'};
        note.topic = "com.hackville.memorymates"

       return apnConnection.send(note, token).then( (result) => {
            // see documentation for an explanation of result
            console.log(result)
            return res.json({status: result})
          });

        // apnConnection.pushNotification(note, myDevice);
  
    }catch(error){
        console.log(error)
        res.status(500).json({ message: error.message})
    }
})

module.exports = router