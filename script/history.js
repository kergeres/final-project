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
  let resultArray = []
  userRef.orderBy("submitted").onSnapshot(function (snapshotData) {
resultArray = []
    snapshotData.forEach(doc => {
      let ex = doc.data();
      ex.id = doc.id;
      // console.log(ex.id);
      resultArray.push(ex);
    });
    appendExcercises(resultArray);
  });

    
  


// display the excercise list
function appendExcercises(databaseIn) 
{
  
    let htmlTemplate = "";
    for (let exc of databaseIn) {
      let idBySec = exc.duration
      
      if (exc.uid == firebase.auth().currentUser.uid)
      {
        htmlTemplate += `
        <p onclick="resultCheck(${idBySec})" tabindex="1" class="exc-title">${exc.uid} - <b> ${exc.submitted}</b></p>`;
        
      }
      // else if (1==1)
      // {
      //   alert()
      // }
       
    }     
    showLoader(false)
        document.querySelector(".exc-container").innerHTML = htmlTemplate;
        
}



function resultCheck(idIn)
{ 
  console.log(idIn)
  // console.log(resultArray);
  

}
