/**
*   Map routes to controller functions
*/
var twilioClient = require('../twilioClient');
var twilio = require('twilio');

module.exports = function(router) {
	router.get('/error', function(req, res) {
		throw new Error('Derp. An error occurred.');
	});

	router.get('/sms', (req, res) => {

		/**
		*   Find the user
		*   Retrieve data about the guardians of the user
		*   Iterate over each guardian, making a call with Twilio until successful
		*/
		var users = require('../data/users.json');
		var user = users.users[0];
		var jsonResponse = [];

		user.guardians.forEach( (guardian, index, arr) => {
			console.log(index);

			// format message
			var messageToSend = formatMessage(user.name);

			// send a message to every gurdian until a correct number is found
			twilioClient.sendSms(guardian.phoneNumber, messageToSend)
				.then( (data) => {
					console.log('success');

					jsonResponse[index] = {
						guardian: guardian,
						success: true,
						description: 'sms succesfully'
					}
					// res.write('<br/><br/>' + 'sms succesfully sent from ' + data.from + ' with body: ' + data.body);
				})
				.catch( (err) => {
					console.log(err.message);
					var errorMsg = err.message;

					jsonResponse[index] = {
						guardian: guardian,
						success: false,
						description: errorMsg
					}
					// res.write('<br/>' + 'unable to reach  ' + guardian.name + '. Error: ' + errorMsg);
					return Promise.resolve(1);  // need to return a Promise in order to run the .then() loop
				})
				.then( () => {
					if (index === arr.length - 1){
						console.log(jsonResponse);
						res.json({data: jsonResponse});
				   }
				});
		});

	});

	/**
	*   Connect request from the BBC Microbit
	*/
	// router.get('/connect', (req, res) => {
	// 	res.json({connected: true});
	// });

	/**
	*   Requests Twilio to make a call to a default number
	*/
	router.get('/call', (req, res) => {
		
		var admins = require('../data/data.json');
		var tel = admins[1].phoneNumber;
		console.log(tel);

		twilioClient
			.call(tel)
			.then((data) => {
				console.log('call from ' + data.from + ' to ' + data.to);
			})
			.catch( (err) =>{
				console.log(err);
			});
		res.send('Call made');
	});

	/**
	*   Requests Twilio to make a call to a given number 
	*   the id refers to the index of the admin to call in the data.json file
	*/
	router.all('/call/:id', (req, res) => {

		/** 
		*/
		var admins = require('../data/data.json');
		var tel = admins[req.params.id].phoneNumber;
		console.log(req.params.id);
		console.log(tel);

		twilioClient
			.call(tel)
			.then((data) => {
				console.log('call from ' + data.from + ' to ' + data.to);
				setTimeout( () => { 
					tel = admins[0].phoneNumber;
					twilioClient
						.call(tel)
						.then((data) => {
							console.log('call from ' + data.from + ' to ' + data.to);
						})
						.catch( (err) =>{
							console.log(err);
						});
				}, 20000);
			})
			.catch( (err) =>{
				console.log(err);
			});

		res.send('Call made');
	});

	/**
	*   Define what Twilio will tell to the person it's calling. 
	*   This is where Twilio will make a POST request when a call is placed
	*/
	router.post('/voice', (req, res) => {

		// Generate a TwiML response
		var twiml = new twilio.TwimlResponse();

		// Talk in a nice voice over the phone.
		twiml
			.say({voice:'alice', language:'en-gb'}, 'This is an emergency call')
			.pause({length: '1'})
			// .say({voice:'alice', language:'en-gb'}, 'Your grandad is on the highway to HELL and needs urgent medical assistance.')
			// .pause({length: '1'})
			.say({voice:'alice', language:'en-gb'}, 'Your grandad may just have had an accident.')
			.say('Please check on him and call the emergency services if needed.')
			// .say({voice:'alice', language:'en-gb'}, 'hahah LOL')
			// .say('360 no scoped')
			.play('http://1df8a7d1.ngrok.io/airhorn.mp3')
			// .pause({length: '1'})
			// .say('get rekt mate')
			// .play('http://b443bf9e.ngrok.io/headshot.mp3')
			// .play('http://b443bf9e.ngrok.io/weed.mp3')
			// .play('https://api.twilio.com/cowbell.mp3')
			// .pause({length: '1'})
			// .say({voice:'alice', language:'en-gb'}, 'Should I call the emergency services ?')
			// .record({
			//  playBeep: true, 
			//  maxLength:4, 
			//  timeout: 2,
			//  method: 'POST', 
			//  transcribe: false, 
			//  transcribeCallback: 'http://b443bf9e.ngrok.io/emergency',
			//  finishOnKey: "1234567890*#"
			// })
			.hangup();

		// Set the response type as XML.
		res.header('Content-Type', 'text/xml');
		// Send the TwiML as the response.
		res.send(twiml.toString());
	});

	/**
	*	If transcript is enabled, Twilio will make a POST request to this url
	*/
	router.post('/emergency', (req, res) => {
		// console.log(req);
		// Called, RecordingSid, CallStatus, From, To, TranscriptionText, TranscriptionStatus, CallSid, Direction
		// +44 7438 117626
		if (true) res.redirect('/call/0');

		// var transcript = req.body.TranscriptionText
		var transcript = 'Yes Yes Yes';
		var re = /(Yes|Yeah|Right|Now|Call|Of course|okay)/i;
		console.log(transcript);

		if (transcript.match(re)){
			// console.log("redirecting");
			res.redirect('/call/0');
			// res.redirect('https://google.com');
		}
		else {
			res.send("transcription received");
		}
	});

	/**
	*   Monitor the progress of the call
	*
	*   During a call, Twilio will update on the progress of the call 
	*   by posting to this url
	*/
	var callStatusHistory = {
		status: "undefined",
		history: []
	}

	router.post('/events', (req, res) => {
		var to = req.body.To;
		var fromNumber = req.body.From;
		var callStatus = req.body.CallStatus;
		var callSid = req.body.CallSid;

		// console.log(req);
		callStatusHistory.history.push(callStatusHistory.status);
		callStatusHistory.status = callStatus;
		console.log(req.body);

		console.log(to, fromNumber, callStatus);
		res.send('Event received');
	});

	/**/
	/**
	*   Requests Twilio to make a call to a default number
	*/
	router.get('/logs', (req, res) => {
		twilioClient
			.allCallLogs()
			.then((calls) => {

				var tagline = "List of calls that have recently been performed while testing Twilio.";
				var total = calls.reduce( (a, b) => {
					return  {price: Math.abs(a.price) + Math.abs(b.price)}; // returns object with property x
				});

				res.render('pages/index', {
					total: total.price.toFixed(2),
					calls: calls,
					tagline: tagline
				});
			})
			.catch( (err) =>{
				console.log(err);
				res.send(err);
			});
	});

	/**
	*   Requests Twilio to make a call to a default number
	*/
	router.get('/about', (req, res) => {
		res.render('pages/about');
	});

};


function formatMessage(name) {
	return 'This is an emergency ! ' + name + ' has an emergency and needs your help !';
};
