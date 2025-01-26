let board = ['', '', '', '', '', '', '', '', ''];
let playerPlays = "X"; 

//---------------------------------------------- MOUVEMENTS JOUEURS -------------------------------------------------------------

function playerMove(index) {
    if (board[index] === '' && !isGameOver()) { 
        board[index] = playerPlays;
        document.getElementsByClassName("cell")[index].textContent = playerPlays;
        if (playerPlays === 'X') {
            document.getElementsByClassName("cell")[index].classList.add('playerX');
        } else {
            document.getElementsByClassName("cell")[index].classList.add('playerO');
        }
        if (checkWin(playerPlays)) {
            document.getElementById("mess").textContent = `Le joueur ${playerPlays} a gagné !`;
            disableCells(); 
            setTimeout(resetGame, 2000);
            return;
        }
        if (checkDraw()) {
            document.getElementById("mess").textContent = 'Match nul';
            disableCells(); 
            setTimeout(resetGame, 2000);
            return;
        }
        playerPlays = (playerPlays === 'X') ? 'O' : 'X';
        document.getElementById("mess").textContent = `C'est au tour du joueur ${playerPlays} de jouer.`;
    }
}

//---------------------------------------------------- PARTIE TERMINEE ---------------------------------------------------------
function isGameOver() {
    return checkWin('X') || checkWin('O') || checkDraw();
}

function disableCells() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.pointerEvents = 'none'; 
    }
}

function enableCells() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].style.pointerEvents = 'auto'; 
    }
}

//-------------------------------------------VICTOIRE --------------------------------------------------------------

function checkWin(player) {
    for (let i = 0; i < 3; i++) {
        if (board[i * 3] === player && board[i * 3 + 1] === player && board[i * 3 + 2] === player) {
            return true;
        }
    }
    for (let i = 0; i < 3; i++) {
        if (board[i] === player && board[i + 3] === player && board[i + 6] === player) {
            return true;
        }
    }
    if (board[0] === player && board[4] === player && board[8] === player) {
        return true;
    }
    if (board[2] === player && board[4] === player && board[6] === player) {
        return true;
    }
    return false;
}

//-------------------------------Match null ------------------------------------------------------------------------------

function checkDraw() {
    return board.every(cell => cell !== ''); 
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];  
    playerPlays = 'X'; 
    document.getElementById("mess").textContent = `C'est au tour du joueur X de jouer.`;

    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < cells.length; i++) {
        cells[i].textContent = '';
        cells[i].classList.remove('playerX', 'playerO');
    }
    enableCells();  
}

let cells = document.getElementsByClassName("cell");
for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
        playerMove(i); 
    });
}
