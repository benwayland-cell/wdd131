
const characterCard = {
    name: "Ashi",
    class: "Agent/Hunter",
    level: 5,
    health: 100,
    image: "Ashi.png",
    attacked: function() {
        this.health -= 20;

        if (this.health <= 0) {
            this.health = 0;
            alert("This character has died");
        }
        
        updateCard();
        

    },
    levelUp: function() {
        this.level++;
        updateCard();
    }
};

// Get elements
const cardElement = document.querySelector(".card");
const cardImgElement = cardElement.querySelector(".image");
const cardNameElement = cardElement.querySelector(".name");
const statsElement = cardElement.querySelector(".stats");

// Set up image and name
cardImgElement.src = characterCard.image;
cardImgElement.alt = `Image of ${characterCard.name}`;
cardNameElement.innerHTML = characterCard.name;


function updateCard() {
    statsElement.innerHTML = `
        <p><b>Class:</b> ${characterCard.class}</p>
        <p><b>Level:</b> ${characterCard.level}</p>
        <p><b>Health:</b> ${characterCard.health}</p>
    `
}

updateCard();

document.querySelector(".attackedButton").addEventListener("click", event => {
    characterCard.attacked();
});

document.querySelector(".levelUpButton").addEventListener("click", event => {
    characterCard.levelUp();
});