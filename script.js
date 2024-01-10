
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let playerXName = '';
let playerOName = '';
let playerXWins = 0;
let playerOWins = 0;

function startGame() {
    playerXName = document.getElementById('playerX').value || 'Player X';
    playerOName = document.getElementById('playerO').value || 'Player O';

    if (playerXName === playerOName) {
        alert("Player names must be unique!");
        return;
    }

    document.getElementById('player-names').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    document.getElementById('scorecard').classList.remove('hidden');
    resetBoard();
    gameActive = true;
}

function makeMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementsByClassName('cell')[index].innerText = currentPlayer;

        if (checkWinner()) {
            showResult(`${currentPlayer} wins!`);
            updateScore();
            gameActive = false;
        } else if (isBoardFull()) {
            showResult('It\'s a draw!');
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function isBoardFull() {
    return gameBoard.every(cell => cell !== '');
}

function showResult(message) {
    document.getElementById('winner').innerText = message;
    document.getElementById('draw').innerText = message === 'It\'s a draw!' ? 'Nobody wins this round.' : '';
    document.getElementById('result').classList.remove('hidden');
}

function updateScore() {
    if (currentPlayer === 'X') {
        playerXWins++;
        document.getElementById('playerXScore').innerText = `${playerXName}: ${playerXWins} wins`;
    } else {
        playerOWins++;
        document.getElementById('playerOScore').innerText = `${playerOName}: ${playerOWins} wins`;
    }

    document.getElementById('turnIndicator').innerText = `${currentPlayer === 'X' ? playerOName : playerXName}'s turn`;
}

function startGame() {
    playerXName = document.getElementById('playerX').value || 'Player X';
    playerOName = document.getElementById('playerO').value || 'Player O';

    if (playerXName === playerOName) {
        alert("Player names must be unique!");
        return;
    }

    document.getElementById('player-names').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    document.getElementById('scorecard').classList.remove('hidden');
    resetBoard();
    updateTurnIndicator();
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('result').classList.add('hidden');
    document.getElementById('game-board').classList.remove('hidden');
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }

    updateTurnIndicator();
}
function updateTurnIndicator() {
    document.getElementById('turnIndicator').innerText = `${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
}