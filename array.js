var bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');

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
    var game =
    [
        {title:"Fifa", plateform:"PS4", price:"30"},
        {title:"Call of Duty", plateform:"PS3", price:"20"}
    ];
    
    var resul = game.find(function(game){
        return game.title.toLowerCase() == search_title.toLowerCase();
    });
    
    
    if (resul != undefined){
        var result = resul.title + "<br>" + resul.plateform + "<br>" + "$"+resul.price +'<br><a href="/">Search Again</a>';
    }else{
        result = "No records found" +'<br><a href="/">Search Again</a>';
    }
    res.send(result);
    
});



app.listen(process.env.PORT);