// Прод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const username = window.Telegram.WebApp.initDataUnsafe.user.username

// тесты
// const tlgid = 777
// const username = 'my777name'


const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')
const choosedSchedule = localStorage.getItem('choosedSchedule')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const timeString = localStorage.getItem('timeString')
const subtitleFull = `${dstartString} в ${timeString}`
subtitle.textContent = subtitleFull


const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`


const btn_back = document.getElementById('btn_back').addEventListener('click', async () => {
    window.location.href = '5ChooseSchedule.html';
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


hideloader()


document.getElementById('ticketForm').addEventListener('submit', function(event) {
    
    if (username == undefined) {
        showDeleteNotification() 
    } else {
 
    event.preventDefault();
    createNewTicket()
}
});


async function createNewTicket(){

    const placeLocation = document.getElementById('placeLocation').value;
    const row = document.getElementById('row').value;
    const placeNumber = document.getElementById('placeNumber').value;
    const qty = document.getElementById('qty').value;
    const price = document.getElementById('price').value;

const response = await fetch('https://api.directual.com/good/api/v5/data/rqsttocreatenewticket/rqstToCreateNewTicket?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
    method: 'POST',
    body: JSON.stringify({
        'id': '',
        'spectacleOrPlace_id': choosedEvent,
        'seller_id': tlgid,
        'pricePerTicket': price,
        'qty': qty,
        'placeNumber': placeNumber,
        'row': row,
        'placeLocation': placeLocation,
        'schedule_id': choosedSchedule,
        'isOperated':false,
        'username':username,
        'status':'fab806b0-e853-47b4-909d-a3666ad3b2a1',
        'isActive':true
    }),
    headers: {
        'Content-Type': 'application/json'
    },
    })

    const result  = await response.json()
    console.log (result)

    window.location.href = '7SuccesSent.html'

}


const deleteBtn = document.getElementById('deleteBtn')
      const div_deleteNotification = document.getElementById('div_deleteNotification')
      const deleteContent = document.getElementById('deleteContent')
      const noDelete_btn = document.getElementById('noDelete_btn')
      const yesDelete_btn = document.getElementById('yesDelete_btn')
      const deleteText = document.getElementById('deleteText')
      
      
      function showDeleteNotification() {
        deleteContent.style.top = 0
      }
    
      
      function hideDeleteNotification() {
        deleteContent.style.top = '-400px'
    
        
      }
    
      noDelete_btn.addEventListener('click',()=>{
        hideDeleteNotification()
        
      })
    
    if (username == undefined){
        showDeleteNotification()   
    }

    