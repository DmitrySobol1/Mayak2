const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = `c ${dstartString} по ${dfinishString}`
subtitle.textContent = subtitleFull

const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`


const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='3getSpectaclesAtCurrentTheatre.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='index.html'
})


getInfoAboutCurrentSpectacleOrPlace()


async function getInfoAboutCurrentSpectacleOrPlace(){

   const response = await fetch(`https://api.directual.com/good/api/v5/data/2_spectacleorplace/getInfoAboutCurrentSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&item_id=${choosedEvent}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },})

        const json = await response.json()
        payload = json.payload[0]

  
        const infodiv = document.getElementById('infodiv');

        // Проверяем, существует ли элемент infodiv
        if (!infodiv) {
            console.error('Элемент с id="infodiv" не найден');
            return;
        }

      
        if (!payload || !payload.img || !payload.name || !payload.description) {
            console.error('Некорректные данные в payload');
            return;
        }

        const newDiv = document.createElement('div');
        newDiv.classList.add('info-container'); // Добавляем класс для стилизации

        // Создаем изображение
        const img = document.createElement('img');
        img.src = payload.img;
        img.alt = payload.name;
        img.classList.add('ShowChoosedEvent_img'); 

        // Создаем заголовок
        const title = document.createElement('p');
        title.textContent = payload.name;
        title.classList.add('ShowChoosedEvent_title'); 

        // Создаем описание
        const description = document.createElement('p');
        description.textContent = payload.description;
        description.classList.add('ShowChoosedEvent_description'); 

        // Добавляем элементы в newDiv
        newDiv.appendChild(img);
        newDiv.appendChild(title);
        newDiv.appendChild(description);

        // Добавляем newDiv в infodiv
        infodiv.appendChild(newDiv);

}



showScheduleOfCurrentSpectacleOrPlace()


