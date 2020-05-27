const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) =>{
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&access_key=' + constants.openWeatherMap.SECRET_KEY;
    request({url,json:true},(error, {body}) => {
        if(error){
            console.log("can't fetch data from this site");
        } else if(!body.current){
            callback("unable to find temperature for this location",undefined);
        } else{
            callback(undefined,{
                temperature: body.current.temperature,
                description: body.current.weather_descriptions,
                location: body.location.name,
                region: body.location.region,
                country:body.location.country,
                weather_icons:body.current.weather_icons,
                feelslike:body.current.feelslike,
                visibility:body.current.visibility,
                wind_speed:body.current.wind_speed,
                humidity:body.current.humidity,
                pressure:body.current.pressure,
                uv_index:body.current.uv_index,
                wind_degree:body.current.wind_degree,
                wind_dir:body.current.wind_dir,
            })
        }
    })
}

module.exports = weatherData;