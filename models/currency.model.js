var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var currencyShema = new Schema({
  "Cur_ID": Number,
  "Date": Date,
  "Cur_OfficialRate": Number
});

var Currency = mongoose.model('Currency', currencyShema);

module.exports = Currency;
