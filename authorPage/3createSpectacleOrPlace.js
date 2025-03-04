// Прод
// const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
// const username = window.Telegram.WebApp.initDataUnsafe.user.username

// тесты
const tlgid = 777
const username = 'my777name'


const eventType = localStorage.getItem('eventType')
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre')
const choosedSpectaclePlace = localStorage.getItem('choosedSpectaclePlace')
const choosedEvent = localStorage.getItem('choosedEvent')


const title = document.getElementById('title')
title.textContent = eventType == 'theatre' ? 'Добавить спектакль' : 'Добавить место'


let imgIsChanged = false
let textIsChanged = false


const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='3showSpectacleOrPlace.html'
})

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click', ()=>{
    window.location.href='mainPage.html'
})


const loader = document.getElementById('loader_div')

function showloader() {
  loader.classList.remove('nonvisible')
}

function hideloader() {
  loader.classList.add('nonvisible')
}



hideloader()


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
    // console.log('textIsChanged=',textIsChanged)
    if (textIsChanged){
       
    show_DivSaveCancellBtn()
}
});

const textValue = document.getElementById('text')
textValue.addEventListener('input',()=>{
    if (textValue.value != ''){
    textIsChanged = true 
        if (imgIsChanged){
            show_DivSaveCancellBtn()
        }
    } else {
        textIsChanged = false
        hide_DivSaveCancellBtn()
    }
    
})





const adminEdit_btnSave = document.getElementById ('adminEdit_btnSave').addEventListener('click',async function() {



    const emptyOk = await checkEmpty()
    // console.log(emptyOk)
 
  
  if (emptyOk == false){
    //    const successText = document.getElementById('successText')
    //    successText.textContent = 'Заполните все поля'  
    //    setTimeout(()=>{
    //     successText.textContent = '' 
    //    },1500)


       const div_successText = document.getElementById('div_successText')
       const successText = document.getElementById('successText')
       successText.textContent = 'Заполните все поля'
       div_successText.style.display = 'flex'

       setTimeout(()=>{
           div_successText.style.display = 'none'
       },2000)


       
    } else {
        // console.log('все ок')


    const inputName = document.getElementById('text').value
    const inputDescription = document.getElementById('description').value
    const inputMainActor = document.getElementById('mainActor').value
    const inputAge = document.getElementById('age').value
    const inputDuration = document.getElementById('duration').value
    const subcategory = document.getElementById('subcategory').value


    if (imgIsChanged && textIsChanged ){
        showSaveLoader()
        const imgInput = document.getElementById('photo'); // Получаем input
        const file = imgInput.files[0]; // Берём загруженный файл
    
        if (!file) {
            console.log("Файл не выбран!");
            return;
        }
    
        // Создаём объект FormData
        const formData = new FormData();
       
        formData.append('theatreOrGenre_id', choosedEvent); 
        formData.append('whatIsChanged', 'createSpectacleOrPlace'); 
        formData.append('newImg_id', file); // Добавляем файл
        formData.append('age', inputAge); 
        formData.append('mainActor', inputMainActor); 
        formData.append('duration', inputDuration); 
        formData.append('description', inputDescription); 
        formData.append('name', inputName); 
        formData.append('eventType_id', eventType); 
        formData.append('subcategory', subcategory); 
        formData.append('creator_id', tlgid); 
        
    
        const response = await fetch('https://api.directual.com/good/api/v5/data/authorrqsttoeditobjects/authorCreateSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            
            method: 'POST', // Должен быть POST
            body: formData // Отправляем FormData
        }).catch(error => console.error("Ошибка:", error));
        const json = response.json();
        hideSaveLoader();

    } else {

        // console.log('заполните все данные')

        // showSaveLoader()

        // const response = await fetch('https://api.directual.com/good/api/v5/data/admineditobjects/adminRqstToEdit?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
        //     method: 'POST',
        //     // specify id if you want to edit existing objects
        //     body: JSON.stringify({
        //         'theatreOrGenre_id':choosedTheatreGenre,
        //         'whatIsChanged': 'TheatreOrGenre',
        //         'eventTypeName': inputEventTypeName,
        //         'newImg_id': 'no'
                
        //     }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     })

        //     const json = response.json();
        //     hideSaveLoader();

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


function checkEmpty() {
    const inputs = document.querySelectorAll('input[type="text"], textarea');
    let allFilled = true;
  
    inputs.forEach(input => {
      if (input.value.trim() === '') {
        allFilled = false;
      }
    });
  
    if (allFilled) {
      return true
    } else {
        return false
    }
  }



  setsubcategory()

  async function setsubcategory(){

    const subcategory = document.getElementById('subcategory')

    const resp = await fetch(`https://api.directual.com/good/api/v5/data/event_subcategory/getSubcategory?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&type=${eventType}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        }) 
        const json = await resp.json();

        const array = json.payload
        console.log(array)

        array.forEach((e)=>{
            // console.log(e.subcategory_name)

            const option = document.createElement('option')
            option.value = e.id
            option.text = e.subcategory_name

            subcategory.appendChild(option)

        })
        
        subcategory.selectedIndex = 0;
       
  }