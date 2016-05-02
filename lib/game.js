var games =
    [
        {title:"Fifa", plateform:"PS4", price:"30"},
        {title:"Call of Duty", plateform:"PS3", price:"20"},
        {title:"Final Fantasy", plateform:"PS1", price:"60"}
    ];
    
exports.findGame = function(a){
    return games.find(function(games){
      return games.title.toLowerCase() == a.toLowerCase();
    });
};
exports.addGame = function(new_game){
    games.push(new_game);
    return games;
};

exports.listGame = function(){
    return games;
}

exports.updateGame = function(title,new_game){
    var f_index = games.findIndex(function(games){
        return games.title.toLowerCase() == title.toLowerCase();
    });
    games.splice(f_index,1,new_game);
    return games;
}
exports.removeGame = function(title){
    var f_index = games.findIndex(function(games){
        return games.title.toLowerCase() == title.toLowerCase();
    });
    games.splice(f_index,1);
    return games;
}