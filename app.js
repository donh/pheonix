var express = require('express');
var app = express();
var routes = require('./routes');
//var http = require('http');
var path = require('path');
var methodOverride = require('method-override');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.urlencoded());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}
app.use('/', routes.root);
app.use('/141022_react/', routes.react);
app.use('/140811_auto/', routes.auto);
app.use('/140610_doc/', routes.doc);
app.use('/140415_wd/', routes.wd);
app.use('/140217_epic/', routes.epic);

//app.use('/', routes.home);
//app.use('/', routes.react);
//app.get('/read', routes.read);
app.listen(process.env.PORT || 3000);