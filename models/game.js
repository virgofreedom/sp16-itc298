var credentials = require("../lib/credentials");
var mongoose = require("mongoose");
 
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
            replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       

mongoose.connect(credentials.stri(), options);
var conn = mongoose.connection;             
  
 conn.on('error', console.error.bind(console, 'connection error:'));  
 
 var gameSchema = mongoose.Schema({
     title: String,
     plateform: String,
     price: Number,
     
 });
 
 module.exports = mongoose.model('Game', gameSchema); 
