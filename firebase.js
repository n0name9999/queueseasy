import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
  orderBy,
  limit,
  onSnapshot
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

// 🔹 สร้างคิว
export async function createQueue() {
  const token = Math.random().toString(36).slice(2, 10);

  await addDoc(collection(db, "queues"), {
    token,
    status: "waiting",
    used: false,
    createdAt: serverTimestamp()
  });

  return token;
}

// 🔹 เรียกคิวถัดไป
export async function callNextQueue() {
  const q = query(
    collection(db, "queues"),
    where("status", "==", "waiting"),
    orderBy("createdAt"),
    limit(1)
  );

  const snap = await getDocs(q);
  if (snap.empty) return null;

  await updateDoc(snap.docs[0].ref, {
    status: "called",
    used: true
  });

  return snap.docs[0].data().token;
}

// 🔹 ฝั่งลูกค้า ฟังสถานะคิว
export function listenQueue(token, callback) {
  const q = query(
    collection(db, "queues"),
    where("token", "==", token)
  );

  return onSnapshot(q, (snap) => {
    if (!snap.empty) callback(snap.docs[0].data());
  });
}
