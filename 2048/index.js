"use strict";
const ROW_INDEX = 0;
const COL_INDEX = 1;
const UP_VECTOR = [-1, 0];
const DOWN_VECTOR = [1, 0];
const LEFT_VECTOR = [0, -1];
const RIGHT_VECTOR = [0, 1];
/**
 * The last number tile that has black font
 */
const LAST_BLACK_NUMBER = 64;
// Elements
let boardElement;
let newGameButtons;
let scoreElement;
let winScreen;
let continueButton;
let lossScreen;
/**
 * What the board is by default
 */
const DEFAULT_BOARD = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
// const DEFAULT_BOARD: number[][] = [
//     [2, 4, 8, 16],
//     [32, 64, 128, 256],
//     [512, 1024, 2048, 4096],
//     [8192, 16384, 32768, 65536]
// ];
/**
 * The board.
 *
 * The first index relates to the row (y) and the second relates to the column (x).
 */
let board;
/**
 * The player's score.
 */
let score;
/**
 * Whether the player has won the game yet
 */
let wonGame = false;
/**
 * Function run when first booting up page
 */
function init() {
    initElements();
    initEventListeners();
    resetBoard();
    // board[0][0] = 1024;
    // board[0][1] = 1024;
    // renderBoard();
}
/**
 * Inits the HTML elements
 */
function initElements() {
    let potentialBoardElement = document.getElementById("board");
    if (potentialBoardElement) {
        boardElement = potentialBoardElement;
    }
    else {
        throw new Error(`"board" does not exist.`);
    }
    newGameButtons = document.getElementsByClassName("newGameButton");
    let potentialScoreElement = document.getElementById("score");
    if (potentialScoreElement) {
        scoreElement = potentialScoreElement;
    }
    else {
        throw new Error(`"score" does not exist.`);
    }
    let potentialWinScreen = document.getElementById("winScreen");
    if (potentialWinScreen) {
        winScreen = potentialWinScreen;
    }
    else {
        throw new Error(`"winScreen" does not exist.`);
    }
    let potentialContinueButton = document.getElementById("continueButton");
    if (potentialContinueButton) {
        continueButton = potentialContinueButton;
    }
    else {
        throw new Error(`"continueButton" does not exist.`);
    }
    let potentialLossScreen = document.getElementById("lossScreen");
    if (potentialLossScreen) {
        lossScreen = potentialLossScreen;
    }
    else {
        throw new Error(`"lossScreen" does not exist.`);
    }
}
function initEventListeners() {
    document.addEventListener("keydown", handleInput);
    for (let index = 0; index < newGameButtons.length; index++) {
        newGameButtons[index].addEventListener("click", resetBoard);
    }
    continueButton.addEventListener("click", hideWinScreen);
}
/**
 * Renders the board onto the website
 */
function renderBoard() {
    /**
     * Makes the HTML for the space given its value. 0 will not display.
     * @param value The number the space has
     * @returns The string in HTML form for a single space
     */
    function spaceTemplate(value) {
        if (value == 0) {
            return `<div></div>`;
        }
        let color = "black";
        if (value > LAST_BLACK_NUMBER) {
            color = "var(--paragraph-color-on-color)";
        }
        return `<div style="
                background-color: var(--${value});
                color: ${color};
            ">${value}</div>`;
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
            moveBoard(UP_VECTOR);
            break;
        case "ArrowDown":
        case "s":
            moveBoard(DOWN_VECTOR);
            break;
        case "ArrowLeft":
        case "a":
            moveBoard(LEFT_VECTOR);
            break;
        case "ArrowRight":
        case "d":
            moveBoard(RIGHT_VECTOR);
            break;
    }
}
/**
 * Resets the board
 */
function resetBoard() {
    board = structuredClone(DEFAULT_BOARD);
    randomFillBoard();
    randomFillBoard();
    setScore(0);
    renderBoard();
    hideWinScreen();
    hideLossScreen();
    wonGame = false;
}
/**
 * Adds to the score (also renders it).
 * @param pointsToAdd The points to add to the score
 */
function addScore(pointsToAdd) {
    setScore(score + pointsToAdd);
}
/**
 * Sets the score to a constant (also renders it).
 * @param newScore The points to set score to
 */
function setScore(newScore) {
    score = newScore;
    scoreElement.innerHTML = `Score: ${score}`;
}
/**
 * Fills the board with random 2s or 4s
 */
