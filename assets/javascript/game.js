// Event Listener:
$("#start-btn").on("click", function() {
    $("#quiz").empty();
    $("#timer").text("Time Remaining " + timer);
    interval = setInterval(decrement, 1000);
    if(timer === 0) {
        stop()
    }

    // Questions API:
    var queryURL = "https://cocktail-trivia-api.herokuapp.com/api/category/animals/difficulty/medium";
    $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
            var questionBank = response;
            console.log(response)
            for (var i = 0; i < questionBank.length; i++) {
                // pulled question and appended to html in a p tag
                var p = $("<p>" + response[i].text + "<p>");
                $("#quiz").append(p);
                // pulled answer choices and appended each to html in a radio button
                // each group of answers has a different name (line 25) so that only 1 of 4 can be selected i.e. 1 answer
                var singleSelect = "btn" + i
                for (j = 0; j < 4; j++) {
                    var radioBtn = $("<input type='radio'>").val(response[i].answers[j].text);
                    radioBtn.attr("name", singleSelect);
                    $("#quiz").append(radioBtn);
                    var btnText = $("<span>" + response[i].answers[j].text + "</span>")
                    $("#quiz").append(btnText);
                }
            }
            
        })
       
});

// Global Variables:
var timer = 20;
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
    $("#quiz").empty();
    var result = $("<h3>Results:</h3>");
    $("#quiz").append(result);
    var correctAns = $("<div>Correct: " + correct + "<div>");
    $("#quiz").append(correctAns);
    var wrongAns = $("<div>Wrong: " + wrong + "</div>");
    $("#quiz").append(wrongAns);
    var unAns = $("<div>Unanswered: " + unanswered + "</div>");
    $("#quiz").append(unAns);
    clearInterval(interval);
    $("#timer").empty();
}