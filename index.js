var bodyParser = require('body-parser');
var express = require('express');

var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    
    
});


var tbl_row="";
var app = express();
var games = require("./lib/game.js");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname +'/views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/', function (req, res) {
    if (req.param('gtitle') != undefined){
        var search_res = games.findGame(req.param('gtitle'));
        if (search_res != undefined){
        var res_title = search_res.title,
        res_plateforme = search_res.plateform,
        res_price = search_res.price;
        
        }else{
            res_title = " : No records found";
        }
    }
    var list = games.listGame();
    var list_game = [];
    list.forEach(function(game){
        list_game.push(game.title);
    })
    res.render('home',{page_title:"Home",game_title:list_game,res_title:res_title
    ,res_plateforme:res_plateforme,res_price:res_price});
    
});
// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/search', function(req, res) {
    var search_title = req.body.title;
    var search_res = games.findGame(req.body.title);
    /*
    var my_script = "<script>"+
    "function sure(){"+
    "if (confirm('Are you sure to delete this game?')) {"+
    "window.open('/rm?title="+ search_title +"','_self')"+
    "}"+
    "}"+
    "</script>";
    
    var edit_btn = '<a href="/edit?title='+search_title+'">Edit</a>';
    var add_btn = '<a href="/add?title='+search_title+'">Add this game?</a>';
    var rm_btn =  '<a href="#" Onclick="sure();" >Remove this game</a>';
   */
   var page_title = "The result of " + search_title + ": ";
   var found = "";
    if (search_res != undefined){
        var res_title = search_res.title,
        res_plateforme = search_res.plateform,
        res_price = search_res.price;
        found = 'found';
    }else{
        res_title = " : No records found";
        
    }
    
    res.render('result',{page_title:page_title,res_title:res_title
    ,res_plateforme:res_plateforme,res_price:res_price,found:found});
    
  

});

app.get('/add', function(req, res) {
    var title = req.param("title");
    if (title == undefined){
        title = "";
    }
    res.render('add',{page_title:'Add New Game',title:title})
});

app.post('/save', function(req, res) {
   var g_title = req.body.title;
   var g_plateform = req.body.plateform;
   var g_price = req.body.price;
   var new_game = {title:g_title,plateform:g_plateform,price:g_price};
   var dbl = games.findGame(g_title);
    if (dbl == undefined){
        games.addGame(new_game);
        var message = g_title + " has been added to the list.";
    }else{
        message = "This game already exists";
    }

   res.render('saved',{msg:message});
});

app.get('/edit' , function(req, res) {
    var g_title = req.param("title");
    var g_detail = games.findGame(g_title);
    if (g_detail != undefined){
        var g_plateform = g_detail.plateform;
        var g_price = g_detail.price;
    }
    res.render('edit',{page_title:'Edit mode:',title:g_title
    ,plateform:g_plateform,price:g_price});

});

app.post('/update', function(req, res) {
   var g_title = req.body.title;
   var g_plateform = req.body.plateform;
   var g_price = req.body.price;
   var new_game = {title:g_title,plateform:g_plateform,price:g_price};
   
   games.updateGame(g_title,new_game);
        var message = g_title + " has been updated!";
        
   res.render('update',{msg:message});
   
});

app.get('/rm' , function(req, res) {
    var g_title = req.param("title");
    
    var search_res = games.findGame(req.param('title'));
        if (search_res != undefined){
        games.removeGame(g_title);
        var message = g_title + " has been deleted!";
        }
   res.render('remove',{msg:message});
});

app.listen(process.env.PORT);