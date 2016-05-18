var Game = require("./models/game.js");

new Game({
    "title":"Planet",
    "plateform":"PS4",
    "price":"40"
}).save();

Game.find(function(err,games){
    if(err) return console.error(err);
    if(games.length) return;
});