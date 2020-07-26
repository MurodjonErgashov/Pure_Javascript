// Game values
let min = 1,
  max = 10,
  winningNum = Math.floor(Math.random() * (max - min + 1) + min),
  guessesLeft = 3;

// ui elements
const game = document.querySelector(".game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-value"),
  guessInput = document.getElementById("guess-input"),
  message = document.querySelector(".message");

// Assign UI min and max;
minNum.textContent = min;
maxNum.textContent = max;

// Listen fornguess
guessBtn.addEventListener("click", function (e) {
  // check is adding class;
  if (guessBtn.className === "play-again") {
    window.location.reload();
  }

  let guess = parseInt(guessInput.value);
  console.log(game);
  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, "red");
    return;
  }

  // Check if won
  if (guess === winningNum) {
    // game over von
    gameOver(true, `${winningNum} is correct, YOU WINNN!!!`);
  } else {
    guessesLeft -= 1;
    if (guessesLeft === 0) {
      // game over -lost
      gameOver(
        false,
        `Game over you lost, the correct number mas ${winningNum}`
      );
    } else {
      // Game continius -answer wrong
      guessInput.style.borderColor = "red";
      setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "red");

      // clear input
      guessInput.value = "";
    }
  }
});

// Game over
function gameOver(won, msg) {
  let color;
  color = won === true ? "green" : "red";
  // disable input
  guessInput.disabled = true;
  // change Sborder color
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  // Play Again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Play again event listener
game.addEventListener("click ", function (e) {
  // if (e.target.className === "play-again") {
  //   window.location.reload();
  // }
  console.log(1);
});

//  set message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
