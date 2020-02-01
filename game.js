var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = 0;

function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var RandomChosenColor = buttonColours[Math.floor(Math.random() * 4)];
  animatePress(RandomChosenColor);
  playSound(RandomChosenColor);
  gamePattern.push(RandomChosenColor);
}

function playSound(color) {
  var aud = new Audio("sounds/" + color + ".mp3");
  aud.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 200);
}

function reset() {
  $("h1").text("Game Over. Press any key to restart");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = 0;
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 200);
  playSound("wrong");
}

function checkAnswer(ind) {
  if (gamePattern[ind] != userClickedPattern[ind]) {
    reset();
  }
  if (gamePattern.length - 1 == ind) {
    userClickedPattern = [];
    setTimeout(nextSequence, 500);
  }
}
$(document).keypress(function() {

  if (start == 0) {
    start = 1;
    nextSequence();
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
