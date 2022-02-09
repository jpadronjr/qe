const leftDiv = document.getElementById('left');

const getRooms = () => {
    fetch('/returnRooms')
    .then(response => response.json())
    .then(data => readJson(data));
}

const readJson = (data) => {
    for (var i=0; i < data.length; i++) {
        var a = document.createElement('a');
        var lBr = document.createElement('br');
        a.href =  `http://localhost:3000/start?roomID=${data[i]}`; 
        //a.href =  `http://www.tercerio.juanpablo.digital/start?roomID=${data[i]}`; 
        a.innerHTML = 'RoomID='+data[i];
        leftDiv.appendChild(a);
        leftDiv.appendChild(lBr);
        document.body.appendChild(leftDiv); 
    }
}
getRooms();