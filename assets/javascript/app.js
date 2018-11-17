var config = {
    apiKey: "AIzaSyCYxs2MkzDt3Q0K9On39z4W8PkWJ3dVRck",
    authDomain: "train-scheduler-7f74a.firebaseapp.com",
    databaseURL: "https://train-scheduler-7f74a.firebaseio.com",
    projectId: "train-scheduler-7f74a",
    storageBucket: "train-scheduler-7f74a.appspot.com",
    messagingSenderId: "977541564785"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#form-submit").click(function(event){
      event.preventDefault();

      var name = $("#train-name").val().trim();
      var destination = $("#train-destination").val().trim();
      var frequency = $("#frequency").val().trim();
      var time = $("#first-train-time").val().trim();

      database.ref().push(
          {
              name: name,
              destination: destination,
              frequency: frequency,
              time: time
          }
      );

      $("#train-name").val('');
      $("#train-destination").val('');
      $("#frequency").val('');
      $("#first-train-time").val('');
  });

  database.ref().on("child_added", function(record) {
    var startTimeConverted = moment(record.val().time, "hh:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(startTimeConverted), "minutes");
    var timeRemain = timeDiff % record.val().frequency;
    var minToArrival = record.val().frequency - timeRemain;
    var nextTrain = moment().add(minToArrival, "minutes");


    var tableRecord = $("<tr>");
    tableRecord.append($("<td>" + record.val().name + "</td>"));
    tableRecord.append($("<td>" + record.val().destination + "</td>"));
    tableRecord.append($("<td class='text-center'>" + record.val().frequency + "</td>"));
    tableRecord.append($("<td class='text-center'>" + moment(nextTrain).format("LT") + "</td>"));
    tableRecord.append($("<td class='text-center'>" + minToArrival + "</td>"));

    $("#table").append(tableRecord);
    });


