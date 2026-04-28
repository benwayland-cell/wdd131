

let lists = document.querySelectorAll(".list");
// lists.style.backgroundColor = "#FF0000";
const colors = [
    "red",
    "blue",
    "green",
]

for (let index = 0; index < lists.length; index ++) {
    let list = lists[index];
    let color = colors[index];
    list.style.backgroundColor = color;
    console.log(list);
}

let image = document.querySelector("img");
// image.setAttribute("src", "portrait.png");
image.setAttribute("alt", "Test Alt Text");

let heading = document.querySelector("h1");
heading.textContent = heading.textContent + ", New Text";
heading.style.color = "darkblue";
