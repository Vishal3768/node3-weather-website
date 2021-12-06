const request=require('request');

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidmlzaGFsNjM0IiwiYSI6ImNrdzd2a2RmaDA4anQybnMzdDlxMmxvajMifQ.KYwAQDUW3K0oiRmrwd8E7Q'
    request({url,json:true},(error,{body}={})=>{
        if(error) callback('Unable to connect to weather services',undefined);
        else if(body.message || !body.features[0]) callback('Unable to find the location',undefined);
        else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name,
            })
        } 
            
    })
}
module.exports=geocode;