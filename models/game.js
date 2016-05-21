
var mongoose = require("mongoose");

var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect('mongodb://itc298:2063359318@ds013971.mlab.com:13971/games', options);
var conn = mongoose.connection;             
  
 conn.on('error', console.error.bind(console, 'connection error:'));  
 
 var gameSchema = mongoose.Schema({
     title: String,
     plateform: String,
     price: Number,
     
 });
 
 module.exports = mongoose.model('Game', gameSchema); 
