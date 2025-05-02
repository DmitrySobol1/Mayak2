const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = dstartString
subtitle.textContent = subtitleFull

let allTheatres = []
let theatreEventCounts = []

let heartarray = []
let manarray = []

const title = document.querySelector('.title')
// title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`
title.textContent = `${choosedEventName} в ${choosedName}`;

const btn_back = document.getElementById('btn_back').addEventListener('click', async () => {
    window.location.href = '4ChooseSpectacleOrPlace.html';
});


const btn_gotomainmenuk = document.getElementById('btn_gotomainmenu').addEventListener('click', async () => {
    window.location.href='../index.html'
});


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}



getInfoSchedule()

async function getInfoSchedule(){

   const response  = await fetch(`https://api.directual.com/good/api/v5/data/3_schedule/getCurrentEventSchedule?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&event_id=${choosedEvent}&dstart=${dstart}&dfinish=${dfinish}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

        const json = await response.json()
        payload = json.payload


        if (!payload ) {
            console.error('Некорректные данные в payload');
            return;
        }

        payload.forEach((item)=>{

                const schedulediv = document.getElementById('schedulediv');

                
                const newDiv = document.createElement('div');
                newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 
        

                const title = document.createElement('p');
                title.textContent = `${item.dateString} в ${item.timeString} | ${choosedEventName}`;
                title.classList.add('scheduleItemContainer_title'); 

       
                let ticketsQty = 0
                if (item.ticketsArray_ids){    
                ticketsQty = item.ticketsArray_ids.length
                } 
                const description2 = document.createElement('p');
                description2.textContent = `Предложений по билетам: ${ticketsQty}`
                description2.classList.add('ShowChoosedEvent_description'); 

                const btn = document.createElement('button');
                btn.textContent = 'выбрать'
                btn.classList.add('ShowChoosedEvent_btn'); 
                btn.addEventListener('click', ()=>{
                    localStorage.setItem('choosedSchedule',item.id)
                    localStorage.setItem('timeString',item.timeString)
                    window.location.href = '6CreateTicket.html'
                })
        
        
                const iconsdiv = document.createElement('div');
                iconsdiv.classList.add('ShowChoosedEvent_iconsdiv'); 
       


                const iconleftdiv = document.createElement('div');
                iconleftdiv.classList.add('ShowChoosedEvent_iconleftdiv'); 

            
                const imgheart = document.createElement('img');
                imgheart.src = '../assets/heart.png'
                imgheart.classList.add ('ShowChoosedEvent_icon')

                const qtyheart = document.createElement('span');
                let qtyInteresting = item.qtyInteresting
                qtyheart.textContent = qtyInteresting

                const textheart = document.createElement('span');
                textheart.textContent = ' - интересно'
            
                const iconrightdiv = document.createElement('div');
                iconrightdiv.classList.add('ShowChoosedEvent_iconleftdiv'); 

                const imgman = document.createElement('img');
                imgman.src = '../assets/man.png'
                imgman.dataset.id = item.id
                imgman.classList.add ('ShowChoosedEvent_icon')

                const qtyman = document.createElement('span');
                let qtyWantGo = item.qtyWantGo
                qtyman.textContent = qtyWantGo

                const textman = document.createElement('span');
                textman.textContent = ' - идут'

                iconleftdiv.appendChild(imgheart);
                iconleftdiv.appendChild(qtyheart);
                iconleftdiv.appendChild(textheart);


                iconrightdiv.appendChild(imgman);
                iconrightdiv.appendChild(qtyman);
                iconrightdiv.appendChild(textman);

                iconsdiv.appendChild(iconleftdiv);
                iconsdiv.appendChild(iconrightdiv);

        
                newDiv.appendChild(title);
                newDiv.appendChild(description2);
                newDiv.appendChild(btn) 
                newDiv.appendChild(iconsdiv);

                schedulediv.appendChild(newDiv);

    })

    hideloader()
}





