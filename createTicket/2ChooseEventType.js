const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = dstartString
subtitle.textContent = subtitleFull

let theatreName = ''
let theatreImg = ''
let partyName = ''
let partyImg = ''


const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='1date.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='../index.html'
})


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}


showloader()


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
showloader()

function getAllSchedule(dstart,dfinish){
    fetch(`https://api.directual.com/good/api/v5/data/3_schedule/getAllSchedule?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}&pageSize=100`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })
        .then(res=>res.json())
        .then (data=>{
                        
            let length = Number(data.payload.length)
                
            if (length > 0){
                // console.log ('есть события')

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
                
                renderFront(qty_theatre,qty_party)

            } else {
                console.log ('нет событий')
                const index_nofound=document.getElementById('index_nofound')
                index_nofound.classList.remove('nonvisible')
                hideloader()
            }

        })
}

function renderFront(qty_theatre,qty_party){
    showloader()

    const eventstypediv = document.querySelector('#eventstypediv')


    newDivTheatre = document.createElement('div')
    newDivTheatre.classList.add('getAllEventsClient_div')

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
    newDivParty.classList.add('getAllEventsClient_div')

    newDivForImgParty = document.createElement('div')
    newDivForImgParty.classList.add('getAllEvents_divForImg')

    newDivPartyScore = document.createElement('div')
    newDivPartyScore.classList.add('getAllEvents_divScore')
    newDivPartyScore.textContent = qty_party
    
    newImgParty= document.createElement('img')
    newImgParty.src = partyImg
    newImgParty.classList.add('getAllEvents_img')

    newPparty = document.createElement('p')
    newPparty.textContent = partyName


    newDivForImgParty.appendChild(newImgParty)
    newDivForImgParty.appendChild(newDivPartyScore)

    newDivParty.appendChild(newDivForImgParty)
    newDivParty.appendChild(newPparty)


    newDivTheatre.addEventListener('click',()=>{

        if (qty_theatre==0){
            const div_successText = document.getElementById('div_successText')
            const successText = document.getElementById('successText')
            successText.textContent = 'На выбранные даты спектаклей не найдено'
            div_successText.style.display = 'flex'
    
            setTimeout(()=>{
                div_successText.style.display = 'none'
            },2000)
        } else {

        localStorage.setItem('eventType','theatre')
        window.location.href = '3ChooseTheatreOrGenre.html'
        }
    })

    newDivParty.addEventListener('click',()=>{

        if (qty_party==0){
            const div_successText = document.getElementById('div_successText')
            const successText = document.getElementById('successText')
            successText.textContent = 'На выбранные даты нет вечеринок'
            div_successText.style.display = 'flex'
    
            setTimeout(()=>{
                div_successText.style.display = 'none'
            },2000)
            } else {
            localStorage.setItem('eventType','party')
            window.location.href = '3ChooseTheatreOrGenre.html'
            }
    })

    eventstypediv.appendChild(newDivTheatre)
    eventstypediv.appendChild(newDivParty)

    hideloader()
    
}










