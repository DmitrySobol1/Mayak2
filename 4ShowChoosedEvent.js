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

let allTheatres = []
let theatreEventCounts = []

// let heartarray = localStorage.getItem('heartarray')
let heartarray = []
let manarray = []

const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`




const btn_back = document.getElementById('btn_back').addEventListener('click', async () => {
    try {

        if (heartarray.length > 0){
        // Выполняем запрос
        const response = await fetch('https://api.directual.com/good/api/v5/data/changeqtyinterestingandqtywantgo/postToChangeQty?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            method: 'POST',
            body: JSON.stringify({
                'id': '', 
                'array': heartarray,
                'type':'heart'
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();
        console.log('отправил heart');
        
    } 

    if (manarray.length > 0){
        // Выполняем запрос
        const response = await fetch('https://api.directual.com/good/api/v5/data/changeqtyinterestingandqtywantgo/postToChangeQty?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            method: 'POST',
            body: JSON.stringify({
                'id': '', 
                'array': manarray,
                'type':'man'
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();
        console.log('отправил man');

    } 

    // Перенаправляем пользователя
    window.location.href = '3getSpectaclesAtCurrentTheatre.html';


    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
});





const btn_gotomainmenuk = document.getElementById('btn_gotomainmenu').addEventListener('click', async () => {
    try {

        if (heartarray.length > 0){
        // Выполняем запрос
        const response = await fetch('https://api.directual.com/good/api/v5/data/changeqtyinterestingandqtywantgo/postToChangeQty?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            method: 'POST',
            body: JSON.stringify({
                'id': '', 
                'array': heartarray,
                'type':'heart'
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();
        console.log('отправил heart');
        
    } 

    if (manarray.length > 0){
        // Выполняем запрос
        const response = await fetch('https://api.directual.com/good/api/v5/data/changeqtyinterestingandqtywantgo/postToChangeQty?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            method: 'POST',
            body: JSON.stringify({
                'id': '', 
                'array': manarray,
                'type':'man'
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const json = await response.json();
        console.log('отправил man');

    } 

    // Перенаправляем пользователя
    window.location.href='index.html'


    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
});















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




getScheduleGroupByTheatreOrGenre()


async function getScheduleGroupByTheatreOrGenre() {
  try {
  
  
    const response = await fetch(
      `https://api.directual.com/good/api/v5/data/4_tickets/getTicketsFilteredByEvent?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&spectacleOrPlace_id=${choosedEvent}`,
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
    console.log(allTheatres)

    // Создаем объект для подсчета событий по театрам/жанрам
    theatreEventCounts = allTheatres.reduce((acc, event) => {
      const theatreId = event.schedule_id.id;
      acc[theatreId] = (acc[theatreId] || 0) + 1;
      return acc;
    }, {});

//    console.log('тута',theatreEventCounts)
   
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
          allTheatres.map(item => [item.schedule_id.id, item.schedule_id])
        ).values()
      ];

      console.log('тута',uniqueTheatres)


      // Добавляем количество событий для каждого театра/жанра
      renderArray = uniqueTheatres.map(theatre => ({
        ...theatre,
        qty: Number(theatreEventCounts[theatre.id]) || 0,
        eventname: choosedEventName
      }));
  
      console.log(renderArray)

      render()

    } catch (error) {
      console.error('Ошибка при рендеринге театров:', error);
    }
  }



