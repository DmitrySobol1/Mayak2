const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')

const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? 'Театры' : 'Вечеринки'

const contextMenu = document.getElementById('context-menu');

let allTheatres = []
let renderArray = []

const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='1showEventType.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='mainPage.html'
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

    const response = await fetch(`https://api.directual.com/good/api/v5/data/1_theatreorgenre/showAllTheatreOrGenreFilteredByEventType?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&eventType_id=${eventType}`, {
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
      newDiv.classList.add('theatre-item'); 
  
      const imgDiv = document.createElement('div');
      imgDiv.classList.add('img-div');  

   
      imgDiv.addEventListener('click',()=>{
        localStorage.setItem('choosedEvent',item.id)
        localStorage.setItem('choosedName',item.name)

        window.location.href='3showSpectacleOrPlace.html'
      })


      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;
      img.classList.add('getEventsFilteredByTheatre_img');
  
      divTextPlusIcon = document.createElement('div')
      divTextPlusIcon.classList.add('admin1showEventType_divTextPlusIcon')
  
      newPtheatre = document.createElement('div')
      newPtheatre.textContent = item.name
      newPtheatre.classList.add('createNew')
  
      divTextPlusIcon.appendChild(newPtheatre)

      imgDiv.appendChild(img)
      newDiv.appendChild(imgDiv)
      newDiv.appendChild(divTextPlusIcon)
      
      // Добавляем div в fragment
      fragment.appendChild(newDiv);
    });
  
    
    // Добавляем fragment в контейнер
    theatrediv.appendChild(fragment);
    
    hideloader()
}



document.addEventListener('click', function (e) {
  if (!contextMenu.contains(e.target)) {
    contextMenu.classList.remove('visible');
    setTimeout(() => {
      contextMenu.style.display = 'none';
    }, 300); // Задержка для завершения анимации
  }
});