/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        
        // create a new div element, which will become the game card
        const game = document.createElement("div");


        // add the class game-card to the list
        game.classList.add("game-card");


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        // Include the game's image and at least 2 of the game's other attributes

        // Make sure to give the image the class game-img.
        // This will make sure the images are displayed correctly.

        // inner HTML example:
        // <img class="game-img" src="./assets/zoo_tycoon.png" alt="Zoo Tycoon">

        // add the inner HTML to the game card
        game.innerHTML += `
            <img class="game-img" src="${games[i].img}" alt="${games[i].name}">
            <h3>${games[i].name}</h3>
            <p>Description: ${games[i].description}</p>
            <p>Pledged: ${games[i].pledged}</p>
            <p>Goal: ${games[i].goal}</p>
            <p>Backers: ${games[i].backers}</p>
        `;


        // append the game to the games-container
        gamesContainer.appendChild(game);
    }

}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
let totalContributions = GAMES_JSON.reduce( (total, item) => {
    return total + item.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()} total contributions`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `$${GAMES_JSON.reduce( (total, item) => {
    return total + item.pledged;
}, 0).toLocaleString()} raised`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `${GAMES_JSON.length}`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let unfundedGames = GAMES_JSON.filter( (item) => {
        return item.pledged < item.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);
    // print length of unfunded games
    //console.log("unfunded games: " + unfundedGames.length);

}
//filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGames = GAMES_JSON.filter( (item) => {
        return item.pledged >= item.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);
    // print length of funded games
    //console.log("funded games: " + fundedGames.length);

}
//filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    let allGames = GAMES_JSON;

    // use the function we previously created to add all games to the DOM
    addGamesToPage(allGames);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
let unfundedGames = GAMES_JSON.filter( (item) => {
    return item.pledged < item.goal;
});


// create a string that explains the number of unfunded games using the ternary operator
let unfundedString = unfundedGames.length === 1 ? "1 game is" : `${unfundedGames.length} games are`;


// create a new DOM element containing the template string and append it to the description container
let description = document.createElement("p");
description.innerHTML = `A total of ${unfundedString} game${unfundedGames.length === 1 ? "" : "s"} unfunded. Help us fund them!`;
descriptionContainer.appendChild(description);

//🔑 Secret key component 2: What is the opening tag of the HTML element you appended your newly created <p> element to? (Use the full opening tag with angle brackets. For example, if the answer was a <p> element, use <p>.)

// Answer: <div id="description-container">

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame] = [...sortedGames];

// create a new element to hold the name of the top pledge game, then append it to the correct element
let firstGameName = document.createElement("h3");
firstGameName.innerHTML = `${firstGame.name}`;
firstGameContainer.appendChild(firstGameName);

// do the same for the runner up item
let secondGameName = document.createElement("h3");
secondGameName.innerHTML = `${secondGame.name}`;
secondGameContainer.appendChild(secondGameName);

/*
Amazing work on the site! You've completed all the technical steps to get Sea Monster Crowdfunding's website up and running with all the required features.

The website is relativley sparse at the moment. Take a momemnt to consider what features you think would help the site stand out more? Take a moment to sketch out some improvements to the site, whether they are to its look and feel or to its functionality. Some examples may include:

What if a user discovers the site and wants to search for a specific game they have heard of?
What if a user wants to use the nav bar at the top of the page to get to the Our Game section quickly?
How would you update the CSS of the site to make it more visually appealing?
*/

// What if a user discovers the site and wants to search for a specific game they have heard of?

// Implement a search bar that allows users to search for a specific game by name
//<div class="search-container">
//<input type="text" id="search-bar" placeholder="Search for a game...">
//<button id="search-btn">Search</button>
//</input></div>
function filterSearch() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    let searchGames = GAMES_JSON.filter( (item) => {
        // begins with
        return item.name.toLowerCase().startsWith(document.getElementById("search-bar").value.toLowerCase());
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(searchGames);
    // print length of unfunded games
    //console.log("unfunded games: " + unfundedGames.length);
}
let searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", filterSearch);

// What if a user wants to use the nav bar at the top of the page to get to the Our Game section quickly?

// Implement a scroll to top button that allows users to quickly get to the top of the page
//<button id="scroll-to-top-btn">Scroll to top</button>
let scrollToTopBtn = document.getElementById("scroll-to-top-btn");
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo(0, 0);
}
);
// animate the scroll to top button
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}
);
