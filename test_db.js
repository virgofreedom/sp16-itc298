var Game = require("./models/game.js");
Game.find(function(err,games){
            if(err) return console.error(err);
            var listgame = {games : games};
        
        //sconsole.log(listgame);
            console.log(listgame);
        });






