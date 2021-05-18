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
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
{
	document.body.innerHTML = `<h1 class='mobil'>Pleas open the site on desktop</h1>
	<h2 class='mobil'>The website is not available for tablet or smartphone</h2>`;
}

window.addEventListener("keyup", (event) =>
{
	if (event.keyCode === 81 && event.altKey)
	{
		responsiveVoice.speak("For navigate use the tab and tab plus shift.   For select, press the Enter.  For escape, press the escape key.")
		entrKeyListenerAll()
	}
	if (event.keyCode === 27)
	{

		location.reload()
	}


});

const _programs = [];

function searchPrograms(value)
{
	let filteredPrograms = []
	for (const item of _programs)
	{
		let title = item.title.toLowerCase();
		if (title.includes(value.toLowerCase()))
		{
			filteredPrograms.push(item);
		}
	}
}
document.querySelector('.q-container').addEventListener('click', function ()
{
	responsiveVoice.speak("For navigate use the tab and tab plus shift.   For select, press the Enter.  For escape, press the escape key.")
})

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