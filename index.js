const exp = require('constants');
    express = require('express'),
    pug = require('pug');
    path = require('path');
    routes = require('./routes/routes.js');
    app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/public/Images')));


const urlencodedParser = express.urlencoded({
    extended: false
})

app.get('/', routes.index);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createPerson);


app.listen(3000)