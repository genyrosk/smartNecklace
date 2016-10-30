var twilioClient = require('../twilioClient');
var admins = require('../data/data.json');

function formatMessage(errorToReport) {
	return '[This is a test] ALERT! It appears the server is' +
		'having issues. Exception: ' + errorToReport +
		'. Go to: http://newrelic.com ' +
		'for more details.';
};

exports.notifyOnError = function(appError, req, res, next) {
	admins.forEach(function(admin) {
		var messageToSend = formatMessage(appError.message);
		twilioClient.sendSms(admin.phoneNumber, messageToSend);
	});
	next(appError);
};