import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, push, onChildAdded } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

window.login = function () {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => location.href = "chat.html")
    .catch(e => alert(e.message));
};

window.sendMessage = function () {
  push(ref(db, "messages"), { text: msg.value });
  msg.value = "";
};

onChildAdded(ref(db, "messages"), snap => {
  let div = document.createElement("div");
  div.className = "msg";
  div.innerText = snap.val().text;
  messages.appendChild(div);
});
