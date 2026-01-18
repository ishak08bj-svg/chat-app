import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "ضع_apiKey",
  authDomain: "اسم_المشروع.firebaseapp.com",
  databaseURL: "https://اسم_المشروع-default-rtdb.firebaseio.com",
  projectId: "اسم_المشروع",
  storageBucket: "اسم_المشروع.appspot.com",
  messagingSenderId: "رقم",
  appId: "app_id"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
