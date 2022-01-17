"use strict";
// referencing to the Firebase project
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
const resultRef = db.collection("results");
// watch the database ref for changes
let resultArray = []
resultRef.orderBy("submitted").onSnapshot(function (snapshotData) {
	resultArray = []
	snapshotData.forEach(doc => {
		let ex = doc.data();
		ex.id = doc.id;
		resultArray.push(ex);
	});
	appendHistory(resultArray);
});

let lengthOfTasks = 0
// display the excercise list
function appendHistory(databaseIn) {
	let htmlTemplate = ``;
	for (let exc of databaseIn) {
		if (exc.uid == auth.currentUser.uid) {
			htmlTemplate += ""
			// Get the chosen exercise's task length
			lengthOfTasks = Object.size(exc['excercise'])
			htmlTemplate += `
      
       <tr onclick="resultCheck('${exc.id}'); andLength('${exc.id}')" tabindex="1" class="exc-title" ><td>${exc.title}</td><td> ${exc.submitted}</td> <td>${exc.result}</td></tr>`;
		}
		// stopping the loader
		showLoader(false)
		document.querySelector(".exc-container").innerHTML = `<table class="history-table">${htmlTemplate}</table>`
	}
}

let llength = 0
// counting the length of the exercises 
function andLength(inId) {
	for (const iit of resultArray) {
		if (iit.id == inId) {
			llength = Object.size(iit['excercise'])
		}
	}
}
// display the chosen exercises results in a table, and mark the wrong ansers 
let sliceTomb = []
async function resultCheck(chosenId) {
	let markup = ""

	function rightArray(be) {
		return be.id === `${chosenId}`
	}
	await console.log(llength);
	sliceTomb = resultArray.find(rightArray)
	for (let k = 0; k < llength; k++) {
		if (sliceTomb['excercise'][k]['key'] != 'undefined') {
			let activeClass = sliceTomb['excercise'][k]['key'].toLowerCase() != sliceTomb['excercise'][k]['userAns'].toLowerCase() ? 'incorrect' : ''
			let incorrectTabindex = sliceTomb['excercise'][k]['key'].toLowerCase() != sliceTomb['excercise'][k]['userAns'].toLowerCase() ? '0' : '2'
			markup += `
         <tr tabindex="${incorrectTabindex}"><td>${k + 1}.</td><td>${sliceTomb['excercise'][k]['task']}</td><td  class="${activeClass}" >${sliceTomb['excercise'][k]['userAns']}</td><td >${sliceTomb['excercise'][k]['key']}</td></tr>
          `
		}
	}
	document.querySelector(".exc-container").innerHTML = `<table class="res-table"><tr class="headertitle" tabindex="0"><td>Results of:<td>${sliceTomb.title}</td></td><td id="userAnswer">${sliceTomb.submitted}</td><td>${sliceTomb.result}</td></tr>  <tr><th>Task</th><th id="userAnswer">Answer</th><th>key</th></tr>${markup}</table>`;
	lengthOfTasks = 0
	// document.querySelector("#inpercent").focus()

};
// array's length counter
Object.size = function (obj) {
	var size = 0,
		key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
};

function logout() {
	auth.signOut()
	auth.onAuthStateChanged(function (user) {
		if (user == null) {
			window.open("../index.html", "_self")
		}
	});
}
// enterkey event listener for logout function
let logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		logoutBtn()
	}
});

window.dataLayer = window.dataLayer || [];

function gtag() {
	dataLayer.push(arguments);
}
gtag('js', new Date());

gtag('config', 'UA-184145524-2');

function entrKeyListenerAll() {
	let activeElement = document.activeElement;
	activeElement.addEventListener("keyup", (event) => {
		if (event.keyCode === 13) {
			activeElement.click();
		}
	})
	setTimeout(entrKeyListenerAll, 10);
}
entrKeyListenerAll()