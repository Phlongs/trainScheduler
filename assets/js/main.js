 // Initialize Firebase and change the values of the config values with your own Firebase config values.
     var config = {
  	   apiKey: "AIzaSyCelklAT17EghM10P0SbxpaS8lnF0L9UNc",
       authDomain: "trainschedule-1a2b8.firebaseapp.com",
       databaseURL: "https://trainschedule-1a2b8.firebaseio.com",
       storageBucket: "trainschedule-1a2b8.appspot.com",
       messagingSenderId: "793245038947"
	 };

    firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var trainTime = "";
    var frequency = "";
    var currentTime = moment();
    var nextArrival = "";
    var nextArrivalFormatted = "";
    var minAway = "";
    var diffTime = "";
    var timeRemainder = "";
    var minutesTillTrain = "";
    

   	// Click Button changes what is stored in firebase
    $("#click-button").on("click", function() {
      // Prevent the page from refreshing
      event.preventDefault();

      trainName = $("#trainname").val().trim();
      destination = $("#destination").val().trim();
      startTime = $("#startTime").val().trim();
      frequency = $("#frequency").val().trim();

      startTimeConverted = moment(startTime, "hh:mm").subtract(1, "years");
      diffTime = moment().diff(moment(startTimeConverted), "minutes");
      timeRemainder = diffTime%frequency;
      minutesTillTrain = frequency - timeRemainder;
      nextArrival = moment().add(minutesTillTrain, "minutes");
      nextArrivalFormatted = moment(nextArrival).format("hh:mm");



      // Change what is saved in firebase
      database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        nextArrivalFormatted: nextArrivalFormatted,
        minutesTillTrain: minutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

      });
    });


    database.ref().on("child_added", function(childSnapshot) {
     
      // Log everything that's coming out of snapshot
      
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().role);
      console.log(childSnapshot.val().date);
      console.log(childSnapshot.val().monthlyRate);
      
      // full list of items to the well
      $(".trainInfo").append("<tr><td>" + childSnapshot.val().trainName + "</td>" + "<td>" + childSnapshot.val().destination + "</td> " + "<td>" + childSnapshot.val().frequency + "</td>" + "<td>" + childSnapshot.val().nextArrivalFormatted + "</td>"  + "<td>" + childSnapshot.val().minutesTillTrain + "</td></tr>");
       

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    /*database.ref().on("value", function(snapshot) {

    	

      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject);

   	});*/

    database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

    	/*$("#employee").html(snapshot.val().name);
    	$("#roleEmployee").html(snapshot.val().role);
    	$("#datestart").html(snapshot.val().date);
    	$("#workMonth").html();
    	$("#rateMonth").html(snapshot.val().monthlyRate);
    	$("#totalBilled").html();*/

    });