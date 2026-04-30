
// Get the theme changer
let themeSelect = document.querySelector("#themeSelect");

// Get what will be changed with the theme
let body = document.querySelector("body");
let header = document.querySelector("h1");
let paragraphs = document.querySelectorAll("p");
let listItems = document.querySelectorAll("li");
let logos = document.getElementsByClassName("logo");

// Set up listener
themeSelect.addEventListener('change', changeTheme);

let oldThemeSelectValue = 'light';


function changeTheme() {
    let currentValue = themeSelect.value;

    // Don't change it if it's the same as last time
    if (oldThemeSelectValue == currentValue) return;

    if (currentValue == 'dark') {
        setToDarkTheme();
    }
    else {
        setToLightTheme();
    }

    // store the value for the future
    oldThemeSelectValue = currentValue;
}


function setToLightTheme() {
    setThemeGivenColors("white", "black", "byui-logo-blue.webp")
}


function setToDarkTheme() {
    setThemeGivenColors("black", "white", "byui-logo-white.png")
}


function setThemeGivenColors(backgroundColor, textColor, logoSrc) {
    body.style.backgroundColor = backgroundColor;
    header.style.color = textColor;
    for (let index = 0; index < paragraphs.length; index++) {
        paragraphs[index].style.color = textColor;
    }
    for (let index = 0; index < listItems.length; index++) {
        listItems[index].style.color = textColor;
    }
    for (let index = 0; index < logos.length; index++) {
        logos[index].setAttribute("src", logoSrc);
    }
}
