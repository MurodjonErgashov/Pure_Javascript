// GAME FUNCTION
/*
 - Player must guess a number betwen a min and max
 - player gets a certain amount of guesses
 - Notify player of guesses remaining
 - Notify the player of the correct answer if loose
 - Let player choose to play again
*/
const input = document.getElementById("guess-input");
const btn = document.getElementById("guess-value");
const msg = document.querySelector(".message");

// Add event to button
btn.addEventListener("click", submitGuess);
// Imkoniyatlar soni
let chanse = 3;

// guess function
function submitGuess(e) {
  chanse--;
  msg.innerHTML = "";
  // Reset again
  if (btn.value === "Try Again") {
    btn.value = "Submit";
    input.disabled = false;
    chanse = 3;
    return;
  }
  // game over
  if (chanse === 0) {
    input.disabled = true;
    btn.value = "Try Again";
  }

  let guess = Math.floor(Math.random() * 10 + 1);
  if (parseInt(input.value) === guess) {
    chanse++;
    msg.style.color = "green";
    msg.appendChild(
      document.createTextNode(
        `${parseInt(input.value)} is corret and you have ${chanse} chanse `
      )
    );
  } else {
    msg.style.color = "red";
    msg.appendChild(
      document.createTextNode(
        `${parseInt(input.value)} is incorret and you have ${chanse} chanse`
      )
    );
  }
  input.value = "";
}
