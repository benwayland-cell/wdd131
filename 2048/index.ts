
// Elements
const boardElement: HTMLElement | null = document.getElementById("board");


let board: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];

function init() {
    board[1][2] = 2;
    renderBoard();
}

function renderBoard(): void {
    if (boardElement == null) {
        return;
    }

    function spaceTemplate(value: number): string {
        if (value == 0) {
            return `<div></div>`
        }

        return `<div>${value}</div>`; 
    }

    boardElement.innerHTML = "";

    for (let row: number = 0; row < board.length; row++) {
        for (let col: number = 0; col < board[row].length; col++) {
            const value: number = board[row][col];
            boardElement.innerHTML += spaceTemplate(value);
        }
    }
}

init();