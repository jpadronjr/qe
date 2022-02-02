const uDeck = document.getElementById('uDeck');//uncovered cards
const rDeck = document.getElementById('rDeck');//hidden cars

const suits = ["S", "D", "C", "H"];
const values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const getDeck = () => {
	let deck = new Array();

	for(let i = 0; i < suits.length; i++)
	{
		for(let x = 0; x < values.length; x++)
		{
			let card = {Value: values[x], Suit: suits[i]};
			deck.push(card);
		}
	}
    deck.sort(() => (Math.random() > .5) ? 1 : -1);
	return deck;
}


let deck = getDeck();
//console.log(deck);

// deck.forEach(card => {
//     var img = document.createElement('img');
//     img.src = `/Images/Cards/${card.Value}-${card.Suit}.png`;
//     document.getElementById('rDeck').appendChild(img); 
// });

const adduDeck = () => {
	let card = deck.shift();
	var img = document.createElement('img');
    img.src = `/Images/Cards/${card.Value}-${card.Suit}.png`;
	uDeck.innerHTML = "";
    document.getElementById('uDeck').appendChild(img);
}

rDeck.addEventListener('click', adduDeck);
