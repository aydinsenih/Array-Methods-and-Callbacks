import { fifaData } from './fifa.js';

// ⚽️ M  V P ⚽️ //

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 1: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Investigate the data above. Practice accessing data by console.log-ing the following pieces of data note, you may want to filter the data first 😉*/

// //(a) Home Team name for 2014 world cup final
// const final2014 = fifaData.filter(item => item.Year === 2014 && item.Stage === 'Final');
// console.log(final2014[0]["Home Team Name"]);
// //(b) Away Team name for 2014 world cup final
// console.log(final2014[0]["Away Team Name"]);
// //(c) Home Team goals for 2014 world cup final
// console.log(final2014[0]["Home Team Goals"]);
// //(d) Away Team goals for 2014 world cup final
// console.log(final2014[0]["Away Team Goals"]);
// //(e) Winner of 2014 world cup final */
// if(final2014[0]['Home Team Goals'] > final2014[0]['Away Team Goals']){
//     console.log(final2014[0]['Home Team Name']);
// } else {
//     console.log(final2014[0]['Away Team Name']);
// }

/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 2: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */

function getFinals(data) {
   return data.filter(item => item.Stage === "Final");
}

//console.log(getFinals(fifaData));



/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 3: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

function getYears(data, getFinalsCB) {
    return getFinalsCB(data).map(item => item.Year);
}




/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 4: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */ 

function getWinners(data, getFinalsCB) {
    return getFinalsCB(data).map(item => {
        if(item["Home Team Goals"]> item["Away Team Goals"]){
            return item["Home Team Name"];
        } else {
            return item["Away Team Name"];
        }
    })
}




/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 5: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 
Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getWinnersByYear(data, getYearsCB, getWinnersCB) {
    const getYears = getYearsCB(data, getFinals);
    const getWinner = getWinnersCB(data, getFinals);
    return getYears.map((element, index) => {
    return `In ${element}, ${getWinner[index]} won the world cup!`;
    });
}
/* 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀 Task 6: 🚀🚀🚀🚀🚀🚀🚀🚀🚀🚀
Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
   const averageGoals =  data.reduce((accumulator, item) => {
        return item["Home Team Goals"]+item["Away Team Goals"]+accumulator;
   },0) / data.length;
   return averageGoals.toFixed(2);
}






/// 🥅 STRETCH 🥅 ///

/* 💪💪💪💪💪 Stretch 1: 💪💪💪💪💪 
Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, teamInitials) {
    const wins =  getFinals(data).reduce((winCount, currentMatch) => {
        if(currentMatch["Home Team Initials"] === teamInitials && currentMatch["Home Team Goals"] > currentMatch["Away Team Goals"]){
            console.log(currentMatch["Home Team Name"])
            return winCount + 1;
        } else if (currentMatch["Away Team Initials"] === teamInitials && currentMatch["Home Team Goals"] < currentMatch["Away Team Goals"]){
            console.log(currentMatch["Away Team Name"])
            return winCount + 1;
        }
        else{
            return winCount;
        }
    },0);
    return wins;
}
console.log(getCountryWins(fifaData,"TUR"));



/* 💪💪💪💪💪 Stretch 2: 💪💪💪💪💪 
Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(data, getFinalsCB) {
    const goalsArr = getFinalsCB(data).reduce((goalcount, currentMatch) => {
        if(typeof goalcount[currentMatch["Home Team Name"]] !== 'undefined'){
            goalcount[currentMatch["Home Team Name"]] += currentMatch["Home Team Goals"];
        } else {
            goalcount[currentMatch["Home Team Name"]] = currentMatch["Home Team Goals"];
        }
        if(typeof goalcount[currentMatch["Away Team Name"]] !== 'undefined'){
            goalcount[currentMatch["Away Team Name"]] += currentMatch["Away Team Goals"];
        } else {
            goalcount[currentMatch["Away Team Name"]] = currentMatch["Away Team Goals"];
        }
        return goalcount;
    },{});

    return goalsArr;
}

console.log(getGoals(fifaData, getFinals));

/* 💪💪💪💪💪 Stretch 3: 💪💪💪💪💪
Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

}


/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */


/* 🛑🛑🛑🛑🛑 Please do not modify anything below this line 🛑🛑🛑🛑🛑 */
function foo(){
    console.log('its working');
    return 'bar';
}
export default{
    foo,
    getFinals,
    getYears,
    getWinners,
    getWinnersByYear,
    getAverageGoals
}