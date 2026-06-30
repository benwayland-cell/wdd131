
const hikes = [
  {
    name: "Bechler Falls",
    stub: "bechler_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/bechler-falls.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "3 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 1,
    description:
      "Beautiful short hike in Yellowstone along the Bechler river to Bechler Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead.",
    trailhead: [44.14457, -110.99781]
  },
  {
    name: "Teton Canyon",
    stub: "teton_canyon",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/teton-canyon.jpg",
    imgAlt: "Image of Teton Canyon",
    distance: "3 miles",
    tags: ["Canyon", "Tetons"],
    difficulty: 1,
    description: "Beautiful short (or long) hike through Teton Canyon.",
    directions:
      "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead.",
    trailhead: [43.75567, -110.91521]
  },
  {
    name: "Denanda Falls",
    stub: "denanda_falls",
    imgSrc:
      "https://wdd131.netlify.app/examples/hikes/images/denanda-falls.jpg",
    imgAlt: "Image of Denanda Falls",
    distance: "7 miles",
    tags: ["Caves", "Yellowstone", "Waterfall"],
    difficulty: 3,
    description: "Beautiful hike through Bechler meadows to Denanda Falls",
    directions:
      "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead.",
    trailhead: [44.14974, -111.04564]
  },
  {
    name: "Coffee Pot Rapids",
    stub: "coffee_pot",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/coffee-pot.jpg",
    imgAlt: "Image of Bechler Falls",
    distance: "2.2 miles",
    tags: ["Rafting"],
    difficulty: 1,
    description:
      "Beautiful hike along the Henry's Fork of the Snake River to a set of rapids.",
    directions:
      "Take Highway 20 north to Island Park. Continue almost to Mack's in. From Highway 20, turn west on Flatrock Road for 1 mile then turn off on Coffee Pot Road and travel one-half mile to the campground entrance road. There is a parking lot right outside the campground.",
    trailhead: [44.49035, -111.36619]
  },
  {
    name: "Menan Butte",
    stub: "menan_butte",
    imgSrc: "https://wdd131.netlify.app/examples/hikes/images/menan-butte.jpg",
    imgAlt: "Image of Menan Butte",
    distance: "3.4 miles",
    tags: ["Volcanic", "View"],
    difficulty: 2,
    description:
      "A steep climb to one of the largest volcanic tuff cones in the world. 3.4 miles is the full loop around the crater, can be shortened.",
    directions:
      "Take Highway 33 West out of Rexburg for about 8 miles. Turn left onto E Butte Road, the right onto Twin Butte road after about a mile. Follow that road for about 3 miles. You will see the parking lot/trailhead on the left.",
    trailhead: [43.78555, -111.98996]
  }
];

const searchInput = document.getElementById("search");
const hikeContainer = document.getElementById("hike-container");

/*
    Templates
*/

function tagTemplate(tags) {
    return tags.map((tag)=> `<button>${tag}</button>`).join(' ');
}

function difficultyTemplate(rating) {
		let html = `<span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5"
>  Difficulty: `
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        html += `<span aria-hidden="true" class="icon-boot"> 🥾</span>`
      } else {
        html += `<span aria-hidden="true" class="icon-empty">▫️</span>`
      }			
    }
    html += `</span>`
    return html
}

function hikesTemplate(hike) {
    return `<div class="hike-card">
  <div class="hike-content">
    <h2>${hike.name}</h2>
    <div class="hike-tags">
      ${tagTemplate(hike.tags)}
    </div>
    <p>${hike.description}</p>
    <p>${difficultyTemplate(hike.difficulty)}</p>
  </div>
</div>`
}

/*
    Rendering
*/
function renderHikes(hikes) {
  hikeContainer.innerHTML = "";

  hikes.forEach(hike => {
    hikeContainer.innerHTML += hikesTemplate(hike);
  });
}


/*
    Handle events that start the search
*/
document.getElementById("search-button").addEventListener("click", search);

function handleEnter(event) {
  if (event.key === 'Enter') {
    search();
  }
}
searchInput.addEventListener('keypress', handleEnter);


/*
    Search
*/
function search(event) {
  const userInput = searchInput.value.toLowerCase();

  // Filter for hikes that have the userInput in it
  const filteredHikes = hikes.filter(hike => {
    const hikeName = hike.name.toLowerCase();
    const hikeDescription = hike.description.toLowerCase();

    return (hikeName.includes(userInput) || 
            hikeDescription.includes(userInput)
    );
  });

  filteredHikes.sort((a, b) => {
    return a.difficulty - b.difficulty;
  });

  renderHikes(filteredHikes);
}

/*
  Initialization
*/
function init() {
  let randomNum = Math.floor(Math.random() * hikes.length);
  renderHikes([hikes[randomNum]]);
}
init();


// Messing around on Tuesday 

/*
const people = [
    {
        name: "James",
        age: 33,
    },
    {
        name: "Bob",
        age: 12,
    },
    {
        name: "Josh",
        age: 47,
    },
];


let debug = 0

function sortPeopleByName(a, b) {
    debug++;

    let toReturn = sortByObject(a.name.toLowerCase(), b.name.toLowerCase())

    if (toReturn == 0) {
        toReturn = sortByObject(a.age, b.age)
    }

    return toReturn;
}

function sortByObject(a, b) {
    if (a < b) {
        return -1;
    }
    else if (a > b) {
        return 1;
    }
    else {
        return 0;
    }
}

people.sort(sortPeopleByName);
console.log("People:", people);
console.log("Debug:", debug);
*/