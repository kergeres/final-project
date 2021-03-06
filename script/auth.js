"use strict";
// web app's Firebase configuration
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
// Initialize google analytics 
window.dataLayer = window.dataLayer || [];

function gtag() {
	dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-184145524-2');
// sign up with email and password to fireabse
function fireBaseSignup() {
	let passInput = document.querySelector("#passwords").value
	let emailInput = document.querySelector("#emails").value
	firebase.auth().createUserWithEmailAndPassword(emailInput, passInput)

}

// login with the previously created data
function logIn() {
	let passInput = document.querySelector("#password").value
	let emailInput = document.querySelector("#email").value
	if (passInput !== "" && emailInput !== "") {
		let passInput = document.querySelector("#password").value
		let emailInput = document.querySelector("#email").value
		// catch the possibly errors and read them aloud
		auth.signInWithEmailAndPassword(emailInput, passInput).catch((error) => {
			// inform the user (audio) possible errors
			var errorCode = error.code;
			var errorMessage = error.message;
			sayLoudly(errorCode);
			sayLoudly(errorMessage);
			// if the user is logged out, open the welcoming page

		});
		// if the user logged in, open the exercises file
		auth.onAuthStateChanged(function (user) {
			if (user != null) {
				window.open("php/exercises.html", "_self")
			}
		});
	}
	// checking if every input is filled correctly for auth.
	else if (passInput == "" && emailInput == "") {
		sayLoudly("Email and password is required.")
	}
	else if (emailInput == "") {
		sayLoudly("email is required")
	}
	else if (passInput == "") {
		sayLoudly("password is required")
	}
}
// log in with firesbase
function fireBaseLogIn() {
	let passInput = document.querySelector("#password").value
	let emailInput = document.querySelector("#email").value
	auth.signInWithEmailAndPassword(emailInput, passInput)
}
// sign up with firesbase
function signUp() {
	let passInput = document.querySelector("#passwords").value
	let passInputRe = document.querySelector("#passwordRe").value
	let emailInput = document.querySelector("#emails").value
	if (passInput.length > 5 && emailInput !== "" && passInput == passInputRe) {
		fireBaseSignup()
		sayLoudly("You signed up")
		appendLogIn();
	}
	else if (passInput == "" && emailInput == "") {
		sayLoudly("Email and password is required.")
	}
	else if (emailInput == "") {
		sayLoudly("email is required")
	}
	else if (passInput == "") {
		sayLoudly("password is required")
	}
	else if (passInput.length < 5) {
		sayLoudly("password minimum 6 characters")
	}
	else if (passInput !== passInputRe) {
		sayLoudly("passwords are not match")
	}
}

function sayLoudly(message) {
	responsiveVoice.speak(message)
}
// append pages with SPA mode
function appendSignUp() {
	let htmlTemplate = "";
	htmlTemplate = `<h1 tabindex="-1" class="title">Sign Up</h1>
    <div class="auth-content-container badi">
    
        <label for="email">Email</label>
        <input autocomplete="email" onfocus="sayLoudly('Type email.')"  tabindex="1" id="emails">
    
        <label  for="password">Password</label>
        <input autocomplete="new-password" type="password" onfocus="sayLoudly('Type password.')"  tabindex="1" id="passwords">
    
        <label  for="password">Repeat Password</label>
        <input autocomplete="new-password" type="password" onfocus="sayLoudly('Repeat password.')"  tabindex="1" id="passwordRe">
    
        <button tabindex="1" onclick="signUp()"  id="login" type="submit">Sign up</button>`;
	document.querySelector(".content-container").innerHTML = htmlTemplate;
}

// append pages with SPA mode

function appendLogIn() {
	let htmlTemplate = "";
	htmlTemplate = `
    <h1 tabindex="-1" class="title">Log in</h1>
            <div class="auth-content-container">
               <label for="email">Email</label>
               <input value="E-mail" autocomplete="email" type="email" tabindex="1" onfocus="sayLoudly('Type email.')"  id="email">
               <label  for="password">Password</label>
               <input value="pass1234" autocomplete="new-password" tabindex="1" onfocus="sayLoudly('Type Password')" type="password" id="password">
               <button  onclick="logIn()" tabindex="1" id="login" type="submit">Log in</button>
               <button class="txt-btn" onclick="appendSignUp()" id="signUpText" tabindex="1">You Dont't have account? Press enter to sign up.</button>
               
            </div>  `;
	document.querySelector(".content-container").innerHTML = htmlTemplate;
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

// eventlisteners for enter press for register and login
let loginListener = document.getElementById("login");
loginListener.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		logIn()
	}
});
let regListener = document.getElementById("signUpText");
regListener.addEventListener("keyup", function (event) {
	if (event.keyCode === 13) {
		appendSignUp()
	}
});


let mail = document.querySelector("#email")
mail.addEventListener("click", function () {
	mail.select()
})
let pw = document.querySelector("#password")
pw.addEventListener("click", function () {
	pw.select()
})