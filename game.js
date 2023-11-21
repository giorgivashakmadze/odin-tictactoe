const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const winPage = document.querySelector('.win-page');
const winningText = document.querySelector('[data-winning-text]');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            winPage.style.display = 'block';
            winningText.innerText = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        winPage.style.display = 'block';
        winningText.innerText = 'It\'s a draw!';
    }
}

function handleClick(index) {
    if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    winPage.style.display = 'none';
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.innerText = '';
    });
}

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index));
});

restartButton.addEventListener('click', restartGame);
