module.exports = function(app){
    var game = require("../lib/game.js");
    // UI routes
    app.get('/', function(req,res){
       res.type('text/html') ;
       res.render('home',{games: game.listGame()});
    });
    
    app.get('/about', function(req,res){
       res.type('text/html') ;
       res.render('about');
    });
    
    app.post('/search', function(req, res) {
        var found = game.findGame(req.body.title);
        if (!found){
            var page_title = "No records found";
            var action = "add";
            found = {title: req.body.title};
        }else{
            page_title = "The result of " + found.title + ": ";
        }
        res.render('detail',{games: found,page_title: page_title,action: action});
    });
    
    app.get('/add', function(req,res){
        var action = "add";
       res.type('text/html') ;
       res.render('detail',{page_title: 'Add new game',action: action});
    });
    
    app.post('/add', function(req, res) {
        
        var g_title = req.body.title;
        var g_plateform = req.body.plateform;
        var g_price = req.body.price;
        var new_game = {title:g_title,plateform:g_plateform,price:g_price};
        var dbl = game.findGame(g_title);
        if (dbl == undefined){
            var action = "add";
            game.addGame(new_game);
            var page_title = g_title + " has been added to the list.";
        }else{
            game.updateGame(g_title,new_game);
            page_title = "This game has updated";
            
        }
        var found = game.findGame(req.body.title);
        res.type('text/html');
        res.render('detail',{page_title: page_title,games: found});
    });
    
    app.get('/rm' , function(req, res) {
        var g_title = req.param("title");
        var search_res = game.findGame(req.param('title'));
            if (search_res != undefined){
            game.removeGame(g_title);
            var page_title = g_title + " has been deleted!";
            }
       res.render('detail',{page_title: page_title,rm: 'del'});
    });

    app.get('/detail/:game',function(req, res) {
        var g_title = req.param("game");
        var found = game.findGame(g_title);
        if (!found){
            var page_title = "No records found";
            var action = "add";
            found = {title: req.body.title};
        }else{
            page_title = "The result of " + found.title + ": ";
        }
        res.render('detail',{games: found,page_title: page_title,action: action});
        
       
    });
    
    // API routes
    app.get('/api/games', function(req,res) {
        var games = game.listGame();
        if (games) {
            res.json(games);    
        } else {
            res.status(404).send("404 - not found");    
        }
    });

    app.get('/api/detail/:game', function(req,res) {
        var found = game.findGame(req.params.game);
        if (found) {
            res.json(found);    
        } else {
            res.status(404).send("404 - not found");    
        }
    });
}