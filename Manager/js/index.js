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
const playing = [];

//crear variables de jugadores
const mariaOrfila = document.getElementById(17);

//cream ref a elements HTML//
const buttonStart = document.getElementById("start");
const matchEl = document.getElementById("match");
/*const eventsListEl = document.getElementById("events-list");
const addButton1p = document.getElementById("1p");
const addButton1pm = document.getElementById("m1p");
const addButton2p = document.getElementById("2p");
const addButton2pm = document.getElementById("m2p");
const addButton3p = document.getElementById("3p");
const addButton3pm = document.getElementById("m3p");
const addButtonDR = document.getElementById("DR");
const addButtonOR = document.getElementById("OR");
const addButtonA = document.getElementById("Assist");
const addButtonTO = document.getElementById("TO");*/

//recorre elements base de dades//
/*onValue(eventsListInDB, function (snapshot) {

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
})*/

/*let buttons = [addButton1p,addButton1pm,addButton2p,addButton2pm,addButton3p,addButton3pm,addButtonDR,addButtonOR,addButtonA,addButtonTO]
//click per afegir elements a base de dades//
for(let i = 0; i<buttons.length; i++){
buttons[i].addEventListener("click", function () {
    const eventData = {
        author: "Xavi",
        uid: 9,
        eventType: this.id
      };
    push(eventsListInDB, eventData)
})
}*/

buttonStart.addEventListener("click", function(){
    match = matchEl.value 
})

mariaOrfila.addEventListener("click", function(){
    console.log("hola")
    playing.push("Maria Orfila");
    console.log(playing)
})


//borra llista de la compra (que no surti duplicat)//
/*function clearListEl() {
    eventsListEl.innerHTML = "";
}*/

//afegir element a llista del HTML//
/*function appendItemToEventListEl(item) {

    let itemData = item[1];
    let eventType = itemData.eventType
    let eventAuthor = itemData.author

    let listItem = document.createElement("li");
    listItem.textContent = eventType+"-"+eventAuthor;

    eventsListEl.append(listItem);

}*/


