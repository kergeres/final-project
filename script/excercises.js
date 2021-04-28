"use strict";
// igazabol a   CSS en kivul kb majdnem minden kesz. nyilvan nem..

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
        document.querySelector(".exc-container").innerHTML = htmlTemplate;
}


// identify the chosen excercise and calls the function which displays the chosen excercise tasks
let chosenArray = ["jeg er empty"];
function openExcercise(excId)
{
    for (const fut of databaseOut) {
        if (fut.id == excId)
        { 
            chosenArray.fill(databaseOut.slice(fut.id-1, fut.id));
            appendSlides(1)
            document.querySelector("#taskx").focus() 
        } 
    }
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
    
})
}
// ¨displays all of the slides

function appendSlides(slideNr)
{
    let lengthOfTasks = 0
    let htmlTemplate = "";
    for (let ubolt of chosenArray) {
    let stuff = ubolt[0].tasks[`task${slideNr}`]
    
        htmlTemplate=  `<p tabindex="0" id="taskx" >${stuff}</p>
        <input id="answer" class="ans-input" type="input">
        <button type="button"  class="btn" id="next">Next</button>
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

// display the results of the excercises after the slideshow of the excercise
  let counter = 1;
  function displayRecentAnswers (ansIn)
  {
      let htmlTemplate=""
    
      for (const run of ansIn) 
     { 
          let tasksKey =  nemtom(counter)
          console.log(tasksKey);
        
          htmlTemplate += `<tr><th>${Object.keys(run)}</th><th id="userAnswer"> ${run[counter]}</th><th>jo: ${tasksKey}</th></tr>`
          console.log(Object.keys(run));
         
          
          counter++;
          
          for (const fut of chosenArray) {
              if (1==1)
              {
                  console.log(chosenArray);
                  
              }
          { 
             
              console.log("kérem " + run[0] );
          }
          }
      }
    document.querySelector(".exc-container").innerHTML = `<table>${htmlTemplate}</table> <button id="gbck" onclick="init()" class="btn">Go back</button>` 
    document.querySelector("#gbck").focus()  
  }


