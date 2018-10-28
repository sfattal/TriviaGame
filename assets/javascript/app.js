// Event Listener: Game
$("#start-btn").on("click", function() {
    init();
});

// Event Listener: Submit
$("#submit-btn").on("click", function() {
    stop();
})

//Event Listener: Restart
$("#restart-btn").on("click", function() {
    init();
    timer = 10;
})

// Global Variables:
var timer = 10;
var correct = 0;
var wrong = 0;
var submitDiv
var interval

// Timer:
function decrement() {
    timer--
    $("#timer").text("Time Remaining " + timer);
    if (timer === 0) {
        stop();
    }
}

// Initialize Game:
function init() {
    $("#quiz > *:not('.keep')").remove();
    $("#reset-btn").css("visibility", "hidden");
    $("#timer").text("Time Remaining " + timer);
    interval = setInterval(decrement, 1000);
    if(timer === 0) {
        stop();
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
                var h3 = $("<h3>" + response[i].text + "<h3>");
                $("#questionWindow").append(h3);
                // pulled answer choices and appended each to html in a radio button
                // each group of answers has a different name (line 25) so that only 1 of 4 can be selected at a time
                var singleSelect = "btn" + i
                for (j = 0; j < 4; j++) {
                    var radioBtn = $("<input type='radio'>").val(response[i].answers[j].correct);
                    radioBtn.attr("name", singleSelect);
                    $("#questionWindow").append(radioBtn);
                    var btnText = $("<span>" + response[i].answers[j].text + "</span>")
                    $("#questionWindow").append(btnText);
                }
            }
            $("#submit-btn").css("visibility", "visible");
        })   
}

// Results Screen:
function stop() {
    $("#questionWindow").empty();
    $("#timer").empty();
    clearInterval(interval);
    $("#restart-btn").css("visibility", "visible");
    $("#submit-btn").css("visibility", "hidden");
    var result = $("<h3>Results:</h3>");
    $("#quiz").append(result);
    // Validate Questions:
    for (var i = 0; i < 10; i++) {
        var userChoice = $("input[name='btn" + i + "']:checked").val();
        if (userChoice === "true") {
            correct++;
        }
        else if(userChoice === "false") {
            wrong++;
        }
        console.log(userChoice);
    }
    var correctAns = $("<div>Correct: " + correct + "<div>");
    $("#quiz").append(correctAns);
    var wrongAns = $("<div>Wrong: " + wrong + "</div>");
    $("#quiz").append(wrongAns);
    // var restart = $("<button id='restart-btn'>Restart</button>");
    // $("#quiz").append(restart);
}