// Event Listener: Game
$("#start-btn").on("click", function() {
    $("#quiz").empty();
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
                $("#quiz").append(h3);
                // pulled answer choices and appended each to html in a radio button
                // each group of answers has a different name (line 25) so that only 1 of 4 can be selected at a time
                var singleSelect = "btn" + i
                for (j = 0; j < 4; j++) {
                    var radioBtn = $("<input type='radio'>").val(response[i].answers[j].text);
                    radioBtn.attr("name", singleSelect);
                    $("#quiz").append(radioBtn);
                    var btnText = $("<span>" + response[i].answers[j].text + "</span>")
                    $("#quiz").append(btnText);
                }
            }
            $("#submit-btn").css("visibility", "visible");
            // submitDiv = $("<div><button id='submit'>Submit</button></div>");
            // $("#quiz").append(submitDiv);
        })   
});

// Event Listener: Submit
$("#submit-btn").on("click", function() {
    stop();
})

//Event Listener: Restart
// $(restart).on("click", function() {
//     restart();
// })

// Global Variables:
var timer = 5;
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

// Results Screen:
function stop() {
    $("#quiz").empty();
    var result = $("<h3>Results:</h3>");
    $("#quiz").append(result);
    var correctAns = $("<div>Correct: " + correct + "<div>");
    $("#quiz").append(correctAns);
    var wrongAns = $("<div>Wrong: " + wrong + "</div>");
    $("#quiz").append(wrongAns);
    var restart = $("<button id='restart'>Restart</button>");
    $("#quiz").append(restart);
    clearInterval(interval);
    $("#timer").empty();
}