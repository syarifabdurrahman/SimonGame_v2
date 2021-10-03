var buttonColour = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var documentClick = false;
var started = false;
var level = 0;

var score = 0;
var highscore;

var timeLenght = 800;

$("body").keydown(function (e) {
  if (!started) {
    nextSequence();
    $("#level-title").html("Level " + level);
    started = true;
  }
});

$(".btn").on("touchstart", function () {
  documentClick = true;
});

$(".btn").on("touchmove", function () {
  documentClick = false;
});

$(".btn").on("click touchend", function (event) {
  if (event.type == "click") documentClick = true;
  if (documentClick) {
    if (started) {
      var userChosenColour = $(this).attr("id");
      userClickedPattern.push(userChosenColour);
      soundPlay(userChosenColour);
      animatePress(userChosenColour);
      checkAnswer(userClickedPattern.length - 1);
      console.log(userClickedPattern);
    }
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.random();
  randomNumber = Math.floor(randomNumber * 4);
  var randomChosenColour = buttonColour[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  soundPlay(randomChosenColour);
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function soundPlay(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, timeLenght);
      score += 10;
    }
    $(".score-text").html("Your Score : " + score);
    timeLenght--;
  } else {
    soundPlay("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").html("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  score = 0;
  $(".score-text").html("Your Score : " + score);
}
