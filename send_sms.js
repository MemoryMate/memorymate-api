// Download the helper library from https://www.twilio.com/docs/node/install
// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
require('dotenv').config();


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);


client.messages
  .create({
     body: 'This is MemoryMates, please visit our link https://ndeluca.ca',
     from: '+19896595298',
     to: '+19056165625'
   })
  .then(message => console.log(message.sid));
