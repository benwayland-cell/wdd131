
const aCourse = {
    code: "WDD131",
    name: "Dynamic Web Fundamentals",
    logo: "images/js-logo.png",
    sections: [
        { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, maxEnrolled: 30, days: 'TR', instructor: 'Bro T'},
        { sectionNum: 2, roomNum: 'STC 347', enrolled: 5, maxEnrolled: 30, days: 'TR', instructor: 'Sis A'},
    ],
    enrollStudent: function (sectionNum, changeByNum) {
        const sectionToAddTo = this.sections.find(section => {
            return section.sectionNum == sectionNum;
        });
        if (sectionToAddTo == undefined) {
            return "Invalid Section";
        }
        if (sectionToAddTo.enrolled == sectionToAddTo.maxEnrolled) {
            return "Section Full";
        }
        if (sectionToAddTo.enrolled + changeByNum < 0) {
            return "Section Empty";
        }
        sectionToAddTo.enrolled += changeByNum;
        renderSections(this.sections);
        return "";
    },
};

// Rendering

function sectionTemplate(section) {
    return `<tr>
      <td>${section.sectionNum}</td>
      <td>${section.roomNum}</td>
      <td>${section.enrolled}</td>
      <td>${section.maxEnrolled}</td>
      <td>${section.days}</td>
      <td>${section.instructor}</td></tr>`
}

function renderSections(sections) {
const html = sections.map(sectionTemplate);
document.querySelector("#sections").innerHTML = html.join("");
}

renderSections(aCourse.sections);

// User clicking buttons

const sectionNumElement = document.getElementById("sectionNumber");
const enrollButtonElement = document.getElementById("enrollStudent");
const unenrollButtonElement = document.getElementById("unenrollStudent");
const outputElement = document.getElementById("output");

enrollButtonElement.addEventListener("click", event => {
    const outputText = aCourse.enrollStudent(sectionNumElement.value, 1);
    outputElement.innerHTML = outputText;
});

unenrollButtonElement.addEventListener("click", event => {
    const outputText = aCourse.enrollStudent(sectionNumElement.value, -1);
    outputElement.innerHTML = outputText;
});