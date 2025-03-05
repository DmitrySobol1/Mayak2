// Прод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
// const username = window.Telegram.WebApp.initDataUnsafe.user.username

// тесты
const tlgid = 777
const username = 'my777name'

// const dstart = localStorage.getItem('dstart')
// const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre')
const choosedEvent  = localStorage.getItem('choosedEvent')
const choosedSpectaclePlace  = localStorage.getItem('choosedSpectaclePlace')
const choosedTheatreGenreName  = localStorage.getItem('choosedTheatreGenreName')
const choosedName  = localStorage.getItem('choosedName')


const subtitle = document.getElementById('subtitle')
subtitle.textContent =  eventType === 'theatre'? `${choosedTheatreGenreName} в ${choosedName}` : `${choosedName} в ${choosedTheatreGenreName}`


// const subtitle = document.getElementById('subtitle')
// const dstartString = localStorage.getItem('dstartString')
// const dfinishString = localStorage.getItem('dfinishString')
// const subtitleFull = `c ${dstartString} по ${dfinishString}`
// subtitle.textContent = subtitleFull

// let theatreName = ''
// let theatreImg = ''
// let partyName = ''
// let partyImg = ''

// let imgIsChanged = false
let dateOk = false
let timeOk = false

const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='4showSchedule.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='../adminMainMenu.html'
})


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}


// showloader()




// getTheatreOrGenre()

// async function getTheatreOrGenre(){
   

//     const response = await fetch(`https://api.directual.com/good/api/v5/data/3_schedule/getCurrentScheduleForAdminAction?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&item_id=${choosedEvent}`, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         })

//      const json = await response.json()
//      const array  = json.payload

//      console.log(array)

//         const timeString = array[0].timeString
//         const dateString = array[0].dateString
//         // const img = array[0].img

//     //  array.forEach(item =>{
//     //     if (item.id == 'theatre'){
//     //         theatreName = item.name
//     //         theatreImg = item.img
//     //     } else if (item.id == 'party'){
//     //         partyName = item.name
//     //         partyImg = item.img
//     //     }
//     //  })
     
//      renderFront(dateString,timeString)
     
// }

renderFront()



function renderFront(){
    showloader()

    const eventstypediv = document.querySelector('#eventstypediv')


    newDivTheatre = document.createElement('div')
    newDivTheatre.classList.add('getAllEvents2_div')

    // newDivForImgTheatre = document.createElement('div')
    // // newDivForImgTheatre.classList.add('getAllEvents_divForImg')
    // newDivForImgTheatre.classList.add('adminEdit_divForImg')
    
    // newImgTheatre =  document.createElement('img')
    // newImgTheatre.src = img
    // newImgTheatre.classList.add('getAllEvents_img')
    // newImgTheatre.id = 'preview'

    inputDate = document.createElement('input')
    inputDate.id = 'inputDate'
    // inputDate.value = ''
    inputDate.type = 'text'
    inputDate.required = true
    inputDate.classList.add('admin_input')
    inputDate.placeholder = 'укажите дату в формате 01.01.2025'

    // inputDate.addEventListener('input',()=>{
    //     if (inputDate.value != ''){
    //         show_DivSaveCancellBtn()
    //     } else {
    //         hide_DivSaveCancellBtn()
    //     }
    // })


    inputDate.addEventListener('input', function () {
        const isValid = isValidDate(this.value);
      
        if (isValid) {
        //   errorMessage.style.display = 'none';
         
          dateOk = true
          console.log (dateOk)
          show_DivSaveCancellBtn()
        
        } else {
        //   errorMessage.style.display = 'block';
        dateOk = false
          console.log (dateOk)
        //   console.log ('не ok')
        }
      });




    inputTime = document.createElement('input')
    inputTime.id = 'inputTime'
    // inputTime.value = timeString
    inputTime.type = 'text'
    inputTime.required = true
    inputTime.classList.add('admin_input')
    inputTime.placeholder = 'укажите время в формате 19:00'

    // inputTime.addEventListener('input',()=>{
    //     if (inputTime.value != ''){
    //         show_DivSaveCancellBtn()
    //     } else {
    //         hide_DivSaveCancellBtn()
    //     }
    // })


    inputTime.addEventListener('input', function () {
        const isValid = isValidTime(this.value);
      
        if (isValid) {
            timeOk = true
            console.log (timeOk)
            show_DivSaveCancellBtn()
        } else {
            timeOk = false
            console.log (timeOk)
        }
      });



    newDivTheatre.appendChild(inputDate)
    newDivTheatre.appendChild(inputTime)
   
    eventstypediv.appendChild(newDivTheatre)
   
    hideloader()
}



