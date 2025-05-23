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
title.textContent = eventType === 'theatre'? `Спектакли в ${choosedName}` : `Мероприятия в ${choosedName}`


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

    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`);
    }
   
    const data = await response.json();
    allTheatres = data.payload;

    const theatreEventCounts = allTheatres.reduce((acc, event) => {
      const theatreId = event.spectacleOrPlace_id.id;
      acc[theatreId] = (acc[theatreId] || 0) + 1;
      return acc;
    }, {});

   
    Object.entries(theatreEventCounts).forEach(([theatreId, count]) => {
      localStorage.setItem(theatreId, count);
    });

    preparingToRenderTheatre();

  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
}



function preparingToRenderTheatre() {
    try {
      if (!allTheatres || !Array.isArray(allTheatres)) {
        throw new Error('allTheatres должен быть массивом');
      }
  
      const uniqueTheatres = [
        ...new Map(
          allTheatres.map(item => [item.spectacleOrPlace_id.id, item.spectacleOrPlace_id])
        ).values()
      ];

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
  
    theatrediv.innerHTML = '';
  
    const fragment = document.createDocumentFragment();
  
    renderArray.forEach((item) => {
      const newDiv = document.createElement('div')
      newDiv.classList.add('theatre-itemClient'); 
  
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
        localStorage.setItem('choosedEvent',item.id)
        localStorage.setItem('choosedEventName',item.name)
        window.location.href= '4ShowChoosedEvent.html'
    });
      
      fragment.appendChild(newDiv);
    });
    
    theatrediv.appendChild(fragment);
    
    // hideloader()
    showContent()
}




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
          console.log('Все изображения загружены');
          document.getElementById('wrapper').classList.remove('nonvisible')
          console.log ('loaded')
          hideloader()
      }
      });
  }
  });

  if (loadedImages === images.length) {
  console.log('Все изображения уже загружены');
  document.getElementById('wrapper').classList.remove('nonvisible')
          console.log ('loaded')
          hideloader()
  }

}