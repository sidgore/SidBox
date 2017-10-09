var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var home = require('./routes/home');
const MongoClient = require('mongodb').MongoClient;

var app = express();

// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.bodyParser());
app.use(express.cookieParser());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', home.signin);
app.post('/signup', home.signup);
app.get('/signup', home.signup);

app.get('/signin', home.signin);
app.post('/afterSignIn', home.afterSignIn);
app.post('/aftersignup', home.aftersignup);


app.get('/getAllUsers', home.getAllUsers);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



MongoClient.connect('mongodb://sidgore:sidgore@sidmongo-shard-00-00-uesva.mongodb.net:27017,sidmongo-shard-00-01-uesva.mongodb.net:27017,sidmongo-shard-00-02-uesva.mongodb.net:27017/users?ssl=true&replicaSet=SidMongo-shard-0&authSource=admin', (err, database) => {
  if (err) return console.log(err)
      db = database
      app.listen(3003, () => {
        console.log('listening on 3001')
      })
    })