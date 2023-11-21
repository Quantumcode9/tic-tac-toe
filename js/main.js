//////////////////////////////////
// constants
//////////////////////////////////

const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY = null;

const winningConditions = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6]
];


//////////////////////////////////


//////////////////////////////////
// variables
//////////////////////////////////

let gameActive = true;
let currentPlayer = PLAYER_X;
let gameState = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];
const cells = document.querySelectorAll('.cell');
const winningMessageText = document.querySelector('#winningMessageText');
const restartButton = document.getElementById('reset');

//////////////////////////////////

//////////////////////////////////
// DOM elements
//////////////////////////////////


//////////////////////////////////
// functions
//////////////////////////////////

// 

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
}
//game logic

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === EMPTY || b === EMPTY || c === EMPTY) {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        winningMessageText.innerHTML = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }
    let roundDraw = !gameState.includes(EMPTY);
    if (roundDraw) {
        winningMessageText.innerHTML = 'Draw!';
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    let clickedCell = clickedCellEvent.target;
    let clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    if (gameState[clickedCellIndex] !== EMPTY || !gameActive) {
        return;
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = PLAYER_X; 
    gameState.fill(EMPTY);
    cells.forEach(cell => cell.innerHTML = ''); 
    winningMessageText.innerHTML = '';
}

//////////////////////////////////
// event listeners
//////////////////////////////////


cells.forEach(cell => cell.addEventListener('click', handleCellClick));

document.getElementById('reset').addEventListener('click', handleRestartGame);

//////////////////////////////////