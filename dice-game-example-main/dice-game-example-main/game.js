

const rollButton = document.getElementById("rollButton");
const restartButton = document.getElementById("restartButton");

const images = document.querySelectorAll("#gameboard img");
const checkboxes = document.querySelectorAll("#gameboard input")

const rollingGifSrc = "assets/die_rolling.gif";

let rollingDice = false;


rollButton.addEventListener("click", event => {
    if (rollingDice) return;
    rollingDice = true;
    rollDice();
});

function rollDice() {
    images.forEach(image => {
        if (isDieUnlocked(image)){
            image.src = rollingGifSrc;
        }
    });

    setTimeout(stopDice, 2000);
}

function stopDice() {
    rollingDice = false;
    images.forEach(image => {
        if (image.src.includes(rollingGifSrc)) {
            stopDie(image);
        }
    });
}

function stopDie(dieImage) {
    const randNum = Math.ceil(Math.random() * 6);
    dieImage.src = `assets/white_dice_${randNum}.gif`;
}

function isDieUnlocked(dieImage) {
    const unchecked = Array.from(checkboxes)
                    .filter(checkbox => !checkbox.checked);
    
    return unchecked.find(unchecked => unchecked.className === dieImage.className);
}

restartButton.addEventListener("click", event => {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    rollDice();
});