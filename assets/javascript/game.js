// Event Listener:
$("#start-btn").on("click", function() {
    $("#quiz").empty();
    $("#timer").text("Time Remaining " + timer);
    interval = setInterval(decrement, 1000);
    if(timer === 0) {
        stop()
    }

    //Questions:
    // var queryURL = "https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple";
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    //   })
    //     .then(function(response) {
    //         var questions = response.data;
    //         var questionsDiv = $("<div>");
    //         console.log(response)
    //     })
       
});

// Global Variables:
var timer = 2;
var correct = 0;
var wrong = 0;
var unanswered = 0;
var interval

// Timer:
function decrement() {
    timer--
    $("#timer").text("Time Remaining " + timer);
    if (timer === 0) {
        stop();
    }
}

// Results Screen:
function stop() {
    var result = $("<h3>Results:</h3>");
    $("#quiz").append(result);
    var correctAns = $("<div>Correct: " + correct + "</div>");
    $("#quiz").append(correctAns);
    var wrongAns = $("<div>Wrong: " + wrong + "</div>");
    $("#quiz").append(wrongAns);
    var unAns = $("<div>Unanswered: " + unanswered + "</div>");
    $("#quiz").append(unAns);
    clearInterval(interval);
    $("#timer").empty();
}