
const getRooms = () => {
    fetch('/returnRooms')

    .then(response => response.json())

    .then(data => readJson(data));
    
}

const readJson = (data) => {
    for (var i=0; i < data.length; i++) {
        //console.log(data[i])

        var leftDiv = document.createElement("div");
        leftDiv.id = "left";

        var a = document.createElement('a');
        //a.href =  `http://localhost:3000/start?roomID=${data[i]}`; 
        a.href =  `http://www.tercerio.juanpablo.digital/start?roomID=${data[i]}`; 
        a.innerHTML = data[i];
        leftDiv.appendChild(a);
        document.body.appendChild(leftDiv); 
    }
}

getRooms();
