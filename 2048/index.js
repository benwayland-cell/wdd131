"use strict";
// Elements
const boardElement = document.getElementById("board");
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
function init() {
    board[1][2] = 2;
    renderBoard();
}
function renderBoard() {
    if (boardElement == null) {
        return;
    }
    function spaceTemplate(value) {
        if (value == 0) {
            return `<div></div>`;
        }
        return `<div>${value}</div>`;
    }
    boardElement.innerHTML = "";
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const value = board[row][col];
            boardElement.innerHTML += spaceTemplate(value);
        }
    }
}
init();
