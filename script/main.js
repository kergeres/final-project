"use strict";

// hamburger menu animation
function showLoader(show) {
  let loader = document.querySelector('#loader');
  if (show) {
    loader.classList.remove("hide");
  } else {
    loader.classList.add("hide");
  }
}

let cbOpen = true;
function hamburgerNav() {
 
    if(cbOpen==false)//ha zarva van
    {
        document.querySelector(".nnav").classList.remove("nav-open");
        document.querySelector(".ham-menu-line").classList.remove("line-rot");
        document.querySelector(".ham-menu-linea").classList.remove("linea-rot");
        document.querySelector(".ham-menu-lineb").classList.remove("lineb-rot");
        
        cbOpen = true;
    }
    else if(cbOpen==true)
    {
      
        document.querySelector(".nnav").classList.add("nav-open");
        document.querySelector(".ham-menu-line").classList.add("line-rot");
        document.querySelector(".ham-menu-linea").classList.add("linea-rot");
        document.querySelector(".ham-menu-lineb").classList.add("lineb-rot");


        document.querySelector(".nnav").addEventListener('click', function() {
          document.querySelector(".nnav").classList.remove("nav-open");
          document.querySelector(".ham-menu-line").classList.remove("line-rot");
          document.querySelector(".ham-menu-linea").classList.remove("linea-rot");
          document.querySelector(".ham-menu-lineb").classList.remove("lineb-rot");
          cbOpen = true;
        });
        cbOpen = false;
    }  
  }


// load excercises
const _programs = [];


// ez igy ki volt kommentelve, most nem tudom epp mire van
// async function loadData() {
//   let response = await fetch("/data/json.json");
//   let jsonData = await response.json();
//   _programs.push(jsonData);
// console.log(_programs);
// console.log(jsonData);
//   appendNav(jsonData)
//   appendProfile(jsonData)
// }

// console.log(_programs);




function searchPrograms(value) {
  console.log(value);
  let filteredPrograms = []
  for (const item of _programs) {
      let title = item.title.toLowerCase();
      
      console.log(item)
       if (title.includes(value.toLowerCase())) {
          filteredPrograms.push(item);
      } 
  }
  console.log(filteredPrograms);
  // appendNav(filteredPrograms);
}




function appendNav(items)
  {
    let temlplete = ""

    for (let item of items) {
        temlplete += `<a  href="../sub/${item.title}.html"><p tabindex="2">${item.title}</p></a> `
        
    }
    // ezt kommenteld ki
    // document.querySelector(".small-content-container").innerHTML = temlplete;
}



//keyboard listener for tab keyboard press
function tabEventList ()
{
  let i;
  let x = document.querySelectorAll(".badi");
      for (i = 0; i < x.length; i++) 
      {
        x[i].addEventListener("focusin", sayLoudly, false )
        
      }
}
tabEventList () 



// this one tells in which poin is the focus on
function whereIsTheFocus()
{
  alert(document.activeElement.innerHTML)
}


// szoval kommenteld ki

// Text to Speach function
function sayLoudly(e)
{
if (e.target !==e.currentTarget)
{
  let focusedItem = e.target.innerHTML;
  responsiveVoice.speak(focusedItem)
}
e.stopPropagation();
}




//keyboard listener for specific keyboard press
document.addEventListener("keyup", function(event) {
  if (event.keyCode === 81) {
    responsiveVoice.speak("Megnyomtad a Q gombot", "Hungarian female", {volume: 9})
  } 
  // else if (event.keyCode === 87) {
  //   sayLoudly(document.activeElement)
  // }
});








// ez nemtudom hogy kell e? ha nem akkor torold ki te majom.. amugy valami navval kapcsoalt
// function appendProfile(tomb)
// {
//     let temlplete = ""

//     for (let item of tomb) {
//         temlplete += ` `
        
//     }
//     document.querySelector(".nnav").innerHTML += temlplete;
// }
// let Parent = document.querySelector(".badi");
// Parent.addEventListener("focusin", sayLoudly, false);


// function eventLst()
// {

//     var x = document.querySelectorAll(".test");
//     var i;
//     for (i = 0; i < x.length; i++) 
//     {
//       x[i].addEventListener("focus", textToSpeach(x[i]))
     
//     }
//   }
// eventLst()
// function textToSpeach(i)
// {
//   alert(i)
//   var x = document.querySelectorAll(".test");
//   var i;
//   for (i = 0; i < x.length; i++) {
//     x[i].addEventListener("focus", function()
//     {
//       let input = document.querySelector("#zene").innerHTML;
//       responsiveVoice.speak(input)
//     }
  
// }





