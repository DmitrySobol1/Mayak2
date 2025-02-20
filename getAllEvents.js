const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')


const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='dateinterval.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='index.html'
})



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

            const getallevents__theatre = document.getElementById('getallevents__theatre')
            getallevents__theatre.textContent = `В театре найдено событий: ${data.payload.length}`

        })
}











