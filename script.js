$(document).ready(function() {	
//firebase config
var config = {
    apiKey: "AIzaSyDwZ6WMC0AowhNQDmOyLXDCDMeakV9RaLk",
    authDomain: "trainhw-72a2d.firebaseapp.com",
    databaseURL: "https://trainhw-72a2d.firebaseio.com",
    projectId: "trainhw-72a2d",
    storageBucket: "trainhw-72a2d.appspot.com",
    messagingSenderId: "795888781189"
};
firebase.initializeApp(config);
var database = firebase.database();

$("#submit").on("click", function(){
	//hold user inputs in variables
	var trainName = $("#trainNameInput").val().trim();
	var trainInterval = $("#timeInput").val().trim();
	var trainDestination = $("#destinationInput").val().trim();
		//debugging variables
		console.log("name " + trainName);
		console.log("Interval" + trainInterval);
		console.log("destination" + trainDestination);
			//push data to firebase
			database.ref().push({
			name: trainName,
			trainInterval: trainInterval,
			destination: trainDestination,
			dateAdded:firebase.database.ServerValue.TIMESTAMP
			});	

});
//grabbing trains from the database
database.ref().on("child_added", function(childSnapshot) {
var dbTrain = childSnapshot.val();
//create new variables with moment.js for formatted time	
	var formattedTimeAdded = moment(dbTrain.dateAdded).format("dddd, MMMM Do YYYY, h:mm:ss a");
	//addd the train interval to the time added to get the next time
	var nextTrainAt =  moment().add(dbTrain.trainInterval,'minutes');
	//reformat the time 
	var nextTrainAtFormatted = moment(nextTrainAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
	//console log to debug
	console.log("db functional at " + formattedTimeAdded);
	console.log(" interval: " + dbTrain.trainInterval);
	console.log("next train" + nextTrainAtFormatted);
		//append new train to the corresponding html
		$("#tableOfTrains").append("<tr><td>" + dbTrain.name + "</td><td>" + dbTrain.trainInterval + "</td><td>" + dbTrain.destination + "</td><td>" + nextTrainAtFormatted + "</td></tr>");

},
function(errorObject){
     // In case of error this will print the error code
     console.log("The read failed: " + errorObject.code);
   }); 

});