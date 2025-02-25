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
        

    } 

    // Перенаправляем пользователя
    window.location.href='index.html'


    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
});




const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}



getInfo()

async function getInfo(){

   const response  = await fetch(`https://api.directual.com/good/api/v5/data/3_schedule/getCurrentEventSchedule?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&event_id=${choosedEvent}&dstart=${dstart}&dfinish=${dfinish}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

        const json = await response.json()
        payload = json.payload


        if (!payload ) {
            console.error('Некорректные данные в payload');
            return;
        }

        payload.forEach((item)=>{

                const schedulediv = document.getElementById('schedulediv');

                
                const newDiv = document.createElement('div');
                newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 
        

                const title = document.createElement('p');
                title.textContent = `${item.dateString} в ${item.timeString} | ${choosedEventName}`;
                title.classList.add('scheduleItemContainer_title'); 

       
                const description = document.createElement('p');
                description.textContent = 'Места в кассах: нет'
                description.classList.add('ShowChoosedEvent_descriptionKassa'); 

                let ticketsQty = 0
                if (item.ticketsArray_ids){    
                ticketsQty = item.ticketsArray_ids.length
                } 
                const description2 = document.createElement('p');
                description2.textContent = `Предложений по билетам: ${ticketsQty}`
                description2.classList.add('ShowChoosedEvent_description'); 

                const btn = document.createElement('button');
                btn.textContent = 'смотреть предложения'
                btn.classList.add('ShowChoosedEvent_btn'); 
                btn.addEventListener('click', ()=>{
                    localStorage.setItem('choosedSchedule',item.id)
                    window.location.href = '5ShowCurrentEventTickets.html'
                })
        
        
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
                        
                        localStorage.setItem('heartarray',heartarray)
                } else {
                    imgheart.dataset.status = 'no'
                    imgheart.src = 'assets/heart.png'
                    qtyInteresting -- 
                    qtyheart.textContent = qtyInteresting
                    heartarray = heartarray.filter(item => item !== event.target.dataset.id);
                    
                    localStorage.setItem('heartarray',heartarray)
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
                        localStorage.setItem('manarray',manarray)
                } else {
                    imgman.dataset.status = 'no'
                    imgman.src = 'assets/man.png'
                    qtyWantGo -- 
                    qtyman.textContent = qtyWantGo
                    manarray = manarray.filter(item => item !== event.target.dataset.id);
                    console.log(manarray)
                    localStorage.setItem('manarray',manarray)
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
                item.ticketsArray_ids ? newDiv.appendChild(btn) : ''
                newDiv.appendChild(iconsdiv);

                // Добавляем newDiv в infodiv
                schedulediv.appendChild(newDiv);

    })

    hideloader()
}





