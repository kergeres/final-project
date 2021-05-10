<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="author" content="David Papp">
      <meta name="robots" content="noindex"/>
      <title>Talking Bots | Contact</title>
      <meta name="description" content="Talking Bots contact. Contact Veroinka with phone, email or video call." />
      <link rel="stylesheet" href="../css/main.css">
      <link rel="stylesheet" href="../css/contact.css">
      <link rel="shortcut icon" type="image/svg" href="../img/icons/SVG/bright_logo_without_text.svg"/>
      <link rel="stylesheet" href="https://use.typekit.net/qrz7jlg.css">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">
   </head>
   <body  class="badi">
      <header>
         <img alt="Talking Bots Logo" src="../img/icons/SVG/dark_logo_with_text.svg" class="logo">
         <div >
            <a tabindex="0" class="hnav-point" href="history.php"><i class="fas fa-history"></i>History</a>
            <a tabindex="0" class="hnav-point" href="excercises.php"><i class="fas fa-book"></i>Excercises</a>
            <a tabindex="0" class="hnav-point" href="contact.php"><i class="fas fa-phone-alt"></i>Contact</a>
            <a tabindex="0" onclick="logout()" id="logout" class="hnav-point"><i class="fas fa-sign-out-alt"></i>log out</a>
         </div>
      </header>
      <main>
         <div class="content-container badi">
            <h1 class="title">CONTACT</h1>
            <div class="exc-container">
               <h2 tabindex="1">Write me a message</h2>
               <hr class="hr2">
               <form class="msg-form">
                  <input tabindex="1" onfocus="sayLoudly('subject')" autocomplete="off" placeholder="Subject" class="cont-input" id="subject">
                  <textarea tabindex="1" onfocus="sayLoudly('message')" autocomplete="off" placeholder="Message" class="cont-input msg" id="message" ></textarea>
                  <button tabindex="1" class="btn">Send</button>
               </form>
               <h2>Make a video call</h2>
               <hr class="hr2">
               <img alt="profile icon" class="vd-call-icon" src="../img/Veronika.svg">
               <h1 class="name-tag">Molnár Veronika</h1>
               <button tabindex="1" class="btn ah" >Make a call</button>
               <h2>Infromation</h2>
               <hr class="hr2">
               <table class="tbl-info">
                  <tr>
                     <td><i class="fas nofas fa-phone-alt"></i></td>
                     <td><a tabindex="1" onfocus="sayLoudly('phone: +36 20 533 4023')"  href = "tel:+36205334023">+36 20 533 4023</a></td>
                  </tr>
                  <tr>
                     <td><i class="fas nofas fa-school"></i></td>
                     <td><a tabindex="1" onfocus="sayLoudly('address: Orosháza, Tass utca 15, 5900')" href="">Orosháza, Tass u. 15, 5900</a></td>
                  </tr>
                  <tr>
                     <td><i class="nofas fas fa-mail-bulk"></i></td>
                     <td><a tabindex="1" onfocus="sayLoudly('email: ninglor@gmail.com')" href = "mailto:kergeres@gmail.com">ninglor@gmail.com</a></td>
                  </tr>
               </table>
            </div>
         </div>
      </main>
      <!-- The core Firebase JS SDK-->
      <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-auth.js"></script>
      <script src="https://www.gstatic.com/firebasejs/8.2.9/firebase-firestore.js"></script>
      <script src="https://code.responsivevoice.org/responsivevoice.js?key=rAskuAab"></script>
      <script src="../script/main.js"></script>
      <script src="../script/auth.js"></script>
   </body>
</html>