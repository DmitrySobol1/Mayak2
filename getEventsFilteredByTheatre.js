const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = `c ${dstartString} по ${dfinishString}`
subtitle.textContent = subtitleFull


// let uniqueTheaters = []
// let array = []

let allTheatres = []
let renderArray = []

const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='getAllEvents.html'
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



getAllTheatre(dstart,dfinish)
    

async function getAllTheatre(dstart, dfinish) {
    try {
     showloader()
      const response = await fetch(
        `https://api.directual.com/good/api/v5/data/event_theatre_spectacle/getAllSpectacles?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}`,
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
  
      // Создаем объект для подсчета событий по театрам
      const theatreEventCounts = allTheatres.reduce((acc, event) => {
        const theatreId = event.theatre_id.id;
        acc[theatreId] = (acc[theatreId] || 0) + 1;
        return acc;
      }, {});
  
      // Сохраняем данные в localStorage
      Object.entries(theatreEventCounts).forEach(([theatreId, count]) => {
        localStorage.setItem(theatreId, count);
      });
  
      // Рендерим театры
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
  
      // Создаем массив уникальных театров
      const uniqueTheatres = [
        ...new Map(
          allTheatres.map(item => [item.theatre_id.id, item.theatre_id])
        ).values()
      ];

      console.log(allTheatres)
  
      // Добавляем количество событий для каждого театра
      renderArray = uniqueTheatres.map(theatre => ({
        ...theatre,
        qty: Number(localStorage.getItem(theatre.id)) || 0 // Преобразуем в число
      }));
  
      console.log(renderArray);

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
  
    // Очищаем контейнер перед добавлением новых элементов (опционально)
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

      // Создаем изображение
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = item.name;
      img.classList.add('getEventsFilteredByTheatre_img');
  
      // Создаем параграф с названием театра
      const p = document.createElement('p');
      p.textContent = item.name;
  
      // Добавляем элементы в div
      imgDiv.appendChild(img)
      imgDiv.appendChild(qtyDiv)

      newDiv.appendChild(imgDiv)
      newDiv.appendChild(p);
      
      newDiv.addEventListener('click', () => {
        localStorage.setItem('choosedTheatre',item.id)
        localStorage.setItem('choosedTheatreName',item.name)
        window.location.href= 'getSpectaclesAtCurrentTheatre.html'
    });
      
      // Добавляем div в fragment
      fragment.appendChild(newDiv);
    });
  
    
    // Добавляем fragment в контейнер
    theatrediv.appendChild(fragment);
    
    hideloader()
}



