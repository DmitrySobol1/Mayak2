const eventType = localStorage.getItem('eventType')
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre')
const choosedTheatreGenreName = localStorage.getItem('choosedTheatreGenreName')
const choosedEvent  = localStorage.getItem('choosedEvent')
const choosedName  = localStorage.getItem('choosedName')
const choosedSchedule  = localStorage.getItem('choosedSchedule')


const subtitle = document.getElementById('subtitle')
subtitle.textContent =  eventType === 'theatre'? `${choosedTheatreGenreName} в ${choosedName}` : `${choosedName} в ${choosedTheatreGenreName}`

let dateOk = true
let timeOk = true
let linkOk = true

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


getTheatreOrGenre()

async function getTheatreOrGenre(){
   

    const response = await fetch(`https://api.directual.com/good/api/v5/data/3_schedule/getCurrentScheduleForAdminAction?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&item_id=${choosedSchedule}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

     const json = await response.json()
     const array  = json.payload

     console.log(array)

        const timeString = array[0].timeString
        const dateString = array[0].dateString
        const linkString = array[0].linkToTicketOffice
     
     renderFront(dateString,timeString,linkString)
     
}





function renderFront(dateString,timeString,linkString){
    showloader()

    const eventstypediv = document.querySelector('#eventstypediv')


    newDivTheatre = document.createElement('div')
    newDivTheatre.classList.add('getAllEvents2_div')

    // inputDate = document.createElement('input')
    // inputDate.id = 'inputDate'
    // inputDate.value = dateString
    // inputDate.type = 'text'
    // inputDate.required = true
    // inputDate.classList.add('admin_input')
    // inputDate.placeholder = 'укажите дату'

    // inputDate.addEventListener('input', function () {
    //     const isValid = isValidDate(this.value);
      
    //     if (isValid) {
         
    //       dateOk = true
    //       console.log (dateOk)
    //       show_DivSaveCancellBtn()
        
    //     } else {
    //     dateOk = false
    //       console.log (dateOk)
    //     }
    //   });

    const container = document.getElementById('eventstypediv')
    const startDate = createDatePicker("startDateInput",dateString);
    container.appendChild(startDate.dateContainer);
    startDateInput.addEventListener("change", () => validateDates());


    inputTime = document.createElement('input')
    inputTime.id = 'inputTime'
    inputTime.value = timeString
    inputTime.type = 'text'
    inputTime.required = true
    inputTime.classList.add('admin_input')
    inputTime.placeholder = 'укажите время'

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
 


      inputLink = document.createElement('input')
      inputLink.id = 'inputLink'
      inputLink.value = linkString
      inputLink.type = 'text'
      inputLink.required = true
      inputLink.classList.add('admin_input')
      inputLink.placeholder = 'ссылка на кассы в формате example.ru'

      inputLink.addEventListener('input', function () {
          const isValid = isValidLink(this.value);
        
          if (isValid) {
              linkOk = true
              console.log (linkOk)
              show_DivSaveCancellBtn()
          } else {
              linkOk = false
              console.log (linkOk)
          }
        });




    // newDivTheatre.appendChild(inputDate)
    newDivTheatre.appendChild(inputTime)
    newDivTheatre.appendChild(inputLink)
   
    eventstypediv.appendChild(newDivTheatre)
   
    hideloader()
}



const adminEdit_btnSave = document.getElementById ('adminEdit_btnSave').addEventListener('click',async function() {

    if (dateOk==false || timeOk==false || linkOk==false) {
       const div_successText = document.getElementById('div_successText')
       const successText = document.getElementById('successText')
       successText.textContent = 'Введи дату,время,ссылку корректно!'
       div_successText.style.display = 'flex'

       setTimeout(()=>{
           div_successText.style.display = 'none'
       },2000)




    } else {

        // const inputDate = document.getElementById('inputDate').value

        const inputDate = document.getElementById('startDateInput').value;

        const [year2, month2, day2] = inputDate.split("-"); // Разбиваем строку по тире
        const str = `${day2}.${month2}.${year2}`; // Возвращаем в нужном формате



        const inputTime = document.getElementById('inputTime').value
        const inputLink = document.getElementById('inputLink').value
    
        const [day, month, year ] = str.split(".").map(Number);
        const [hours, minutes] = inputTime.split(':').map(Number);
        const date = new Date(year, month - 1, day, hours, minutes);
        const unixTime = Math.floor(date.getTime() / 1000);



    
        
            showSaveLoader();
            
            document.querySelector('.adminEdit_btnSave').disabled = true;
            document.querySelector('.deleteBtn').disabled = true;  
    
    
            const response = await fetch('https://api.directual.com/good/api/v5/data/admineditobjects/adminRqstToEdit?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
                method: 'POST',
                body: JSON.stringify({
                    'dateString':str,
                    'timeString':inputTime,
                    'linkToTicketOffice':inputLink,
                    'whatIsChanged': 'ChangeSchedule',
                    'newImg_id': 'no',
                    'schedule_id': choosedSchedule,
                    'unix':unixTime
                    
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                })
    
                const json = response.json();
                hideSaveLoader();

                setTimeout(() => {
                    window.location.href = '4showSchedule.html';
                  }, 2000);
    
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
    const buttons = document.getElementById('DivSaveCancellBtn')
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


  function isValidLink(linkString) {
    const linkRegex = /^https?:\/\/(?:[^\s/$.?#]+\.)+[^\s/]{2,}(?:\/[^\s]*)?$/i;
    return linkRegex.test(linkString);
  }
  



  const deleteBtn = document.getElementById('deleteBtn')
  const div_deleteNotification = document.getElementById('div_deleteNotification')
  const deleteContent = document.getElementById('deleteContent')
  const noDelete_btn = document.getElementById('noDelete_btn')
  const yesDelete_btn = document.getElementById('yesDelete_btn')
  const deleteText = document.getElementById('deleteText')
  
  
  function showDeleteNotification() {
    deleteContent.style.top = 0

    setTimeout(()=>{
        hideDeleteNotification()
    },5000)
  }

  
  deleteBtn.addEventListener('click',()=>{
    showDeleteNotification()
  })



  function hideDeleteNotification() {
    deleteContent.style.top = '-300px'

    setTimeout(()=>{
        deleteText.textContent = 'Уверены, что хотите удалить?'
    },1500)
  }

  noDelete_btn.addEventListener('click',()=>{
    hideDeleteNotification()
    
  })



  yesDelete_btn.addEventListener('click',async ()=>{

  const resp = await fetch('https://api.directual.com/good/api/v5/data/adminrqsttodeleteobjects/adminRqstToDelete?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
    method: 'POST',
        body: JSON.stringify({
        'whatDelete': 'schedule',
        'schedule_id': choosedSchedule
    }),
    headers: {
        'Content-Type': 'application/json'
    },
    })

    const json = await resp.json()
    console.log(json)

    deleteText.textContent = 'удалено!'

    setTimeout(()=>{
        window.location.href = '4showSchedule.html'
    },1000)
    

})






function createDatePicker(inputDate,dateString) {
    console.log('dateString',dateString)
  
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container2");
           
    const input = document.createElement("input");
    input.setAttribute("type", "date"); 
    input.setAttribute("id", inputDate);
    input.setAttribute("name", inputDate);
    input.setAttribute("required", true);
    input.setAttribute("class", "inputdate2");
    
    
    const [day, month, year] = dateString.split("."); 
    const str = `${year}-${month}-${day}`; 
    input.value = str;
            
             
  dateContainer.appendChild(input);
  
    return { dateContainer, input };
  }
  
  
  
  
  
  
  function validateDates() {
    const startValue = startDateInput.value;
    const today = new Date().toISOString().split("T")[0]; // Сегодняшняя дата в формате YYYY-MM-DD
            
    if (
        startValue &&
        startValue >= today
       
       ) {
        //     submitBtn.disabled = false;
        //     const textunderbutton = document.getElementById("textunderbutton");
        // textunderbutton.classList.add('nonvisible')
        dateOk = true;
        show_DivSaveCancellBtn();
        
         } else {
        //         submitBtn.disabled = true;
        //         const textunderbutton = document.getElementById("textunderbutton");
        // textunderbutton.classList.remove('nonvisible')
        dateOk = false;
        hide_DivSaveCancellBtn()
        
            }
    
  }