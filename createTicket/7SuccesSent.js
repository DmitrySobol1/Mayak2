


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
// const subtitleFull = `${dstartString} в ${timeString}`
// subtitle.textContent = subtitleFull


// const title = document.querySelector('.title')
// title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}


hideloader()


const btn_back = document.getElementById('btn_back').addEventListener('click', async () => {
    window.location.href = '6CreateTicket.html';
});


const btn_gotomainmenuk = document.getElementById('btn_gotomainmenu').addEventListener('click', async () => {
    window.location.href='../index.html'
});



const addOneMoreTicket = document.getElementById('addOneMoreTicket').addEventListener('click', async () => {
    window.location.href = '6CreateTicket.html';
});