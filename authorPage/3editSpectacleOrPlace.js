const eventType = localStorage.getItem('eventType')
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre')
const choosedSpectaclePlace = localStorage.getItem('choosedSpectaclePlace')

let imgIsChanged = false


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


getTheatreOrGenre()

async function getTheatreOrGenre(){
   

    const response = await fetch(`https://api.directual.com/good/api/v5/data/2_spectacleorplace/getInfoAboutCurrentSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&item_id=${choosedTheatreGenre}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

     const json = await response.json()
     const item  = json.payload[0]

     const eventstypediv = document.querySelector('#eventstypediv')


    newDivTheatre = document.createElement('div')
    newDivTheatre.classList.add('getAllEvents2_div')

    newDivForImgTheatre = document.createElement('div')
    newDivForImgTheatre.classList.add('adminEdit_divForImg')
    
    newImgTheatre =  document.createElement('img')
    newImgTheatre.src = item.img
    newImgTheatre.classList.add('getAllEvents_img')
    newImgTheatre.id = 'preview'

       
    inputName = document.createElement('input')
    inputName.id = 'inputName'
    inputName.value = item.name
    inputName.type = 'text'
    inputName.required = true
    inputName.classList.add('admin_input')
    inputName.placeholder = 'укажите название'

   
    inputDescription = document.createElement('textarea')
    inputDescription.rows=4
    inputDescription.id = 'inputDescription'
    inputDescription.value = item.description
    inputDescription.type = 'text'
    inputDescription.required = true
    inputDescription.classList.add('admin_input')
    inputDescription.classList.add('admin_textarea')
    inputDescription.placeholder = 'укажите описание'

   
    inputMainActor = document.createElement('input')
    inputMainActor.id = 'inputMainActor'
    inputMainActor.value = item.main_actor
    inputMainActor.type = 'text'
    inputMainActor.required = true
    inputMainActor.classList.add('admin_input')
    inputMainActor.placeholder = 'укажите главных актеров'


    inputAge = document.createElement('input')
    inputAge.id = 'inputAge'
    inputAge.value = item.age
    inputAge.type = 'text'
    inputAge.required = true
    inputAge.classList.add('admin_input')
    inputAge.placeholder = 'укажите возрастные ограничения'


    inputDuration = document.createElement('input')
    inputDuration.id = 'inputDuration'
    inputDuration.value = item.duration
    inputDuration.type = 'text'
    inputDuration.required = true
    inputDuration.classList.add('admin_input')
    inputDuration.placeholder = 'укажите продолжительность'


    subcategory = document.createElement('select')
    subcategory.id = 'subcategory'
    subcategory.classList.add('admin_select')
    subcategoryOption = document.createElement('option')
    subcategoryOption.value = item.subCategory_id.id
    subcategoryOption.text = item.subCategory_id.subcategory_name
    subcategory.appendChild(subcategoryOption)

    subcategory.addEventListener('click', async ()=> {
               
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
                    console.log(e.subcategory_name)
        
                    const option = document.createElement('option')
                    option.value = e.id
                    option.text = e.subcategory_name
        
                    subcategory.appendChild(option)
        
                })
    })


    newDivForImgTheatre.appendChild(newImgTheatre)
    newDivTheatre.appendChild(newDivForImgTheatre)
    newDivTheatre.appendChild(inputName)
    newDivTheatre.appendChild(inputDescription)
    newDivTheatre.appendChild(inputMainActor)
    newDivTheatre.appendChild(inputAge)
    newDivTheatre.appendChild(inputDuration)
    newDivTheatre.appendChild(subcategory)
    eventstypediv.appendChild(newDivTheatre)
   
    hideloader()
}

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


 const emptyOk = await checkEmpty()
 console.log(emptyOk)
 
  
  if (emptyOk == false){

        const div_successText = document.getElementById('div_successText')
        const successText = document.getElementById('successText')
        successText.textContent = 'Заполните все поля'
        div_successText.style.display = 'flex'

        setTimeout(()=>{
            div_successText.style.display = 'none'
        },2000)


       
    } else {
        console.log('все ок')

         let inputName = document.getElementById('inputName').value
         const inputDescription = document.getElementById('inputDescription').value
         const inputMainActor = document.getElementById('inputMainActor').value
         const inputAge = document.getElementById('inputAge').value
         const inputDuration = document.getElementById('inputDuration').value
         const subcategory = document.getElementById('subcategory').value

    
    

    if (imgIsChanged){
        showSaveLoader()
        const imgInput = document.getElementById('photo'); // Получаем input
        const file = imgInput.files[0]; // Берём загруженный файл
    
        if (!file) {
            console.log("Файл не выбран!");
            return;
        }
    
       
        const formData = new FormData();
        formData.append('spectacleOrPlace_id', choosedTheatreGenre); 
        formData.append('whatIsChanged', 'SpectacleOrPlace'); 
        formData.append('newImg_id', file); 
        formData.append('age', inputAge); 
        formData.append('mainActor', inputMainActor); 
        formData.append('duration', inputDuration); 
        formData.append('description', inputDescription); 
        formData.append('name', inputName); 
        formData.append('subcategory', subcategory); 

    
        const response = await fetch('https://api.directual.com/good/api/v5/data/authorrqsttoeditobjects/authorCreateSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            
            method: 'POST', 
            body: formData 
        }).catch(error => console.error("Ошибка:", error));
        const json = response.json();
        hideSaveLoader();

    } else {

        showSaveLoader()

        const response = await fetch('https://api.directual.com/good/api/v5/data/authorrqsttoeditobjects/authorCreateSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
            method: 'POST',
            body: JSON.stringify({
                'spectacleOrPlace_id':choosedTheatreGenre,
                'whatIsChanged': 'SpectacleOrPlace',
                'newImg_id': 'no',
                'duration': inputDuration,
                'age': inputAge,
                'mainActor': inputMainActor,
                'description': inputDescription,
                'name': inputName,
                'subcategory':subcategory
                
                
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
    const div_successText = document.getElementById('div_successText')
        const successText = document.getElementById('successText')
        successText.textContent = 'Успешно сохранено!'
        div_successText.style.display = 'flex'

        setTimeout(()=>{
            div_successText.style.display = 'none'
        },2000)

    
}


document.body.addEventListener('input', (e) => {
    if (e.target.matches('input') || e.target.matches('textarea')) {
  
      show_DivSaveCancellBtn(); 
    }
  });


  document.body.addEventListener('input', (e) => {
    if ((e.target.matches('input') || e.target.matches('textarea'))  && e.target.value =='' ) {
      hide_DivSaveCancellBtn(); 
    }
  });


 
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
            'whatDelete': 'spectacleOrPlace',
            'spectacleOrPlace_id': choosedSpectaclePlace
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        })
    
        const json = await resp.json()
        console.log(json)
    
        deleteText.textContent = 'удалено!'
    
        setTimeout(()=>{
            window.location.href = '3showSpectacleOrPlace.html'
        },1000)
        
    
    })