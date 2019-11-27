const socket = io();

//const socket = io.connect('http://localhost');
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const content = document.getElementById("content-container");
//const messageElement = document.getElementById("ide");
let gammelBrukere = [];

const name = prompt("What is your name");
//appendName("You Joined");
socket.emit("new-user", name);

socket.on("ny-bruker", brukere => {
  updateListUsers(brukere);
});

socket.on("chat-message", data => {
  appendMessage(`${data.name} : ${data.message}`);
  let list = document.getElementById("tableUsers").childNodes;
});

socket.on("user-connected", name => {
  appendName(`${name} connected`);
  addUser(name);
});

socket.on("sent_message", temp => {
  let user = document.getElementById(temp).childNodes;
  let change = user[1].childNodes;
  console.log(change);
  change[0].style.color = "green";
  //user[1].style.backgroundColor = "#90EE90";
  //user[1].innerHTML = "Ready";
});

//Resets color and "Not ready text"
socket.on("Reset_table", temp => {
  let list = document.getElementsByClassName("fa-check-circle");
  for (let i = 0; i < list.length; i++) {
    list[i].style.color = "black";
  }
});

//socket.on("countdown", time => {
//  countdown(time);
//});

messageForm.addEventListener("submit", e => {
  e.preventDefault();

  console.log(messageInput.value);

  const message = messageInput.value;

  //appendMessage(`You : ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

let mixButton = document.getElementById("mixButton");
mixButton.addEventListener("click", sendReady);

function sendReady() {
  socket.emit("start-session");
  console.log("sendt");
}

socket.on("start-the-clock", time => {
  countdown(time);
});

function countdown(minutes) {
  var seconds = 60;
  var mins = minutes;
  function tick() {
    var counter = document.getElementById("countdown");
    var current_minutes = mins - 1;
    seconds--;
    counter.innerHTML =
      current_minutes.toString() +
      ":" +
      (seconds < 10 ? "0" : "") +
      String(seconds);
    if (seconds > 0) {
      setTimeout(tick, 1000);
    } else {
      if (mins > 1) {
        countdown(mins - 1);
      }
    }
  }
  tick();
}

function appendMessage(message) {
  //const messageElement = document.createElement("div");
  //messageElement.id = "ide";
  //messageElement.innerText = message;
  messageInput.value = message;
  //messageInput.appendChild(messageElement);
  //messageInput.value += messageElement.innerText;
}

function appendName(name) {
  const nameElement = document.createElement("div");
  nameElement.innerText = name;
  //messageContainer.append(nameElement);
}

function copyText() {
  let text = document.getElementById("message-input");
  let textbox = document.getElementById("hidden_textarea");
  textbox.value = text.value;
}

function copyAndSend() {
  copyText();
  document.getElementById("hidden_btn").click();
}

function updateListUsers(brukere) {
  if (gammelBrukere[0] == null) {
    for (let x = 0; x < brukere.length; x++) {
      addUser(brukere[x]);
    }
    gammelBrukere = brukere.slice();
  } else {
    for (let i = 0; i < brukere.length; i++) {
      let check = brukere.findIndex(null);
      addUser(brukere[check]);
    }
  }
}

function addUser(name) {
  var table = document.getElementById("tableUsers");
  var row = table.insertRow(-1);
  row.id = name;
  var cell = row.insertCell(-1);
  var cell2 = row.insertCell(-1);
  cell.innerHTML = name;
  var icon = document.createElement("i");
  icon.classList.add("fas");
  icon.classList.add("fa-check-circle");
  icon.classList.add("fa-2x");
  cell2.appendChild(icon);
}

/*
let sendUserButton = document.getElementById("send-email-button");
sendUserButton.addEventListener("click", sendEmail);

function sendEmail() {
  let userList = document.getElementById("email-adresses").value.split("\n");
  for (let i = 0; i < userList.length; i++) {
    console.log(userList[i]);
  }

  socket.emit("send-button-pushed", userList);
  document.getElementById("email-adresses").value = "";
} */
