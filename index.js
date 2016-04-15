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
    var game_title =["call of duty","fifa 2016", "doom"];
    var game_platforme = ["PS3","PS2","PS4"];
    var game_price = ["49.99","59.99","69.99"];
    
    for (var i=0; i<game_title.length; i++){
        if (search_title.toLowerCase() == game_title[i]){
            var result = game_title[i] + "<br>" + game_platforme[i] + "<br>" + "$"+game_price[i] +'<br><a href="/">Search Again</a>';
            break;
        }else{
            result = "No records found" +'<br><a href="/">Search Again</a>';
        }
        
    }
    
    res.send(result);
});



app.listen(process.env.PORT);