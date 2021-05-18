"use strict";
// loading animation function
function showLoader(show)
{
	let loader = document.querySelector('#loader');
	if (show)
	{
		loader.classList.remove("hide");
	}
	else
	{
		loader.classList.add("hide");
	}
}
// inform the not deskop user to use desktop
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
	document.body.innerHTML = `<h1 class='mobil'>Pleas open the site on desktop</h1>
	<h2 class='mobil'>The website is not available for tablet or smartphone</h2>`;
}

// play help function if the user click the alt + q combination
document.querySelector('.q-container').addEventListener('click', function ()
{
	responsiveVoice.speak("For navigate use the tab and tab plus shift.   For select, press the Enter.  For escape, press the escape key.")
})
window.addEventListener("keyup", (event) =>
{
	if (event.keyCode === 81 && event.altKey)
	{
		responsiveVoice.speak("For navigate use the tab and tab plus shift.   For select, press the Enter.  For escape, press the escape key.")
		entrKeyListenerAll()
	}
	// relod the page on escape
	if (event.keyCode === 27)
	{

		location.reload()
	}


});

const _programs = [];

//keyboard listener for tab keyboard press
function tabEventList()
{
	let i;
	let x = document.querySelectorAll(".badi");
	for (i = 0; i < x.length; i++)
	{
		x[i].addEventListener("focusin", sayLoudly, false)
	}
}
tabEventList()

// this one tells in which poin is the focus on
function whereIsTheFocus()
{
	alert(document.activeElement.innerHTML)
}

// Text to Speach function
function sayLoudly(e)
{
	if (e.target !== e.currentTarget)
	{
		let focusedItem = e.target.innerText;
		// configure the speed and volume
		responsiveVoice.setDefaultRate(1.2);
		responsiveVoice.speak(focusedItem, "UK English Female",
		{
			volume: 1
		})
	}
	e.stopPropagation();
}

window.dataLayer = window.dataLayer || [];

function gtag()
{
	dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'UA-184145524-2');

// open list items on enter 
function entrKeyListenerAll()
{
	let activeElement = document.activeElement;
	activeElement.addEventListener("keyup", (event) =>
	{

		if (event.keyCode === 13)
		{
			activeElement.click();
		}
	})
	setTimeout(entrKeyListenerAll, 3000);

}
entrKeyListenerAll()