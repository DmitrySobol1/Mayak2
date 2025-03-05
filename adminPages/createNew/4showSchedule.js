const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedSpectaclePlace = localStorage.getItem('choosedSpectaclePlace')
const choosedName = localStorage.getItem('choosedName')
const choosedTheatreGenreName = localStorage.getItem('choosedTheatreGenreName')

const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? `${choosedTheatreGenreName} в ${choosedName}` : `${choosedName} в ${choosedTheatreGenreName}`

const contextMenu = document.getElementById('context-menu');

let allTheatres = []
let renderArray = []

const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='3showSpectacleOrPlace.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='../adminMainMenu.html'
})


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}



render()

async function render() {

    const response = await fetch(`https://api.directual.com/good/api/v5/data/3_schedule/getScheduleForAdminAction?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&item_id=${choosedSpectaclePlace}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

        const json = await response.json();
        const renderArray = json.payload
        console.log(renderArray)

    
    const theatrediv = document.getElementById('theatrediv');
   
    if (!theatrediv) {
      console.error('Элемент с id="theatrediv" не найден');
      return;
    }
  
    theatrediv.innerHTML = '';
  
    const fragment = document.createDocumentFragment();
  
    renderArray.forEach((item) => {
      
      const newDiv = document.createElement('div')
      newDiv.classList.add('theatre-item-small'); 
  
      divTextPlusIcon = document.createElement('div')
      divTextPlusIcon.classList.add('admin1showEventType_divTextPlusIcon')
  
      newPtheatre = document.createElement('div')
      newPtheatre.textContent = `${item.dateString} в ${item.timeString}`
  
      iconEdit = document.createElement('div')
      iconEdit.classList.add('iconEdit')
      iconEditPen = document.createElement('img')
      iconEditPen.src = "../../assets/setting.png"
      iconEditPen.classList.add('iconEditPen')
      iconEditPen.id = item.id

      iconEdit.appendChild(iconEditPen)

      divTextPlusIcon.appendChild(newPtheatre)
      divTextPlusIcon.appendChild(iconEdit)

      newDiv.appendChild(divTextPlusIcon)
      
      newDiv.addEventListener('click', () => {
        localStorage.setItem('choosedSchedule',item.id)
        window.location.href= '4editSchedule.html'
    });
      
      // Добавляем div в fragment
      fragment.appendChild(newDiv);
    });
  
    
    // Добавляем fragment в контейнер
    theatrediv.appendChild(fragment);
    
    hideloader()
}


const createNew=document.getElementById('createNew').addEventListener('click', ()=>{
    window.location.href='4createSchedule.html'
})