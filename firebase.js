import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  deleteDoc,
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

// สร้างคิว 1,2,3,...
export async function createQueue() {
  const q = query(
    collection(db, "queues"),
    orderBy("token", "desc"),
    limit(1)
  );

  const snap = await getDocs(q);
  const next = snap.empty ? 1 : snap.docs[0].data().token + 1;

  await addDoc(collection(db, "queues"), {
    token: next,
    createdAt: serverTimestamp()
  });

  return next;
}

// เรียกคิว → ลบทิ้งทันที
export async function callQueueByNumber(number) {
  const q = query(
    collection(db, "queues"),
    where("token", "==", number),
    limit(1)
  );

  const snap = await getDocs(q);
  if (snap.empty) return false;

  await deleteDoc(snap.docs[0].ref);
  return true;
}

// ลูกค้าฟังคิว: doc หาย = ถึงคิว
export function listenQueue(token, callback) {
  const q = query(
    collection(db, "queues"),
    where("token", "==", token)
  );

  return onSnapshot(q, snap => {
    if (snap.empty) callback();
  });
}
