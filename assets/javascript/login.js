var app_firebase = {};
(function(){
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCX-DwINXnQJAMIL1qfiDpMllxGHGDVOr0",
    authDomain: "trainscheudle.firebaseapp.com",
    databaseURL: "https://trainscheudle.firebaseio.com",
    projectId: "trainscheudle",
    storageBucket: "trainscheudle.appspot.com",
    messagingSenderId: "691779505015"
  };
  firebase.initializeApp(config);

        // FirebaseUI config.

        var uiConfig = {
            signInSuccessUrl: 'train.html',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };



         // Initialize the FirebaseUI Widget using Firebase. 
        var ui = new firebaseui.auth.AuthUI(firebase.auth());

        // The start method will wait until the DOM is loaded.
        ui.start('#firebaseui-auth-container', uiConfig);
})()