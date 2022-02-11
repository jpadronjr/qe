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

const checkRooms = (room) => {
  var users = io.sockets.adapter.rooms.get(room);
  if(users.size === 2){
    for( var i = 0; i < roomArray.length; i++){ 
      if (roomArray[i] === room) { 
        roomArray.splice(i, 1); 
      }
    }
  }
  if(users.size === 0){
    for( var i = 0; i < roomArray.length; i++){ 
      if (roomArray[i] === room) { 
        //delete io.sockets.adapter.rooms[room];
        roomArray.splice(i, 1); 
      }
    }
  }
}

io.sockets.on('connection', function (socket) {

  let newDeck;

  socket.on('create room', function (room) {
    socket.join(room);
    
    if (!roomArray.includes(room)) {
      io.sockets.adapter.rooms.get(room).newDeck = getDeck();
      roomArray.push(room);
    } 
    checkRooms(room);
  });

  socket.on('draw', function (roomNum) {
    let card = io.sockets.adapter.rooms.get(roomNum).newDeck.shift();
    let deckSize = io.sockets.adapter.rooms.get(roomNum).newDeck.length;
    io.in(roomNum).emit('recieve card', card, deckSize);
  });
});

http.listen(3000, () => {
});