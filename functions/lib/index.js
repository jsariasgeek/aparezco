const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// Settings For Sending Mail
const gmailEmail = 'mylawyerappsmtpserver@gmail.com';
const gmailPassword = 'iShop123';
const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: gmailEmail,
        pass: gmailPassword,
    }
});
//Create a new User Profile when User is Registered;
// exports.createUserProfile = functions.auth.user().onCreate((user)=>{
//   console.log('A new lawyer is registered');
//
//   newUser = {
//     id:user.uid,
//     timestamp:Date.now(),
//     name:user.displayName,
//     email:user.email,
//     isLawyer:false,
//     isLawyerApproved:false,
//     isStaff:false,
//   }
//
//   return admin.database().ref('users/'+ newUser.id).set(newUser);
//
// })
// Sends a notifications to all users when a new message is posted.
// Sends a notifications to all users when a new message is posted.
// exports.sendNotifications = functions.firestore.document('/requests/{requestId}').onCreate((snap, context) => {
//   // Only send a notification when a message has been created.
//   // if (snap.before.val()) {
//   //   return;
//   // }
//   // Notification details.
//   const data = snap.data();
//   const text = data.caso;
//   const payload = {
//     notification: {
//       title: `${data.name} Ingresó una nueva solicitud`,
//       body: text ? (text.length <= 100 ? text : text.substring(0, 97) + '...') : '',
//       icon: '/assets/images/profile_placeholder.png'
//     }
//   };
//   // Get the list of device tokens.
//   return admin.firestore.ref('fcmTokens').once('value').then(allTokens => {
//     if (allTokens.val()) {
//       // Listing all tokens.
//       const tokens = Object.keys(allTokens.val());
//       // Send notifications to all tokens.
//       return admin.messaging().sendToDevice(tokens, payload).then(response => {
//         // For each message check if there was an error.
//         const tokensToRemove = [];
//         response.results.forEach((result, index) => {
//           const error = result.error;
//           if (error) {
//             console.error('Failure sending notification to', tokens[index], error);
//             // Cleanup the tokens who are not registered anymore.
//             if (error.code === 'messaging/invalid-registration-token' ||
//               error.code === 'messaging/registration-token-not-registered') {
//               tokensToRemove.push(allTokens.ref.child(tokens[index]).remove());
//             }
//           }
//         });
//         return  Promise.all(tokensToRemove);
//       });
//     }
//     return Promise.all(tokensToRemove);
//   });
// });
// //Send Email inviting to Register when the user creates a Request
// exports.sendEmailtoCreateRequests = functions.database.ref('/requests/{requestId}').onWrite(
//   (change)=>{
//     if(change.before.val()){
//       return null;
//     }
//     const original = change.after.val();
//     const email = original.email;
//     const name = original.name;
//     const id = original.id;
//     const domain = 'https://mylawerapp2.firebaseapp.com'
//     const data = {
//       from:'"MyLawyerApp"<consultas@mylawyerapp.com>',
//       to:email,
//       subject:'Gracias por Confiar en Nosotros',
//       html:`
//       <!doctype html>
// <html>
//   <head>
//     <meta name="viewport" content="width=device-width" />
//     <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//     <title>Simple Transactional Email</title>
//     <style>
//       /* -------------------------------------
//           GLOBAL RESETS
//       ------------------------------------- */
//       img {
//         border: none;
//         -ms-interpolation-mode: bicubic;
//         max-width: 100%; }
//       body {
//         background-color: #f6f6f6;
//         font-family: sans-serif;
//         -webkit-font-smoothing: antialiased;
//         font-size: 14px;
//         line-height: 1.4;
//         margin: 0;
//         padding: 0;
//         -ms-text-size-adjust: 100%;
//         -webkit-text-size-adjust: 100%; }
//       table {
//         border-collapse: separate;
//         mso-table-lspace: 0pt;
//         mso-table-rspace: 0pt;
//         width: 100%; }
//         table td {
//           font-family: sans-serif;
//           font-size: 14px;
//           vertical-align: top; }
//       /* -------------------------------------
//           BODY & CONTAINER
//       ------------------------------------- */
//       .body {
//         background-color: #f6f6f6;
//         width: 100%; }
//       /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
//       .container {
//         display: block;
//         Margin: 0 auto !important;
//         /* makes it centered */
//         max-width: 580px;
//         padding: 10px;
//         width: 580px; }
//       /* This should also be a block element, so that it will fill 100% of the .container */
//       .content {
//         box-sizing: border-box;
//         display: block;
//         Margin: 0 auto;
//         max-width: 580px;
//         padding: 10px; }
//       /* -------------------------------------
//           HEADER, FOOTER, MAIN
//       ------------------------------------- */
//       .main {
//         background: #ffffff;
//         border-radius: 3px;
//         width: 100%; }
//       .wrapper {
//         box-sizing: border-box;
//         padding: 20px; }
//       .content-block {
//         padding-bottom: 10px;
//         padding-top: 10px;
//       }
//       .footer {
//         clear: both;
//         Margin-top: 10px;
//         text-align: center;
//         width: 100%; }
//         .footer td,
//         .footer p,
//         .footer span,
//         .footer a {
//           color: #999999;
//           font-size: 12px;
//           text-align: center; }
//       /* -------------------------------------
//           TYPOGRAPHY
//       ------------------------------------- */
//       h1,
//       h2,
//       h3,
//       h4 {
//         color: #000000;
//         font-family: sans-serif;
//         font-weight: 400;
//         line-height: 1.4;
//         margin: 0;
//         Margin-bottom: 30px; }
//       h1 {
//         font-size: 35px;
//         font-weight: 300;
//         text-align: center;
//         text-transform: capitalize; }
//       p,
//       ul,
//       ol {
//         font-family: sans-serif;
//         font-size: 14px;
//         font-weight: normal;
//         margin: 0;
//         Margin-bottom: 15px; }
//         p li,
//         ul li,
//         ol li {
//           list-style-position: inside;
//           margin-left: 5px; }
//       a {
//         color: #3498db;
//         text-decoration: underline; }
//       /* -------------------------------------
//           BUTTONS
//       ------------------------------------- */
//       .btn {
//         box-sizing: border-box;
//         width: 100%; }
//         .btn > tbody > tr > td {
//           padding-bottom: 15px; }
//         .btn table {
//           width: auto; }
//         .btn table td {
//           background-color: #ffffff;
//           border-radius: 5px;
//           text-align: center; }
//         .btn a {
//           background-color: #ffffff;
//           border: solid 1px #3498db;
//           border-radius: 5px;
//           box-sizing: border-box;
//           color: #3498db;
//           cursor: pointer;
//           display: inline-block;
//           font-size: 14px;
//           font-weight: bold;
//           margin: 0;
//           padding: 12px 25px;
//           text-decoration: none;
//           text-transform: capitalize; }
//       .btn-primary table td {
//         background-color: #3498db; }
//       .btn-primary a {
//         background-color: #3498db;
//         border-color: #3498db;
//         color: #ffffff; }
//       /* -------------------------------------
//           OTHER STYLES THAT MIGHT BE USEFUL
//       ------------------------------------- */
//       .last {
//         margin-bottom: 0; }
//       .first {
//         margin-top: 0; }
//       .align-center {
//         text-align: center; }
//       .align-right {
//         text-align: right; }
//       .align-left {
//         text-align: left; }
//       .clear {
//         clear: both; }
//       .mt0 {
//         margin-top: 0; }
//       .mb0 {
//         margin-bottom: 0; }
//       .preheader {
//         color: transparent;
//         display: none;
//         height: 0;
//         max-height: 0;
//         max-width: 0;
//         opacity: 0;
//         overflow: hidden;
//         mso-hide: all;
//         visibility: hidden;
//         width: 0; }
//       .powered-by a {
//         text-decoration: none; }
//       hr {
//         border: 0;
//         border-bottom: 1px solid #f6f6f6;
//         Margin: 20px 0; }
//       /* -------------------------------------
//           RESPONSIVE AND MOBILE FRIENDLY STYLES
//       ------------------------------------- */
//       @media only screen and (max-width: 620px) {
//         table[class=body] h1 {
//           font-size: 28px !important;
//           margin-bottom: 10px !important; }
//         table[class=body] p,
//         table[class=body] ul,
//         table[class=body] ol,
//         table[class=body] td,
//         table[class=body] span,
//         table[class=body] a {
//           font-size: 16px !important; }
//         table[class=body] .wrapper,
//         table[class=body] .article {
//           padding: 10px !important; }
//         table[class=body] .content {
//           padding: 0 !important; }
//         table[class=body] .container {
//           padding: 0 !important;
//           width: 100% !important; }
//         table[class=body] .main {
//           border-left-width: 0 !important;
//           border-radius: 0 !important;
//           border-right-width: 0 !important; }
//         table[class=body] .btn table {
//           width: 100% !important; }
//         table[class=body] .btn a {
//           width: 100% !important; }
//         table[class=body] .img-responsive {
//           height: auto !important;
//           max-width: 100% !important;
//           width: auto !important; }}
//       /* -------------------------------------
//           PRESERVE THESE STYLES IN THE HEAD
//       ------------------------------------- */
//       @media all {
//         .ExternalClass {
//           width: 100%; }
//         .ExternalClass,
//         .ExternalClass p,
//         .ExternalClass span,
//         .ExternalClass font,
//         .ExternalClass td,
//         .ExternalClass div {
//           line-height: 100%; }
//         .apple-link a {
//           color: inherit !important;
//           font-family: inherit !important;
//           font-size: inherit !important;
//           font-weight: inherit !important;
//           line-height: inherit !important;
//           text-decoration: none !important; }
//         .btn-primary table td:hover {
//           background-color: #34495e !important; }
//         .btn-primary a:hover {
//           background-color: #34495e !important;
//           border-color: #34495e !important; } }
//     </style>
//   </head>
//   <body class="">
//     <table border="0" cellpadding="0" cellspacing="0" class="body">
//       <tr>
//         <td>&nbsp;</td>
//         <td class="container">
//           <div class="content">
//             <!-- START CENTERED WHITE CONTAINER -->
//             <span class="preheader">Gracias por Contactarnos!. Has creado una consulta en nuestro portal. Te invitamos a
//             registrarte.</span>
//             <table class="main">
//               <!-- START MAIN CONTENT AREA -->
//               <tr>
//                 <td class="wrapper">
//                   <table border="0" cellpadding="0" cellspacing="0">
//                     <tr>
//                       <td>
//                         <p>Hola, ${name}</p>
//                         <p>Bravo!!</p>
//                         <p>Has creado una consulta en nuestro portal. Para que estés al tanto y no te pierdas ningún
//                         detalle te invitamos a registrarte en nuestra plataforma. No te arrepentirás!</p>
//                         <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
//                           <tbody>
//                             <tr>
//                               <td align="left">
//                                 <table border="0" cellpadding="0" cellspacing="0">
//                                   <tbody>
//                                     <tr>
//                                       <td> <a href="${domain}/usuario/registro?id=${id}" target="_blank" style="background-color: #be165a">Registrarme</a> </td>
//                                     </tr>
//                                   </tbody>
//                                 </table>
//                               </td>
//                             </tr>
//                           </tbody>
//                         </table>
//                         <p>Juntos Haremos una Gran Alianza!</p>
//                         <p>Te ayudaremos con tu Caso! Contamos Contigo y Tu Con Nosotros!.</p>
//                       </td>
//                     </tr>
//                   </table>
//                 </td>
//               </tr>
//             <!-- END MAIN CONTENT AREA -->
//             </table>
//             <!-- START FOOTER -->
//             <div class="footer">
//               <table border="0" cellpadding="0" cellspacing="0">
//                 <tr>
//                   <td class="content-block">
//                     <span class="apple-link">MyLawerApp</span>
//                     <!--<br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif">Unsubscribe</a>.-->
//                   </td>
//                 </tr>
//                 <tr>
//                   <td class="content-block powered-by">
//                     Powered by <a href="https://xerogroup.co">XEROGROUP.CO</a>.
//                   </td>
//                 </tr>
//               </table>
//             </div>
//             <!-- END FOOTER -->
//           <!-- END CENTERED WHITE CONTAINER -->
//           </div>
//         </td>
//         <td>&nbsp;</td>
//       </tr>
//     </table>
//   </body>
// </html>`
// ,
//     }
//     return mailTransport.sendMail(data).then(
//       ()=>{
//         console.log(`El mensaje para el request ${val.id} se envió correctamente a ${val.email}`)
//         return 'sending succesfully'
//       }
//     ).catch(
//       ()=>{
//         console.log('Se presentó un error. No se envió el email');
//       }
//     )
//   }
// )
function createIndex(title) {
    const arr = title.toLowerCase().split('');
    const searchableIndex = {};
    let prevKey = '';
    for (const char of arr) {
        const key = prevKey + char;
        searchableIndex[key] = true;
        prevKey = key;
    }
    return searchableIndex;
}
function indexRequest(title) {
    const arr = title.toLowerCase().split('');
    const searchableIndex = [];
    let prevKey = '';
    for (const char of arr) {
        const key = prevKey + char;
        searchableIndex.push(key);
        prevKey = key;
    }
    return searchableIndex;
}
function indexKeyWords(name, caso) {
    const arrName = name.toLowerCase().split(' ');
    const arrCaso = caso.toLowerCase().split(' ');
    const arrToIndex = arrName.concat(arrCaso);
    const keywords = [];
    for (const word of arrToIndex) {
        if (word.length > 4) {
            keywords.push(word);
        }
    }
    return keywords;
}
//Index Request Titles
// exports.indexRequestOnCreate = functions.firestore
// .document('requests/{requestId}')
// .onCreate((snap, context) => {
//   const request = snap.data();
//   const requestId = snap.id;
//   const searchableIndex = createIndex(request.name)
//   const indexedRequest = { ...request, searchableIndex }
//   const db = admin.firestore()
//   return db.collection('requests').doc(requestId).set(indexedRequest, {merge:true})
// })
exports.indexRequestOnCreate = functions.firestore
    .document('requests/{requestId}')
    .onCreate((snap, context) => {
    const request = snap.data();
    const requestId = snap.id;
    const searchableName = indexRequest(request.name);
    const keywords = indexKeyWords(request.name, request.caso);
    const searchableIndex = searchableName.concat(keywords);
    const indexedRequest = Object.assign({}, request, { searchableIndex });
    const db = admin.firestore();
    return db.collection('requests').doc(requestId).set(indexedRequest, { merge: true });
});
exports.indexCityonCreate = functions.firestore
    .document('cities/{citiId}')
    .onCreate((snap, context) => {
    const ciudad = snap.data();
    const ciudadId = snap.id;
    const searchableIndex = indexRequest(ciudad.nombre);
    const indexedRequest = Object.assign({}, ciudad, { searchableIndex });
    const db = admin.firestore();
    return db.collection('cities').doc(ciudadId).set(indexedRequest, { merge: true });
});
exports.indexRequestOnUpdate = functions.firestore
    .document('requests/{requestId}')
    .onUpdate((change, context) => {
    const request = change.after.data();
    const requestId = change.after.id;
    const firestore = admin.firestore();
    if (change.after.data().name !== change.before.data().name) {
        const searchableName = indexRequest(request.name);
        const keywords = indexKeyWords(request.name, request.caso);
        const searchableIndex = searchableName.concat(keywords);
        const indexedRequest = Object.assign({}, request, { searchableIndex });
        return firestore.collection('requests').doc(requestId).set(indexedRequest, { merge: false });
    }
    return null;
});
exports.indexCityOnUpdate = functions.firestore
    .document('cities/{citiId}')
    .onUpdate((change, context) => {
    const request = change.after.data();
    const requestId = change.after.id;
    const firestore = admin.firestore();
    if (change.after.data().nombres !== change.before.data().nombres) {
        const searchableIndex = indexRequest(request.nombres);
        const indexedRequest = Object.assign({}, request, { searchableIndex });
        return firestore.collection('cities').doc(requestId).set(indexedRequest, { merge: false });
    }
    return null;
});
// exports.indexRequestOnUpdate = functions.firestore
// .document('requests/{requestId}')
// .onUpdate(event => {
//   const requestId = event.id;
//   const request = event.data();
//   const searchableIndex = createIndex(request.name)
//   const indexedRequest = {...request, searchableIndex }
//   const db = admin.firestore()
//   return db.collection('requests').doc(requestId).set(indexedRequest, {merge:true})
// })
//# sourceMappingURL=index.js.map