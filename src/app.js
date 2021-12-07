const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

console.log(__dirname);
console.log(__filename);

const app=express();
const port=process.env.PORT || 3000;

//define paths for Express config
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
const publicDirectoryPath=path.join(__dirname,'../public');

hbs.registerPartials(partialsPath);

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views',viewsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Vishal Chawla'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Vishal Chawla'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'This is some helpful text',
        title:'Help Page'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'We do not have any address to show weather condition for.'
        })
    }

    const place=req.query.address;
    geocode(place,(error,{latitude,longitude,location}={})=>{

        if(error) return res.send({ error })
        forecast(latitude,longitude,(error,forecastData)=>{

            if(error) return res.send({ error })
            return res.send({
                forecast:forecastData,
                location,
                address:place
            })
        })
    })

    // geocode(place,(error,{latitude,longitude,location}={})=>{
    //     if(error) return res.send({
    //         error:error
    //     });
    //     forecast(latitude,longitude,(error,forecastData)=>{
    //         if(error) return res.send({
    //             error:error
    //         });
    //         res.send({
    //             location:location,
    //             forecast:forecastData
    //         })
    //     })
        
    // })

    // res.send({
    //     forecast:'Sunny Clear day',
    //     //location:'Kolkata, West Bengal, India'
    //     address:req.query.address,
    // });
})
app.get('/help/*', (req, res) => {
    res.render('noHelp', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        name:'Vishal Chawla',
        errorMessage:'Page Not Found'
    })
})
// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express!</h1>');
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'Vishal',
//         age:21
//     });
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>About page</h1>');
// })

app.listen(port,()=>{
    console.log(`Server is up on port ${port}.`);
})
