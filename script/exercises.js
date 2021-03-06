"use strict";
// reference to the firebase project
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
db.settings(
	{
		timestamsInSnapshots: true
	});

// Initialize Google analytics
window.dataLayer = window.dataLayer || [];

function gtag() {
	dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-184145524-2');

// watch the database ref for changes
let resultArray = []
let resultArrayy = []
// history exercise list-database reference
function callHistEx() {
	showLoader(true)
	const historyRef = db.collection("history-exercises");
	historyRef.orderBy("id").onSnapshot(function (snapshotData) {
		resultArrayy = []
		snapshotData.forEach(doc => {
			let ex = doc.data();
			resultArray.push(ex);
		});
		appendExcercises(resultArray);
	});
}
// math exercise list-database reference
function callMathEx() {
	showLoader(true)
	const mathRef = db.collection("mathematics-exercises");
	mathRef.orderBy("id").onSnapshot(function (snapshotData) {
		resultArray = []
		snapshotData.forEach(doc => {
			let ex = doc.data();
			resultArray.push(ex);
		});
		appendExcercises(resultArray);
	});
}

// display the two categories to the DOM
function appendCategories() {
	let htmlTemplate = `<div class="card-container">
  <div tabindex="1"  class="cat-card"  onclick="callMathEx()"><p>Mathetmatics</p></div>
  <div tabindex="1"   class="cat-card hs"  onclick="callHistEx()"><p>History</p></div>
  `
	document.querySelector(".exc-container").innerHTML = htmlTemplate;
	showLoader(false)
}
appendCategories()

// enter press listener for the categories card
let mcardListener = document.querySelector(".cat-card");
mcardListener.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		mcardListener.click()
	}
});
let cardListener = document.querySelector(".hs");
cardListener.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		cardListener.click()
	}
});

// let cardListener = document.querySelector(".iksz");
cardListener.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		appendCategories()
	}
});
// display the chosen excercise list
function appendExcercises(databaseIn) {
	let htmlTemplate = "";
	document.querySelector(".exc-container").innerHTML = ""
	for (let exc of databaseIn) {
		htmlTemplate += `
    <tr>
    <td onclick="openExcercise('${exc.id}')" tabindex="1">${exc.title}</td>
    </tr>`;
	}
	document.querySelector(".exc-container").innerHTML = `
  <table class="exc-table">
    <tr>
      <td>
      </td>
    </tr>${htmlTemplate}
  </table>`;
	showLoader(false)
}
// identify the chosen exercise and calls the function which displays the chosen exercise tasks
let chosenArray = ["jeg er empty"];
let startdate = 0;

function openExcercise(excId) {
	for (const fut of resultArray) {
		if (fut.id == excId) {
			chosenArray.fill(resultArray.slice(fut.id - 1, fut.id));
			appendSlides(1)
			document.querySelector("#taskx").focus()
			startdate = new Date()
			stopWatchForDuration()
		}
	}
}

function stopWatchForDuration() {
	startdate = new Date()
}
let slidenumber = 1;
let answersFromUser = [];
// take the next slide on the Next click, calls the function which displays them
function pagination() {
	document.querySelector("#next").addEventListener('click', function () {
		// save the users answer. if the input is empty store a hypen as a value
		let answer = document.querySelector("#answer").value != "" ? document.querySelector("#answer").value : "-"
		let idPlusAns = {};
		idPlusAns[slidenumber] = answer.toLowerCase();
		answersFromUser.push(idPlusAns)
		slidenumber++;
		appendSlides(slidenumber)
		document.querySelector("#taskx").focus()
		// animation for the slide
		if (slidenumber != 1) {
			document.querySelector(".exc-containerr").classList.remove("animo")
			document.querySelector(".taskx").classList.remove("taskx-anima")
			document.querySelector(".ans").classList.remove("taskx-anima")
		}
	})
}
// displays all of the slides to the DOM
function appendSlides(slideNr) {
	let lengthOfTasks = 0
	let htmlTemplate = "";
	for (let ubolt of chosenArray) {
		let taskX = ubolt[0].tasks[`task${slideNr}`]
		htmlTemplate = `<div class="exc-containerr animo"><div class="pad-container">
       <a tabindex="1" onfocus="sayLoudly('exit')" href="exercises.html"><span class="iksz"><p>Exit</p>???</span></a>
       <table class="proc-table">
       <tr><td class="proc taskx-anima">${slideNr}</td><td class="proc ">/${Object.size(ubolt[0].tasks)}</td></tr>
        
       </table>
       
       <p class="proc taskx-anima" ></p>
       <p class="proc"></p>
        <p tabindex="0" class="taskx-anima" id="taskx" >${taskX}</p>
        <input autocomplete="off" id="answer" class="ans-input ans taskx-anima" type="input"/>
        <button type="button"  class="btn pag-btn" id="next">Next</button></div></div>
        `;
		lengthOfTasks = Object.size(ubolt[0].tasks)
	}
	// display the slides as long as there is task left
	if (slideNr <= lengthOfTasks) {
		document.querySelector(".exc-container").innerHTML = htmlTemplate;
		pagination()
	}
	else {
		displayRecentAnswers(answersFromUser)
	}
}
// counting the length of the tasks 
Object.size = function (obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};
let szamok = 1;

