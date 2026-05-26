
const words = ['watermelon', 'peach', 'apple', 'tomato', 'grape'];
const students = [
    {last: 'Andrus', first: 'Aaron'},
    {last: 'Masa', first:'Manny'},
    {last: 'Tanda', first: 'Tamanda'}
];

function convert(grade) {
    switch (grade){
        case 'A':
            points = 4;
            break;
        case 'B':
            points = 3;
            break;
        case 'C':
            points = 2;
            break;
        case 'D':
            points = 1;
            break;
        case 'F':
            points = 0;
            break;
        default:
            alert('not a valid grade');
    }
    return points;
}

// 1. Javascript arrays
let names = ["Kleel", "Kween", "Klonzet"]; // Courtesy of a random Fantasy name generator
console.log("Names Array", names);

let nums = [4, 5, 8];
console.log("Numbers array", nums);


// 2. Javascript objects
let student = {
    name : "Bob",
    class : "WDD131",
    grade : "A",
    age : 27,
    testObject : {
        name : "Test Name",
        color : "Blue",
    },
}
console.log("Student", student);

// 3. Array methods

names.forEach((name) => {
    console.log(name);
});

const mapTest = names.map((name) => {
    return name + " LastName";
});
console.log("Map Test", mapTest);

const filterTest = names.filter((name) => {
    return name[0] == "K" && name[1] == "l";
});
console.log("Filter Test", filterTest);


const reduceTest = nums.reduce((total, num) => {
    console.log(total, num);
    return total - num;
}, 0);
console.log("Reduce Test", reduceTest);

console.log("Index Of", names.indexOf("Kween"));

document.querySelector("body").innerHTML = `
    <h1>${student.name}</h1>
    <p>Grade: ${student.grade}</p>
`;