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
 
    
  const userRef = db.collection("results");
  
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


  
  
let them  = []
let lengthOfTasks = 0
// display the excercise list
function appendExcercises(databaseIn) 
{
  
    let htmlTemplate = "";
    for (let exc of databaseIn) {
     
      if (exc.uid == auth.currentUser.uid)
      {
        lengthOfTasks = Object.size(exc['excercise'])
        console.log(lengthOfTasks);
        htmlTemplate += `
      
       <tr onclick="resultCheck('${exc.id}'); andLength('${exc.id}')" tabindex="1" class="exc-title" ><td>${exc.title}</td><td> ${exc.submitted}</td> <td>${exc.result}</td></tr>`;
        
    }     
    showLoader(false)
        document.querySelector(".exc-container").innerHTML = `<table class="history-table">${htmlTemplate}</table>`
        
}
}
let llength =0
function andLength (inId)
{
  console.log("lefutott legalabb");
  for (const iit of resultArray) {
    if (iit.id == inId)
    {
      llength = Object.size(iit['excercise'])
      console.log(llength);
      
    }
    
  }
 
}


// itt valami nemjo majus 4
let sliceTomb = []
let szam = 1;

async function resultCheck(chosenId)
{ 
 let markup = ""
  function rightArray(be)
  {
    return be.id=== `${chosenId}`
  } 
  await console.log(llength);
sliceTomb = resultArray.find(rightArray)


   for (let k =0; k<llength; k++)
      {
        if (sliceTomb['excercise'][k]['key'] != 'undefined')
        {
          let activeClass = sliceTomb['excercise'][k]['key'] != sliceTomb['excercise'][k]['userAns'] ? 'incorrect' : ''
          let incorrectTabindex = sliceTomb['excercise'][k]['key'] != sliceTomb['excercise'][k]['userAns'] ? '1' : '0'

          console.log(sliceTomb['excercise'][k]['key']);
          markup += `
          <tr><td>${k+1}.</td><td onfocus="sayLoudly('your answer:${sliceTomb['excercise'][k]['userAns']}. correct answer: ${sliceTomb['excercise'][k]['key']}')" tabindex="${incorrectTabindex}" class="${activeClass}" >${sliceTomb['excercise'][k]['userAns']}</td><td >${sliceTomb['excercise'][k]['key']}</td></tr>
          
          `
        }
        
       
      }


   document.querySelector(".exc-container").innerHTML = `<table class="res-table"><tr><td></td><td id="userAnswer">Answer</td><td>key</td></tr>${markup}</table> `;
   lengthOfTasks =0
    
  };
  

  Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
      // console.log(Object.values( obj.hasOwnProperty(key)));
    }
    return size;
  };







function logout() {

  auth.signOut()
  auth.onAuthStateChanged(function(user) {
      if (user==null)
          {
              window.open("../index.html", "replace")
          }
    });



  
    }