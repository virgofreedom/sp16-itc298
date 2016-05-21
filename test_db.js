var Game = require("./models/game.js");


Game.find(function(err,games){
    if(err) return console.error(err);
    if(games.length) return;
});
new Game({
    "title":"Planet",
    "plateform":"PS4",
    "price":"40"
    }).save();

