
const rows = 6;
const cols = 7;
let board = new Array(rows).fill(null).map(() => new Array(cols).fill(''));
let currentPlayer = 'X';

function createBoard() {
    const table = document.querySelector('.connect4');

    for (let row = 0; row < rows; row++) {
        const tr = document.createElement('tr');

        for (let col = 0; col < cols; col++) {
            const td = document.createElement('td');
            td.setAttribute('data-column', col);
            td.addEventListener('click', () => dropDisc(col));
            tr.appendChild(td);
        }

        table.appendChild(tr);
    }

    updateBoard();
}

function updateBoard() {
    const table = document.querySelector('.connect4');

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = table.rows[row].cells[col];
            cell.textContent = board[row][col];
        }
    }
}

function dropDisc(column) {
    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][column] === '') {
            board[row][column] = currentPlayer;
            updateBoard();

            if (checkWinner(row, column)) {
                alert(`Player ${currentPlayer} wins!`);
                resetGame();
            } else if (board.every(row => row.every(cell => cell !== ''))) {
                alert("It's a draw!");
                resetGame();
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
            break;
        }
    }
}

function checkWinner(row, col) {
    return (
        checkDirection(row, col, 0, 1) || // Horizontal
        checkDirection(row, col, 1, 0) || // Vertical
        checkDirection(row, col, 1, 1) || // Diagonal /
        checkDirection(row, col, -1, 1)   // Diagonal \
    );
}

function checkDirection(row, col, rowDir, colDir) {
    const player = board[row][col];

    for (let i = 0; i < 4; i++) {
        const newRow = row + i * rowDir;
        const newCol = col + i * colDir;

        if (newRow < 0 || newRow >= rows || newCol < 0 || newCol >= cols || board[newRow][newCol] !== player) {
            return false;
        }
    }

    return true;
}

function resetGame() {
    board = new Array(rows).fill(null).map(() => new Array(cols).fill(''));
    currentPlayer = 'X';
    updateBoard();
}

window.onload = createBoard;reateBoard;