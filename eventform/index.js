
const validGuestCodes = [
    "EVENT131"
]

const formElement = document.getElementById("eventForm");
const typeElement = document.getElementById("type");
const codeContainer = document.getElementById("codeContainer");
const codeLabel = codeContainer.querySelector("label");
const codeElement = document.getElementById("code");
const output = document.querySelector("#output");

function updateCodeContainer() {
    const type = typeElement.value;
    
    if (type === "student") {
        // codeContainer.hidden = false;
        codeContainer.style.display = "flex";
        codeLabel.textContent  = "Student I#";
    }
    else if (type === "guest") {
        // codeContainer.hidden = false;
        codeContainer.style.display = "flex";
        codeLabel.textContent  = "Access Code";
    }
    else {
        // codeContainer.hidden = true;
        codeContainer.style.display = "none";
    }
}

typeElement.addEventListener("change", updateCodeContainer);
updateCodeContainer();

// Ensure they choose a date later than the current date
function isPastDate(value) {
    const today = new Date();
    const chosen = new Date(value);
    return chosen < today;
}

// Form submission
formElement.addEventListener("submit", function (event) {
    event.preventDefault();
    output.textContent = "";

    const firstName = formElement.firstName.value.trim();
    const lastName = formElement.lastName.value.trim();
    const email = formElement.email.value.trim();
    const type = formElement.type.value;
    const eventDate = formElement.eventDate.value;
    const code = formElement.code.value.trim();
    
    // Checks if the code is a 9 digit student id
    if (type === "student") {
        if (isNaN(parseFloat(code))) {
            output.textContent = "Student I# can only have numbers";
            return;
        }
        if (code.length != 9) {
            output.textContent = "Student I# must be 9 digits";
            return;
        }
    }

    // Checks if guest access code is valid
    if (type === "guest") {
        if (!validGuestCodes.includes(code)) {
            output.textContent = "Invalid Access Code";
            return;
        }
    }

    // Let the user know if they chose an invalid date
    if (isPastDate(eventDate)) {
        output.textContent = "Please choose a later date.";
        return;
    }

    output.innerHTML = `
    <h2>Ticket Created</h2>
    <p>${firstName} ${lastName}</p>
    <p>Email: ${email}</p>
    <p>Type: ${type}</p>
    <p>Event Date: ${eventDate}</p>
    <p>Code: ${code}</p>
    `;

    formElement.reset();
    updateCodeContainer();
});