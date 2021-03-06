$("document").ready(function(){

    // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBo1BUwcSLLlC7J4kX_8nly8q-Rt0mpjVs",
            authDomain: "train-f3b66.firebaseapp.com",
            databaseURL: "https://train-f3b66.firebaseio.com",
            projectId: "train-f3b66",
            storageBucket: "train-f3b66.appspot.com",
            messagingSenderId: "995021113605"
        };
        
        firebase.initializeApp(config);

    // Create database variable 

        var database = firebase.database();

    // Listen for click event

    $("#addTrain-btn").on("click", function(event) {
            event.preventDefault();

            console.log("hello");

        // Variables for capturing user imput

            var trainName = $("#trainName-input").val().trim();
            var newDest = $("#destination-input").val().trim();
            var trainTime = $("#time-input").val().trim();
            var newFreq = $("#frequency-input").val().trim();

        // Create object variable to hold data

            var newTrain = {
                train: trainName,
                destination: newDest,
                time: trainTime,
                frequency: newFreq
            }
        
        // Uploads employee data to the database
            database.ref().push(newTrain);

        // Logs everything to console
            console.log(newTrain.train);
            console.log(newTrain.destination);
            console.log(newTrain.time);
            console.log(newTrain.frequency);

        // Alert
            alert("New Train Sucessfully Added!");

        // Clear all imput fields

            $("#trainName-input").val("");
            $("#destination-input").val("");
            $("#time-input").val("");
            $("#frequency-input").val("");
    });

        // Firebase event for adding trainto the database and a row in the html

             database.ref().on("child_added", function(childSnapshot, prevChildKey) {

                console.log(childSnapshot.val());

            // Store everything into a variable.

                var trainName = childSnapshot.val().train;
                var newDest = childSnapshot.val().destination;
                var trainTime = childSnapshot.val().time;
                var newFreq = childSnapshot.val().frequency;

                console.log(trainName);
                console.log(newDest);
                console.log(trainTime);
                console.log(newFreq);

            // Obtain current time

                var currentTime = moment();
                console.log(moment(currentTime).format("hh:mm"));

                var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "days");

            // Subtract current time form entered train time.

                timeDiff = moment().diff(moment(trainTimeConverted), "minutes");
                console.log("Time Difference: " + timeDiff);

            // Calculate time between trains

                var remainder = timeDiff % newFreq;
                console.log("Remainder: " + remainder);

            // Minuter until the next train

                var minsUntilTrain = newFreq - remainder;
                console.log("Time until next train: " + minsUntilTrain);

            // Calculate next train time

                var nextTrainTime = moment().add(minsUntilTrain, "minutes");
                console.log("Next Train: " + moment(nextTrainTime).format("hh:mm"));

            // Add each train's data into the table
                
                    var trainHtml = `<tr>
                        <td>${trainName}</td>
                        <td>${newDest}</td>
                        <td>${newFreq}</td>
                        <td>${moment(nextTrainTime).format('hh:mm')}</td>
                        <td>${minsUntilTrain}</td>
                    </tr>
                    `

                $("#schedule > tbody").append(trainHtml);

             });


});


