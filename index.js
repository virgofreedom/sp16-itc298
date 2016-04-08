var http = require("http"), fs= require("fs");
function serveStaticFile(res,path,contentType,responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err,data){
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'})
            res.end('500-Internal Error');
        }else{
            res.writeHead(responseCode,{'Content-Type': contentType});
            res.end(data);
        }
    })
}
http.createServer(function(req,res){
    var path = req.url.toLocaleLowerCase();
    //res.writeHead(200,{'Content-type':'text/plain'});
    //res.end('Hello Node JS');
    switch (path) {
        case '/':
            // code
            serveStaticFile(res,'/public/home.html','text/html');
            
            break;
        case '/about':
            // code
            res.writeHead(200,{'Content-type':'text/html'});
            res.end('<h1>ABOUT</h1>');
            break;
        default:
            // code
    }
}).listen(process.env.PORT);

console.log('Server started on '
+ process.env.PORT + '; press Ctrl-C to terminate');