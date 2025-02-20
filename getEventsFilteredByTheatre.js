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



getAllTheatre(dstart,dfinish)
    

// OLD
// function getAllTheatre(dstart,dfinish){
//     fetch(`https://api.directual.com/good/api/v5/data/event_theatre_spectacle/getAllSpectacles?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&dstart=${dstart}&dfinish=${dfinish}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         })
//         .then(res=>res.json())
//         .then (data=>{
            
//             //все события в театрах по дате
//             array_alltheatres = data.payload
          
//             // массив из id всех театров
//             const array_alltheatres_ids=[];
//             array_alltheatres.forEach(function(p){
//                 array_alltheatres_ids.push(p.theatre_id.id)
//             })

           
//            // массив из уникальных id
//            uniqueTheaters = [...new Set(array_alltheatres_ids)];
           

//            //считаем уникальные театры 
//            uniqueTheaters.forEach(function(p){
                
//                 const varName = p;  
//                 const storage = {};            
//                 storage[varName] = 0;     

//                 array_alltheatres.forEach(function(p2){
//                     if (p2.theatre_id.id == p){
//                         storage[varName]++
//                     }              
//                 }) 

//                 localStorage.setItem(varName,storage[varName])
//            })
           
//            renderTheatre()
//         })
// }


async function getAllTheatre(dstart, dfinish) {
    try {
     
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



//OLD
// объекты для рендера
// function  renderTheatre(){
       
//       // создание уникального ключа
//       function createUniqueKey(item) {
//         return `${item.theatre_id.name}`;
//       }
      
//       // Удаляем дубликаты
//       const renderArray = [
//         ...new Map(
//             allTheatres.map(item => [createUniqueKey(item), item.theatre_id])
//         ).values()
//       ];
      
//       renderArray.forEach((item)=>{
//         let qty = localStorage.getItem(item.id)
//         item.qty = qty
//       })

//       console.log(renderArray);
// }
        



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



// function render(){

//     const theatrediv = document.getElementById('getEventsFilteredByTheatre__theatrediv')

//     const length = renderArray.length
   
//     renderArray.forEach ((item)=>{
//         console.log(item)

//         const newDiv = document.createElement('div')
//         newDiv.innerHTML = `
//         <img src = ${item.img}>
//         <p>${item.name}</p>
//         `

//         theatrediv.append(newDiv)

//     })

// }


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
      p.textContent = item.name;
  
      // Добавляем элементы в div
      imgDiv.appendChild(img)
      imgDiv.appendChild(qtyDiv)

      newDiv.appendChild(imgDiv)
      newDiv.appendChild(p);
  
      // Добавляем div в fragment
      fragment.appendChild(newDiv);
    });
  
    // Добавляем fragment в контейнер
    theatrediv.appendChild(fragment);
}



