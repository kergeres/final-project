"use strict";


// Here it is :)
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
{ let adottTomb = ["empty"];
    let htmlTemplate = "";
let szamok= 1;
    for (const fut of databaseOut) {
        if (fut.id == excId)
        { 
            adottTomb.fill(databaseOut.slice(fut.id-1, fut.id));
         
            for (let ubolt of adottTomb) {

               htmlTemplate= ubolt[0].tasks[`task${szamok}`];
            }
        
            document.querySelector("#next").addEventListener('click', function ()
            {
                szamok++;
            })
        } 
        
    }
    document.querySelector(".exc-container").innerHTML = htmlTemplate;
    
}

function magaAkiiratas (slide)
{

}

// function slides ()
// {

//     let excerciseLength = 2;

//     let htmlTemplate = "";

// document.querySelector("#3").addEventListener("click", function() {
//    slides();
//   })

//     for (let fut of object) {
        
//         htmlTemplate = `<h2>${fut.answers[i]}</h2><br><br><button id="3" >kovetkezo</button>`
//     }
//     document.querySelector(".exc-container").innerHTML = htmlTemplate;
// }


