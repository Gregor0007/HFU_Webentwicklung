// Termine werden auf index.html angezeigt, da localStorage nicht Seitenübergreifend ist, wenn nicht über Webserver ausgeführt wird

// add header
function addHeader() {
  let header = document.querySelector("header")

  header.innerHTML = `<div class="menu">
    <div>
        <p> <a href="index.html">Terminbuchung</a>
        </p>
        <p> <a href="events.html">Meine Termine</a>
        </p>
      </div>
    </div>
  <div class="container">
    <div class="header-inner">
      <h1> <a href="index.html">Goldene Schere</a>
      </h1>
      <div class="burgericon">
        <div class="line line1">

        </div>
        <div class="line line2">

        </div>
        <div class="line line3">

        </div>
      </div>
    </div>
  </div>`
}
addHeader()

// toggle menu
let burgericon = document.querySelector(".burgericon")

burgericon.addEventListener("click", toggleMenu)

function toggleMenu() {
  let menu = document.querySelector(".menu")
  menu.classList.toggle("active")
}


// add footer
function addFooter() {
  let footer = document.querySelector("footer")

  footer.innerHTML = `<div class="container">
      <div class="footer-inner">

        <p> <span class="text-gold">Adresse</span> <br>
          Friseur Goldene Schere <br>
          Musterstr. 10 <br>
          77777 Musterstadt</p>
        <div>
          <p> <a href="events.html">Meine Termine</a>
          </p>
        </div>
      </div>
    </div>`
}
addFooter()

// data  
function getEvents() {
  let savedEvents = JSON.parse(localStorage.getItem("events"))
  if (savedEvents == null) {
    savedEvents = []
  }
  return savedEvents
}
let events = getEvents()

// create event button
// Variable createEventButton deklarieren und den Wert zuweisen: mit Methode querySelector den createEventButton holen (Objekt)
let createEventButton = document.querySelector("#createEventButton")
// Objekt createEventButton wird mit Methode addEventListener Event Listener bei click die Funktion createEvent zugewiesen
if (createEventButton != null) {
  createEventButton.addEventListener("click", addEvent)
}

// Funktion createEvent wird definiert
function addEvent() {
  // Variablen deklarieren und den Wert zuweisen:
  let firstName = document.querySelector("#first-name").value
  let lastName = document.querySelector("#last-name").value
  let eMail = document.querySelector("#mail").value
  let phoneNumber = document.querySelector("#phone").value
  let eventDate = document.querySelector("#date").value
  let eventTime = document.querySelector("#time").value
  let hairCut = document.querySelector("#haircut").value

  let event = {
    firstName: firstName,
    lastName: lastName,
    eMail: eMail,
    phoneNumber: phoneNumber,
    eventDate: eventDate,
    eventTime: eventTime,
    hairCut: hairCut
  }

  events.push(event)
  let eventsAsJson = JSON.stringify(events)
  window.localStorage.setItem("events", eventsAsJson)

  showEvents()

}

// show Events
function showEvents() {
  let eventsHtml = ""
  for (let [i, event] of events.entries()) {
    eventsHtml += `
<div class="event">
  <div class="actions" data-index=` + i + `>

    <div class="action edit">
       <img src="images/pencil.svg" alt="">
    </div>
    <div class="action delete">
      <img src="images/trash.svg" alt="">
    </div>
  </div >
  <h3>` + event.eventDate + " - " + event.eventTime + " Uhr" + `</h3>
  <table>
    <tr>
      <td>Name:</td>
      <td>` + event.firstName + " " + event.lastName + `</td>
    </tr>
    <tr>
      <td>E-Mail Adresse:</td>
      <td>` + event.eMail + `</td>
    </tr>
    <tr>
      <td>Telefonnummer:</td>
      <td>`+ event.phoneNumber + `</td>
    </tr>
    <tr>
      <td>Datum:</td>
      <td>` + event.eventDate + `</td>
    </tr>
    <tr>
      <td>Uhrzeit:</td>
      <td>` + event.eventTime + " Uhr" + `</td>
    </tr>
    <tr>
      <td>Haarschnitt:</td>
      <td>` + event.hairCut + "haarschnitt" + `</td>
    </tr>
  </table>
</div > `
  }

  let eventsDiv = document.querySelector(".events").innerHTML = eventsHtml

  // Suche alle delete Buttons und füge jedem Button einen eventListener hinzu
  let deleteEventButtons = document.querySelectorAll(".delete")
  for (let deleteEventButton of deleteEventButtons) {
    deleteEventButton.addEventListener("click", deleteEvent)
  }

  // Suche alle edit Buttons und füge jedem Button einen eventListener hinzu
  let editEventButtons = document.querySelectorAll(".edit")
  for (let editEventButton of editEventButtons) {
    editEventButton.addEventListener("click", editEvent)
  }
}

showEvents()


function deleteEvent(e) {
  // e.target enthält geklicktes imgElement
  let imgElement = e.target
  // index Element in zweiter Parentebene über img
  let actionsDiv = imgElement.parentElement.parentElement
  // index befindet sich in Attribut data-index
  let index = actionsDiv.getAttribute("data-index")
  // Löschen von event an Stelle index
  events.splice(index, 1)
  // Für localStorage events als String, da nur Strings speicherbar
  let eventsAsJson = JSON.stringify(events)
  // Speichern von events im localStorage
  localStorage.setItem("events", eventsAsJson)
  // Mit Funktion schowEvents anzeigen der Änderung
  showEvents()
}


function editEvent(e) {
  let imgElement = e.target
  let actionsDiv = imgElement.parentElement.parentElement
  let index = actionsDiv.getAttribute("data-index")
  document.querySelector("#first-name").value = events[index].firstName
  document.querySelector("#last-name").value = events[index].lastName
  document.querySelector("#mail").value = events[index].eMail
  document.querySelector("#phone").value = events[index].phoneNumber
  document.querySelector("#date").value = events[index].eventDate
  document.querySelector("#time").value = events[index].eventTime
  document.querySelector("#haircut").value = events[index].hairCut

  // To-Do Restliche Daten auch
  // Löschen von event an Stelle index
  events.splice(index, 1)
  // Für localStorage events als String, da nur Strings speicherbar
  let eventsAsJson = JSON.stringify(events)
  // Speichern von events im localStorage
  localStorage.setItem("events", eventsAsJson)
}


