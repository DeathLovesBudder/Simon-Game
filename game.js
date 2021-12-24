var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

// starts the game on keypress
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// code associated with clicking a button
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

// checks the button pressed with the button in the sequence
function checkAnswer(currentLevel) {
  // if the last button pressed was equal to the button in the sequence, log success
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // if the answer is correct and both sequences are the same length (and all answers up to this point are correct), start the next sequence after a second
    if (userClickedPattern.length === gamePattern.length) {
    setTimeout(function (){
      nextSequence();
    }, 1000);
  }

  }else {
    console.log("wrong");
    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key To Restart");

    startOver();
  }
}

// function that controls the sequence to click
function nextSequence() {
  userClickedPattern = [];

  // keeps track of the level
  level ++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
};

// function that play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// function that animates the buttons
function animatePress (currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
