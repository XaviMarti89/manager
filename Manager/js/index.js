//importam referències Firebase//
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//referència url base de dades//
const appSettings = {
    databaseURL: "https://stats-salle-default-rtdb.europe-west1.firebasedatabase.app/"
}

//crear variables a base de dades//
const app = initializeApp(appSettings)
const database = getDatabase(app)
const matchesListInDB = ref(database, "matches")
const eventsListInDB = ref(database, "stats")

//crear variables de partit
const match = "";
let player,dorsal;

//crear variables de jugadores
const nuria = document.getElementById("6 Nuria");
const aixa = document.getElementById("7 Aixa");
const paulaBahamonde = document.getElementById("8 PaulaBahamonde");
const maribel = document.getElementById("12 Maribel");
const julia = document.getElementById("13 Julia");
const alexa = document.getElementById("15 Alexa");
const mariaOrfila = document.getElementById("17 MariaOrfila");
const paulaSintes = document.getElementById("18 PaulaSintes");
const mariaPuerta = document.getElementById("42 MariaPuerta");
const andrea = document.getElementById("31 Andrea");

//cream ref a elements HTML//
const buttonStart = document.getElementById("start");
const matchEl = document.getElementById("match");
const eventsListEl = document.getElementById("events-list");
const addButton1p = document.getElementById("1p");
const addButton1pm = document.getElementById("1m");
const addButton2p = document.getElementById("2p");
const addButton2pm = document.getElementById("2m");
const addButton3p = document.getElementById("3p");
const addButton3pm = document.getElementById("3m");
const addButtonDR = document.getElementById("DR");
const addButtonOR = document.getElementById("OR");
const addButtonA = document.getElementById("Assist");
const addButtonTO = document.getElementById("TO");
const addButtonFault = document.getElementById("FP");
const addButtonFaultR = document.getElementById("FR");

//recorre elements base de dades//
onValue(eventsListInDB, function (snapshot) {

    if(snapshot.exists()){
    clearListEl();
    let eventsListarray = Object.entries(snapshot.val())
    for (let i = 0; i < eventsListarray.length; i++) {
        appendItemToEventListEl(eventsListarray[i]);
    }
}
else{
    eventsListEl.innerHTML = "Not items yet..."
}
})

let buttons = [addButtonFaultR,addButtonFault,addButton1p,addButton1pm,addButton2p,addButton2pm,addButton3p,addButton3pm,addButtonDR,addButtonOR,addButtonA,addButtonTO]
//click per afegir elements a base de dades//
for(let i = 0; i<buttons.length; i++){
buttons[i].addEventListener("click", function () {
/*let text;
switch(this.id){
    case "3p": text = "3 punts"
    case "2p": text = "2 punts"
    case "1p": text = "1 punt"
    case "OR": text = "Rebot Ofensiu"
    case "DR": text = "Rebot Defensiu"
    case "FR": text = "Falta Rebuda"
    case "FP": text = "Falta Personal"
    case "3m": text = "Triple Fallat"
    case "2m": text = "Tir Falat"
    case "1m": text = "TL Fallat"
    case "TO": text = "Pèrdua"
}*/

    const eventData = {
        author: player,
        uid: dorsal,
        eventType: this.id
      };
    push(eventsListInDB, eventData)
})
}


/*buttonStart.addEventListener("click", function(){
    match = matchEl.value 
})*/

let players = [nuria, aixa, paulaBahamonde, maribel, julia, alexa, mariaOrfila, paulaSintes, andrea, mariaPuerta]
for(let i=0; i<players.length;i++){
    players[i].addEventListener("click", function(){
        for(let y=0; y<players.length;y++){
            players[y].className = "player";
        }
        players[i].className += " selected";
        player = players[i].id.split(" ")[1]
        dorsal = players[i].id.split(" ")[0]
    })
}



//borra llista de la compra (que no surti duplicat)//
function clearListEl() {
    eventsListEl.innerHTML = "";
}

//afegir element a llista del HTML//
function appendItemToEventListEl(item){

    let itemData = item[1];
    let num = itemData.uid
    let eventType = itemData.eventType
    let eventAuthor = itemData.author

    let listItem = document.createElement("li");
    listItem.textContent = eventType+" - "+num+" "+eventAuthor;

    eventsListEl.append(listItem);

}


