import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-app.js'

import { getAuth, signInWithPopup, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.8.3/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyBz55X3M4wdtYiW7EsbFwGz98K1Mw4xOOo",
    authDomain: "wmdd-4885-integrated-project.firebaseapp.com",
    projectId: "wmdd-4885-integrated-project",
    storageBucket: "wmdd-4885-integrated-project.appspot.com",
    messagingSenderId: "65956786490",
    appId: "1:65956786490:web:329f96ce8f75152a06e003"
};

initializeApp(firebaseConfig);