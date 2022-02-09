
const uDeck = document.getElementById('uDeck');//uncovered cards
const rDeck = document.getElementById('rDeck');//hidden cars

const adduDeck = () => {
	socket.emit('draw', a)//,card);
}

rDeck.addEventListener('click', adduDeck);

var socket = io.connect();

var a = Math.random();

//if url doesnot include 'roomID=' then add it with room 
if(!window.location.href.includes('roomID=')){
	// window.location.href = window.location.href + 'roomID=' + a;
	window.location.replace('http://localhost:3000/start?roomID=' + a);
}else{
	a = window.location.href.split('roomID=')[1];
}

//if ID is longer then 25 redirect and alert
if(a.length > 25){
	window.location.replace("http://localhost:3000")
	alert("Invalid Url");
} else {
	a = window.location.href.split('roomID=')[1];
}

socket.on("connect", () => {
	socket.emit('create room', a);
});

socket.on('recieve card', (card) => { 
	var img = document.createElement('img');
    img.src = `/Images/Cards/${card.Value}-${card.Suit}.png`;
	uDeck.innerHTML = "";
    document.getElementById('uDeck').appendChild(img);
});


// let game = {
// 	gameState: 'runs',
	
// 	mainDeck: deck,

// 	showing: card,

// 	hand1: cards,
// 	hand2: cards,

// 	set11: cards,
// 	set12: cards,
// 	set13: cards,

// 	set21: cards,
// 	set22: cards,
// 	set23: cards,

// 	turn: player,
// }

