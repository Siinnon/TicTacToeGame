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
const computer = document.getElementById("computer");
const playeronescore = document.getElementById("player1Score");
const playertwoscore = document.getElementById("computerScore");
const drawsValue = document.getElementById("drawsCount");
const roundsValue = document.getElementById("roundsCount");

const scoreboard = {
    player_o: 0,
    computer: 0,
    draw: 0,
    total: 0,
};
let circleTurn;

function selectMode() {
    alert("Player vs Computer was selected");
    var firstName = prompt("Player, Please enter your Player Name");
    playeroneName.innerHTML = firstName;
    startGame();
}
// gets the id of every children from the id board (for example cell 1 cell 2 cell 3 which is shown in index2.html file)
var ids = [];
var children = document.getElementById("board").children; //get container element children.
for (var i = 0, len = children.length; i < len; i++) {
    ids.push(children[i].id);
    //this will push the cell ids within the array
}

selectMode();

restartButton.addEventListener("click", startGame);

function startGame() {
    playeronescore.innerHTML = scoreboard.player_o;
    playertwoscore.innerHTML = scoreboard.computer;
    drawsValue.innerHTML = scoreboard.draw;
    roundsValue.innerHTML = scoreboard.total;

    circleTurn = true;
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
}

var ids = [];
var children = document.getElementById("board").children; //get container element children.
for (var i = 0, len = children.length; i < len; i++) {
    ids.push(children[i].id);
}

var int = 0;

function computerSelected() {
    // theres 9 cells within the board so it will randmize the 9 cells using the math.floor function it will pick the cell that contains the id number and if the id contains a o or x it will draw otherwise the computer will pick one that doesnt contain those class values
    var randomNumber = Math.floor(Math.random() * 8);
    var picked = document.getElementById(`${ids[randomNumber]}`);
    if (picked.classList.contains("circle") || picked.classList.contains("x")) {
        if (isDraw()) {
            endGame(true);
        } else {
            return computerSelected();
        }
    }
    return picked;
}

function handleClick(e) {
    const cell = e.target;
    placeMark(cell, CIRCLE_CLASS);

    if (checkWin(CIRCLE_CLASS)) {
        // it checks wether the circle wins
        circleTurn = true;
        scoreboard.total++;
        endGame(false);
    } else if (checkWin(X_CLASS)) {
        // it checks wether the x wins
        circleTurn = false;
        scoreboard.total++;
        endGame(false);
    } else if (isDraw()) {
        scoreboard.total++;
        scoreboard.draw++;
        endGame(true);
    } else {
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
        } else {
            winningMessageTextElement.innerText = `${computer.innerHTML} Wins`;
            scoreboard.computer++;
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
// depending on which current class which is o or x, it checks if the cell contains the class x or o, if true then it will retrun false else it will place the marker of x or o
function placeMark(cell, currentClass) {
    if (currentClass == "circle") {
        if (cell.classList.contains("x")) {
            return false;
        } else {
            cell.classList.add("circle");
            placeMark(computerSelected(), X_CLASS);
        }
    } else {
        if (cell.classList.contains("circle")) {
            return false;
        } else {
            cell.classList.add("x");
        }
    }
}

// function swapTurns() {
//   circleTurn = !circleTurn;
// }

function setBoardHoverClass() {
    board.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        board.classList.add(CIRCLE_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}