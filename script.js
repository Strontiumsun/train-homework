$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBNTYqEk2FQcnIQDidWmuzxk-JlK8uP998",
        authDomain: "train-project-9c3cf.firebaseapp.com",
        databaseURL: "https://train-project-9c3cf.firebaseio.com",
        projectId: "train-project-9c3cf",
        storageBucket: "train-project-9c3cf.appspot.com",
        messagingSenderId: "872521192697"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var trainName = "";
    var destination = "";
    var trainTime = "";
    var frequency = "";

    $("#submit-button").on("click", function (event) {
        // I need to use this line to prevent the page from resetting
        event.preventDefault();

        trainName = $("#name").val();
        destination = $("#destination").val();
        trainTime = $("#firstTime").val();
        frequency = $("#frequency").val();

        // this console log correctly displays the values I put into the form
        // console.log(trainName, destination, trainTime, frequency);

        // this adds the values I put into the form to the database
        database.ref().push({
            train: trainName,
            destination: destination,
            time: trainTime,
            frequency: frequency,
        });
    });
    database.ref().on("child_added", function (snapshot) {
        // let's test if we can grab the data from the database
        console.log(snapshot.val());
        // these are our database variables
        var trainDb = snapshot.val().train;
        var destinationDb = snapshot.val().destination;
        var firstDb = snapshot.val().time;
        var frequencyDb = snapshot.val().frequency;

        // the following code is taken right from week 4/day 3/21-TrainPredictions
        // ------------------------------------------------------
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(firstDb, "HH:mm").subtract(1, "years");
        console.log(firstTimeConverted);

        // Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time apart (remainder)
        // if there's no remainder, the train is here right now
        var tRemainder = diffTime % frequencyDb;
        console.log(tRemainder);

        // Minute Until Train
        var tMinutesTillTrain = frequencyDb - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        // ----------------------------------------------------------

        // now I'm going to append the data to the chart the same way teammate Nick did in week 4/day 2/17-TimeSheet
        // of course, I have to change the variables a bit
        $("#final-append").append(
            `<tr><td>${trainDb}</td><td>${destinationDb}</td><td>${frequencyDb}</td><td>${moment(nextTrain).format("hh:mm A")}</td><td>${tMinutesTillTrain}</td></tr>`
        );

    })





















});