// Прод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
// const username = window.Telegram.WebApp.initDataUnsafe.user.username

// тесты
const tlgid = 123
const username = 'my777name'



const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

// const subtitle = document.getElementById('subtitle')
// const dstartString = localStorage.getItem('dstartString')
// const dfinishString = localStorage.getItem('dfinishString')
// const subtitleFull = dstartString
// subtitle.textContent = subtitleFull

let allTheatres = []
let theatreEventCounts = []

// let heartarray = localStorage.getItem('heartarray')
let heartarray = []
let manarray = []

// const title = document.querySelector('.title')
// title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`




const btn_back = document.getElementById('btn_back').addEventListener('click', async () => {
    window.location.href = '../doska.html';
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



getMyPublishedTickets()
getMyNotPublishedTickets()



async function getMyPublishedTickets(){

   const response  = await fetch(`https://api.directual.com/good/api/v5/data/4_tickets/showMyTickets?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&uid=${tlgid}`, {
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


        if (payload.length == 0) {

            const noTickets2=document.getElementById('noTickets2')
            noTickets2.classList.remove('nonvisible')
        } else {

            payload.forEach((item)=>{

                const schedulediv = document.getElementById('schedulediv');

                
                const newDiv = document.createElement('div');
                newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 
        

                const title = document.createElement('p');
                title.textContent = `${item.schedule_id.dateString} в ${item.schedule_id.timeString} | ${item.spectacleOrPlace_id.name}`;
                title.classList.add('scheduleItemContainer_title'); 

       
                const placeLocation = document.createElement('p');
                placeLocation.textContent = `Расположение мест: ${item.placeLocation}`
                placeLocation.classList.add('showMyTickets_text'); 

                const row = document.createElement('p');
                row.textContent = `Ряд: ${item.row}`
                row.classList.add('showMyTickets_text'); 

                const placeNumber = document.createElement('p');
                placeNumber.textContent = `Номер места: ${item.placeNumber}`
                placeNumber.classList.add('showMyTickets_text'); 

                const qty = document.createElement('p');
                qty.textContent = `Количество мест: ${item.qty}`
                qty.classList.add('showMyTickets_text'); 

                const price = document.createElement('p');
                price.textContent = `Цена за 1 билет: ${item.pricePerTicket}`
                price.classList.add('showMyTickets_text'); 


                const btn = document.createElement('button');
                btn.textContent = 'удалить билет'
                btn.classList.add('showMyTickets_btnDelete'); 
                btn.addEventListener('click', ()=>{
                    localStorage.setItem('choosedSchedule',item.id)
                    localStorage.setItem('timeString',item.timeString)
                    window.location.href = '6CreateTicket.html'
                })
        
        
             // Добавляем элементы в newDiv
                newDiv.appendChild(title);
                newDiv.appendChild(placeLocation);
                newDiv.appendChild(row);
                newDiv.appendChild(placeNumber);
                newDiv.appendChild(qty);
                newDiv.appendChild(price);
                newDiv.appendChild(btn) 
              
                schedulediv.appendChild(newDiv);

    })
        }

            hideloader()
    
}



async function getMyNotPublishedTickets(){

    const response  = await fetch(`https://api.directual.com/good/api/v5/data/rqsttocreatenewticket/showMyNotPublishedTickets?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&uid=${tlgid}`, {
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


         if (payload.length == 0) {

            const noTickets2=document.getElementById('noTickets2')
            noTickets2.classList.remove('nonvisible')

         } else {
            
            
            payload.forEach((item)=>{
 
                const schedulediv = document.getElementById('schedulediv2');

                
                const newDiv = document.createElement('div');
                newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 
        

                const title = document.createElement('p');
                title.textContent = `${item.schedule_id.dateString} в ${item.schedule_id.timeString} | ${item.spectacleOrPlace_id.name}`;
                title.classList.add('scheduleItemContainer_title'); 

       
                const placeLocation = document.createElement('p');
                placeLocation.textContent = `Расположение мест: ${item.placeLocation}`
                placeLocation.classList.add('showMyTickets_text'); 

                const row = document.createElement('p');
                row.textContent = `Ряд: ${item.row}`
                row.classList.add('showMyTickets_text'); 

                const placeNumber = document.createElement('p');
                placeNumber.textContent = `Номер места: ${item.placeNumber}`
                placeNumber.classList.add('showMyTickets_text'); 

                const qty = document.createElement('p');
                qty.textContent = `Количество мест: ${item.qty}`
                qty.classList.add('showMyTickets_text'); 

                const price = document.createElement('p');
                price.textContent = `Цена за 1 билет: ${item.pricePerTicket}`
                price.classList.add('showMyTickets_text'); 


                const btn = document.createElement('button');
                btn.textContent = 'удалить билет'
                btn.classList.add('showMyTickets_btnDelete'); 
                btn.addEventListener('click', ()=>{
                    localStorage.setItem('choosedSchedule',item.id)
                    localStorage.setItem('timeString',item.timeString)
                    window.location.href = '6CreateTicket.html'
                })
        
        
             // Добавляем элементы в newDiv
                newDiv.appendChild(title);
                newDiv.appendChild(placeLocation);
                newDiv.appendChild(row);
                newDiv.appendChild(placeNumber);
                newDiv.appendChild(qty);
                newDiv.appendChild(price);
                newDiv.appendChild(btn) 
              
                schedulediv.appendChild(newDiv);

    })
        
        }
 
     hideloader()
 }





