<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyAm4C-p1etxa4ZKY5BQIfKoe5TugGl0j5I",
    authDomain: "chanin-d.firebaseapp.com",
    projectId: "chanin-d",
    storageBucket: "chanin-d.firebasestorage.app",
    messagingSenderId: "950060443764",
    appId: "1:950060443764:web:272e7117a43966ae608921"
  };

  const app = initializeApp(firebaseConfig);
  window.db = getFirestore(app);
</script>