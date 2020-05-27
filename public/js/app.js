var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherCondition = document.querySelector('.weatherCondition span');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place span');

const regionElement = document.querySelector('.region span');

const countryElement = document.querySelector('.country span');

const weather_icons = document.querySelector('.icon');

const feelslike = document.querySelector('.feelslike span');

const visibility = document.querySelector('.visibility span');

const wind_speed = document.querySelector('.wind_speed span'); 

const humidity = document.querySelector('.humidity span'); 

const pressure = document.querySelector('.pressure span'); 

const uv_index = document.querySelector('.uv_index span'); 

const wind_degree = document.querySelector('.wind span');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "Septepber", "October", "November", "December"];

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0,3); 


weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    locationElement.textContent = "";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    regionElement.textContent="";
    countryElement.textContent="";
    weather_icons.textContent="loading...";
    feelslike.textContent="";
    visibility.textContent="";
    wind_speed.textContent="";
    humidity.textContent="";
    pressure.textContent="";
    uv_index.textContent="";
    wind_degree.textContent="";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error){
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = ""; 
                regionElement="";
                countryElement="";
                weather_icons="";
                feelslike="";
                visibility="";
                wind_speed="";
                humidity="";
                pressure="";
                uv_index="";
                wind_degree="";
            } else{
                locationElement.textContent = data.location + String.fromCharCode(44);
                tempElement.textContent = data.temperature + String.fromCharCode(176);
                weatherCondition.textContent = data.description;
                regionElement.textContent = data.region + String.fromCharCode(44);
                countryElement.textContent = data.country;
                weather_icons.innerHTML = '<img src="'+ data.weather_icons+'"></img>';
                feelslike.textContent = data.feelslike + String.fromCharCode(176);
                visibility.textContent = data.visibility;
                wind_speed.textContent = data.wind_speed + ' Km/h';
                humidity.textContent = data.humidity;
                pressure.textContent = data.pressure;
                uv_index.textContent = data.uv_index;
                wind_degree.textContent = data.wind_degree + String.fromCharCode(176) + String.fromCharCode(32)+data.wind_dir;
            }
        })
    }) 
})