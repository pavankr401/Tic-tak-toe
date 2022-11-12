const cells = document.querySelectorAll(".cell");
const gameBoard = document.getElementsByTagName('table')[0];
const huPlayer = 'O';
const aiPlayer = 'X';
const winCombs = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
let spots;
const endGame = document.querySelector('.endgame');
let isDeclared;


startGame()

function startGame() {
  isDeclared = false;
  endGame.style.display = 'none';
  spots = [];
  for (let i = 0; i < 9; i++) {
    spots.push(i);
    cells[i].innerText = "";
  }
  gameBoard.addEventListener("click", handleClick);
}

function handleClick(event) {
  console.log(spots);
  if (event.target.innerText == "") {
    event.target.innerText = huPlayer;
    spots[event.target.id] = huPlayer;
    aiPlayerMove()
  }
  if (checkWin(huPlayer)) {
    gameOver(huPlayer);
    isDeclared = true;
  }
  if (checkTie() && !isDeclared) {
    gameOver("tie");
  }

  
}

function checkWin(player) {
  for (let i = 0; i < winCombs.length; i++) {
    let isMatched = false;
    for (let j = 0; j < winCombs[i].length; j++) {
      if (spots[winCombs[i][j]] == player) {
        isMatched = true;
      }
      else {
        isMatched = false;
        break;
      }
    }
    if (isMatched) {
      return true;
    }
  }
  return false;
}

function gameOver(player) {
  gameBoard.removeEventListener("click", handleClick);
  declareWinner(player);
}

function declareWinner(player) {
  endGame.style.display = 'Block';

  if (player == huPlayer) {
    endGame.childNodes[1].innerText = 'HUMAN WINS!';
  }
  else if (player == 'tie') {
    endGame.childNodes[1].innerText = 'TIE!!!';
  }
  else {
    endGame.childNodes[1].innerText = 'COMP WINS!';
  }

}

function aiPlayerMove() {
  for (let i = 0; i < spots.length; i++) {
    if (/^[0-9]$/.test(spots[i])) {
      cells[spots[i]].innerText = aiPlayer;
      spots[i] = aiPlayer;
      if (checkWin(aiPlayer) && !isDeclared) {
        gameOver(aiPlayer);
      }
      return;
    }
  }
}

function checkTie() {
  for (let i = 0; i < spots.length; i++) {
    if (/^[0-9]$/.test(spots[i])) {
      return false;
    }
  }
  return true;
}

