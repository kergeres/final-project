"use strict";

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  db.settings({timestamsInSnapshots: true});

function fireBaseSignup() {
    
    let passInput = document.querySelector("#passwords").value
    let emailInput = document.querySelector("#emails").value
    auth.createUserWithEmailAndPassword(emailInput, passInput) .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        
      })

}

let zample = 1;
let n = new Date()






  function firestoreUpload() {

    let user = firebase.auth().currentUser;
    //create a new collection insede the user collection

    db.collection("user").doc(user.uid).set({
      date: n, //currect date
      number: zample,
      email: user.email,
      //baskets number
    },  {merge: true} ).then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
    
  }









// function playAudo() {
//     let music = document.querySelector("#audi");
//     // music.play();
 
// }

// document.querySelector("#email").addEventListener("blur", checkMail)

function checkMail()
{
    let emailInput = document.querySelector("#email").value
        if (emailInput=="")
        {
            sayLoudly("Email required")
            // is required. Please press shift + tab, type in you email and press enter, then tab."
        }
        else 
        {
            sayLoudly(`email Ok.`)
            // typed in the following email: ${emailInput}. If you want to change
            // the email, press shift + tab, and type in the new email. To continue press enter and type in your password
        }
}
// document.querySelector("#password").addEventListener("blur", checkPass)


function checkPass()
{
    let passInput = document.querySelector("#password").value
        if (passInput=="")
        {
            sayLoudly("password required")
            // s required. Please press shift + tab, type in you password and press enter, then tab.
        }
        // else 
        // {
        //     sayLoudly(`You typed in the following email: ${emailInput}. If you want to change
        //     the email, press shift + tab, and type in the new email. To continue press enter and type in your password`)
        // }
}

function logIn ()
{
    let passInput = document.querySelector("#password").value
    let emailInput = document.querySelector("#email").value

    if (passInput !== "" && emailInput !=="")
    {
         let passInput = document.querySelector("#password").value
    let emailInput = document.querySelector("#email").value

    auth.signInWithEmailAndPassword(emailInput, passInput).then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
}

        firebase.auth().onAuthStateChanged(function(user) {
            if (user != null)
                {
                    window.open("sub/contact.html", "replace")
                }
          });
           

    
        


        
        
        
    } 
    else if (passInput == "" && emailInput =="")
    {
        sayLoudly("Email and password is required.")
    }
     else if (emailInput =="")
    {
        sayLoudly("email is required")
    } 
    else if (passInput =="" )
    {
        sayLoudly("password is required")
    }
    
}

function fireBaseLogIn() {
    let passInput = document.querySelector("#password").value
    let emailInput = document.querySelector("#email").value

    auth.signInWithEmailAndPassword(emailInput, passInput)
}

function signUp()
{
    let passInput = document.querySelector("#passwords").value
    let passInputRe = document.querySelector("#passwordRe").value
    let emailInput = document.querySelector("#emails").value

    if (passInput.length>5 && emailInput !=="" && passInput == passInputRe)
    {
        fireBaseSignup()
        sayLoudly("You signed up")
        appendLogIn();
    }
    else if (passInput == "" && emailInput =="")
    {
        sayLoudly("Email and password is required.")
    }
     else if (emailInput =="")
    {
        sayLoudly("email is required")
    } 
    else if (passInput =="")
    {
        sayLoudly("password is required")
    }
    else if (passInput.length < 5)
    {
        sayLoudly("password minimum 6 characters")
    }
    else if (passInput !== passInputRe )
    {
        sayLoudly("password are not match")
    }
    
}


function sayLoudly(message)
{
   
  responsiveVoice.speak(message)
  
}


function appendSignUp() 

{

    let htmlTemplate = "";
     htmlTemplate = `<h1 onchange="sayLoudly('Sign up')" tabindex="1" class="title">Sign Up</h1>
    <div class="auth-content-container">
    
        <label for="email">Email</label>
        <input autocomplete="email" onfocus="sayLoudly('Type email.')" tabindex="1" id="emails">
    
        <label  for="password">Password</label>
        <input autocomplete="new-password" type="password" onfocus="sayLoudly('Type password.')"  tabindex="1" id="passwords">
    
        <label  for="password">Repeat Password</label>
        <input autocomplete="new-password" type="password" onfocus="sayLoudly('Repeat password.')"  tabindex="1" id="passwordRe">
    
        <button tabindex="1" onclick="signUp()"  id="login" type="submit">Sign up</button>`;

      

        document.querySelector(".content-container").innerHTML = htmlTemplate;


}

function appendLogIn() 

{

    let htmlTemplate = "";
     htmlTemplate = `
     <h1 onfocus="sayLoudly('Log in')" tabindex="1" class="title">Log in</h1>
     <div class="auth-content-container">

     <label for="email">Email</label>
     <input autocomplete="email" onfocus="sayLoudly('Type email.')" tabindex="1" id="email">
 
     <label  for="password">Password</label>
     <input autocomplete="new-password" type="password" onfocus="sayLoudly('Type password.')"  tabindex="1" id="password">
 
     <button tabindex="1" onclick="logIn()"  id="login" type="submit">Log in</button>
     <p onclick="appendSignUp()" onfocus="sayLoudly(this.innerHTML)" tabindex="1">You Dont't have account? Press enter to sign up.</p>
    `;

        document.querySelector(".content-container").innerHTML = htmlTemplate;

       
}

function logout() {

    auth.signOut()
    firebase.auth().onAuthStateChanged(function(user) {
        if (user==null)
            {
                window.open("../index.html", "replace")
            }
      });


  
    
      }