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



const _programs = [];




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
 
  let focusedItem = e.target.innerText;
  responsiveVoice.setDefaultRate(1.3);
  responsiveVoice.speak(focusedItem, "UK English Female")

}
e.stopPropagation();
}





