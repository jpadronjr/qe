const exp = require('constants');
    express = require('express'),
    pug = require('pug');
    path = require('path');
    routes = require('./routes/routes.js');
    app = express();
    http = require('http').createServer(app);
    io = require('socket.io')(http);

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

app.get('/join', function(req, res){
    res.sendFile(process.cwd() + '/views/join.html');
  });
app.get('/start', function(req, res){
    res.sendFile(process.cwd() + '/views/start.html');
  });

io.on('connection', (socket) => {
  console.log('a new user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
  

//app.listen(3000)

http.listen(3000, () => {
  console.log('listening on *:3000');
});


//https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html
//https://www.atlassian.com/git/tutorials/syncing/git-pull
//https://stackoverflow.com/questions/60966525/nginx-how-to-run-server-js-file-not-html-always-in-some-port