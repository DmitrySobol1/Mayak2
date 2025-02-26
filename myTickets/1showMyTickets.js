// Прод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
// const username = window.Telegram.WebApp.initDataUnsafe.user.username

// тесты
const tlgid = 777
const username = 'my777name'

let typeTicket = ''
let ticketId = ''


const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

const popup = document.getElementById("popup");
const openBtn = document.getElementById("openPopup");
const closeBtn = document.querySelector(".close");



// let allTheatres = []
// let theatreEventCounts = []

// // let heartarray = localStorage.getItem('heartarray')
// let heartarray = []
// let manarray = []

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

            const noTickets1=document.getElementById('noTickets1')
            noTickets1.classList.remove('nonvisible')
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
                    popup.style.display = "flex";
                    typeTicket = 'published'
                    ticketId = item.id
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
                    popup.style.display = "flex";
                    typeTicket = 'notpublished'
                    ticketId = item.id
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


 // Закрытие popup при клике вне окна
 popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
    }
});


const yes_btn = document.getElementById('yes');
yes_btn.addEventListener('click', () => {
    
    const first_text = document.getElementById('first_text');
    const second_text = document.getElementById('second_text');
    const ok = document.getElementById('ok');
    const popup_loader = document.getElementById('popup_loader');
    
    yes_btn.classList.add('nonvisible');
    no_btn.classList.add('nonvisible');
    first_text.classList.add('nonvisible');

    popup_loader.style.display='block'

    deleteTicket();
});



const no_btn = document.getElementById('no');
no_btn.addEventListener('click', () => {
    popup.style.display = "none";
});


const ok_btn = document.getElementById('ok');
ok_btn.addEventListener('click', () => {
    popup.style.display = "none";
    location.reload();
});




async function deleteTicket(){

        const response = await fetch('https://api.directual.com/good/api/v5/data/rqsttodeleteticket/rqstToDeleteTicket?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
        method: 'POST',
        
        body: JSON.stringify({
            'id': '',
            'user_id': tlgid,
            'typeTicket': typeTicket,
            'ticket_id': ticketId,
            'isOperated': false
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        })

        const result = await response.json()
        
        const second_text = document.getElementById('second_text');
        const ok = document.getElementById('ok');
        const popup_loader = document.getElementById('popup_loader');
        
        popup_loader.style.display='none'
        second_text.classList.remove('nonvisible');
        ok.classList.remove('nonvisible')

}