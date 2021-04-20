"use strict";


// Fetches the excercises content (homeworks) from database
let databaseOut = [];
async function loadData() {
    let response = await fetch("../data/json.json");
    let jsonData = await response.json();
    databaseOut = jsonData;
    appendExcercises(databaseOut);
  }

async function init()
{
    await loadData();
    console.log(databaseOut); 
}

init();
// display the excercise list
function appendExcercises(databaseIn) 
{
    let htmlTemplate = "";
    for (let exc of databaseIn) {
        htmlTemplate += `
        <h3 onclick="openExcercise(${exc.id})" tabindex="1" class="exc-title">${exc.title}</h3>        
        `;
    }     
        document.querySelector(".exc-container").innerHTML = htmlTemplate;

}


let chosenArray = ["empty"];
// identify the chosen excercise and calls the function which displays the tasks
function openExcercise(excId)
{
    for (const fut of databaseOut) {
        if (fut.id == excId)
        { 
            chosenArray.fill(databaseOut.slice(fut.id-1, fut.id));
            appendSlides(1)
        } 
    }
}
let slidenumber = 1;
// take the next slide on the Next click, calls the function which displays them
document.querySelector("#next").addEventListener('click', function ()
{
    slidenumber++;
    appendSlides(slidenumber)
    console.log("number of slides: " + slidenumber);
})

// ¨displays all of the slides


function appendSlides(slideNr)
{
    let lengthOfTasks = 0
    let htmlTemplate = "";
    for (let ubolt of chosenArray) {

       
        htmlTemplate= ubolt[0].tasks[`task${slideNr}`];
        // Get the size of an the chosen excercise size (length)
        lengthOfTasks = Object.size(ubolt[0].tasks)
        console.log("ennyi task van ebben a tombben: " +lengthOfTasks);
        
     }
     if(slideNr <= lengthOfTasks)
     {

        document.querySelector(".exc-container").innerHTML = htmlTemplate;
     }

     else
     {
        document.querySelector(".exc-container").innerHTML = "vege";
     }
}



Object.size = function(obj) {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  