// Event Listener:
$("#start-btn").on("click", function() {
    $("#quiz").empty();
    $("#timer").text("Time Remaining " + timer);
    setInterval(decrement, 1000);

});

// Timer:
var timer = 60;

function decrement() {
    timer--
    $("#timer").text("Time Remaining " + timer);
    if (timer === 0) {
        stop();
    }
}

function stop() {
// show results screen
}

// Questions:
// https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple