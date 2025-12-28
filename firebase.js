  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
  } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAm4C-p1etxa4ZKY5BQIfKoe5TugGl0j5I",
    authDomain: "chanin-d.firebaseapp.com",
    projectId: "chanin-d",
    storageBucket: "chanin-d.firebasestorage.app",
    messagingSenderId: "950060443764",
    appId: "1:950060443764:web:272e7117a43966ae608921"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // 👉 ฟังก์ชันสร้างคิว
  window.createQueue = async () => {
    const token = Math.random().toString(36).substring(2, 10);

    const docRef = await addDoc(collection(db, "queues"), {
      token: token,
      status: "waiting",
      used: false,
      createdAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      token: token
    };
  };
