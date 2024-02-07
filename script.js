const temperatureField = document.querySelector(".temp");
const locationField = document.querySelector(".time_location p");
const dateAndTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const iconField = document.querySelector(".condition img")
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");
const body = document.querySelector("body");
let target = "Lucknow";

window.addEventListener("load", preLoad);
form.addEventListener("submit", searchForLocation);


const fetchResults = async (targetLocation) => {
    let url = `http://api.weatherapi.com/v1/current.json?key=7b84755c6b6a42c9b1982717240702&q=${targetLocation}&aqi=no`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;
    let conditionIcon = data.current.condition.icon; 
    updateDetails(temp, locationName, time, condition, conditionIcon);
}

function updateDetails(temp, locationName, time, condition, conditionIcon){
    let splitDate = time.split(" ")[0];
    let splitTime = time.split(" ")[1];

    let currentDay = getDayName(new Date(splitDate).getDay());

    temperatureField.innerHTML = temp;
    locationField.innerHTML = locationName;
    dateAndTimeField.innerHTML = `${splitDate} ${currentDay} ${splitTime}`;
    conditionField.innerHTML = condition;
    iconField.setAttribute("src", conditionIcon);

}

function searchForLocation(e){
    e.preventDefault();
    target = searchField.value;
    fetchResults(target);
    
}

function preLoad(){
    target = "Lucknow";
    fetchResults(target);
}

function getDayName(number){
    switch (number) {
        case 0:
            return "Sunday";            
            break;
        case 1:
            return "Monday";            
            break;
        case 2:
            return "Tuesday";            
            break;
        case 3:
            return "Wednesday";            
            break;
        case 4:
            return "Thursday";            
            break;
        case 5:
            return "Friday";            
            break;
        case 6:
            return "Saturday";            
            break;
        default:
            break;
    }
}
