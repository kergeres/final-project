"use strict";

var firebaseConfig = {
    apiKey: "AIzaSyBfl3DJEQWOOLGoNp7jnXfXQ8sqcZotTlQ",
    authDomain: "vizsga-d5490.firebaseapp.com",
    projectId: "vizsga-d5490",
    storageBucket: "vizsga-d5490.appspot.com",
    messagingSenderId: "883855947361",
    appId: "1:883855947361:web:d9544d6793d395010e1c20",
    measurementId: "G-TJM6MVKKES"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  const auth = firebase.auth();
  const db = firebase.firestore();
  // szerintem nemkell
 
    
  const userRef = db.collection("user");
  
  // watch the database ref for changes
  userRef.onSnapshot(function (snapshotData) {
    let completedTasks = [];
    snapshotData.forEach(function (doc) {
      let user = doc.data();
     
      let mostani = firebase.auth().currentUser;
      user.id = doc.id;
      if (user.id == mostani.uid) {
        completedTasks.push(user);
      }
      
    });
    appendExcercises(completedTasks);
  });


// display the excercise list
function appendExcercises(databaseIn = []) 
{
  
    // let htmlTemplate = "";
    // for (let exc of databaseIn) {
    //     htmlTemplate += `
    //     <p onclick="openExcercise(${exc.id})" tabindex="1" class="exc-title">${exc[0]} - <b> ${exc.submitted}</b></p>`;
        
        
    //     console.log(exc["title"])

       
    // }     
    //     document.querySelector(".exc-container").innerHTML = htmlTemplate;
}



// 45 sornal nem az openexc fuggvenyt kene hivni hanem valamit ami kiirja a valamit