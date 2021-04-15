"use strict";
let databaseOut = [];

async function loadData() {
    let response = await fetch("../data/json.json");
    let jsonData = await response.json();
    databaseOut = jsonData;
  
    appendExcercises(databaseOut);
    
  }
  loadData();




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
 

function openExcercise(excId)
{
    for (let run of excId) {
        alert(run.id)
    }
   
}