
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

// the highest a number can go before going to the default color
const MAX_NUMBER_COLOR: number = 2;



// Elements
let boardElement: HTMLElement;
let newGameButton: HTMLElement;
let scoreElement: HTMLElement;


/**
 * What the board is by default
 */
const DEFAULT_BOARD: number[][] = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];


/**
 * The board.
 * 
 * The first index relates to the row (y) and the second relates to the column (x).
 */
let board: number[][];

/**
 * The player's score.
 */
let score: number;


function init(): void {
    initElements();
    initEventListeners();
    resetBoard();
}


/**
 * Inits the HTML elements
 */
function initElements(): void {
    let potentialBoardElement: HTMLElement | null = document.getElementById("board");
    if (potentialBoardElement) {boardElement = potentialBoardElement;}
    else {throw new Error(`"board" does not exist.`)}
    
    let potentialNewGameButton: HTMLElement | null = document.getElementById("newGameButton");
    if (potentialNewGameButton) {newGameButton = potentialNewGameButton;}
    else {throw new Error(`"newGameButton" does not exist.`)}
    
    let potentialScoreElement: HTMLElement | null = document.getElementById("score");
    if (potentialScoreElement) {scoreElement = potentialScoreElement;}
    else {throw new Error(`"score" does not exist.`)}
}


function initEventListeners(): void {
    document.addEventListener("keydown", handleInput);
    newGameButton.addEventListener("click", resetBoard);
}



/**
 * Renders the board onto the website
 */
function renderBoard(): void {
    /**
     * Makes the HTML for the space given its value. 0 will not display.
     * @param value The number the space has
     * @returns The string in HTML form for a single space
     */
    function spaceTemplate(value: number): string {
        if (value == 0) {
            return `<div></div>`
        }

        let color: string = String(value);
        if (value > MAX_NUMBER_COLOR) {
            color = "default-number-color";
        }

        return `<div style="background-color: var(--${color})">${value}</div>`; 
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
 * Resets the board
 */
function resetBoard(): void {
    board = structuredClone(DEFAULT_BOARD);
    randomFillBoard();
    randomFillBoard();
    setScore(0);
    renderBoard();
}


/**
 * Adds to the score (also renders it).
 * @param pointsToAdd The points to add to the score
 */
function addScore(pointsToAdd: number): void {
    setScore(score + pointsToAdd);
}


/**
 * Sets the score to a constant (also renders it).
 * @param newScore The points to set score to
 */
function setScore(newScore: number): void {
    score = newScore;
    scoreElement.innerHTML = `Score: ${score}`;
}



/**
 * Fills the board with random 2s or 4s
 */
function randomFillBoard(): void {
    // Get the coordinates of all empty spaces
    const emptySpaces: Vector[] = getEmptySpaces();

    // Do nothing if there is no empty space
    if (emptySpaces.length == 0) {
        return;
    }

    // Get a random space
    const randomSpace: Vector = emptySpaces[Math.floor(Math.random() * emptySpaces.length)];

    // Get a random value
    let newRandomValue: number = 2;
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
function getEmptySpaces(): Vector[] {
    let emptySpaces: Vector[] = [];

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length; col++) {
            let currentSpace: Vector = [row, col];
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
function lostGame(): boolean {
    if (getEmptySpaces().length != 0) {
        return false;
    }

    /**
     * Checks if you can move that space
     * @param spaceCor The coordinate to check
     * @returns If that space can be moved
     */
    function spaceCanMove(spaceCor: Vector): boolean {
        const spaceCorValue: number = getBoardValueGivenCor(spaceCor);

        // If the space is 0, it can move
        if (spaceCorValue == 0) {
            return true;
        }

        let canMove: boolean = false;
        
        // Check if the space can be moved in each direction
        const directionsToCheck: Vector[] = [UP_VECTOR, DOWN_VECTOR, LEFT_VECTOR, RIGHT_VECTOR];
        directionsToCheck.forEach((direction: Vector) => {
            const checkingCor: Vector = addVectors(spaceCor, direction);
            if (corIsOnBoard(checkingCor)) {
                const checkingCorValue: number = getBoardValueGivenCor(checkingCor);
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
    let movedAPiece: boolean = false;

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
        console.log("Lost Game");
    }
}


function moveSpaceOnBoard(spaceToMove: Vector, moveVector: Vector): boolean {
    let movedAPiece = false
    const currentValue: number = getBoardValueGivenCor(spaceToMove);

    let parsingCor: Vector = addVectors(spaceToMove, moveVector);

    function moveSpace(from: Vector, to: Vector): void {
        const fromValue: number = getBoardValueGivenCor(from);
        const toValue: number = getBoardValueGivenCor(to);

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