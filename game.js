var level = 0;
var buttonColour = ["red", "blue", "green", "yellow"]; // Define standard colour array
var gamePattern = []; // create blank array for the pattern the game creates
var userClickedPattern = []; // create  blank array for the pattern the user creates
var started = false;

// Sequence creator
// Generate a random number.
// Check the floor against the defined standard array, and push that colour to the game pattern array
// Fade in and out the corresponding HTML div with the ID matching what was chosen in the array
// Play the corresponding sound given the identifier of the chosen colour
function nextSequence() {
  userClickedPattern = [];
  var randomNumber = (Math.random() * 3) + 1;
  var randomChosenColour = buttonColour[Math.floor(randomNumber)];
  gamePattern.push(randomChosenColour);
  var randomID = "#" + randomChosenColour;
  $(randomID).fadeOut(100).fadeIn(100);
  playSound(randomID);
  level++;
  $("h1").text("Level " + level);

}
// If the user clicks on the button, this pattern is pushed to the user array
// The sound played matches the ID of what was selected by the user
// The button is animated based on what was clicked on by the user
$(".btn").on("click", function() {
  var userChosenColour = $(this).attr("id");
  console.log(userChosenColour);
  playSound("#" + userChosenColour);
  userClickedPattern.push(userChosenColour);
  animatePress("#" + userChosenColour);
  checkAnswer(userClickedPattern.length - 1)
});

// Listen for keydown events.  This can only happen once, but can also be triggered
// on a game restart. So a boolean is used to control this.  If started is false,
// the game begins
$(document).on("keydown", function() {
  if (!started) {
    nextSequence();
    $("h1").text("Level " + level);
  }
  started = true;
});

// The function to play sound uses the #id as the differentiator of what sound to play
// If an error occurs, then it will play a warning sound (ie, #id selector not working correctly)
function playSound(name) {
  switch (name) {
    case "#red":
      var audioR = new Audio("sounds/red.mp3");
      audioR.play();
      break;
    case "#blue":
      var audioB = new Audio("sounds/blue.mp3");
      audioB.play();
      break;
    case "#yellow":
      var audioY = new Audio("sounds/yellow.mp3");
      audioY.play();
      break;
    case "#green":
      var audioG = new Audio("sounds/green.mp3");
      audioG.play();
      break;
    default:
      var audioE = new Audio("sounds/wrong.mp3");
      audioE.play();
  }
}

// This function animates the button that was clicked, to briefly give it a new CSS
// class.  After 100 ms, the class is removed
function animatePress(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function() {
    $(currentColour).removeClass("pressed");
  }, 100);
}

// Checks the users answers
// If the user's choice at a given index is correct,
// then the game checks if the user's sequence and the game sequence are the length
// if not, the choices contine.  If they are, the game calls back to the main function
// for the next sequence
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    var audioE = new Audio("sounds/wrong.mp3");
    audioE.play();
    $("body").addClass("game-over")
    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200);
    $("h1").text("Game Over.  Press Any Key to Restart");
    startOver();
  }

}
// Resets all pertinent variables for the game to start over
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
