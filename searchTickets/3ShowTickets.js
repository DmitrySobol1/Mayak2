const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const choosedEvent = localStorage.getItem('choosedEvent')
const eventType = localStorage.getItem('eventType')

const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const dfinishString = localStorage.getItem('dfinishString')
const subtitleFull = `c ${dstartString} по ${dfinishString}`
subtitle.textContent = subtitleFull


// const title = document.querySelector('.title')
// title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`



const btn_back = document.getElementById('btn_back').addEventListener('click', async () => {
    window.location.href = '2ticketsGroupedByEventType.html';
});


const btn_gotomainmenuk = document.getElementById('btn_gotomainmenu').addEventListener('click', async () => {
    window.location.href='../index.html'
});


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}



// showInfoAboutSpectacleOrPlce()


// async function showInfoAboutSpectacleOrPlce(){


// const response = await fetch(`https://api.directual.com/good/api/v5/data/2_spectacleorplace/getInfoAboutCurrentSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&item_id=${choosedEvent}`, {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     })

//     const json = await response.json()
    

//     const item=json.payload[0]
//     console.log ('item=',item)


//     const infodiv = document.getElementById('infodiv')


//     const img = document.createElement('img')
//     img.src = item.img
//     img.classList.add('ShowChoosedEvent_img')


//     const description_title = document.createElement('div')
//     description_title.classList.add('ShowChoosedEvent_title')
//     description_title.textContent = 'Описание:'
//     const description = document.createElement('div')
//     description.textContent = item.description
//     description.classList.add('ShowChoosedEvent_text')
    

//     // const subCategory_title = document.createElement('div')
//     // subCategory_title.classList.add('ShowChoosedEvent_title')
//     // subCategory_title.textContent = 'Подкатегория:'
//     // const subCategory = document.createElement('div')
//     // subCategory.textContent = item.subCategory_id.subcategory_name
//     // subCategory.classList.add('ShowChoosedEvent_text')

//     const subCategory_title = document.createElement('div')
//     subCategory_title.classList.add('ShowChoosedEvent_title')
//     subCategory_title.textContent = 'Подкатегория:'
//     const subCategory = document.createElement('div')
//     subCategory.textContent = item.subCategory_id.subcategory_name
//     subCategory.classList.add('ShowChoosedEvent_text')

//     const mainActor_title = document.createElement('div')
//     mainActor_title.classList.add('ShowChoosedEvent_title')
//     mainActor_title.textContent = 'Главные действующие лица:'
//     const mainActor = document.createElement('div')
//     mainActor.textContent = item.main_actor
//     mainActor.classList.add('ShowChoosedEvent_text')

//     const age_title = document.createElement('div')
//     age_title.classList.add('ShowChoosedEvent_title')
//     age_title.textContent = 'Возраст:'
//     const age = document.createElement('div')
//     age.textContent = item.age
//     age.classList.add('ShowChoosedEvent_text')

//     const duration_title = document.createElement('div')
//     duration_title.classList.add('ShowChoosedEvent_title')
//     duration_title.textContent = 'Продолжительность:'
//     const duration = document.createElement('div')
//     duration.textContent = item.duration
//     duration.classList.add('ShowChoosedEvent_text')



    

    
//     infodiv.appendChild(img)
//     infodiv.appendChild(description_title)
//     infodiv.appendChild(description)
//     infodiv.appendChild(subCategory_title)
//     infodiv.appendChild(subCategory)
//     infodiv.appendChild(mainActor_title)
//     infodiv.appendChild(mainActor)
//     infodiv.appendChild(mainActor_title)
//     infodiv.appendChild(mainActor)
//     infodiv.appendChild(age_title)
//     infodiv.appendChild(age)
//     infodiv.appendChild(duration_title)
//     infodiv.appendChild(duration)
    



// }







getTicketsFilteredByEventType()

