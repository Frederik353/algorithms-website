
import firebase from "firebase";



const firebaseConfig = {
    apiKey: "AIzaSyB5xrjnEhebPQeyzzWRZspz46ipBXkN2pY",
    authDomain: "it-prosjekt-2-d23c1.firebaseapp.com",
    projectId: "it-prosjekt-2-d23c1",
    storageBucket: "it-prosjekt-2-d23c1.appspot.com",
    messagingSenderId: "811654258686",
    appId: "1:811654258686:web:079acdac8a4bae859c6aaf",
    measurementId: "G-T74RTTS6MX"
};



const fBase = firebase.initializeApp(firebaseConfig);

export { fBase };


