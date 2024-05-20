"use strict"


const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');
const player1ScoreDisplay = document.getElementById('player1-score');
const player2ScoreDisplay = document.getElementById('player2-score');

const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('Draw-sound');

const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = Math.random() > 0.5 ? PLAYER_X : PLAYER_O;
let gameActive = true;
let player1Score = 0;
let player2Score = 0;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    if (!gameActive || cell.textContent) {
        return;
    }

    cell.textContent = currentPlayer;
    clickSound.play();
    if (checkWinner(currentPlayer)) {
        gameActive = false;
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        updateScore(currentPlayer);
        winSound.play();
    } else if ([...cells].every(cell => cell.textContent)) {
        gameActive = false;
        statusDisplay.textContent = 'Draw!';
        drawSound.play();
    } else {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
    }
};

const checkWinner = (player) => {
    return winningCombinations.some(combination => 
        combination.every(index => cells[index].textContent === player)
    );
};

const updateScore = (player) => {
    if (player === PLAYER_X) {
        player1Score++;
        player1ScoreDisplay.textContent = player1Score;
    } else {
        player2Score++;
        player2ScoreDisplay.textContent = player2Score;
    }
};

const restartGame = () => {
    gameActive = true;
    currentPlayer = Math.random() > 0.5 ? PLAYER_X : PLAYER_O;
    cells.forEach(cell => cell.textContent = '');
    statusDisplay.textContent = `It's ${currentPlayer}'s turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);



