// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required
import { initializeApp } from 'firebase/app';
// Add the Firebase products and methods
import { getFirestore, addDoc, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// Document elements
const form = document.getElementById('add-plant');
const input1 = document.getElementById('name');
const input2 = document.getElementById('plant');
const plantlist = document.getElementById('plantlist');

let db;

async function main() {

  // Add Firebase project configuration object
  const firebaseConfig = {
  apiKey: "AIzaSyBkr9-0ZHcMrV3H-J0ZEYepgLceux020lw",
  authDomain: "only-plants-b5645.firebaseapp.com",
  projectId: "only-plants-b5645",
  storageBucket: "only-plants-b5645.appspot.com",
  messagingSenderId: "59599137300",
  appId: "1:59599137300:web:c5437b20f50fca522e5501",
  measurementId: "G-EQCXKNN00H"
  };

  // Initialize
  initializeApp(firebaseConfig);
  db = getFirestore();

  // Listen to the form submission
  form.addEventListener('submit', async e => {
    // Prevent the default form redirect
    e.preventDefault();
    // Write a new message to the database collection "guestbook"
    addDoc(collection(db, 'plants'), {
      name: input1.value,
      plant: input2.value
    });
    // clear message input field
    input1.value = '';
    input2.value = '';
    // Return false to avoid redirect
    return false;
  });

  // Create query for existing listings
  const q = query(collection(db, 'plants'), orderBy('name'));
  onSnapshot(q, snaps => {
    // Reset page
    plantlist.innerHTML = '';
    // Loop through documents in database
    snaps.forEach(doc => {
      // Create an HTML entry for each document and add it to the chat
      const entry = document.createElement('p');
      entry.textContent = doc.data().name + ': ' + doc.data().plant;
      plantlist.appendChild(entry);
    });
  });

}

main();