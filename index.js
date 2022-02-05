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

let roomArray = [];

app.get('/', routes.index);
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createPerson);
app.get('/returnRooms', (req, res) => {
  res.json(roomArray)
});

app.get('/join', function (req, res) {
  res.sendFile(process.cwd() + '/views/join.html');
});

app.get('/start', function (req, res) {
  res.sendFile(process.cwd() + '/views/start.html');
});


const suits = ["S", "D", "C", "H"];
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const getDeck = () => {
  let deck = new Array();

  for (let i = 0; i < suits.length; i++) {
    for (let x = 0; x < values.length; x++) {
      let card = { Value: values[x], Suit: suits[i] };
      deck.push(card);
    }
  }
  deck.sort(() => (Math.random() > .5) ? 1 : -1);
  return deck;

}


io.sockets.on('connection', function (socket) {

  let newDeck;
  
  socket.on('create room', function (room) {
    socket.join(room)

    if (!roomArray.includes(room)) {
      io.sockets.adapter.rooms.get(room).newDeck = getDeck();
      roomArray.push(room);
      
      //console.log('rooms added' + roomArray);
      //console.log(`new room ${room}`)
    } 
    //console.log(io.rooms)
    // else if(this.rooms[room].length === 0) {
    //     delete this.rooms[room];
    //     console.log('deleted')
    // }
  });
  

  socket.on('draw', function (roomNum) {
    //disconnect
    let card = io.sockets.adapter.rooms.get(roomNum).newDeck.shift();
    io.in(roomNum).emit('recieve card', card);
    roomList = roomNum;
  });


});


http.listen(3000, () => {
});


//https://docs.gitlab.com/ee/gitlab-basics/start-using-git.html
//https://www.atlassian.com/git/tutorials/syncing/git-pull
//https://stackoverflow.com/questions/60966525/nginx-how-to-run-server-js-file-not-html-always-in-some-port