function randomFillBoard() {
    // Get the coordinates of all empty spaces
    const emptySpaces = getEmptySpaces();
    // Do nothing if there is no empty space
    if (emptySpaces.length == 0) {
        return;
    }
    // Get a random space
    const randomSpace = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];
    // Get a random value
    let newRandomValue = 2;
    if (Math.random() < 0.1) {
        newRandomValue = 4;
    }
    // Fill the randomly selected space
    setBoardValueGivenCor(randomSpace, newRandomValue);
}
/**
 * Gets the empty spaces on the board
 * @returns A list of empty spaces on board
 */
function getEmptySpaces() {
    let emptySpaces = [];
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            let currentSpace = [row, col];
            if (getBoardValueGivenCor(currentSpace) == 0) {
                emptySpaces.push(currentSpace);
            }
        }
    }
    return emptySpaces;
}
/**
 * Checks if the player has lost the game.
 * @returns If the player has lost the game.
 */
function lostGame() {
    if (getEmptySpaces().length != 0) {
        return false;
    }
    /**
     * Checks if you can move that space
     * @param spaceCor The coordinate to check
     * @returns If that space can be moved
     */
    function spaceCanMove(spaceCor) {
        const spaceCorValue = getBoardValueGivenCor(spaceCor);
        // If the space is 0, it can move
        if (spaceCorValue == 0) {
            return true;
        }
        let canMove = false;
        // Check if the space can be moved in each direction
        const directionsToCheck = [UP_VECTOR, DOWN_VECTOR, LEFT_VECTOR, RIGHT_VECTOR];
        directionsToCheck.forEach((direction) => {
            const checkingCor = addVectors(spaceCor, direction);
            if (corIsOnBoard(checkingCor)) {
                const checkingCorValue = getBoardValueGivenCor(checkingCor);
                if (checkingCorValue == spaceCorValue || checkingCorValue == 0) {
                    canMove = true;
                }
            }
        });
        return canMove;
    }
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (spaceCanMove([row, col])) {
                return false;
            }
        }
    }
    return true;
}
/**
 * Checks if the player has won.
 * @returns If there is a 2048 tile on the board
 */
function hasWonGame() {
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            if (getBoardValueGivenCor([row, col]) == 2048) {
                return true;
            }
        }
    }
    return false;
}
/**
 * Moves all pieces on the board in the direction of moveVector.
 * @param moveVector The direction to move the pieces on the board. Format: (row, column)
 */
function moveBoard(moveVector) {
    // If moveVector is invalid, throw an error
    if (!((moveVector[ROW_INDEX] == -1 || moveVector[ROW_INDEX] == 0 || moveVector[ROW_INDEX] == 1) && // the first is -1, 0, or 1
        (moveVector[COL_INDEX] == -1 || moveVector[COL_INDEX] == 0 || moveVector[COL_INDEX] == 1) && // the second is -1, 0, or 1
        ((moveVector[ROW_INDEX] == 0 && moveVector[COL_INDEX] != 0) || (moveVector[COL_INDEX] == 0 && moveVector[ROW_INDEX] != 0)) // one is zero and not the other
    )) {
        throw new Error(`Tried to use moveBoard, but moveVector was invalid. moveVector: [${moveVector}]`);
    }
    // How we will move through the board
    const wrapVector = getWrapVector(moveVector);
    const parseVector = reverseVector(moveVector);
    let currentSpaceCor = getStartCor(moveVector);
    let movedAPiece = false;
    // Go through every space on the board
    // End if we leave the board even when we wrap
    while (corIsOnBoard(currentSpaceCor)) {
        // Move the space
        const movedThisPiece = moveSpaceOnBoard(currentSpaceCor, moveVector);
        // Update moved a piece
        if (!movedAPiece) {
            movedAPiece = movedThisPiece;
        }
        // Go to next space
        currentSpaceCor = addVectors(currentSpaceCor, parseVector);
        // if we need to wrap
        if (!corIsOnBoard(currentSpaceCor)) {
            currentSpaceCor = addVectors(currentSpaceCor, wrapVector);
        }
    }
    if (movedAPiece) {
        randomFillBoard();
    }
    renderBoard();
    if (lostGame()) {
        showLossScreen();
    }
    if (!wonGame) {
        if (hasWonGame()) {
            wonGame = true;
            showWinScreen();
        }
    }
}
function moveSpaceOnBoard(spaceToMove, moveVector) {
    let movedAPiece = false;
    const currentValue = getBoardValueGivenCor(spaceToMove);
    let parsingCor = addVectors(spaceToMove, moveVector);
    function moveSpace(from, to) {
        const fromValue = getBoardValueGivenCor(from);
        const toValue = getBoardValueGivenCor(to);
        setBoardValueGivenCor(from, 0);
        setBoardValueGivenCor(to, fromValue + toValue);
    }
    while (corIsOnBoard(parsingCor) && currentValue != 0) {
        const parsingCorValue = getBoardValueGivenCor(parsingCor);
        const parsingCorIsEmpty = parsingCorValue == 0;
        const parsingCorIsSame = parsingCorValue == currentValue;
        // if we can move to that location
        if (parsingCorIsEmpty || parsingCorIsSame) {
            moveSpace(spaceToMove, parsingCor);
            spaceToMove = addVectors(spaceToMove, moveVector);
            movedAPiece = true;
        }
        else {
            break;
        }
        if (parsingCorIsSame) {
            addScore(getBoardValueGivenCor(spaceToMove));
            break;
        }
        // Move to the next parsing coordinate
        parsingCor = addVectors(parsingCor, moveVector);
    }
    return movedAPiece;
}
/**
 * Displays the win screen
 */
