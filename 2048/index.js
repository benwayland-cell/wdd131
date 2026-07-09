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
            moveBoard([-1, 0]);
            break;
        case "ArrowDown":
        case "s":
            moveBoard([1, 0]);
            break;
        case "ArrowLeft":
        case "a":
            moveBoard([0, -1]);
            break;
        case "ArrowRight":
        case "d":
            moveBoard([0, 1]);
            break;
    }
}
/**
 * Moves all pieces on the board in the direction of moveVector.
 * @param moveVector The direction to move the pieces on the board. Format: (row, column) (Vector as in direction not list).
 */
function moveBoard(moveVector) {
    // If moveVector is invalid, throw an error
    if (!((moveVector[0] == -1 || moveVector[0] == 0 || moveVector[0] == 1) && // the first is -1, 0, or 1
        (moveVector[1] == -1 || moveVector[1] == 0 || moveVector[1] == 1) && // the second is -1, 0, or 1
        ((moveVector[0] == 0 && moveVector[1] != 0) || (moveVector[1] == 0 && moveVector[0] != 0)) // one is zero and not the other
    )) {
        throw new Error(`Tried to use moveBoard, but moveVector was invalid. moveVector: [${moveVector}]`);
    }
    // How we will move through the board
    const wrapVector = getWrapVector(moveVector);
    const parseVector = reverseVector(moveVector);
    let currentSpace = getStartCor(moveVector);
}
/**
 * Gets the opposite of a vector
 * @param vector A vector that will be reversed
 * @returns The reversed vector
 */
function reverseVector(vector) {
    return [vector[0] * -1, vector[1] * -1];
}
/**
 * Gets the coordinate that the moveBoard function starts at.
 * @param moveVector The direction to move the pieces on the board. Format: (row, column) (Vector as in direction not list).
 * @returns The coordinate that the moveBoard function starts at.
 */
function getStartCor(moveVector) {
    if (moveVector[0] == -1 || moveVector[1] == -1) {
        return [0, 0];
    }
    else {
        return [board.length - 1, 0];
    }
}
/**
 * Gets the vector used by moveBoard to wrap around the board
 * @param moveVector The direction to move the pieces on the board. Format: (row, column) (Vector as in direction not list).
 * @returns The vector used by moveBoard to wrap around the board
 */
function getWrapVector(moveVector) {
    let wrapVector = [1, 1];
    if (moveVector[0] != 0) {
        wrapVector[0] = board.length;
    }
    else if (moveVector[1] != 0) {
        wrapVector[1] = board[0].length;
    }
    return wrapVector;
}
init();
