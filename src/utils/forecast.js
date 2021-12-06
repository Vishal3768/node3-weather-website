const request=require('request');
const forecast=(latitude,longitude,callback)=>{
    const url=`http://api.weatherstack.com/current?access_key=e69fb7a130a60ac64dc95c9159c15e4c&query=${latitude},${longitude}&units=f`;
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback("Network error",undefined);
        }
        else if(body.error){
            callback('Unable to find location',undefined);
        }
        else{
            //console.log(body.current);
            callback(undefined,`${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is a ${body.current.precip}% chance of raining`);
        }
    })
}
module.exports=forecast;