document.addEventListener("DOMContentLoaded", function () {
  const outputElement = document.getElementById("output");
  const guessInput = document.getElementById("guess");
  const submitButton = document.getElementById("submit");
  const retryButton = document.getElementById("retry");
  const instructionsElement = document.getElementById("instructions");
  const attemptsCounterElement = document.getElementById("attemptsCounter"); // Elemento del contador de intentos

  const maxAttempts = 10;
  let secretNumber;
  let attemptsLeft;
  let currentAttempt = 1;
  let outputText = "";

  function startGame() {
    secretNumber = Math.floor(Math.random() * 1000) + 1;
    attemptsLeft = maxAttempts;
    currentAttempt = 1;
    outputText = "";
    updateOutput();
    guessInput.value = "";
    guessInput.disabled = false;
    submitButton.disabled = false;
    retryButton.style.display = "none";
    attemptsCounterElement.textContent = `Próximo intento ${currentAttempt}`; // Cambiamos el mensaje inicial
  }

  function updateOutput() {
    outputElement.innerHTML = outputText;
  }

  startGame();

  submitButton.addEventListener("click", makeGuess);
  guessInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      makeGuess();
    }
  });

  retryButton.addEventListener("click", startGame);

  function makeGuess() {
    const userGuess = parseInt(guessInput.value);
    console.log(secretNumber); //Pista oculta
    if (userGuess || userGuess === 0) {
      if (attemptsLeft > 0) {
        attemptsLeft--;
        guessInput.value = "";
        const attemptMessage = `${currentAttempt}: <span class='blue'>${userGuess}</span>.`;

        if (attemptsLeft > 0) {
          if (userGuess < secretNumber) {
            outputText += `Intento ${attemptMessage} El número a adivinar es Mayor.<br>`;
          } else if (userGuess > secretNumber) {
            outputText += `Intento ${attemptMessage} El número a adivinar es Menor.<br>`;
          }
        }

        if (userGuess === secretNumber) {
          outputText += `<span class="win">¡¡¡GANASTE!!!</span> El número <span class='blue'>${secretNumber}</span> es correcto<br>`;
          guessInput.disabled = true;
          submitButton.disabled = true;
          retryButton.style.display = "block";
        }

        if (attemptsLeft === 0 && userGuess !== secretNumber) {
          outputText += `Intento ${attemptMessage}<br><span class="lose">¡¡¡PERDISTE!!!</span> El número secreto era <span class='blue'>${secretNumber}</span><br>`;
          guessInput.disabled = true;
          submitButton.disabled = true;
          retryButton.style.display = "block";
        }

        currentAttempt++;
        updateOutput();
        if (currentAttempt <= maxAttempts) {
          attemptsCounterElement.textContent = `Próximo intento ${currentAttempt}`; // Actualizamos el contador de intentos
        } else {
          attemptsCounterElement.textContent = `No hay mas intentos.`; // Actualizamos el contador de intentos
        }
      }
    } else {
      guessInput.value = "Ingresa un número";
    }
  }
});
