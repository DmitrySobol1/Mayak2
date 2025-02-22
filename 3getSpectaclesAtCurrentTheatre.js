// const dstart = localStorage.getItem('dstart')
// const dfinish = localStorage.getItem('dfinish')
// const theatre_id = localStorage.getItem('choosedTheatre')
// const choosedTheatreName = localStorage.getItem('choosedTheatreName')

// const title = document.getElementById('title')
// const subtitle = document.getElementById('subtitle')
// const dstartString = localStorage.getItem('dstartString')
// const dfinishString = localStorage.getItem('dfinishString')
// const subtitleFull = `c ${dstartString} по ${dfinishString}`
// title.textContent = `Спектакли в ${choosedTheatreName}`
// subtitle.textContent = subtitleFull


// let allSpectacles = []

// const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
//     window.location.href='getEventsFilteredByTheatre.html'
// })

// const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
//     window.location.href='index.html'
// })


// const loader = document.getElementById('loader_div')

// function showloader() {
//   loader.classList.remove('nonvisible')
// }

// function hideloader() {
//   loader.classList.add('nonvisible')
// }




// getSpectaclesAtCurrentTheatre(dstart,dfinish,theatre_id)
    


// async function getSpectaclesAtCurrentTheatre(dstart, dfinish,theatre_id) {
//     try {
//      showloader()

//       const response = await fetch(
//         `https://api.directual.com/good/api/v5/data/event_theatre_spectacle/getSpectaclesAtCurrentTheatre?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}&theatre_id=${theatre_id}`,
//         {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         }
//       );
  
//       // Проверка ответа
//       if (!response.ok) {
//         throw new Error(`Ошибка HTTP: ${response.status}`);
//       }
  
     
//       const data = await response.json();
//       console.log (data.payload)
//       allSpectacles = data.payload;
  
//       // Создаем объект для подсчета спектаклей
//       const counts = allSpectacles.reduce((acc, event) => {
//         const spectaclename = event.spectacleName;
//         acc[spectaclename] = (acc[spectaclename] || 0) + 1;
//         return acc;
//       }, {});
  
//       // Сохраняем данные в localStorage
//       Object.entries(counts).forEach(([spectaclename, count]) => {
//         localStorage.setItem(spectaclename, count);
//       });
  
//     //   Рендерим спектакли
//       preparingToRenderSpectacle();

//     } catch (error) {
//       console.error('Ошибка при получении данных:', error);
//     }
//   }




// function preparingToRenderSpectacle() {
//     try {
//       // Проверка наличия allSpectacles
//       if (!allSpectacles || !Array.isArray(allSpectacles)) {
//         throw new Error('allSpectacles должен быть массивом');
//       }
  
//     const uniqueSpectaclesMap = new Map(
//     allSpectacles.map(item => [item.spectacleName, item])
//     );
    
//     // Преобразуем Map обратно в массив объектов
//     const uniqueSpectacles = Array.from(uniqueSpectaclesMap.values());
    
        
//     //   Добавляем количество спектаклей в объект 
//       renderArray = uniqueSpectacles.map(spectacle => ({
//         ...spectacle,
//         qty: Number(localStorage.getItem(spectacle.spectacleName)) || 0 // Преобразуем в число
//       }));
  


//       render()


//     } catch (error) {
//       console.error('Ошибка при рендеринге спектаклей:', error);
//     }
//   }





// function render() {
    
//     const spectaclediv = document.getElementById('spectaclediv');
   
//     if (!spectaclediv) {
//       console.error('Элемент с id="spectaclediv" не найден');
//       return;
//     }
  
//     // Очищаем контейнер перед добавлением новых элементов (опционально)
//     spectaclediv.innerHTML = '';
  
//     // Создаем DocumentFragment для оптимизации
//     const fragment = document.createDocumentFragment();
  
//     // Проходим по массиву и создаем элементы
//     renderArray.forEach((item) => {
//       const newDiv = document.createElement('div');
//       newDiv.classList.add('theatre-item'); // Добавляем класс для стилизации
  
//       const imgDiv = document.createElement('div');
//       imgDiv.classList.add('img-div');  

//       const qtyDiv = document.createElement('div');
//       qtyDiv.classList.add('qty-div');
//       qtyDiv.textContent = item.qty ;

//       // Создаем изображение
//       const img = document.createElement('img');
//       img.src = item.img;
//       img.alt = item.name;
//       img.classList.add('getEventsFilteredByTheatre_img');
  
