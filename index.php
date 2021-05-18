<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="author" content="David Papp">
      <meta name="robots" content="noindex"/>
      <title>Talking Bots</title>
      <meta name="description" content="Talking Bots authentifiaction. Log in or create an account with email and password."/>
      <link rel="stylesheet" href="css/main.css">
      <link rel="stylesheet" href="css/auth.css">
      <link rel="shortcut icon" type="image/svg" href="img/icons/SVG/bright logo without text.svg"/>
      <link rel="stylesheet" href="https://use.typekit.net/qrz7jlg.css">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
   </head>
   <body>
      <main onload="appendLogIn()">
         <div class="content-container badi">
            <h1 tabindex="-1" class="title">Log in</h1>
            <div class="auth-content-container">
               <label for="email">Email</label>
               <input value="Email" autocomplete="email" type="email" tabindex="1" onfocus="sayLoudly('Type email.')"  id="email">
               <label  for="password">Password</label>
               <input value="pass1234" autocomplete="new-password" tabindex="1" onfocus="sayLoudly('Type Password')" type="password" id="password">
               <button  onclick="logIn()" tabindex="1" id="login" type="submit">Log in</button>
               <button class="txt-btn" onclick="appendSignUp()" id="signUpText" tabindex="1">You Dont't have account? Press enter to sign up.</button>
            </div>
         </div>
         <div class="q-container">
            <p class="presq">Q</p>
         </div>
      </main>
      <!-- The core Firebase JS SDK -->
      <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-auth.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore.js"></script>
      <!-- https://firebase.google.com/docs/web/setup#available-libraries  -->
      <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-analytics.js"></script>
      <!-- Global site tag (gtag.js) - Google Analytics -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-184145524-2"></script>
      <script src="https://code.responsivevoice.org/responsivevoice.js?key=rAskuAab"></script>
      <script type="text/javascript" src="script/main.js"></script>
      <script type="text/javascript" src="script/auth.js"></script>
   </body>
</html>