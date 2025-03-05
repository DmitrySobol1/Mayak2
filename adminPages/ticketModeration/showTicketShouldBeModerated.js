const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

// const subtitle = document.getElementById('subtitle')
// const dstartString = localStorage.getItem('dstartString')
// const dfinishString = localStorage.getItem('dfinishString')
// const subtitleFull = `c ${dstartString} по ${dfinishString}`
// subtitle.textContent = subtitleFull

// let allTheatres = []
// let theatreEventCounts = []

// // let heartarray = localStorage.getItem('heartarray')
// let heartarray = []
// let manarray = []

// const title = document.querySelector('.title')
// title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`




const btn_back = document.getElementById('btn_back').addEventListener('click', () => {
        window.location.href = '../adminMainMenu.html';
});





const btn_gotomainmenuk = document.getElementById('btn_gotomainmenu').addEventListener('click', () => {
    window.location.href='../adminMainMenu.html'
});




const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}








getInfoAboutTicket()

async function getInfoAboutTicket(){

   const response  = await fetch('https://api.directual.com/good/api/v5/data/rqsttocreatenewticket/adminShowAllRqstToCreateNewTicket?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

        const json = await response.json()
        payload = json.payload

        if (payload.length == 0) {
            const noTicketInfo = document.getElementById('noTicketInfo');
            noTicketInfo.style.display = 'block'
        }


        if (!payload ) {
            console.error('Некорректные данные в payload');
            return;
        }

        payload.forEach((item)=>{

                const schedulediv = document.getElementById('schedulediv');

                
                const newDiv = document.createElement('div');
                newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer'); 
        

                const title = document.createElement('div');
                title.textContent = `${item.schedule_id.dateString} в ${item.schedule_id.timeString}`;
                title.classList.add('ticketModeration_div'); 
                title.classList.add('ticketModeration_title'); 
       
                const description = document.createElement('div');
                description.textContent = `${item.spectacleOrPlace_id.theatreOrGenre_id.name} |  ${item.spectacleOrPlace_id.name}`
                description.classList.add('ticketModeration2_div'); 

                const placeLocation = document.createElement('div');
                placeLocation.textContent = `Расположение мест: ${item.placeLocation}`
                placeLocation.classList.add('ticketModeration_div'); 
                
                const row = document.createElement('div');
                row.textContent = `Ряд: ${item.row} ${'\u00A0\u00A0\u00A0'} Номер места: ${item.placeNumber}`
                row.classList.add('ticketModeration2_div'); 
                
                // const placeNumber = document.createElement('p');
                // placeNumber.textContent = `Номер места: ${item.placeNumber}`
                // placeNumber.classList.add('ShowChoosedEvent_descriptionKassa'); 
                
                const qty = document.createElement('div');
                qty.textContent = `Количество билетов: ${item.qty}`
                qty.classList.add('ticketModeration_div'); 
                
                const pricePerTicket = document.createElement('div');
                pricePerTicket.textContent = `Цена за 1 билет: ${item.pricePerTicket}`
                pricePerTicket.classList.add('ticketModeration2_div'); 
                
                const sellerUsername = document.createElement('div');
                sellerUsername.textContent = `Продавец: @${item.username}`
                sellerUsername.classList.add('ticketModeration2_div'); 
                               

                const btnYes = document.createElement('button');
                btnYes.textContent = 'разместить'
                btnYes.classList.add('ticketModerationBtn_yes');
                btnYes.dataset.uniqueId = item.id



                btnYes.addEventListener('click', async ()=>{
                
                    const uid = event.target.dataset.uniqueId    

                    const resp = await fetch('https://api.directual.com/good/api/v5/data/rqstfromadminticketmoderation/rqstfromAdminTicketModeration?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
                        method: 'POST',
                        // specify id if you want to edit existing objects
                        body: JSON.stringify({
                            'action': 'approve',
                            'rqstToTicket_id': uid
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        })
                        const json = await resp.json()
                        console.log(json)

                        const div_successText = document.getElementById('div_successText')
                        const successText = document.getElementById('successText')
                        successText.textContent = 'Билет одобрен и размещен'
                        div_successText.style.display = 'flex'
                
                        setTimeout(()=>{
                            div_successText.style.display = 'none'
                            window.location.href='showTicketShouldBeModerated.html'
                        },1500)

                })



                
                const btnNo = document.createElement('button');
                btnNo.textContent = 'отклонить'
                btnNo.classList.add('ticketModerationBtn_no'); 
                btnNo.dataset.uniqueId = item.id

                btnNo.addEventListener('click', async ()=>{
                
                    const uid = event.target.dataset.uniqueId    

                    const resp = await fetch('https://api.directual.com/good/api/v5/data/rqstfromadminticketmoderation/rqstfromAdminTicketModeration?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
                        method: 'POST',
                        // specify id if you want to edit existing objects
                        body: JSON.stringify({
                            'action': 'reject',
                            'rqstToTicket_id': uid
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        })
                        const json = await resp.json()
                        console.log(json)

                        const div_successText = document.getElementById('div_successText')
                        const successText = document.getElementById('successText')
                        successText.textContent = 'Билет отклонен'
                        div_successText.style.display = 'flex'
                
                        setTimeout(()=>{
                            div_successText.style.display = 'none'
                            window.location.href='showTicketShouldBeModerated.html'
                        },1500)

                })



                
                // btn.addEventListener('click', ()=>{
                //     localStorage.setItem('choosedSchedule',item.id)
                //     window.location.href = '5ShowCurrentEventTickets.html'
                // })
        
        
                // const iconsdiv = document.createElement('div');
                // iconsdiv.classList.add('ShowChoosedEvent_iconsdiv'); 
       


                // const iconleftdiv = document.createElement('div');
                // iconleftdiv.classList.add('ShowChoosedEvent_iconleftdiv'); 

            
                // const imgheart = document.createElement('img');
                // imgheart.src = 'assets/heart.png'
                // imgheart.id = item.id
                // imgheart.dataset.status = 'no'
                // imgheart.dataset.id = item.id
                // imgheart.classList.add ('ShowChoosedEvent_icon')
                // imgheart.addEventListener('click',(event)=>{
                //     if (imgheart.dataset.status == 'no'){
                //         imgheart.dataset.status = 'yes'
                //         imgheart.src = 'assets/heartpressed.png'
                //         qtyInteresting ++ 
                //         qtyheart.textContent = qtyInteresting
                //         heartarray.push(event.target.dataset.id);
                        
                //         localStorage.setItem('heartarray',heartarray)
                // } else {
                //     imgheart.dataset.status = 'no'
                //     imgheart.src = 'assets/heart.png'
                //     qtyInteresting -- 
                //     qtyheart.textContent = qtyInteresting
                //     heartarray = heartarray.filter(item => item !== event.target.dataset.id);
                    
                //     localStorage.setItem('heartarray',heartarray)
                // }
                // })

                // const qtyheart = document.createElement('span');
                // let qtyInteresting = item.qtyInteresting
                // qtyheart.textContent = qtyInteresting

                // const textheart = document.createElement('span');
                // textheart.textContent = ' - интересно'


            
                // const iconrightdiv = document.createElement('div');
                // iconrightdiv.classList.add('ShowChoosedEvent_iconleftdiv'); 

                // const imgman = document.createElement('img');
                // imgman.src = 'assets/man.png'
                // imgman.id = item.id
                // imgman.dataset.status = 'no'
                // imgman.dataset.id = item.id
                // imgman.classList.add ('ShowChoosedEvent_icon')
                // imgman.addEventListener('click',(event)=>{
                //     if (imgman.dataset.status == 'no'){
                //         imgman.dataset.status = 'yes'
                //         imgman.src = 'assets/manpressed.png'
                //         qtyWantGo ++ 
                //         qtyman.textContent = qtyWantGo
                //         manarray.push(event.target.dataset.id);
                //         console.log(manarray)
                //         localStorage.setItem('manarray',manarray)
                // } else {
                //     imgman.dataset.status = 'no'
                //     imgman.src = 'assets/man.png'
                //     qtyWantGo -- 
                //     qtyman.textContent = qtyWantGo
                //     manarray = manarray.filter(item => item !== event.target.dataset.id);
                //     console.log(manarray)
                //     localStorage.setItem('manarray',manarray)
                // }
                // })
            


                // const qtyman = document.createElement('span');
                // let qtyWantGo = item.qtyWantGo
                // qtyman.textContent = qtyWantGo

                // const textman = document.createElement('span');
                // textman.textContent = ' - идут'




                // iconleftdiv.appendChild(imgheart);
                // iconleftdiv.appendChild(qtyheart);
                // iconleftdiv.appendChild(textheart);


                // iconrightdiv.appendChild(imgman);
                // iconrightdiv.appendChild(qtyman);
                // iconrightdiv.appendChild(textman);

                // iconsdiv.appendChild(iconleftdiv);
                // iconsdiv.appendChild(iconrightdiv);

        
             // Добавляем элементы в newDiv
                newDiv.appendChild(title);
                newDiv.appendChild(description);
                newDiv.appendChild(placeLocation);
                newDiv.appendChild(row);
                // newDiv.appendChild(placeNumber);
                newDiv.appendChild(qty);
                newDiv.appendChild(pricePerTicket);
                newDiv.appendChild(sellerUsername);
                newDiv.appendChild(btnYes);
                newDiv.appendChild(btnNo);
                // newDiv.appendChild(description2);
                // item.ticketsArray_ids ? newDiv.appendChild(btn) : ''
                // newDiv.appendChild(iconsdiv);

                // Добавляем newDiv в infodiv
                schedulediv.appendChild(newDiv);

    })

    hideloader()
}





