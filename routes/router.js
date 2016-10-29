/**
*	Map routes to controller functions
*/
var twilioClient = require('../twilioClient');

module.exports = function(router) {
	router.get('/error', function(req, resp) {
		throw new Error('Derp. An error occurred.');
	});

	router.get('/sms', (req, res) => {
		twilioClient
			.sendSms('+447767960919', 'this is the Palantir CEO speaking. You are hired bro')
			.then((data) => {
				console.log('received answer from the twilioClient');
				res.send('sms succesfully sent from ' + data.from + ' with body: ' + data.body);
			})
			.catch((err) => {
				res.send('an error ocurred ', err);
			});
	});
};