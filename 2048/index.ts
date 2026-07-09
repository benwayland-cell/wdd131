
/**
 * A two dimensional coordinate. (not a list)
 * 
 * In the format: [row, column]
 */
type Vector = [number, number];

const ROW_INDEX = 0;
const COL_INDEX = 1;

const UP_VECTOR: Vector = [-1, 0]
const DOWN_VECTOR: Vector = [1, 0]
const LEFT_VECTOR: Vector = [0, -1]
const RIGHT_VECTOR: Vector = [0, 1]



// Elements
const boardElement: HTMLElement | null = document.getElementById("board");


/**
 * The board.
 * 
 * The first index relates to the row (y) and the second relates to the column (x).
 */
let board: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];


function init(): void {
    document.addEventListener("keydown", handleInput);

    setBoardValueGivenCor([0, 0], 2);
    setBoardValueGivenCor([0, 3], 4);

    renderBoard();
}


/**
 * Renders the board onto the website
 */
function renderBoard(): void {
    if (boardElement == null) {
        return;
    }

    /**
     * Makes the HTML for the space given its value. 0 will not display.
     * @param value The number the space has
     * @returns The string in HTML form for a single space
     */
    function spaceTemplate(value: number): string {
        if (value == 0) {
            return `<div></div>`
        }

        return `<div>${value}</div>`; 
    }

    // Clear the boardElement
    boardElement.innerHTML = "";

    // Get the value at each space and add it to the boardElement
    for (let row: number = 0; row < board.length; row++) {
        for (let col: number = 0; col < board[row].length; col++) {
            const value: number = board[row][col];
            boardElement.innerHTML += spaceTemplate(value);
        }
    }
}


/**
 * Takes the user's keyboard press and takes action
 * @param event The keyboard event
 */
function handleInput(event: KeyboardEvent): void {
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
 * Moves all pieces on the board in the direction of moveVector.
 * @param moveVector The direction to move the pieces on the board. Format: (row, column)
 */
function moveBoard(moveVector: Vector): void {

    // If moveVector is invalid, throw an error
    if (!(
        (moveVector[ROW_INDEX] == -1 || moveVector[ROW_INDEX] == 0 || moveVector[ROW_INDEX] == 1) && // the first is -1, 0, or 1
        (moveVector[COL_INDEX] == -1 || moveVector[COL_INDEX] == 0 || moveVector[COL_INDEX] == 1) && // the second is -1, 0, or 1
        ((moveVector[ROW_INDEX] == 0 && moveVector[COL_INDEX] != 0) || (moveVector[COL_INDEX] == 0 && moveVector[ROW_INDEX] != 0)) // one is zero and not the other
    )) {
        throw new Error(`Tried to use moveBoard, but moveVector was invalid. moveVector: [${moveVector}]`);
    }

    // How we will move through the board
    const wrapVector: Vector = getWrapVector(moveVector);
    const parseVector: Vector = reverseVector(moveVector);

    let currentSpaceCor: Vector = getStartCor(moveVector);

    // Go through every space on the board
    // End if we leave the board even when we wrap
    while (corIsOnBoard(currentSpaceCor)) {
        const currentValue: number = getBoardValueGivenCor(currentSpaceCor);

        let parsingCor: Vector = addVectors(currentSpaceCor, moveVector);
        
        while (corIsOnBoard(parsingCor) && currentValue != 0) {
            const parsingCorValue = getBoardValueGivenCor(parsingCor);
            const newSpaceIsEmpty = parsingCorValue == 0;
            const newSpaceIsSame = parsingCorValue == currentValue;

            // if we can move to that location
            if (newSpaceIsEmpty || newSpaceIsSame) {
                // Reset the previous space
                setBoardValueGivenCor(addVectors(parsingCor, reverseVector(moveVector)), 0);
                // Add together the previous value and the new one
                setBoardValueGivenCor(parsingCor, currentValue + parsingCorValue);
            }
            else {
                break;
            }

            if (newSpaceIsSame) {
                break;
            }

            // Move to the next parsing coordinate
            parsingCor = addVectors(parsingCor, moveVector);
        }

        // Go to next space
        currentSpaceCor = addVectors(currentSpaceCor, parseVector);
        // if we need to wrap
        if (!corIsOnBoard(currentSpaceCor)) {
            currentSpaceCor = addVectors(currentSpaceCor, wrapVector);
        }
    }

    renderBoard();
}


/**
 * Changes a space given a coordinate and what to change it to.
 * @param cor The coordinate of what will be changed
 * @param newValue The value that that space will be changed to
 */
function setBoardValueGivenCor(cor: Vector, newValue: number): void {
    if (!corIsOnBoard(cor)) {
        throw new Error(`setBoardValueGivenCor was ran with an invalid cor. cor: ${cor}`);
    }
    if (Number.isNaN(newValue)) {
        throw new Error("setBoardValueGivenCor was given a newValue of NaN")
    }
    
    board[cor[ROW_INDEX]][cor[COL_INDEX]] = newValue;
}


/**
 * Gets the value of a space given a coordinate
 * @param cor The coordinate it will check for
 * @returns The value at that coordinate
 */
function getBoardValueGivenCor(cor: Vector): number {
    if (!corIsOnBoard(cor)) {
        throw new Error(`getBoardValueGivenCor was given a cor that is off the board. cor: ${cor}`);
    }

    return board[cor[ROW_INDEX]][cor[COL_INDEX]];
}


function corIsOnBoard(cor: Vector) {
    return (
        0 <= cor[ROW_INDEX] && cor[ROW_INDEX] < board.length &&
        0 <= cor[COL_INDEX] && cor[COL_INDEX] < board[0].length
    );
}


/**
 * Adds two vectors together.
 * @param vector1 The first vector
 * @param vector2 The second vector
 * @returns The sum of the vectors
 */
function addVectors(vector1: Vector, vector2: Vector): Vector {
    return [vector1[ROW_INDEX] + vector2[ROW_INDEX], vector1[COL_INDEX] + vector2[COL_INDEX]];
}


/**
 * Checks if two vectors are equal
 * @param vector1 The first vector
 * @param vector2 The second vector
 * @returns If the two vectors are equal
 */
function vectorsAreEqual(vector1: Vector, vector2: Vector): boolean {
    return (vector1[ROW_INDEX] == vector2[ROW_INDEX] && vector1[COL_INDEX] == vector2[COL_INDEX]);
}


/**
 * Gets the opposite of a vector
 * @param vector A vector that will be reversed
 * @returns The reversed vector
 */
function reverseVector(vector: Vector): Vector {
    return [vector[0] * -1, vector[1] * -1];
}


/**
 * Gets the coordinate that the moveBoard function starts at.
 * @param moveVector The direction to move the pieces on the board. Format: (row, column)
 * @returns The coordinate that the moveBoard function starts at.
 */
function getStartCor(moveVector: Vector): Vector {
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
function getWrapVector(moveVector: Vector): Vector {
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
        throw new Error (`getWrapVector was given an invalid vector. Vector: ${moveVector}`);
    }
}


init();