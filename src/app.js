const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;


const weatherData = require('../utils/weatherData');

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));


app.get('', (req,res) => {
    res.render('../views/weather/index', {
        title: 'weather App',
        path: '/'
    })
})


app.get('/weather',(req,res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
        error: "You must have to enter city name in search box"
        })
    }
    weatherData(address,(error, {temperature,description,location,region,country,weather_icons,feelslike,visibility,wind_speed,humidity,pressure,uv_index,wind_degree,wind_dir}={}) => {
        if(error){
            return res.send({
                error
            })    
        }
        res.send({
            temperature,
            description,
            location,
            region,
            country,
            weather_icons,
            feelslike,
            visibility,
            wind_speed,
            humidity,
            pressure,
            uv_index,
            wind_degree,
            wind_dir
        })
    })
});

app.get('/news', (req,res) => {
    res.render('../views/weather/news', {
        title: 'News',
        path: '/news'
    })
})

app.get('/info', (req,res) => {
    res.render('../views/weather/info', {
        title: 'Info',
        path: '/info'
    })
})

app.get('/support', (req,res) => {
    res.render('../views/weather/support', {
        title: 'Support',
        path: '/support'
    })
})

app.use('*', (req, res) => {
    res.status(404).render('../views/weather/404',{
        title: "Page Not Found",
        path: '/*',
    })
})



app.listen(port);