//       // Создаем параграф с названием театра
//       const p = document.createElement('p');
//       p.textContent = item.spectacleName;
  
//       // Добавляем элементы в div
//       imgDiv.appendChild(img)
//       imgDiv.appendChild(qtyDiv)

//       newDiv.appendChild(imgDiv)
//       newDiv.appendChild(p);

//       newDiv.addEventListener('click', () => {
//         localStorage.setItem('choosedSpectacle',item.spectacleName)
//         console.log (item)
//         // window.location.href= 'getSpectaclesAtCurrentTheatre.html'
//     });

  
//       // Добавляем div в fragment
//       fragment.appendChild(newDiv);
//     });
  
//     // Добавляем fragment в контейнер
//     spectaclediv.appendChild(fragment);
    
//     hideloader()
// }






const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre')
const choosedName = localStorage.getItem('choosedName')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = `c ${dstartString} по ${dfinishString}`
subtitle.textContent = subtitleFull

const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? `Спектакли в ${choosedName}` : 'Выберите место'


let allTheatres = []
let renderArray = []

const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='2getEventsFilteredByTheatre.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='index.html'
})


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}


getScheduleGroupByTheatreOrGenre()


async function getScheduleGroupByTheatreOrGenre() {
  try {
  
  
    const response = await fetch(
      `https://api.directual.com/good/api/v5/data/3_schedule/getScheduleGroupBySpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}&theatreOrGenre=${choosedTheatreGenre}&pageSize=100`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Проверка ответа
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
   
    const data = await response.json();
    allTheatres = data.payload;
    // console.log(allTheatres)

    // Создаем объект для подсчета событий по театрам/жанрам
    const theatreEventCounts = allTheatres.reduce((acc, event) => {
      const theatreId = event.spectacleOrPlace_id.id;
      acc[theatreId] = (acc[theatreId] || 0) + 1;
      return acc;
    }, {});

   
    // Сохраняем данные в localStorage
    Object.entries(theatreEventCounts).forEach(([theatreId, count]) => {
      localStorage.setItem(theatreId, count);
    });

    // Рендерим 
    preparingToRenderTheatre();

  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}



function preparingToRenderTheatre() {
    try {
      // Проверка наличия allTheatres
      if (!allTheatres || !Array.isArray(allTheatres)) {
        throw new Error('allTheatres должен быть массивом');
      }
  
      // Создаем массив уникальных театров/жанров
      const uniqueTheatres = [
        ...new Map(
          allTheatres.map(item => [item.spectacleOrPlace_id.id, item.spectacleOrPlace_id])
        ).values()
      ];

      // Добавляем количество событий для каждого театра/жанра
      renderArray = uniqueTheatres.map(theatre => ({
        ...theatre,
        qty: Number(localStorage.getItem(theatre.id)) || 0 // Преобразуем в число
      }));
  
      render()

    } catch (error) {
      console.error('Ошибка при рендеринге театров:', error);
    }
  }



function render() {
    
    const theatrediv = document.getElementById('theatrediv');
   
    if (!theatrediv) {
      console.error('Элемент с id="theatrediv" не найден');
      return;
    }
  
    // Очищаем контейнер перед добавлением новых элементов
    theatrediv.innerHTML = '';
  
    // Создаем DocumentFragment для оптимизации
    const fragment = document.createDocumentFragment();
  
    // Проходим по массиву и создаем элементы
    renderArray.forEach((item) => {
      const newDiv = document.createElement('div')
      newDiv.classList.add('theatre-item'); 
  
      const imgDiv = document.createElement('div');
      imgDiv.classList.add('img-div');  

      const qtyDiv = document.createElement('div');
      qtyDiv.classList.add('qty-div');
      qtyDiv.textContent = item.qty ;

      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;
      img.classList.add('getEventsFilteredByTheatre_img');
  
      const p = document.createElement('p');
      p.textContent = item.name;
  
      imgDiv.appendChild(img)
      imgDiv.appendChild(qtyDiv)

      newDiv.appendChild(imgDiv)
      newDiv.appendChild(p);
      
      newDiv.addEventListener('click', () => {
        localStorage.setItem('choosedTheatreGenre',item.id)
        localStorage.setItem('choosedName',item.name)
        window.location.href= '3getSpectaclesAtCurrentTheatre.html'
    });
      
      // Добавляем div в fragment
      fragment.appendChild(newDiv);
    });
  
    
    // Добавляем fragment в контейнер
    theatrediv.appendChild(fragment);
    
    hideloader()
}



