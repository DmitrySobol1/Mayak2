const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const theatre_id = localStorage.getItem('choosedTheatre')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = `c ${dstartString} по ${dfinishString}`
subtitle.textContent = subtitleFull


let allSpectacles = []

const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='getEventsFilteredByTheatre.html'
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




getSpectaclesAtCurrentTheatre(dstart,dfinish,theatre_id)
    


async function getSpectaclesAtCurrentTheatre(dstart, dfinish,theatre_id) {
    try {
     showloader()

      const response = await fetch(
        `https://api.directual.com/good/api/v5/data/event_theatre_spectacle/getSpectaclesAtCurrentTheatre?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}&theatre_id=${theatre_id}`,
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
      console.log (data.payload)
      allSpectacles = data.payload;
  
      // Создаем объект для подсчета спектаклей
      const counts = allSpectacles.reduce((acc, event) => {
        const spectaclename = event.spectacleName;
        acc[spectaclename] = (acc[spectaclename] || 0) + 1;
        return acc;
      }, {});
  
      // Сохраняем данные в localStorage
      Object.entries(counts).forEach(([spectaclename, count]) => {
        localStorage.setItem(spectaclename, count);
      });
  
    //   Рендерим спектакли
      preparingToRenderSpectacle();

    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  }




function preparingToRenderSpectacle() {
    try {
      // Проверка наличия allSpectacles
      if (!allSpectacles || !Array.isArray(allSpectacles)) {
        throw new Error('allSpectacles должен быть массивом');
      }
  
    const uniqueSpectaclesMap = new Map(
    allSpectacles.map(item => [item.spectacleName, item])
    );
    
    // Преобразуем Map обратно в массив объектов
    const uniqueSpectacles = Array.from(uniqueSpectaclesMap.values());
    
        
    //   Добавляем количество спектаклей в объект 
      renderArray = uniqueSpectacles.map(spectacle => ({
        ...spectacle,
        qty: Number(localStorage.getItem(spectacle.spectacleName)) || 0 // Преобразуем в число
      }));
  


      render()


    } catch (error) {
      console.error('Ошибка при рендеринге спектаклей:', error);
    }
  }





function render() {
    
    const spectaclediv = document.getElementById('spectaclediv');
   
    if (!spectaclediv) {
      console.error('Элемент с id="spectaclediv" не найден');
      return;
    }
  
    // Очищаем контейнер перед добавлением новых элементов (опционально)
    spectaclediv.innerHTML = '';
  
    // Создаем DocumentFragment для оптимизации
    const fragment = document.createDocumentFragment();
  
    // Проходим по массиву и создаем элементы
    renderArray.forEach((item) => {
      const newDiv = document.createElement('div');
      newDiv.classList.add('theatre-item'); // Добавляем класс для стилизации
  
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
      p.textContent = item.spectacleName;
  
      // Добавляем элементы в div
      imgDiv.appendChild(img)
      imgDiv.appendChild(qtyDiv)

      newDiv.appendChild(imgDiv)
      newDiv.appendChild(p);
  
      // Добавляем div в fragment
      fragment.appendChild(newDiv);
    });
  
    // Добавляем fragment в контейнер
    spectaclediv.appendChild(fragment);
    
    hideloader()
}



