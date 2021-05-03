"use strict";
// igazabol a   CSS en kivul kb majdnem minden kesz. nyilvan nem..

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

  db.settings({timestamsInSnapshots: true});

// Fetches the excercises content (homeworks) from database
let databaseOut = [];
async function loadData() {
    let response = await fetch("../data/json.json");
    let jsonData = await response.json();
    databaseOut = jsonData;
    appendExcercises(databaseOut);
  }

// call the fetch function.
async function init()
{
    await loadData(); 
}
init();


// display the excercise list
function appendExcercises(databaseIn) 
{
    let htmlTemplate = "";
    for (let exc of databaseIn) {
        htmlTemplate += `
        <h1 onclick="openExcercise(${exc.id})" tabindex="1" class="exc-title">${exc.title}</h1>`;
        
    }     
        document.querySelector(".exc-container").innerHTML = htmlTemplate ;
}


// identify the chosen excercise and calls the function which displays the chosen excercise tasks
let chosenArray = ["jeg er empty"];
let startdate = 0;
function openExcercise(excId)
{
    for (const fut of databaseOut) {
        if (fut.id == excId)
        { 
            chosenArray.fill(databaseOut.slice(fut.id-1, fut.id));
            appendSlides(1)
            document.querySelector("#taskx").focus()
            startdate = new Date()
            vmi()
           
            
        } 
    }
}

function vmi()
{
    startdate = new Date()
    
}



     

let slidenumber = 1;
let answersFromUser = [];
// take the next slide on the Next click, calls the function which displays them
function pagination ()
{


document.querySelector("#next").addEventListener('click', function ()
{
    let answer = document.querySelector("#answer").value 
    let idPlusAns = {};
    idPlusAns [slidenumber] = answer;
    answersFromUser.push(idPlusAns)
    slidenumber++;
    appendSlides(slidenumber)
   
    document.querySelector("#taskx").focus() 
    
    if (slidenumber != 1)
    {
      document.querySelector(".exc-containerr").classList.remove("animo")
      document.querySelector(".taskx").classList.remove("taskx-anima")
      document.querySelector(".ans").classList.remove("taskx-anima")
      
    }
      
    
})
}
// ¨displays all of the slides

function appendSlides(slideNr)
{
    let lengthOfTasks = 0
    let counter = chosenArray.length
    let htmlTemplate = "";
    for (let ubolt of chosenArray) {
      let counter = ubolt[0].tasks
    let taskX = ubolt[0].tasks[`task${slideNr}`]
    
        htmlTemplate=  `<div class="exc-containerr animo"><div class="pad-container">
       <a href="excercises.html"> <span class="iksz">&#10005;</span></a>
       <table class="proc-table">
       <tr><td class="proc taskx-anima">${slideNr}</td><td class="proc ">/${Object.size(ubolt[0].tasks)}</td></tr>
       
       </table>
       
       <p class="proc taskx-anima" ></p>
       <p class="proc"></p>
        <p tabindex="0" class="taskx-anima" id="taskx" >${taskX}</p>
        <input autocomplete="off" id="answer" class="ans-input ans taskx-anima" type="input"/>
        <button type="button"  class="btn pag-btn" id="next">Next</button></div></div>
        ` ;
        // Get the size of an the chosen excercise size (length)
        lengthOfTasks = Object.size(ubolt[0].tasks)
        
       
        
     }

     if(slideNr <= lengthOfTasks)
     {

        document.querySelector(".exc-container").innerHTML = htmlTemplate;
        pagination ()
     }

     else
     {
        document.querySelector(".exc-container").innerHTML = "vege";
        displayRecentAnswers (answersFromUser)
     }
}

// counting the length of the tasks 

Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  

let szamok = 1;

function nemtom (taskId)
{
    for (const iti of chosenArray) {
     
        return iti[0].keys[`key${taskId}`]
        // console.log(iti[0].tasks[`task${taskId}`]);
    }
}

let idUanswerKex = []
// display the results of the excercises after the slideshow of the excercise
  let counter = 1;
  function displayRecentAnswers (ansIn)
  {
    let title = "g"
      let htmlTemplate=""
    
      for (const run of ansIn) 
     { 
          let tasksKey =  nemtom(counter)
          console.log(tasksKey);
        
          htmlTemplate += `<tr><th>${Object.keys(run)}</th><th id="userAnswer"> ${run[counter]}</th><th>jo: ${tasksKey}</th></tr>`
         
          for (const iti of chosenArray) {
     
            title = iti[0].title
          
        }
          idUanswerKex.push({"id":counter, "userAns": run[counter], "key": tasksKey} )
          counter++;

        //   szerintem ez nem kell
        //   for (const fut of chosenArray) {
        //       if (1==1)
        //       {
        //           console.log(chosenArray);
        //       }
        //   { 
        //       console.log("kérem " + run[0] );
        //   }
        //   }
      }
      
    document.querySelector(".exc-container").innerHTML = `<div class="exc-containerr"><div class="pad-container"> <a href="excercises.html"> <span class="iksz">&#10005;</span></a><table class="res-table taskx-anima">${htmlTemplate}</table> <button id="gbck"  onclick="window.location.href='excercises.html'"class="btn pag-btn">Go back</button></div></div>`
    
  
    firestoreUpload(idUanswerKex, title) 
    document.querySelector("#gbck").focus()  
   
  }

  let today = new Date()
  let dd = new Date().getDate()
  let mm = new Date().getMonth() +1
  let yyyy = new Date().getFullYear()
  let hh = new Date().getHours()
  let mi = new Date().getMinutes()

  let se = today.getSeconds()


  let currentDate =  `${yyyy}-${mm}-${dd} at ${hh}:${mi}`  
  let exactCurrentdate =  `${yyyy}-${mm}-${dd} ${hh}:${mi}:${se}`  

  
    function firestoreUpload(idUanswerKex, title) {
  
      let user = firebase.auth().currentUser;
      //create a new collection insede the user collection
    
      db.collection("user").doc(user.uid).set({[exactCurrentdate]: {
        submitted: currentDate, 
        excercise: idUanswerKex,
        email: user.email,
        duration: Math.floor( (startdate-today)/1000),
        title: title}
        
        //baskets number
      },  {merge: true} ).then(() => {
          console.log("Document successfully written!");
      })
      .catch((error) => {
          console.error("Error writing document: ", error);
      });
      
    }
  
