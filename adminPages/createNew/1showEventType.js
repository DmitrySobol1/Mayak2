
const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='../adminMainMenu.html'
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


const contextMenu = document.getElementById('context-menu');


getEventImgAndName()

async function getEventImgAndName(){
   

    const response = await fetch('https://api.directual.com/good/api/v5/data/event/getImgAndName?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

     const json = await response.json()
     const array  = json.payload

     array.forEach(item =>{
        if (item.id == 'theatre'){
            theatreName = item.name
            theatreImg = item.img
        } else if (item.id == 'party'){
            partyName = item.name
            partyImg = item.img
        }
     })
     
     renderFront()
     
}





function renderFront(){
    showloader()

    const eventstypediv = document.querySelector('#eventstypediv')


    newDivTheatre = document.createElement('div')
    newDivTheatre.classList.add('getAllEvents_div')

    newDivForImgTheatre = document.createElement('div')
    newDivForImgTheatre.classList.add('getAllEvents_divForImg')
    
    newImgTheatre =  document.createElement('img')
    newImgTheatre.src = theatreImg
    newImgTheatre.classList.add('getAllEvents_img')


    divTextPlusIcon = document.createElement('div')
    divTextPlusIcon.classList.add('admin1showEventType_divTextPlusIcon')

    newPtheatre = document.createElement('div')
    newPtheatre.textContent = theatreName

    iconEdit = document.createElement('div')
    iconEdit.classList.add('iconEdit')
    iconEditPen = document.createElement('img')
    iconEditPen.src = "../../assets/setting.png"
    iconEditPen.classList.add('iconEditPen')
   
   

    iconEdit.addEventListener('click',function(e){
        localStorage.setItem('eventType','theatre')
        
         const links = contextMenu.querySelectorAll('a');
         
         // Устанавливаем новые ссылки
         links[0].href = "2showTheatreOrGenre.html"; // Ссылка для "Открыть"
         links[1].href = "1editEventType.html"; // Ссылка для "Редактировать"

         e.stopPropagation(); 
         contextMenu.style.display = 'block';
         contextMenu.classList.add('visible');
         const rect = iconEdit.getBoundingClientRect();
         const menuWidth = contextMenu.offsetWidth; 

         // Позиционируем меню слева от кнопки
         contextMenu.style.top = `${rect.top + window.scrollY}px`; 
         contextMenu.style.left = `${rect.left + window.scrollX - menuWidth}px`; 

    });


    iconEdit.appendChild(iconEditPen)

    divTextPlusIcon.appendChild(newPtheatre)
    divTextPlusIcon.appendChild(iconEdit)


    newDivForImgTheatre.appendChild(newImgTheatre)

    newDivTheatre.appendChild(newDivForImgTheatre)
    newDivTheatre.appendChild(divTextPlusIcon)
    


    newDivParty = document.createElement('div')
    newDivParty.classList.add('getAllEvents_div')

    newDivForImgParty = document.createElement('div')
    newDivForImgParty.classList.add('getAllEvents_divForImg')
    
    newImgParty =  document.createElement('img')
    newImgParty.src = partyImg
    newImgParty.classList.add('getAllEvents_img')


    divTextPlusIcon2 = document.createElement('div')
    divTextPlusIcon2.classList.add('admin1showEventType_divTextPlusIcon')

    


    newPparty = document.createElement('div')
    newPparty.textContent = partyName

    iconEdit2 = document.createElement('div')
    iconEdit2.classList.add('iconEdit')
    iconEditPen2 = document.createElement('img')
    iconEditPen2.src = "../../assets/setting.png"
    iconEditPen2.classList.add('iconEditPen')

    iconEdit2.appendChild(iconEditPen2)

    iconEdit2.addEventListener('click',function(e){
        localStorage.setItem('eventType','party')
        
         const links = contextMenu.querySelectorAll('a');
         
         // Устанавливаем новые ссылки
         links[0].href = "2showTheatreOrGenre.html"; // Ссылка для "Открыть"
         links[1].href = "1editEventType.html"; // Ссылка для "Редактировать"

         e.stopPropagation(); 
         contextMenu.style.display = 'block';
         contextMenu.classList.add('visible');
         // Позиционируем меню рядом с кнопкой
         const rect = iconEdit2.getBoundingClientRect();
         const menuWidth = contextMenu.offsetWidth; // Ширина меню

        // Позиционируем меню слева от кнопки
        contextMenu.style.top = `${rect.top + window.scrollY}px`; // Оставляем top без изменений
        contextMenu.style.left = `${rect.left + window.scrollX - menuWidth}px`; // Смещаем влево

    });

    divTextPlusIcon2.appendChild(newPparty)
    divTextPlusIcon2.appendChild(iconEdit2)


    newDivForImgParty.appendChild(newImgParty)

    newDivParty.appendChild(newDivForImgParty)
    newDivParty.appendChild(divTextPlusIcon2)




    newDivForImgTheatre.addEventListener('click',()=>{
        localStorage.setItem('eventType','theatre')
        window.location.href = '2showTheatreOrGenre.html'
    })

    newDivForImgParty.addEventListener('click',()=>{
        localStorage.setItem('eventType','party')
        window.location.href = '2showTheatreOrGenre.html'
    })

    eventstypediv.appendChild(newDivTheatre)
    eventstypediv.appendChild(newDivParty)

    hideloader()
    
}



document.addEventListener('click', function (e) {
    if (!contextMenu.contains(e.target)) {
      contextMenu.classList.remove('visible');
      setTimeout(() => {
        contextMenu.style.display = 'none';
      }, 300); 
    }
  });



