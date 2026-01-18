import { auth, db, storage } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { ref, set, push, onChildAdded, onValue, update } from 
"https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { ref as sRef, uploadBytes, getDownloadURL } from
"https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// تسجيل الدخول
window.login = function() {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => location.href = "chat.html")
    .catch(e => alert(e.message));
};

// بعد تسجيل الدخول
onAuthStateChanged(auth, user => {
  if(user){
    const userRef = ref(db, "users/" + user.uid);
    set(userRef, { name: user.email, online: true });
    window.addEventListener("beforeunload", () => {
      update(userRef, { online: false });
    });
  }
});

// إرسال رسالة نصية
window.sendMessage = function(groupId="group1"){
  push(ref(db, "messages/" + groupId), {
    text: msg.value,
    sender: auth.currentUser.uid,
    time: Date.now()
  });
  msg.value = "";
};

// إرسال صورة
window.sendImage = function(groupId="group1"){
  const file = document.getElementById("fileInput").files[0];
  if(!file) return;

  const imageRef = sRef(storage, 'images/' + Date.now() + "_" + file.name);
  uploadBytes(imageRef, file).then(snapshot => {
    getDownloadURL(snapshot.ref).then(url => {
      push(ref(db, "messages/" + groupId), {
        image: url,
        sender: auth.currentUser.uid,
        time: Date.now()
      });
    });
  });
};

// استقبال الرسائل
onChildAdded(ref(db, "messages/group1"), snap => {
  const val = snap.val();
  let div = document.createElement("div");
  div.className = "msg";
  if(val.text) div.innerText = val.text + " (" + val.sender + ")";
  if(val.image){
    let img = document.createElement("img");
    img.src = val.image;
    img.style.maxWidth = "200px";
    div.appendChild(img);
  }
  messages.appendChild(div);
});

// عرض حالة المستخدمين
onValue(ref(db, "users"), snapshot => {
  usersOnline.innerHTML = "";
  snapshot.forEach(u => {
    let div = document.createElement("div");
    div.innerText = u.val().name + (u.val().online ? " ✅" : " ❌");
    usersOnline.appendChild(div);
  });
});
