const choosedSchedule = localStorage.getItem('choosedSchedule')

const eventType = localStorage.getItem('eventType')
const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`




const btn_back = document.getElementById('btn_back').addEventListener('click', () => {
    window.location.href = '4ShowChoosedEvent.html';
});

const btn_gotomainmenuk = document.getElementById('btn_gotomainmenu').addEventListener('click', async () => {
    window.location.href='index.html'
    }
);


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}


render()

async function render (){


    const response = await fetch(`https://api.directual.com/good/api/v5/data/4_tickets/getCurrentEventTickets?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&event_id=${choosedSchedule}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

        const json = await response.json()
        console.log(json)


        const payload = json.payload

if (!payload ) {
    console.error('Некорректные данные в payload');
    return;
}

payload.forEach((item)=>{

        const schedulediv = document.getElementById('schedulediv');

        
        const newDiv = document.createElement('div');
        newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 
        

        const title = document.createElement('p');
        title.textContent = `${item.schedule_id.dateString} в ${item.schedule_id.timeString} | ${choosedEventName}`;
        title.classList.add('scheduleItemContainer_title'); 

       
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
        newDiv.appendChild(description);

        rowMestoDiv.appendChild(row);
        rowMestoDiv.appendChild(mesto);
        newDiv.appendChild(rowMestoDiv);
        
        newDiv.appendChild(qty);
        newDiv.appendChild(price);
        // newDiv.appendChild(interesting);
        newDiv.appendChild(btn);
        
        schedulediv.appendChild(newDiv);

    })

    hideloader()
}


