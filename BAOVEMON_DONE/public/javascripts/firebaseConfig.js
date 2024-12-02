// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlRVCba0c5MuEKNYwTQFycTLh014CE4HE",
    authDomain: "datn-md08-8386.firebaseapp.com",
    projectId: "datn-md08-8386",
    storageBucket: "datn-md08-8386.appspot.com",
    messagingSenderId: "493847604523",
    appId: "1:493847604523:web:bd394df508a14d1b4de96e",
    measurementId: "G-WD4TZC2NV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export the auth object
export { auth };
