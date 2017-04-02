var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var app = express();

require('dotenv').config();

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));


app.use('/', routes);
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + 'press Ctrl-C to terminate');
});

module.exports = app;
