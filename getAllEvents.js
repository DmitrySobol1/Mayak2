const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')

getAllTheatre(dstart,dfinish)
    

function getAllTheatre(dstart,dfinish){
    fetch(`https://api.directual.com/good/api/v5/data/event_theatre_spectacle/getAllSpectacles?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(res=>res.json())
        .then (data=>{
            console.log('найдено театров:',data.payload.length)
        })
}


const tempbtn = document.getElementById('tempbtn').addEventListener('click', ()=>{

    window.location.href='dateinterval.html'

})