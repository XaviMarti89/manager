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
let player, dorsal;

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

    if (snapshot.exists()) {
        clearListEl();
        let eventsListarray = Object.entries(snapshot.val())
        for (let i = 0; i < eventsListarray.length; i++) {
            appendItemToEventListEl(eventsListarray[i]);
        }
    }
    else {
        eventsListEl.innerHTML = "Not items yet..."
    }
})

let buttons = [addButtonFaultR, addButtonFault, addButton1p, addButton1pm, addButton2p, addButton2pm, addButton3p, addButton3pm, addButtonDR, addButtonOR, addButtonA, addButtonTO]
//click per afegir elements a base de dades//
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function () {

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
for (let i = 0; i < players.length; i++) {
    players[i].addEventListener("click", function () {
        for (let y = 0; y < players.length; y++) {
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

function eventShow(e) {
    let text;
    switch (e) {
        case "3p": text = "3 punts"; break;
        case "2p": text = "2 punts"; break;
        case "1p": text = "1 punt"; break;
        case "OR": text = "Rebot Ofensiu"; break;
        case "DR": text = "Rebot Defensiu"; break;
        case "FR": text = "Falta Rebuda"; break;
        case "FP": text = "Falta Personal"; break;
        case "3m": text = "Triple Fallat"; break;
        case "2m": text = "Tir Fallat"; break;
        case "1m": text = "TL Fallat"; break;
        case "TO": text = "Pèrdua"; break;
        case "Assist": text = "Assistència"; break;
    }
    return text;
}

//afegir element a llista del HTML//
function appendItemToEventListEl(item) {

    let itemData = item[1];
    let num = itemData.uid
    let eventType = itemData.eventType
    let eventAuthor = itemData.author
    let ev = eventShow(eventType);


    let listItem = document.createElement("li");
    listItem.textContent = num + " " + eventAuthor + " - " + ev;

    eventsListEl.append(listItem);

}




let myChart;

document.getElementById("cStats").addEventListener("click", function () {

    onValue(eventsListInDB, function (snapshot) {

        let pT = 0
        let pT1 = 0
        let pT2 = 0
        let pT3 = 0
        let OR = 0
        let DR = 0
        let A = 0
        let TO = 0
        let FR = 0
        let FP = 0;
        let T1 = 0;
        let T2 = 0;
        let T3 = 0
        let mT1 = 0
        let mT2 = 0
        let mT3 = 0;

        if (snapshot.exists()) {
            let events = Object.entries(snapshot.val())

            for (let i = 0; i < events.length; i++) {
                switch (events[i][1].eventType) {
                    case "3p": T3++; break;
                    case "2p": T2++; break;
                    case "1p": T1++; break;
                    case "OR": OR++; break;
                    case "DR": DR++; break;
                    case "FR": FR++; break;
                    case "FP": FP++; break;
                    case "3m": mT3++; break;
                    case "2m": mT2++; break;
                    case "1m": mT1++; break;
                    case "TO": TO++; break;
                    case "Assist": A++; break;
                }
            }

            console.log(T3+" "+T2+" "+T1+" "+mT3+" "+mT2+" "+mT1)

            pT1 = (T1 / (T1 + mT1)) * 100;
            pT2 = (T2 / (T2 + mT2)) * 100;
            pT3 = (T3 / (T3 + mT3)) * 100;
            pT = ((T2 + T3) / (T2 + mT2 + T3 + mT3)) * 100

            console.log(pT3+" "+pT2+" "+pT1+" "+pT)



            const labels = ["%T", "%T2", "%T3", "%T1", "OR", "DR", "A", "TO", "FR", "FP"]
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Stats',
                    data: [pT, pT1, pT2, pT3, OR, DR, A, TO, FR, FP],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            };


            const config = {
                type: 'bar',
                data: data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
            };


            const ctx = document.getElementById('myChart').getContext('2d');
            if (myChart) {
                myChart.destroy();
            }

            myChart = new Chart(ctx, config);

        }

    })

});