// const adminEdit_btnCnl = document.getElementById('adminEdit_btnCnl').addEventListener('click',()=>{
//     location.reload();
// })


const adminEdit_btnSave = document.getElementById ('adminEdit_btnSave').addEventListener('click',async function() {

    if (dateOk==false || timeOk==false) {
        // console.log('укажите верно')
        // const successText = document.getElementById('successText')
        // successText.textContent =  'Введи дату и время корректно!'
        // setTimeout(()=>successText.textContent = '',1500)

        const div_successText = document.getElementById('div_successText')
        const successText = document.getElementById('successText')
        successText.textContent = 'Введи дату и время корректно!'
        div_successText.style.display = 'flex'
 
        setTimeout(()=>{
            div_successText.style.display = 'none'
        },2000)



    } else {

        const inputDate = document.getElementById('inputDate').value
        const inputTime = document.getElementById('inputTime').value
    
        const [day, month, year] = inputDate.split('.').map(Number);
        const [hours, minutes] = inputTime.split(':').map(Number);
        const date = new Date(year, month - 1, day, hours, minutes);
        const unixTime = Math.floor(date.getTime() / 1000);



    
        
            showSaveLoader()
    
            const response = await fetch('https://api.directual.com/good/api/v5/data/authorrqsttoeditobjects/authorCreateSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
                method: 'POST',
                body: JSON.stringify({
                    'dateString':inputDate,
                    'timeString':inputTime,
                    'whatIsChanged': 'createSchedule',
                    'newImg_id': 'no',
                    'theatreOrGenre_id': choosedEvent,
                    'unix':unixTime,
                    'spectacleOrPlace_id':choosedSpectaclePlace,
                    'eventType_id':eventType,
                    'creator_id':tlgid
                    
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                })
    
                const json = response.json();
                hideSaveLoader();

                setTimeout(()=>{
                  window.location.href='4showSchedule.html'
              },2000)

    
    }
   
    
    
    
    
  
})




function show_DivSaveCancellBtn(){
      const DivSaveCancellBtn = document.getElementById('DivSaveCancellBtn')
    DivSaveCancellBtn.style.display = 'block'
    
}

function hide_DivSaveCancellBtn(){
    const DivSaveCancellBtn = document.getElementById('DivSaveCancellBtn')
    DivSaveCancellBtn.style.display = 'none'
    
}


function showSaveLoader() {
  const div_successText = document.getElementById('div_successText')
  const successText = document.getElementById('successText')
  successText.textContent = 'сохраняю ...'
  div_successText.style.display = 'flex'

  setTimeout(()=>{
      div_successText.style.display = 'none'
  },2000)
}

function hideSaveLoader() {
  const successText = document.getElementById('successText')
    successText.textContent = 'Успешно сохранено!'
    div_successText.style.display = 'flex'

    setTimeout(()=>{
        div_successText.style.display = 'none'
    },2000)
    
}




function isValidDate(dateString) {
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    
    if (!dateRegex.test(dateString)) return false;
  
    const [day, month, year] = dateString.split('.').map(Number);
    const date = new Date(year, month - 1, day);
  
    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  }
  


  function isValidTime(timeString) {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(timeString);
  }

  