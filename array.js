var bodyParser = require('body-parser');
var express = require('express');
var exphbs  = require('express-handlebars');
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
    
    var edit_btn = '<button >Edit</button>';
    var add_btn = '<a href="/add?title='+search_title+'">Add this game?</a>';
    if (resul != undefined){
        var result = resul.title + "<br>" + resul.plateform + "<br>" + "$"+resul.price +'<br><a href="/">Search Again</a>'
        + ' '+edit_btn;
    }else{
        result = search_title + " : No records found" +'<br><a href="/"><button>Search Again</button></a>'
        +add_btn+'<div id="form_add"></div>';
    }
    res.send(result);
        /*
    function add_new_game(){
        var title_input ='Game title:<input type="text" name="title" value="'+title+'"/><br>';
        var other_input = 'Plateform :<input type="text" name="plateform" /><br>'
        +'Price : <input type="number" name="price" /><button>Save</button>';
        document.getElementById("form_add").innerHTML = title_input + other_input;
    }
    */
});

app.get('/add', function(req, res) {
    var title = req.param("title");
    var title_input ='Game title:<input type="text" name="title" value="'+title+'"/><br>';
    var other_input = 'Plateform :<input type="text" name="plateform" /><br>'
        +'Price : <input type="number" name="price" /><br><button>Save</button>';
    res.send('<form action="/save" method="POST">'+title_input + other_input+'</form>');
});


app.listen(process.env.PORT);