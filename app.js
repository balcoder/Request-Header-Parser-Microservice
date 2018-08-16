// Simple api to parse information about ip, language and softeware from the
// requesting device.

var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



app.get('/api/whoami', function (req, res, next) {

  var language = req.headers["accept-language"];
  if(req.headers["x-forwarded-for"] == undefined) {
    var ip = 'No Ip ifo, using dev machine: ' + req.headers.host;
    console.log(ip);
  } else {
  var ip = req.headers["x-forwarded-for"].split(",", 1)[0];
  }
  var useragent = req.headers['user-agent'];
  res.json({'ipaddress': ip, 'language': language, 'software': useragent });
  next();
});

app.listen(3000, () => console.log('Expmple app listening on port 3000!'));
