var fs  = require("fs")
var http  = require("http")

// Escribí acá tu servidor
http.createServer(function(req, res) {

    // if (req.url === '/arcoiris_doge') {
    //     fs.readFile(`${___dirnamme}/images/arcoiris_doge.jpg`, function(err, img){
    //         if (err) {
    //             res.writeHead(400, {'Content-type': 'text/plain'});
    //             res.end('Hubo un error en la lectura')
    //         }
    //         else{
    //             res.writeHead(200, {'Content-type': 'image/jpg'});
    //             res.end(img);
    //         }    
    //     })
    // }
    fs.readFile(`${__dirname}/images${req.url}.jpg`, function(err, img) {
            if (err) {
                res.writeHead(400, {'Content-type': 'text/plain'});
                res.end('Hubo un error en la lectura de la imagen')
            }
            else{
                res.writeHead(200, {'Content-type': 'image/jpg'});
                res.end(img);
            }    
    })    

}).listen(3000, '127.0.0.1');
