/**
*	
*	The sendSms function uses the Twilio client to send sms. 
*
*	Require the Twilio module and create a REST client
*	Load config from config.js, which in turn loads and checks the .env file
*
*/
var config = require('./config');
var client = require('twilio')(config.accountSid, config.authToken);

module.exports.sendSms = function(to, message) {
	return new Promise ( (resolve, reject) => {
		client.messages.create({
			body: message,
			to: to,
			from: config.sendingNumber
			// mediaUrl: 'http://www.yourserver.com/someimage.png' // probably for MMS usage
		}, (err, data) => {
			if(err) {
				console.error(err.message);
				reject(err);
			}
			else {
				// "data" is a JavaScript object containing data received from Twilio.
				console.log(data.from); 
				console.log(data.body);
				console.log(data);
				resolve(data);
			}
		});
	});	
};