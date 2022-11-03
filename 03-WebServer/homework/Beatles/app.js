var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]


function replaceData(template, beatle) {
  //var find = '{name}';
  //var reg = new RegExp(find, 'g');
  // return template.replace(reg, beatle.name)
  //   .replace('{birth}', beatle.birthdate)
  //   .replace('{profilePic}', beatle.profilePic);
  return template.replace(/{name}/g, beatle.name)  // reemplaza en todos los names 
                                                   //regular expresion --> regexpr.com
    .replace(/{birth}/, beatle.birthdate)
    .replace(/{profilePic}/, beatle.profilePic);
}

http.createServer(function(req, res) {
  if (req.url === '/api' || req.url === '/api/') {
    res.writeHead(200, {'Content-type': 'application/json'});
    res.end(JSON.stringify(beatles));
  }

  if (req.url.substring(0, 5) === '/api/' && req.url.length > 5) {
    let findBeatle = req.url.split('/').pop();
    //let foundBeatle = beatles.filter(b => encodeURI(b.name) !== findBeatle);
    let foundBeatle =  beatles.find(b => findBeatle === encodeURI(b.name));
    if (foundBeatle) {
       res.writeHead(200, {'Content-type': 'application/json'});
       res.end(JSON.stringify(foundBeatle));
    }
    else {
       res.writeHead(400, {'Content-type': 'text/plain'});
       res.end('Beatle no encontrado.');
    }
  }

  if (req.url === '/') {
    res.writeHead(200, {'Content-type': 'text/html'});
    let html = fs.readFileSync(`${__dirname}/index.html`);
    res.end(html);
  }

  let findBeatle = req.url.split('/').pop();
  let foundBeatle =  beatles.find(b => findBeatle === encodeURI(b.name));
  if (foundBeatle) {
     res.writeHead(200, {'Content-type': 'text/html'});
     let beatle = fs.readFileSync(`${__dirname}/beatle.html`, 'utf-8');
     let finalBeatle = replaceData(beatle, foundBeatle);
     res.end(finalBeatle);
  }
  else {
     res.writeHead(400, {'Content-type': 'text/plain'});
     res.end('Beatle no encontrado.');
  }


}).listen(3000, '127.0.0.1');