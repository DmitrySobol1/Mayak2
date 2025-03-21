// Прод
const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const username = window.Telegram.WebApp.initDataUnsafe.user.username

// тесты
// const tlgid = 777
// const username = 'my777name'


const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedName = localStorage.getItem('choosedName')

const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? `Спектакли в ${choosedName}` : `${choosedName}`

const contextMenu = document.getElementById('context-menu');

let allTheatres = []
let renderArray = []

const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='2showTheatreOrGenre.html'
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

    const response = await fetch(`https://api.directual.com/good/api/v5/data/2_spectacleorplace/getAllSpectaclesOrPlacesFilteredByCurrentTheatreOfGenre?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&choosedEvent=${choosedEvent}`, {
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
        localStorage.setItem('choosedSpectaclePlace',item.id)
        localStorage.setItem('choosedTheatreGenreName',item.name)
        window.location.href='4showSchedule.html'
      })  

      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;
      img.classList.add('getEventsFilteredByTheatre_img');
  
      divTextPlusIcon = document.createElement('div')
      divTextPlusIcon.classList.add('admin1showEventType_divTextPlusIcon')
  
      newPtheatre = document.createElement('div')
      newPtheatre.classList.add('createNew');
      item.creator_id.id == tlgid ? newPtheatre.textContent = `${item.name} (добавлен вами)`: newPtheatre.textContent = item.name
      
      
      
      if (item.creator_id.id == tlgid){
      iconEdit = document.createElement('div')
      iconEdit.classList.add('iconEdit')
      iconEditPen = document.createElement('img')
      iconEditPen.dataset.name = item.name
      iconEditPen.src = "../assets/setting.png"
      iconEditPen.classList.add('iconEditPen')
      iconEditPen.id = item.id
      iconEdit.appendChild(iconEditPen)

      iconEdit.addEventListener('click',function(e){
        localStorage.setItem('choosedTheatreGenre',e.target.id)
        localStorage.setItem('choosedTheatreGenreName',e.target.dataset.name)
        localStorage.setItem('choosedSpectaclePlace',e.target.id)
        

         const links = contextMenu.querySelectorAll('a');
         
         links[0].href = "4showSchedule.html"; // Ссылка для "Открыть"
         links[1].href = "3editSpectacleOrPlace.html"; // Ссылка для "Редактировать"

         e.stopPropagation(); 
         contextMenu.style.display = 'block';
         contextMenu.classList.add('visible');
          const rect = document.getElementById(e.target.id).getBoundingClientRect();

         const menuWidth = contextMenu.offsetWidth; 

         contextMenu.style.top = `${rect.top + window.scrollY}px`; // Оставляем top без изменений
         contextMenu.style.left = `${rect.left + window.scrollX - menuWidth}px`; // Смещаем влево

    });



      }  
      divTextPlusIcon.appendChild(newPtheatre)
      item.creator_id.id == tlgid ? divTextPlusIcon.appendChild(iconEdit) : ''
      

         
      imgDiv.appendChild(img)

      newDiv.appendChild(imgDiv)
      newDiv.appendChild(divTextPlusIcon)
      
      fragment.appendChild(newDiv);
    });
  
    theatrediv.appendChild(fragment);
    
    // hideloader()
    showContent()
}



const addNewItemdiv2=document.getElementById('addNewItemdiv2').addEventListener('click',()=>{
  window.location.href='3createSpectacleOrPlace.html'
})

document.addEventListener('click', function (e) {
    if (!contextMenu.contains(e.target)) {
      contextMenu.classList.remove('visible');
      setTimeout(() => {
        contextMenu.style.display = 'none';
      }, 300); 
    }
  });





  function showContent() {
   
    const images = document.querySelectorAll('img');
    let loadedImages = 0;

    images.forEach(img => {
    if (img.complete) {
        loadedImages++;
    } else {
        img.addEventListener('load', () => {
        loadedImages++;
        if (loadedImages === images.length) {
            // console.log('Все изображения загружены');
            document.getElementById('wrapper').classList.remove('nonvisible')
            // console.log ('loaded')
            hideloader()
        }
        });
    }
    });

    if (loadedImages === images.length) {
    // console.log('Все изображения уже загружены');
    document.getElementById('wrapper').classList.remove('nonvisible')
            // console.log ('loaded')
            hideloader()
    }

}