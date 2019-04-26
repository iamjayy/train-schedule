$(document).ready(function() {

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
  var database = firebase.database();


	//create variable for firebase database
  var name= "";
  var destination= "";
  var firstTrain= "";
  var frequency = 0;


  //create on click event for new train
  $("#addTrain").on("click", function() {
      event.preventDefault();
      // get value
      name = $("#train-name").val().trim();
      destination = $("#destination").val().trim();
      firstTrain = $("#first-train").val().trim();
      frequency = $("#frequency").val().trim();

      // validate
      if (name === "" || destination === "" || firstTrain === "" || frequency === "") return;

      // Push firebase
      database.ref().push({
                          name: name,
                          destination: destination,
                          firstTrain: firstTrain,
                          frequency: frequency,
                          dateAdded: firebase.database.ServerValue.TIMESTAMP
                          });

    });

  //calculate moment time for train
  database.ref().on("child_added", function(childSnapshot) {
      var minsUntilTrain;
      // years
       firstTrainNew = moment(childSnapshot.val().firstTrain, "hh:mm").subtract(1, "years");
      // Difference between current and firstTrain
  	// Get the difference between now and the time of the first train
		// by subtracting the current time from the first train time
       diffTime = moment().diff(moment(firstTrainNew), "minutes");
       remainder = diffTime % childSnapshot.val().frequency;
      // Minutes until next train
      // Time apart
      minsUntilTrain = childSnapshot.val().frequency - remainder;
      // Next train
      nextTrainTime = moment().add(minsUntilTrain, "minutes");
      nextTrainTime = moment(nextTrainTime).format("hh:mm");

      

    // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.key);

          // push everything into new train row
      $("#add-row").append("<tr><td>" + childSnapshot.val().name +
              "</td><td>" + childSnapshot.val().destination +
              "</td><td>" + childSnapshot.val().frequency +
              "</td><td>" + nextTrainTime + 
              "</td><td>" + minsUntilTrain + "</td></tr>"+
              " </td><td><button class='delete-train btn btn-primary' data-key='"+ childSnapshot.key + "'>Delete</button>" +
              " </td></tr>");



    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });
  $(document).on('click', '.delete-train', function(){
    database.ref($(this).data('key')).remove();
    $(this).parent().remove();

  });
});

