require('dotenv').config()

var client = require('twilio')(
	process.env.TWILIO_ACCOUNT_SID, //AC7f7378c424a76db9b97e21e4990f261e
	process.env.TWILIO_AUTH_TOKEN //136c9b19f292657ba0bb07b7f4566cbc
);
 
client.messages.create({
	from: process.env.TWILIO_PHONE_NUMBER, //+441432233616
	to: '+447767960919',	//process.env.CELL_PHONE_NUMBER
	body: "Some of us go to the node.js gym"
}, function(err, message) {
	if(err) {
		console.error(err.message);
	}
});