function showWinScreen() {
    winScreen.style.display = "flex";
}
/**
 * Hides the win screen
 */
function hideWinScreen() {
    winScreen.style.display = "none";
}
/**
 * Displays the loss screen
 */
function showLossScreen() {
    lossScreen.style.display = "flex";
}
/**
 * Hides the loss screen
 */
function hideLossScreen() {
    lossScreen.style.display = "none";
}
/**
 * Changes a space given a coordinate and what to change it to.
 * @param cor The coordinate of what will be changed
 * @param newValue The value that that space will be changed to
 */
function setBoardValueGivenCor(cor, newValue) {
    if (!corIsOnBoard(cor)) {
        throw new Error(`setBoardValueGivenCor was ran with an invalid cor. cor: ${cor}`);
    }
    if (Number.isNaN(newValue)) {
        throw new Error("setBoardValueGivenCor was given a newValue of NaN");
    }
    board[cor[ROW_INDEX]][cor[COL_INDEX]] = newValue;
}
/**
 * Gets the value of a space given a coordinate
 * @param cor The coordinate it will check for
 * @returns The value at that coordinate
 */
function getBoardValueGivenCor(cor) {
    if (!corIsOnBoard(cor)) {
        throw new Error(`getBoardValueGivenCor was given a cor that is off the board. cor: ${cor}`);
    }
    return board[cor[ROW_INDEX]][cor[COL_INDEX]];
}
function corIsOnBoard(cor) {
    return (0 <= cor[ROW_INDEX] && cor[ROW_INDEX] < board.length &&
        0 <= cor[COL_INDEX] && cor[COL_INDEX] < board[0].length);
}
/**
 * Adds two vectors together.
 * @param vector1 The first vector
 * @param vector2 The second vector
 * @returns The sum of the vectors
 */
function addVectors(vector1, vector2) {
    return [vector1[ROW_INDEX] + vector2[ROW_INDEX], vector1[COL_INDEX] + vector2[COL_INDEX]];
}
/**
 * Checks if two vectors are equal
 * @param vector1 The first vector
 * @param vector2 The second vector
 * @returns If the two vectors are equal
 */
function vectorsAreEqual(vector1, vector2) {
    return (vector1[ROW_INDEX] == vector2[ROW_INDEX] && vector1[COL_INDEX] == vector2[COL_INDEX]);
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
 * @param moveVector The direction to move the pieces on the board. Format: (row, column)
 * @returns The coordinate that the moveBoard function starts at.
 */
function getStartCor(moveVector) {
    if (vectorsAreEqual(moveVector, UP_VECTOR) || vectorsAreEqual(moveVector, LEFT_VECTOR)) {
        return [0, 0];
    }
    else if (vectorsAreEqual(moveVector, DOWN_VECTOR) || vectorsAreEqual(moveVector, RIGHT_VECTOR)) {
        return [board.length - 1, board[0].length - 1];
    }
    else {
        throw new Error(`getStartCor was given an invalid vector. Vector: ${moveVector}`);
    }
}
/**
 * Gets the vector used by moveBoard to wrap around the board
 * @param moveVector The direction to move the pieces on the board. Format: (row, column)
 * @returns The vector used by moveBoard to wrap around the board
 */
function getWrapVector(moveVector) {
    if (vectorsAreEqual(moveVector, UP_VECTOR)) {
        return [-board.length, 1];
    }
    else if (vectorsAreEqual(moveVector, DOWN_VECTOR)) {
        return [board.length, -1];
    }
    else if (vectorsAreEqual(moveVector, LEFT_VECTOR)) {
        return [1, -board[0].length];
    }
    else if (vectorsAreEqual(moveVector, RIGHT_VECTOR)) {
        return [-1, board[0].length];
    }
    else {
        throw new Error(`getWrapVector was given an invalid vector. Vector: ${moveVector}`);
    }
}
init();
