"use strict";
// Elements
const boardElement = document.getElementById("board");
/**
 * The board.
 *
 * The first index relates to the row (y) and the second relates to the column (x).
 */
let board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
function init() {
    document.addEventListener("keydown", handleInput);
    renderBoard();
}
/**
 * Renders the board onto the website
 */
function renderBoard() {
    if (boardElement == null) {
        return;
    }
    /**
     * Makes the HTML for the space given its value. 0 will not display.
     * @param value The number the space has
     * @returns The string in HTML form for a single space
     */
    function spaceTemplate(value) {
        if (value == 0) {
            return `<div></div>`;
        }
        return `<div>${value}</div>`;
    }
    // Clear the boardElement
    boardElement.innerHTML = "";
    // Get the value at each space and add it to the boardElement
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            const value = board[row][col];
            boardElement.innerHTML += spaceTemplate(value);
        }
    }
}
/**
 * Takes the user's keyboard press and takes action
 * @param event The keyboard event
 */
function handleInput(event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
            console.log("up");
            break;
        case "ArrowDown":
        case "s":
            console.log("down");
            break;
        case "ArrowLeft":
        case "a":
            console.log("left");
            break;
        case "ArrowRight":
        case "d":
            console.log("right");
            break;
    }
}
init();