function render (){

    payload = renderArray

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
        title.textContent = `${item.dateString} в ${item.timeString} | ${item.eventname}`;
        title.classList.add('scheduleItemContainer_title'); 

       
        const description = document.createElement('p');
        description.textContent = 'Места в кассах: нет'

        
        const description2 = document.createElement('p');
        description2.textContent = `Предложений по билетам: ${item.qty}`
        description2.classList.add('ShowChoosedEvent_description'); 

        const btn = document.createElement('button');
        btn.textContent = 'смотреть предложения'
        btn.classList.add('ShowChoosedEvent_btn'); 

        
        const iconsdiv = document.createElement('div');
        iconsdiv.classList.add('ShowChoosedEvent_iconsdiv'); 
       


            const iconleftdiv = document.createElement('div');
            iconleftdiv.classList.add('ShowChoosedEvent_iconleftdiv'); 

            
            const imgheart = document.createElement('img');
            imgheart.src = 'assets/heart.png'
            imgheart.id = item.id
            imgheart.dataset.status = 'no'
            imgheart.dataset.id = item.id
            imgheart.classList.add ('ShowChoosedEvent_icon')
            imgheart.addEventListener('click',(event)=>{
                if (imgheart.dataset.status == 'no'){
                    imgheart.dataset.status = 'yes'
                    imgheart.src = 'assets/heartpressed.png'
                    qtyInteresting ++ 
                    qtyheart.textContent = qtyInteresting
                    heartarray.push(event.target.dataset.id);
                    console.log(heartarray)
                    // localStorage.setItem('heartarray',heartarray)
            } else {
                imgheart.dataset.status = 'no'
                imgheart.src = 'assets/heart.png'
                qtyInteresting -- 
                qtyheart.textContent = qtyInteresting
                heartarray = heartarray.filter(item => item !== event.target.dataset.id);
                console.log(heartarray)
                // localStorage.setItem('heartarray',heartarray)
            }
            })

            const qtyheart = document.createElement('span');
            let qtyInteresting = item.qtyInteresting
            qtyheart.textContent = qtyInteresting

            const textheart = document.createElement('span');
            textheart.textContent = ' - интересно'



              
            
            const iconrightdiv = document.createElement('div');
            iconrightdiv.classList.add('ShowChoosedEvent_iconleftdiv'); 

            const imgman = document.createElement('img');
            imgman.src = 'assets/man.png'
            imgman.id = item.id
            imgman.dataset.status = 'no'
            imgman.dataset.id = item.id
            imgman.classList.add ('ShowChoosedEvent_icon')
            imgman.addEventListener('click',(event)=>{
                if (imgman.dataset.status == 'no'){
                    imgman.dataset.status = 'yes'
                    imgman.src = 'assets/manpressed.png'
                    qtyWantGo ++ 
                    qtyman.textContent = qtyWantGo
                    manarray.push(event.target.dataset.id);
                    console.log(manarray)
                    // localStorage.setItem('heartarray',heartarray)
            } else {
                imgman.dataset.status = 'no'
                imgman.src = 'assets/man.png'
                qtyWantGo -- 
                qtyman.textContent = qtyWantGo
                manarray = manarray.filter(item => item !== event.target.dataset.id);
                console.log(manarray)
                // localStorage.setItem('heartarray',heartarray)
            }
            })
           


            const qtyman = document.createElement('span');
            let qtyWantGo = item.qtyWantGo
            qtyman.textContent = qtyWantGo

            const textman = document.createElement('span');
            textman.textContent = ' - идут'




        iconleftdiv.appendChild(imgheart);
        iconleftdiv.appendChild(qtyheart);
        iconleftdiv.appendChild(textheart);


        iconrightdiv.appendChild(imgman);
        iconrightdiv.appendChild(qtyman);
        iconrightdiv.appendChild(textman);

        iconsdiv.appendChild(iconleftdiv);
        iconsdiv.appendChild(iconrightdiv);

        
        // Добавляем элементы в newDiv
        newDiv.appendChild(title);
        newDiv.appendChild(description);
        newDiv.appendChild(description2);
        // newDiv.appendChild(interesting);
        // newDiv.appendChild(wantGo);
        newDiv.appendChild(btn);
        newDiv.appendChild(iconsdiv);

        // Добавляем newDiv в infodiv
        schedulediv.appendChild(newDiv);

    })
}


// setIconsValue()

// function setIconsValue(){

  
//     if (heartarray){
//         console.log ("был")
//     // heartarrayToSet = heartarray.split(',')
//     //   document.addEventListener('DOMContentLoaded', () => {
//     //     setTimeout(() => {
//     //         heartarrayToSet.forEach((item) => {
//     //             let curenticon = document.getElementById(item);
//     //             if (curenticon) {
//     //                 curenticon.src = 'assets/heartpressed.png';
//     //                 curenticon.dataset.status= 'yes'
//     //             }
//     //         });
//     //     }, 500); 
//     // });   

// } else {
//     heartarray = [] 
//     console.log ("не было, создал пустой")
// }
   
// }