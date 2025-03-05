const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const choosedEvent = localStorage.getItem('choosedEvent')
const eventType = localStorage.getItem('eventType')

const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = `c ${dstartString} по ${dfinishString}`
subtitle.textContent = subtitleFull

const btn_back = document.getElementById('btn_back').addEventListener('click', async () => {
    window.location.href = '2ticketsGroupedByEventType.html';
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


getTicketsFilteredByEventType()

async function getTicketsFilteredByEventType(){

   const response  = await fetch(`https://api.directual.com/good/api/v5/data/4_tickets/getTicketsFilteredByEventType?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&eventType=${eventType}&dstart=${dstart}&dfinish=${dfinish}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

        const json = await response.json()
        payload = json.payload
        console.log(payload)


        if (!payload ) {
            console.error('Некорректные данные в payload');
            return;
        }

        payload.forEach((item)=>{

            const schedulediv = document.getElementById('schedulediv');
    
            
            const newDiv = document.createElement('div');
            newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 
            
    
            const title = document.createElement('p');
            title.textContent = `${item.schedule_id.dateString} в ${item.schedule_id.timeString}`;
            title.classList.add('scheduleItemContainer_title'); 

            const title2 = document.createElement('p');
            title2.textContent = `${item.spectacleOrPlace_id.theatreOrGenre_id.name} | ${item.spectacleOrPlace_id.name}`;
            title2.classList.add('scheduleItemContainer_title'); 
    
           
            const description = document.createElement('p');
            description.textContent = `Расположение мест: ${item.placeLocation}`
            description.classList.add('ShowCurrentEvent_description'); 
    
            
            const rowMestoDiv = document.createElement('div');
            rowMestoDiv.classList.add('ShowCurrentEvent_rowMestoDiv'); 
    
            const row = document.createElement('p');
            row.textContent = `Ряд: ${item.row}`
            row.classList.add('ShowChoosedEvent_description'); 
    
            const mesto = document.createElement('p');
            mesto.textContent = `Место: ${item.placeNumber}`
            mesto.classList.add('ShowChoosedEvent_description'); 
    
            const qty = document.createElement('p');
            qty.textContent = `Количество билетов: ${item.qty}`
            qty.classList.add('ShowChoosedEvent_description'); 
    
            const price = document.createElement('p');
            price.textContent = `Цена за билет: ${item.pricePerTicket}`
            price.classList.add('ShowChoosedEvent_description'); 
    
            const btn = document.createElement('button');
            btn.textContent = 'написать продавцу'
            btn.classList.add('ShowCurrentEvent_btn'); 
            btn.addEventListener('click',()=>{
                window.location.href = `https://t.me/${item.sellerUsername}`
            })
    
            
    
            newDiv.appendChild(title);
            newDiv.appendChild(title2);
            newDiv.appendChild(description);
    
            rowMestoDiv.appendChild(row);
            rowMestoDiv.appendChild(mesto);
            newDiv.appendChild(rowMestoDiv);
            
            newDiv.appendChild(qty);
            newDiv.appendChild(price);
            newDiv.appendChild(btn);
    
            schedulediv.appendChild(newDiv);
    
        })
    
        hideloader()
    }





