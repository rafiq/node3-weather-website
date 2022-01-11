const request = require("request");

const forecast = (lat,lon,callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e0fd49fb5da6611de8db8d7478c2cc00&query=${lat},%20${lon}&units=f`;

    request({url,json:true},(err, {body} = {}) => {
        if (err) {
            callback("Unable to connect to network.",undefined);
        } else if (body.error) {
            callback("Please enter correct coordinates",undefined);
        } else {
            callback(undefined,{
                text:`It is currently ${body.current.temperature} degrees fahrenheit with a ${body.current.weather_descriptions[0]} sky. There is a ${body.current.precip}% chance of rain.`,
                temp:body.current.temperature
            } )

        }
    })
}

module.exports = forecast