function indexCounter(taskId) {
	for (const iti of chosenArray) {
		return iti[0].keys[`key${taskId}`]
	}
}

function indexCounterTask(taskId) {
	for (const iti of chosenArray) {
		return iti[0].tasks[`task${taskId}`]
	}
}
let idUanswerKex = []
// display the results of the excercises after the slideshow of the excercise
let counter = 1;

function displayRecentAnswers(ansIn) {
	let title = "g"
	let htmlTemplate = ""
	let correctAnswerCounter = 0;
	for (const run of ansIn) {
		let tasksKey = indexCounter(counter)
		let task = indexCounterTask(counter)
		// if the answer was incorrect the element gets 1 as tabindex, so it will be fouced first
		let wrongTabIndex = run[counter].toLowerCase() != tasksKey.toLowerCase() ? '1' : '2'
		// if the answer was incorrect the element gets a red bordered class to mark it as incorrect
		let activeClass = run[counter].toLowerCase() != tasksKey.toLowerCase() ? 'incorrect' : ''
		correctAnswerCounter = run[counter].toLowerCase() == tasksKey.toLowerCase() ? correctAnswerCounter + 1 : correctAnswerCounter
		htmlTemplate += `<tr tabindex="${wrongTabIndex}"><td>${Object.keys(run)}</td><td>${task}</td><td  class="${activeClass}" id="userAnswer"> ${run[counter]}</td><td>${tasksKey}</td></tr>`
		for (const iti of chosenArray) {
			title = iti[0].title
		}
		// collect userdata in an object
		idUanswerKex.push(
			{
				"id": counter,
				"userAns": run[counter],
				"key": tasksKey,
				"task": task
			})
		counter++;
	}
	// calculate the result in different formats
	let inPercent = `${Math.round(correctAnswerCounter / (counter - 1) * 100)}%`
	let inNumbers = `${correctAnswerCounter}/${(counter - 1)}`
	document.querySelector(".exc-container").innerHTML = `
  <div class="exc-containerr">
    
      <table class="res-table taskx-anima">
        <tr>
          <td></td>
          <td>Task</td>
          <td id="userAnswer">Answer</td><td>Key</td>
        </tr>${htmlTemplate}
        <tr">
        <td></td>
          <td></td>
          <td tabindex="0" id="inpercent"><strong>${inPercent}</strong></td>
       </tr> 
	  
        </table> 
        <a tabindex="1" onfocus="sayLoudly('exit')" href="exercises.html"><span class="eksz"><p>Exit</p>???</span></a>
      
    </div>`
	firestoreUpload(idUanswerKex, title, inPercent, inNumbers)
	document.querySelector("#inpercent").focus()
}
// get the corrrect data and time in custom format
let today = new Date()
let dd = new Date().getDate()
let mm = new Date().getMonth() + 1
let yyyy = new Date().getFullYear()
let hh = new Date().getHours()
let mi = new Date().getMinutes() > 10 ? new Date().getMinutes() : `0${new Date().getMinutes()}`
let currentDate = `${yyyy}/${mm}/${dd} - ${hh}:${mi}`
// write data to the firestora database
function firestoreUpload(idUanswerKey, title, result, inNumbers) {
	let user = firebase.auth().currentUser;
	//create a new collection insede the user collection
	db.collection("results").doc().set(
		{
			submitted: currentDate,
			excercise: idUanswerKey,
			email: user.email,
			duration: Math.floor((startdate - today) / 1000),
			title: title,
			uid: user.uid,
			result: result,
			inNumbers: inNumbers
		},
		{
			merge: true
		})
}
// logout function and display the welcoming page.
function logout() {
	auth.signOut()
	auth.onAuthStateChanged(function (user) {
		if (user == null) {
			window.open("../index.html", "_self")
		}
	});
}

