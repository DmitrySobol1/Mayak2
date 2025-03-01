const eventType = localStorage.getItem('eventType')
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre')


const title = document.getElementById('title')
title.textContent = eventType == 'theatre' ? 'Добавить театр' : 'Добавить жанр'


let imgIsChanged = false
let textIsChanged = false


const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='2showTheatreOrGenre.html'
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
    console.log('textIsChanged=',textIsChanged)
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

    const nameText = document.getElementById('text').value

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
        formData.append('eventType_id', eventType); 
        formData.append('whatIsChanged', 'createTheatreOrGenre'); 
        formData.append('eventTypeName', nameText); 
        formData.append('newImg_id', file); // Добавляем файл
    
        const response = await fetch('https://api.directual.com/good/api/v5/data/admineditobjects/adminRqstToEdit?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            
            method: 'POST', // Должен быть POST
            body: formData // Отправляем FormData
        }).catch(error => console.error("Ошибка:", error));
        const json = response.json();
        hideSaveLoader();

    } else {

        console.log('заполните все данные')

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

})



function show_DivSaveCancellBtn(){
    const buttons = document.getElementById('DivSaveCancellBtn')
    buttons.classList.remove('nonvisible')
}

function hide_DivSaveCancellBtn(){
    const buttons = document.getElementById('DivSaveCancellBtn')
    buttons.classList.add('nonvisible')
}


function showSaveLoader() {
    const buttons = document.getElementById('DivSaveCancellBtn')
    buttons.classList.add('nonvisible')
    const loaderSave_div = document.getElementById('loaderSave_div')
    loaderSave_div.style.display='flex'
}

function hideSaveLoader() {
    const loaderSave_div = document.getElementById('loaderSave_div')
    loaderSave_div.style.display='none';
    const successText = document.getElementById('successText')
    successText.textContent =  'Успешно сохранено!'
    setTimeout(()=>successText.textContent = '',1500)
    
}


