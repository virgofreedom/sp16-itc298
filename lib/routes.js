module.exports = function(app){
    //var game = require("../lib/game.js");
    var Game = require("../models/game.js");
    // UI routes
    app.get('/about', function(req,res){
       res.type('text/html') ;
       res.render('about');
    });
    //create a handlebar for test with angular
    app.get('/angular', function(req,res){
            res.render('angular');
    });
    
    app.get('/', function(req,res){
        
        Game.find(function(err,games){
            if(err) return console.error(err);
            var listgame = {games : games};
        
            
            res.render('home',listgame);
        
        });    
    });
    
    app.post('/search', function(req, res) {
   
        Game.find({title:req.body.title},function(err,games){
            if(err) return console.error(err);
            if(games !=''){
                var found = games[0];    
                var action = "update";
                var page_title = "This is the information of : "+ found.title;
                var context = {
                    games: found,
                    page_title: page_title,
                    action: action,
                    update: 'update'
                };
            }else{
                page_title = "No records found";
                action = "add";
                found = {title: req.body.title};
                context = {
                    games: found,
                    page_title: page_title,
                    action: action,
                    add: 'add'
                };
            }
            
           //console.log(context);
            res.render('detail',context);
        })
   
   
    });
    
    app.get('/add', function(req,res){
        var action = "add";
       res.type('text/html') ;
       res.render('detail',{page_title: 'Add new game',action: action,
           add:action
       });
    });
    
    app.post('/add', function(req, res) {
            var g_title = req.body.title;
            var g_platform =req.body.plateform;
            var g_price = req.body.price;
                new Game({
                    "title": g_title,
                    "plateform":g_platform,
                    "price":g_price
                }).save();
                page_title = req.body.title + " has been added to the list.";
                
            res.render('detail',{page_title: page_title});
    });
        
    app.post('/update',function(req, res) {
        var g_title = req.body.title;
        var g_platform =req.body.plateform;
        var g_price = req.body.price;
        var id = req.body.id;
        console.log(id);
        Game.update({ _id: id},
                {$set:
                    {
                        title: g_title,
                        plateform: g_platform,
                        price: g_price
                    }
                    
                },function(err){
                    if(err) return console.error(err);
                });
                
        var page_title = "This game has updated"; 
        res.render('detail',{page_title: page_title});
    });
    
    app.get('/rm' , function(req, res) {
        var id = req.param("id");
        Game.remove({ _id: id },function(err){
                    if(err) return console.error(err);
                });
        var page_title = "This game has deleted";
        res.render('detail',{page_title: page_title});
       
    });

    app.get('/:game',function(req, res) {
        
        Game.find({title:req.param("game")},function(err,games){
            if(err) return console.error(err);
            if(games !=''){
                var found = games[0];    
                var action = "update";
                var page_title = "This is the information of : "+ found.title;
                var context = {
                    games: found,
                    page_title: page_title,
                    action: action,
                    update: 'update'
                };
            }else{
                page_title = "No records found";
                action = "add";
                found = {title: req.body.title};
                context = {
                    games: found,
                    page_title: page_title,
                    action: action,
                    add: 'add'
                };
            }
            
           //console.log(context);
            res.render('detail',context);
        })
    });
    
    // API routes
    app.get('/api/games', function(req,res) {
        
        Game.find(function(err,games){
            
            if(err) return console.error(err);
            
            if (games){
                res.json(games);    
            }else{
                res.status(404).send("404 - not found");    
            }
            
            
        }); 
        
        
    });

    app.get('/api/:game', function(req,res) {
        Game.find({title:req.param("game")},function(err,games){
            if(err) return console.error(err);
            if(games !=''){
                res.json(games);      
              
            }else{
                res.status(404).send("404 - not found");       
            }
        
        })
        
    });
    
    app.post('/api/add', function(req,res) {
        console.log(req.body);
        new Game({
                    "title": req.body.title,
                    "plateform":req.body.plateform,
                    "price":req.body.price
                }).save();
        
        Game.find(function(err,games){
            
            if(err) return console.error(err);
            
            if (games){
                res.json(games);    
            }else{
                res.status(404).send("404 - not found");    
            }
            
            
        }); 
         
         
     });
     
     app.post('/api/rm' , function(req, res) {
        console.log(req.body);
        var id = req.body.id;
        Game.remove({ _id: id },function(err){
                    if(err) return console.error(err);
                });
         res.json({"result":"Deleted"});
        
       
    });
    
    app.post('/api/update',function(req, res) {
        console.log(req.body);
        var g_title = req.body.title;
        var g_platform =req.body.plateform;
        var g_price = req.body.price;
        var id = req.body.id;
        
        Game.update({ _id: id},
                {$set:
                    {
                        title: g_title,
                        plateform: g_platform,
                        price: g_price
                    }
                    
                },function(err){
                    if(err) return console.error(err);
                });
                
        res.json({"result":"Updated"});
    });
}