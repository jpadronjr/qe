const startBtn = document.getElementById('startBtn');//hidden cars

const getRooms = () => {
    fetch('/returnRooms')
    .then(response => response.json())
    .then(data => readJson(data));
}
const readJson = (data) => {
    console.log(data.length)
    if(data.length === 3){
        startBtn.style.visibility = 'hidden';
    }else{
        startBtn.style.visibility = "none";
    }
}
//getRooms();