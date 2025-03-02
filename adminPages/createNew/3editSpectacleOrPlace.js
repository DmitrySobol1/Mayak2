// const dstart = localStorage.getItem('dstart')
// const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre')
const choosedSpectaclePlace = localStorage.getItem('choosedSpectaclePlace')



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
    window.location.href='3showSpectacleOrPlace.html'
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
   

    const response = await fetch(`https://api.directual.com/good/api/v5/data/2_spectacleorplace/getInfoAboutCurrentSpectacleOrPlace?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&item_id=${choosedTheatreGenre}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

     const json = await response.json()
     const item  = json.payload[0]

    //  console.log(array)

        // const name = array[0].name
        // const img = array[0].img

       
    //  renderFront(name,img)

    const eventstypediv = document.querySelector('#eventstypediv')


    newDivTheatre = document.createElement('div')
    newDivTheatre.classList.add('getAllEvents_div')

    newDivForImgTheatre = document.createElement('div')
    // newDivForImgTheatre.classList.add('getAllEvents_divForImg')
    newDivForImgTheatre.classList.add('adminEdit_divForImg')
    
    newImgTheatre =  document.createElement('img')
    newImgTheatre.src = item.img
    newImgTheatre.classList.add('getAllEvents_img')
    newImgTheatre.id = 'preview'

    deleteDiv = document.createElement('div')
    deleteDiv.classList.add('delete_div')
    deleteBtn = document.createElement('button')
    deleteBtn.textContent = 'удалить'
    deleteBtn.classList.add('delete_btn')
    deleteDiv.appendChild(deleteBtn)
    
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
    newDivTheatre.appendChild(deleteDiv)
    newDivTheatre.appendChild(inputName)
    newDivTheatre.appendChild(inputDescription)
    newDivTheatre.appendChild(inputMainActor)
    newDivTheatre.appendChild(inputAge)
    newDivTheatre.appendChild(inputDuration)
    newDivTheatre.appendChild(subcategory)
    
    // newDivTheatre.addEventListener('click',()=>{
    //     localStorage.setItem('eventType','theatre')
    //     window.location.href = '2showTheatreOrGenre.html'
    // })

    
    eventstypediv.appendChild(newDivTheatre)
   

    hideloader()

}





// function renderFront(name,img){
//     showloader()

//     const eventstypediv = document.querySelector('#eventstypediv')


//     newDivTheatre = document.createElement('div')
//     newDivTheatre.classList.add('getAllEvents_div')

//     newDivForImgTheatre = document.createElement('div')
//     // newDivForImgTheatre.classList.add('getAllEvents_divForImg')
//     newDivForImgTheatre.classList.add('adminEdit_divForImg')
    
//     newImgTheatre =  document.createElement('img')
//     newImgTheatre.src = img
//     newImgTheatre.classList.add('getAllEvents_img')
//     newImgTheatre.id = 'preview'

//     input = document.createElement('input')
//     input.id = 'inputEventTypeName'
//     input.value = name
//     input.type = 'text'
//     input.required = true
//     input.classList.add('admin_input')
//     input.placeholder = 'укажите название'

//     input.addEventListener('input',()=>{
//         show_DivSaveCancellBtn()
//     })


//     input = document.createElement('input')
//     input.id = 'inputDescription'
//     input.value = description
//     input.type = 'text'
//     input.required = true
//     input.classList.add('admin_input')
//     input.placeholder = 'укажите название'

    


//     newDivForImgTheatre.appendChild(newImgTheatre)

//     newDivTheatre.appendChild(newDivForImgTheatre)
//     newDivTheatre.appendChild(input)
//     // newDivTheatre.appendChild(divTextPlusIcon)
    



//     // newDivTheatre.addEventListener('click',()=>{
//     //     localStorage.setItem('eventType','theatre')
//     //     window.location.href = '2showTheatreOrGenre.html'
//     // })

    
//     eventstypediv.appendChild(newDivTheatre)
   

//     hideloader()
    
// }



const adminEdit_btnCnl = document.getElementById('adminEdit_btnCnl').addEventListener('click',()=>{
    location.reload();
})



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
       const successText = document.getElementById('successText')
       successText.textContent = 'Заполните все поля'  
       setTimeout(()=>{
        successText.textContent = '' 
       },1500)
       
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
    
        // Создаём объект FormData
        const formData = new FormData();
        formData.append('spectacleOrPlace_id', choosedTheatreGenre); 
        formData.append('whatIsChanged', 'SpectacleOrPlace'); 
        formData.append('newImg_id', file); // Добавляем файл
        formData.append('age', inputAge); 
        formData.append('mainActor', inputMainActor); 
        formData.append('duration', inputDuration); 
        formData.append('description', inputDescription); 
        formData.append('name', inputName); 
        formData.append('subcategory', subcategory); 

    
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



//   function checkEmpty() {
//     const inputs = document.querySelectorAll('input'); // Получаем все input
//     const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
  
//     if (allFilled) {
//       console.log('Все поля заполнены');
//     } else {
//       console.log('Есть пустые поля');
//     }
//   }



  
 
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