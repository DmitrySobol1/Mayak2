const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = `c ${dstartString} по ${dfinishString}`
subtitle.textContent = subtitleFull

let theatreName = ''
let theatreImg = ''
let partyName = ''
let partyImg = ''


const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='dateinterval.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='index.html'
})




getEventImgAndName()

async function getEventImgAndName(){
    const response = await fetch('https://api.directual.com/good/api/v5/data/event/getImgAndName?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

     const json = await response.json()
     const array  = json.payload

     array.forEach(item =>{
        if (item.id == 'theatre'){
            theatreName = item.name
            theatreImg = item.img
        } else if (item.id == 'party'){
            partyName = item.name
            partyImg = item.img
        }
     })

}




getAllSchedule(dstart,dfinish)
    

// function getAllTheatre(dstart,dfinish){
//     fetch(`https://api.directual.com/good/api/v5/data/event_theatre_spectacle/getAllSpectacles?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         })
//         .then(res=>res.json())
//         .then (data=>{
//             console.log('найдено театров:',data.payload.length)

//             const getallevents__theatre = document.getElementById('getallevents__theatre')
//             getallevents__theatre.textContent = `В театре найдено событий: ${data.payload.length}`

//         })
// }


function getAllSchedule(dstart,dfinish){
    fetch(`https://api.directual.com/good/api/v5/data/3_schedule/getAllSchedule?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(res=>res.json())
        .then (data=>{
            // console.log('найдено театров:',data.payload.length)
            console.log('найдено театров:',data)

            const array = data.payload
            let qty_theatre = 0
            let qty_party = 0
            let img_theatre = ''
            let name_theatre = ''
            let img_party = ''
            let name_party = ''


            array.forEach((item) => {
                const eventType = item.eventType_id.id.trim().toLowerCase();
                if (eventType === 'theatre') {
                    qty_theatre++;
                   
                } else if (eventType === 'party') {
                    qty_party++;
                   
                } else {
                    console.warn('Неизвестный eventType_id:', item.eventType_id.id);
                }
            });
            
            console.log('Theatre:', qty_theatre, 'Party:', qty_party);

            renderFront(qty_theatre,qty_party)

        })
}

function renderFront(qty_theatre,qty_party){

    const eventstypediv = document.querySelector('#eventstypediv')


    newDivTheatre = document.createElement('div')
    newDivTheatre.classList.add('getAllEvents_div')

    newDivForImgTheatre = document.createElement('div')
    newDivForImgTheatre.classList.add('getAllEvents_divForImg')

    newDivTheatreScore = document.createElement('div')
    newDivTheatreScore.classList.add('getAllEvents_divScore')
    newDivTheatreScore.textContent = qty_theatre
    
    newImgTheatre =  document.createElement('img')
    newImgTheatre.src = theatreImg
    newImgTheatre.classList.add('getAllEvents_img')

    newPtheatre = document.createElement('p')
    newPtheatre.textContent = theatreName


    newDivForImgTheatre.appendChild(newImgTheatre)
    newDivForImgTheatre.appendChild(newDivTheatreScore)

    newDivTheatre.appendChild(newDivForImgTheatre)
    newDivTheatre.appendChild(newPtheatre)


    

    newDivParty = document.createElement('div')
    newDivParty.classList.add('getAllEvents_div')

    newDivForImgParty = document.createElement('div')
    newDivForImgParty.classList.add('getAllEvents_divForImg')

    newDivPartyScore = document.createElement('div')
    newDivPartyScore.classList.add('getAllEvents_divScore')
    newDivPartyScore.textContent = qty_party
    
    newImgParty=  document.createElement('img')
    newImgParty.src = partyImg
    newImgParty.classList.add('getAllEvents_img')

    newPparty = document.createElement('p')
    newPparty.textContent = partyName


    newDivForImgParty.appendChild(newImgParty)
    newDivForImgParty.appendChild(newDivPartyScore)

    newDivParty.appendChild(newDivForImgParty)
    newDivParty.appendChild(newPparty)


    eventstypediv.appendChild(newDivTheatre)
    eventstypediv.appendChild(newDivParty)
}













