// const dstart = localStorage.getItem('dstart')
// const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre')


// const subtitle = document.getElementById('subtitle')
// const dstartString = localStorage.getItem('dstartString')
// const dfinishString = localStorage.getItem('dfinishString')
// const subtitleFull = `c ${dstartString} по ${dfinishString}`
// subtitle.textContent = subtitleFull

// let theatreName = ''
// let theatreImg = ''
// let partyName = ''
// let partyImg = ''

let imgIsChanged = false


const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='2showTheatreOrGenre.html'
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




getTheatreOrGenre()

async function getTheatreOrGenre(){
   

    const response = await fetch(`https://api.directual.com/good/api/v5/data/1_theatreorgenre/getCurrentTheatreOrGenre?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&choosedItem=${choosedTheatreGenre}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

     const json = await response.json()
     const array  = json.payload

     console.log(array)

        const name = array[0].name
        const img = array[0].img

    //  array.forEach(item =>{
    //     if (item.id == 'theatre'){
    //         theatreName = item.name
    //         theatreImg = item.img
    //     } else if (item.id == 'party'){
    //         partyName = item.name
    //         partyImg = item.img
    //     }
    //  })
     
     renderFront(name,img)
     
}





function renderFront(name,img){
    showloader()

    const eventstypediv = document.querySelector('#eventstypediv')


    newDivTheatre = document.createElement('div')
    newDivTheatre.classList.add('getAllEvents_div')

    newDivForImgTheatre = document.createElement('div')
    // newDivForImgTheatre.classList.add('getAllEvents_divForImg')
    newDivForImgTheatre.classList.add('adminEdit_divForImg')
    
    newImgTheatre =  document.createElement('img')
    newImgTheatre.src = img
    newImgTheatre.classList.add('getAllEvents_img')
    newImgTheatre.id = 'preview'

    input = document.createElement('input')
    input.id = 'inputEventTypeName'
    input.value = name
    input.type = 'text'
    input.required = true
    input.classList.add('admin_input')
    input.placeholder = 'укажите название'

    input.addEventListener('input',()=>{

        if (input.value != ''){
            show_DivSaveCancellBtn()
        } else {
            hide_DivSaveCancellBtn()
        }
    })

    // divTextPlusIcon = document.createElement('div')
    // divTextPlusIcon.classList.add('admin1showEventType_divTextPlusIcon')

    // newPtheatre = document.createElement('div')
    // newPtheatre.textContent = name

    // iconEdit = document.createElement('div')
    // iconEdit.classList.add('iconEdit')
    // iconEditPen = document.createElement('img')
    // iconEditPen.src = "../../assets/pencil.png"
    // iconEditPen.classList.add('iconEditPen')
    // iconEditText = document.createElement('span')
    // iconEditText.textContent = 'редактировать'

    // iconEdit.appendChild(iconEditPen)
    // iconEdit.appendChild(iconEditText)


    // divTextPlusIcon.appendChild(newPtheatre)
    // divTextPlusIcon.appendChild(iconEdit)


    newDivForImgTheatre.appendChild(newImgTheatre)

    newDivTheatre.appendChild(newDivForImgTheatre)
    newDivTheatre.appendChild(input)
    // newDivTheatre.appendChild(divTextPlusIcon)
    



    // newDivTheatre.addEventListener('click',()=>{
    //     localStorage.setItem('eventType','theatre')
    //     window.location.href = '2showTheatreOrGenre.html'
    // })

    
    eventstypediv.appendChild(newDivTheatre)
   

    hideloader()
    
}



// const adminEdit_btnCnl = document.getElementById('adminEdit_btnCnl').addEventListener('click',()=>{
//     location.reload();
// })



document.getElementById('photo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('preview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
    imgIsChanged = true
    show_DivSaveCancellBtn()
});



const adminEdit_btnSave = document.getElementById ('adminEdit_btnSave').addEventListener('click',async function() {

    const inputEventTypeName = document.getElementById('inputEventTypeName').value

    if (inputEventTypeName == ''){
        // console.log('ПУСТО')

        const div_successText = document.getElementById('div_successText')
        const successText = document.getElementById('successText')
        successText.textContent = 'заполните все поля'
        div_successText.style.display = 'flex'

        setTimeout(()=>{
            div_successText.style.display = 'none'
        },2000)

    } else {

    if (imgIsChanged){
        showSaveLoader()
        const imgInput = document.getElementById('photo'); // Получаем input
        const file = imgInput.files[0]; // Берём загруженный файл
    
        if (!file) {
            console.log("Файл не выбран!");
            return;
        }
    
        // Создаём объект FormData
        const formData = new FormData();
        formData.append('theatreOrGenre_id', choosedTheatreGenre); 
        formData.append('whatIsChanged', 'TheatreOrGenre'); 
        formData.append('eventTypeName', inputEventTypeName); 
        formData.append('newImg_id', file); // Добавляем файл
    
        const response = await fetch('https://api.directual.com/good/api/v5/data/admineditobjects/adminRqstToEdit?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            
            method: 'POST', // Должен быть POST
            body: formData // Отправляем FormData
        }).catch(error => console.error("Ошибка:", error));
        const json = response.json();
        hideSaveLoader();

    } else {

        showSaveLoader()

        const response = await fetch('https://api.directual.com/good/api/v5/data/admineditobjects/adminRqstToEdit?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            method: 'POST',
            // specify id if you want to edit existing objects
            body: JSON.stringify({
                'theatreOrGenre_id':choosedTheatreGenre,
                'whatIsChanged': 'TheatreOrGenre',
                'eventTypeName': inputEventTypeName,
                'newImg_id': 'no'
                
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            })

            const json = response.json();
            hideSaveLoader();

    }
}
})




function show_DivSaveCancellBtn(){
    // const buttons = document.getElementById('DivSaveCancellBtn')
    // buttons.classList.remove('nonvisible')

    const DivSaveCancellBtn = document.getElementById('DivSaveCancellBtn')
    DivSaveCancellBtn.style.display = 'block'
    
}


function hide_DivSaveCancellBtn(){
    // const buttons = document.getElementById('DivSaveCancellBtn')
    // buttons.classList.add('nonvisible')

    const DivSaveCancellBtn = document.getElementById('DivSaveCancellBtn')
    DivSaveCancellBtn.style.display = 'none'
    
}


function showSaveLoader() {
    // const buttons = document.getElementById('DivSaveCancellBtn')
    // buttons.classList.add('nonvisible')
    // const loaderSave_div = document.getElementById('loaderSave_div')
    // loaderSave_div.style.display='flex'

    const div_successText = document.getElementById('div_successText')
        const successText = document.getElementById('successText')
        successText.textContent = 'сохраняю ...'
        div_successText.style.display = 'flex'

        setTimeout(()=>{
            div_successText.style.display = 'none'
        },2000)
}

function hideSaveLoader() {
    // const loaderSave_div = document.getElementById('loaderSave_div')
    // loaderSave_div.style.display='none';

    // const successText = document.getElementById('successText')
    // successText.textContent =  'Успешно сохранено!'
    // setTimeout(()=>successText.textContent = '',1500)
    
    

    const div_successText = document.getElementById('div_successText')
        const successText = document.getElementById('successText')
        successText.textContent = 'Успешно сохранено!'
        div_successText.style.display = 'flex'

        setTimeout(()=>{
            div_successText.style.display = 'none'
        },2000)
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
            'whatDelete': 'theatreOrGenre',
            'theatreOrGenre_id': choosedTheatreGenre
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        })
    
        const json = await resp.json()
        console.log(json)
    
        deleteText.textContent = 'удалено!'
    
        setTimeout(()=>{
            // hideDeleteNotification()
    
            window.location.href = '2showTheatreOrGenre.html'
        },1000)
        
    
    })