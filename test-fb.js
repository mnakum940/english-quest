import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCyPaUz16dbn7PI_Nufy7AzkT_3jSa2A9Q",
  authDomain: "english-quest-d41b5.firebaseapp.com",
  projectId: "english-quest-d41b5",
  storageBucket: "english-quest-d41b5.firebasestorage.app",
  messagingSenderId: "771944099529",
  appId: "1:771944099529:web:82ae464dcbb34b8aa56718"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function test() {
  try {
    console.log("Connecting...");
    const snapshot = await get(ref(db, 'admin/pin'));
    console.log("Val:", snapshot.val());
  } catch (e) {
    console.error("Error:", e.message);
  }
  process.exit(0);
}
test();
