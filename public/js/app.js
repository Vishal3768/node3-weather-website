console.log("Hello");
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

const weather=document.querySelector('form');;
const searchLocation=document.querySelector('input');
const messageOne=document.querySelector('#message-1');
const messageTwo=document.querySelector('#message-2');

weather.addEventListener('submit',function(e){
    e.preventDefault();
    messageOne.textContent='Loading!!!';
    messageTwo.textContent='';
    const location=searchLocation.value;

    fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error) messageOne.textContent=data.error;
        else{
            messageOne.textContent=data.location;
            messageTwo.textContent=data.forecast;
        }
    })
})
})