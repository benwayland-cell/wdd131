
let selectElem = document.querySelector('#theme-select');
let pageContent = document.querySelector('body');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    switch (current) {
        case 'ocean':
            setToOceanTheme();
            break;
        case 'forest':
            setToForestTheme();
            break;
        case 'desert':
            setToDesertTheme();
            break;
        default:
            setToDefaultTheme();
    }
}

function setToOceanTheme() {
    document.body.style.backgroundImage = "url('https://wddbyui.github.io/wdd131/images/ocean.jpg')";
    pageContent.style.fontFamily = "Papyrus, fantasy";
}

function setToForestTheme() {
    document.body.style.backgroundImage = "url('https://wddbyui.github.io/wdd131/images/forest.jpg')";
    pageContent.style.fontFamily = "Impact, sans-serif";
}
          
function setToDesertTheme() {
    document.body.style.backgroundImage = "url('https://wddbyui.github.io/wdd131/images/desert.jpg')";
    pageContent.style.fontFamily = "'Big Caslon', serif";
}

function setToDefaultTheme() {
    document.body.style.backgroundImage = "none";
    pageContent.style.fontFamily = "Georgia, serif";
}
