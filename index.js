var bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');
var tbl_row="";
 var game =
    [
        {title:"Fifa", plateform:"PS4", price:"30"},
        {title:"Call of Duty", plateform:"PS3", price:"20"}
    ];
    
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});
// POST http://localhost:8080/api/users
// parameters sent with 
app.post('/search', function(req, res) {
    var search_title = req.body.title;
   
    var resul = game.find(function(game){
        return game.title.toLowerCase() == search_title.toLowerCase();
    });
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
   
    if (resul != undefined){
        var result = my_script + resul.title + "<br>" + resul.plateform + "<br>" + "$"+resul.price +'<br><a href="/">Search Again</a>'
        + ' '+edit_btn+" "+rm_btn;
    }else{
        result = search_title + " : No records found" +'<br><a href="/"><button>Search Again</button></a>'
        +add_btn+'<div id="form_add"></div>';
    }
    res.send(result);
    
});

app.get('/add', function(req, res) {
    var title = req.param("title");
    if (title == undefined){
        title = "";
    }
    var title_input ='Game title:<input type="text" name="title" value="'+title+'"/><br>';
    var other_input = 'Plateform :<input type="text" name="plateform" /><br>'
        +'Price : <input type="number" name="price" /><br><button>Save</button>';
    res.send('<form action="/save" method="POST">'+title_input + other_input+'</form>');
});

app.post('/save', function(req, res) {
   var g_title = req.body.title;
   var g_plateform = req.body.plateform;
   var g_price = req.body.price;
   var new_game = {title:g_title,plateform:g_plateform,price:g_price};
   var add_btn = '<a href="/add">Add more game?</a>';
   var go_home = '<a href="/">Go back</a>';
   var tbl = "";
   var dbl = game.find(function(game){
        return game.title.toLowerCase() == g_title.toLowerCase();
    });
    
    if (dbl == undefined){
        game.push(new_game);     
        var message = g_title + " has been added to the list. Here is the new list :";
        tbl_row = "";
   game.forEach(function(game){
       tbl_row +=  "<tr><td>"+game.title+"</td><td>"+game.plateform+"</td><td>"+game.price+"</td></tr>";
       return tbl_row;
   });
   tbl = "<table><tr><th>Game's Title</th><th>Plateform</th><th>Price</th></tr>"+tbl_row+"</table>";
   
    }else{
        message = "This game already exists";
    }

   res.send(message+"<br>"+tbl+"<br>"+add_btn+" "+go_home);
});

app.get('/edit' , function(req, res) {
    var g_title = req.param("title");
    var g_detail = game.find(function(game){
        return game.title.toLowerCase() == g_title.toLowerCase();
    });
    if (g_detail != undefined){
        var g_plateform = g_detail.plateform;
        var g_price = g_detail.price;
    }
    var title_input ='Game title:<input type="text" name="title" value="'+g_title+'"/><br>';
    var other_input = 'Plateform :<input type="text" name="plateform" value="'+g_plateform+'"/><br>'
        +'Price : <input type="number" name="price" value="'+g_price+'"/><br><button>Save</button>';
    res.send('<form action="/update" method="POST">'+title_input + other_input+'</form>');

});

app.post('/update', function(req, res) {
   var g_title = req.body.title;
   var g_plateform = req.body.plateform;
   var g_price = req.body.price;
   var new_game = {title:g_title,plateform:g_plateform,price:g_price};
   var add_btn = '<a href="/add">Add more game?</a>';
   var go_home = '<a href="/">Go back</a>';
   var tbl = "";
   var f_index = game.findIndex(function(game){
       return game.title.toLowerCase() == g_title.toLowerCase();
   });
   
   
        game.splice(f_index,1,new_game);     
        var message = g_title + " has been updated to the list. Here is the new list :";
        tbl_row = "";
   game.forEach(function(game){
       tbl_row +=  "<tr><td>"+game.title+"</td><td>"+game.plateform+"</td><td>"+game.price+"</td></tr>";
       return tbl_row;
   });
   tbl = "<table><tr><th>Game's Title</th><th>Plateform</th><th>Price</th></tr>"+tbl_row+"</table>";
   
   

   res.send(message+"<br>"+tbl+"<br>"+add_btn+" "+go_home);
   
});

app.get('/rm' , function(req, res) {
    var g_title = req.param("title");
    var f_index = game.findIndex(function(game){
       return game.title.toLowerCase() == g_title.toLowerCase();
   });
    game.splice(f_index,1);   
    var go_home = '<a href="/">Go back</a>';
    var tbl = "";
    var message = g_title + " has been deleted! Here the new list of game:";
        tbl_row = "";
   game.forEach(function(game){
       tbl_row +=  "<tr><td>"+game.title+"</td><td>"+game.plateform+"</td><td>"+game.price+"</td></tr>";
       return tbl_row;
   });
   tbl = "<table><tr><th>Game's Title</th><th>Plateform</th><th>Price</th></tr>"+tbl_row+"</table>";

   res.send(message+"<br>"+tbl+"<br>"+go_home);
});

app.listen(process.env.PORT);