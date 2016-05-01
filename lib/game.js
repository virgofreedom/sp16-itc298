var games =
    [
        {title:"Fifa", plateform:"PS4", price:"30"},
        {title:"Call of Duty", plateform:"PS3", price:"20"},
        {title:"Final Fantasy", plateform:"PS1", price:"60"}
    ];
    
exports.Title = function(a){
    if (games[0].title == a){
     return a;
    }else{
        return false;
    }
}