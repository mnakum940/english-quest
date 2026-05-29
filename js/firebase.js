import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCyPaUz16dbn7PI_Nufy7AzkT_3jSa2A9Q",
  authDomain: "english-quest-d41b5.firebaseapp.com",
  projectId: "english-quest-d41b5",
  storageBucket: "english-quest-d41b5.firebasestorage.app",
  messagingSenderId: "771944099529",
  appId: "1:771944099529:web:82ae464dcbb34b8aa56718",
  measurementId: "G-VVK67W89HR"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Sync local state to Firebase
export function syncStateToCloud(state) {
  // Firebase will cache this locally if offline, and sync when online!
  set(ref(db, 'tuli_data/state'), state).catch(e => console.error("Firebase sync error", e));
}

// Listen for cloud changes to update local
export function listenToCloudState(onCloudUpdate) {
  const stateRef = ref(db, 'tuli_data/state');
  onValue(stateRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      onCloudUpdate(data);
    }
  });
}

// Verify PIN against Firebase
export async function verifyAdminPinCloud(pin) {
  try {
    const pinRef = ref(db, 'admin/pin');
    
    // 3-second timeout to prevent UI freezing if database is missing or unreachable
    const snapshot = await Promise.race([
      get(pinRef),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Cloud DB Timeout')), 3000))
    ]);
    
    let truePin = snapshot.val();
    
    // If not set yet on Firebase, set the default to '1234'
    if (!truePin) {
      await set(pinRef, '1234').catch(() => {}); // Catch permission errors silently
      truePin = '1234';
    }
    
    return pin === truePin;
  } catch (err) {
    console.warn("Could not reach cloud to verify PIN (Check DB Rules or Setup). Falling back to 1234", err);
    return pin === '1234'; // Fallback if completely offline or misconfigured
  }
}

export async function setAdminPinCloud(newPin) {
  await set(ref(db, 'admin/pin'), newPin);
}