async function showScheduleOfCurrentSpectacleOrPlace (){
const response = await fetch(`https://api.directual.com/good/api/v5/data/3_schedule/showScheduleOfCurrentSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}&current_id=${choosedEvent}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    })

    const json = await response.json()
    payload = json.payload

    console.log(payload)

 // Проверяем, существует ли элемент infodiv
 if (!schedulediv) {
    console.error('Элемент с id="schedulediv" не найден');
    return;
}


if (!payload ) {
    console.error('Некорректные данные в payload');
    return;
}

   
payload.forEach((item)=>{


    const schedulediv = document.getElementById('schedulediv');

     

        const newDiv = document.createElement('div');
        newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 

        const title = document.createElement('p');
        title.textContent = `${item.dateString} в ${item.timeString} | ${item.spectacleOrPlace_id.name}`;
        title.classList.add('scheduleItemContainer_title'); 

       
        const description = document.createElement('p');
        description.textContent = 'Места в кассах: нет'
        // description.classList.add('ShowChoosedEvent_description'); 

        
        const description2 = document.createElement('p');
        description2.textContent = 'Предложений по билетам: число'
        description2.classList.add('ShowChoosedEvent_description'); 


        const interesting = document.createElement('p');
        interesting.textContent = 'Интересно: число'
        // interesting.classList.add('ShowChoosedEvent_description'); 

        const wantGo = document.createElement('p');
        wantGo.textContent = 'Собираются пойти: число'
        // wantGo.classList.add('ShowChoosedEvent_description'); 

        // Добавляем элементы в newDiv
        newDiv.appendChild(title);
        newDiv.appendChild(description);
        newDiv.appendChild(description2);
        newDiv.appendChild(interesting);
        newDiv.appendChild(wantGo);

        // Добавляем newDiv в infodiv
        schedulediv.appendChild(newDiv);

    })

}



// function hasVerticalScroll(element) {
//     return element.scrollHeight > element.clientHeight;
// }

// const schedulediv = document.getElementById('schedulediv');

// if (hasVerticalScroll(schedulediv)) {
//     console.log('Контент длиннее экрана! Требуется вертикальный скролл.');
// } else {
//     console.log('Контент помещается на экране.');
// }









// let allTheatres = []
// let renderArray = []

// const loader = document.getElementById('loader_div')

// function showloader() {
//   loader.classList.remove('nonvisible')
// }

// function hideloader() {
//   loader.classList.add('nonvisible')
// }


// getScheduleGroupByTheatreOrGenre()


// async function getScheduleGroupByTheatreOrGenre() {
//   try {
  
  
//     const response = await fetch(
//       `https://api.directual.com/good/api/v5/data/3_schedule/getScheduleGroupBySpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}&theatreOrGenre=${choosedTheatreGenre}&pageSize=100`,
//       {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     // Проверка ответа
//     if (!response.ok) {
//       throw new Error(`Ошибка HTTP: ${response.status}`);
//     }
   
//     const data = await response.json();
//     allTheatres = data.payload;
//     // console.log(allTheatres)

//     // Создаем объект для подсчета событий по театрам/жанрам
//     const theatreEventCounts = allTheatres.reduce((acc, event) => {
//       const theatreId = event.spectacleOrPlace_id.id;
//       acc[theatreId] = (acc[theatreId] || 0) + 1;
//       return acc;
//     }, {});

   
//     // Сохраняем данные в localStorage
//     Object.entries(theatreEventCounts).forEach(([theatreId, count]) => {
//       localStorage.setItem(theatreId, count);
//     });

//     // Рендерим 
//     preparingToRenderTheatre();

//   } catch (error) {
//     console.error('Ошибка при получении данных:', error);
//   }
// }



// function preparingToRenderTheatre() {
//     try {
//       // Проверка наличия allTheatres
//       if (!allTheatres || !Array.isArray(allTheatres)) {
//         throw new Error('allTheatres должен быть массивом');
//       }
  
//       // Создаем массив уникальных театров/жанров
//       const uniqueTheatres = [
//         ...new Map(
//           allTheatres.map(item => [item.spectacleOrPlace_id.id, item.spectacleOrPlace_id])
//         ).values()
//       ];

//       // Добавляем количество событий для каждого театра/жанра
//       renderArray = uniqueTheatres.map(theatre => ({
//         ...theatre,
//         qty: Number(localStorage.getItem(theatre.id)) || 0 // Преобразуем в число
//       }));
  
//       render()

//     } catch (error) {
//       console.error('Ошибка при рендеринге театров:', error);
//     }
//   }



// function render() {
    
//     const theatrediv = document.getElementById('theatrediv');
   
//     if (!theatrediv) {
//       console.error('Элемент с id="theatrediv" не найден');
//       return;
//     }
  
//     // Очищаем контейнер перед добавлением новых элементов
//     theatrediv.innerHTML = '';
  
//     // Создаем DocumentFragment для оптимизации
//     const fragment = document.createDocumentFragment();
  
//     // Проходим по массиву и создаем элементы
//     renderArray.forEach((item) => {
//       const newDiv = document.createElement('div')
//       newDiv.classList.add('theatre-item'); 
  
//       const imgDiv = document.createElement('div');
//       imgDiv.classList.add('img-div');  

//       const qtyDiv = document.createElement('div');
//       qtyDiv.classList.add('qty-div');
//       qtyDiv.textContent = item.qty ;

//       const img = document.createElement('img');
//       img.src = item.img;
//       img.alt = item.name;
//       img.classList.add('getEventsFilteredByTheatre_img');
  
//       const p = document.createElement('p');
//       p.textContent = item.name;
  
//       imgDiv.appendChild(img)
//       imgDiv.appendChild(qtyDiv)

//       newDiv.appendChild(imgDiv)
//       newDiv.appendChild(p);
      
//       newDiv.addEventListener('click', () => {
//         localStorage.setItem('choosedEvent',item.id)
//         localStorage.setItem('choosedEventName',item.name)
//         window.location.href= '4ShowChoosedEvent.html'
//     });
      
//       // Добавляем div в fragment
//       fragment.appendChild(newDiv);
//     });
  
    
//     // Добавляем fragment в контейнер
//     theatrediv.appendChild(fragment);
    
//     hideloader()
// }



