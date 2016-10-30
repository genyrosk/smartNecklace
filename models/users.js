// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var requestLog = new Schema({
  origin: String,
  name: { type: String, required: true, unique: true },
  admin: Boolean,
  location: String,
  meta: {
    age: Number,
    website: String
  },
  created_at: Date,
  updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var requestLog = mongoose.model('requestLog', requestLog);

// make this available to our users in our Node applications
module.exports = requestLog;