async function getTicketsFilteredByEventType(){

   const response  = await fetch(`https://api.directual.com/good/api/v5/data/4_tickets/getTicketsFilteredByEventType?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&eventType=${eventType}&dstart=${dstart}&dfinish=${dfinish}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

        const json = await response.json()
        payload = json.payload
        console.log(payload)


        if (!payload ) {
            console.error('Некорректные данные в payload');
            return;
        }

        payload.forEach((item)=>{

            const schedulediv = document.getElementById('schedulediv');
    
            
            const newDiv = document.createElement('div');
            newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 
            
    
            const title = document.createElement('p');
            title.textContent = `${item.schedule_id.dateString} в ${item.schedule_id.timeString} | ${item.spectacleOrPlace_id.name}`;
            title.classList.add('scheduleItemContainer_title'); 
    
           
            const description = document.createElement('p');
            description.textContent = `Расположение мест: ${item.placeLocation}`
            description.classList.add('ShowCurrentEvent_description'); 
    
            
            const rowMestoDiv = document.createElement('div');
            rowMestoDiv.classList.add('ShowCurrentEvent_rowMestoDiv'); 
    
            const row = document.createElement('p');
            row.textContent = `Ряд: ${item.row}`
            row.classList.add('ShowChoosedEvent_description'); 
    
            const mesto = document.createElement('p');
            mesto.textContent = `Место: ${item.placeNumber}`
            mesto.classList.add('ShowChoosedEvent_description'); 
    
            const qty = document.createElement('p');
            qty.textContent = `Количество билетов: ${item.qty}`
            qty.classList.add('ShowChoosedEvent_description'); 
    
            const price = document.createElement('p');
            price.textContent = `Цена за билет: ${item.pricePerTicket}`
            price.classList.add('ShowChoosedEvent_description'); 
    
            // const interesting = document.createElement('p');
            // interesting.textContent = `Интересно: ${item.schedule_id.qtyInteresting}`
            // interesting.classList.add('ShowChoosedEvent_description'); 
    
    
            const btn = document.createElement('button');
            btn.textContent = 'написать продавцу'
            btn.classList.add('ShowCurrentEvent_btn'); 
            btn.addEventListener('click',()=>{
                window.location.href = `https://t.me/${item.sellerUsername}`
            })
    
            
            // const iconsdiv = document.createElement('div');
            // iconsdiv.classList.add('ShowChoosedEvent_iconsdiv'); 
           
    
    
                // const iconleftdiv = document.createElement('div');
                // iconleftdiv.classList.add('ShowChoosedEvent_iconleftdiv'); 
    
                
    //             const imgheart = document.createElement('img');
    //             imgheart.src = 'assets/heart.png'
    //             imgheart.id = item.id
    //             imgheart.dataset.status = 'no'
    //             imgheart.dataset.id = item.id
    //             imgheart.classList.add ('ShowChoosedEvent_icon')
    //             imgheart.addEventListener('click',(event)=>{
    //                 if (imgheart.dataset.status == 'no'){
    //                     imgheart.dataset.status = 'yes'
    //                     imgheart.src = 'assets/heartpressed.png'
    //                     qtyInteresting ++ 
    //                     qtyheart.textContent = qtyInteresting
    //                     heartarray.push(event.target.dataset.id);
    //                     console.log(heartarray)
    //                     // localStorage.setItem('heartarray',heartarray)
    //             } else {
    //                 imgheart.dataset.status = 'no'
    //                 imgheart.src = 'assets/heart.png'
    //                 qtyInteresting -- 
    //                 qtyheart.textContent = qtyInteresting
    //                 heartarray = heartarray.filter(item => item !== event.target.dataset.id);
    //                 console.log(heartarray)
    //                 // localStorage.setItem('heartarray',heartarray)
    //             }
    //             })
    
    //             const qtyheart = document.createElement('span');
    //             let qtyInteresting = item.qtyInteresting
    //             qtyheart.textContent = qtyInteresting
    
    //             const textheart = document.createElement('span');
    //             textheart.textContent = ' - интересно'
    
    
    
                  
                
    //             const iconrightdiv = document.createElement('div');
    //             iconrightdiv.classList.add('ShowChoosedEvent_iconleftdiv'); 
    
    //             const imgman = document.createElement('img');
    //             imgman.src = 'assets/man.png'
    //             imgman.id = item.id
    //             imgman.dataset.status = 'no'
    //             imgman.dataset.id = item.id
    //             imgman.classList.add ('ShowChoosedEvent_icon')
    //             imgman.addEventListener('click',(event)=>{
    //                 if (imgman.dataset.status == 'no'){
    //                     imgman.dataset.status = 'yes'
    //                     imgman.src = 'assets/manpressed.png'
    //                     qtyWantGo ++ 
    //                     qtyman.textContent = qtyWantGo
    //                     manarray.push(event.target.dataset.id);
    //                     console.log(manarray)
    //                     // localStorage.setItem('heartarray',heartarray)
    //             } else {
    //                 imgman.dataset.status = 'no'
    //                 imgman.src = 'assets/man.png'
    //                 qtyWantGo -- 
    //                 qtyman.textContent = qtyWantGo
    //                 manarray = manarray.filter(item => item !== event.target.dataset.id);
    //                 console.log(manarray)
    //                 // localStorage.setItem('heartarray',heartarray)
    //             }
    //             })
               
    
    
    //             const qtyman = document.createElement('span');
    //             let qtyWantGo = item.qtyWantGo
    //             qtyman.textContent = qtyWantGo
    
    //             const textman = document.createElement('span');
    //             textman.textContent = ' - идут'
    
    
    
    
    //         iconleftdiv.appendChild(imgheart);
    //         iconleftdiv.appendChild(qtyheart);
    //         iconleftdiv.appendChild(textheart);
    
    
    //         iconrightdiv.appendChild(imgman);
    //         iconrightdiv.appendChild(qtyman);
    //         iconrightdiv.appendChild(textman);
    
    //         iconsdiv.appendChild(iconleftdiv);
    //         iconsdiv.appendChild(iconrightdiv);
    
            
    //         // Добавляем элементы в newDiv
    
    
            
    
            newDiv.appendChild(title);
            newDiv.appendChild(description);
    
            rowMestoDiv.appendChild(row);
            rowMestoDiv.appendChild(mesto);
            newDiv.appendChild(rowMestoDiv);
            
            newDiv.appendChild(qty);
            newDiv.appendChild(price);
            // newDiv.appendChild(interesting);
            newDiv.appendChild(btn);
            
            // newDiv.appendChild(description2);
            // newDiv.appendChild(interesting);
            // newDiv.appendChild(wantGo);
            // newDiv.appendChild(btn);
            // newDiv.appendChild(iconsdiv);
    
            // Добавляем newDiv в infodiv
    
            schedulediv.appendChild(newDiv);
    
        })
    
        hideloader()
    }





