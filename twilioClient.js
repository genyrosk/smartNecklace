/**
*	
*	The sendSms function uses the Twilio client to send sms. 
*
*	Require the Twilio module and create a REST client (called 'twilio')
*	Load config from config.js, which in turn loads and checks the .env file
*
*/
var config = require('./config');
var twilio = require('twilio')(config.accountSid, config.authToken);

/**
*	twilioClient object
*/
var twilioClient = function () {};

/**
*	Send text messages
*/
twilioClient.prototype.sendSms = function(to, message) {
	return new Promise ( (resolve, reject) => {
		twilio.messages.create({
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
				console.log("\nsms sent: ");
				console.log(data.from); 
				console.log(data.body);
				// console.log(data);
				resolve(data);
			}
		});
	});	
};

/**
*	Make calls
*/
twilioClient.prototype.call = function(to) {
	return new Promise ( (resolve, reject) => {
		twilio.calls.create({
			url: 'http://b443bf9e.ngrok.io/voice',
			to: to,
			from: config.sendingNumber,
			statusCallback: 'http://b443bf9e.ngrok.io/voice',
			statusCallbackMethod: 'POST',
			statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed'],
		}, (err, call) => {
			if(err) {
				console.error(err.message);
				reject(err);
			}
			else {
				// "data" is a JavaScript object containing data received from Twilio.
				console.log("\nA call has been placed: ");
				console.log('from ' + call.from); 
				process.stdout.write(call.sid);
				// console.log(data);
				resolve(call);
			}
		});
	});	
};

/**
*	Retrieve Call Logs
*/
twilioClient.prototype.allCallLogs = function() {
	return new Promise ( (resolve, reject) => {
		twilio.calls.list( (err, data) => {
			if (err) {
				reject(err);
			}
			else {
				resolve(data.calls);
			}
			// data.calls.forEach( (call) => {
			//	console.log(call.Direction);
			// });
		});
	});	
};

module.exports = new twilioClient();