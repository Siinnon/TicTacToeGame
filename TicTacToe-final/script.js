const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const playeroneName = document.getElementById("player1");
const playertwoName = document.getElementById("player2");
const playeronescore = document.getElementById("player1Score");
const playertwoscore = document.getElementById("player2Score");
const drawsValue = document.getElementById("drawsCount");
const roundsValue = document.getElementById("roundsCount");

var arraySample = [];

const scoreboard = {
  player_x: 0,
  player_o: 0,
  draw: 0,
  total: 0,
};
let circleTurn;
//function that tells player theyve selected the PVP and must input their names to start the game
function selectMode() {
  alert("Player 1 vs Player 2 mode was selected");
  var firstName = prompt("Player 1, Please enter your Player Name");
  var secondName = prompt("Player 2, Please enter your Player Name");
  playeroneName.innerHTML = firstName;
  playertwoName.innerHTML = secondName;
  startGame();
}
// this randomizes value which determines if it is greater than 0.5 and this will return true or false
function randomStart() {
  var value = Math.random() < 0.5;
  return value;
}

selectMode();

restartButton.addEventListener("click", startGame);
//start the game
function startGame() {
  playeronescore.innerHTML = scoreboard.player_o;
  playertwoscore.innerHTML = scoreboard.player_x;
  drawsValue.innerHTML = scoreboard.draw;
  roundsValue.innerHTML = scoreboard.total;
// if circle turn is equal to true the circle player starts first if its not true then its x player turn
  circleTurn = randomStart();
  if (circleTurn) {
    alert(playeroneName.innerHTML + ", You start first : You are Circle");
    cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(CIRCLE_CLASS);
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
  } else {
    alert(playertwoName.innerHTML + ", You start first : You are Cross");
    cellElements.forEach((cell) => {
      cell.classList.remove(X_CLASS);
      cell.classList.remove(CIRCLE_CLASS);
      cell.removeEventListener("click", handleClick);
      cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
  }
}
// this function handles the click on the board and checks which player has won by checking on the check win function
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    scoreboard.total++;
    endGame(false);
  } else if (isDraw()) {
    // if no tic tac toe match then the game will draw and still icrement total games and also increment a draw
    scoreboard.total++;
    scoreboard.draw++;
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "Draw!";
  } else {
    if (circleTurn) {
      winningMessageTextElement.innerText = `${playeroneName.innerHTML} Wins!`;
      scoreboard.player_o++;
      // increments player o score on the scoreboard
    } else {
      winningMessageTextElement.innerText = `${playertwoName.innerHTML} Wins`;
      scoreboard.player_x++;
      // increments player x score on the scoreboard
    }
    // winningMessageTextElement.innerText = `${
    //   circleTurn ? playeroneName.innerHTML : playertwoName.innerHTML
    // } Wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}
// find the winner
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
