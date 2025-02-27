// const dstart = localStorage.getItem('dstart')
// const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')


// const subtitle = document.getElementById('subtitle')
// const dstartString = localStorage.getItem('dstartString')
// const dfinishString = localStorage.getItem('dfinishString')
// const subtitleFull = `c ${dstartString} по ${dfinishString}`
// subtitle.textContent = subtitleFull

// let theatreName = ''
// let theatreImg = ''
// let partyName = ''
// let partyImg = ''




const btn_back = document.getElementById('btn_back').addEventListener('click', ()=>{
    window.location.href='1showEventType.html'
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


// showloader()




getEventImgAndName()

async function getEventImgAndName(){
   

    const response = await fetch(`https://api.directual.com/good/api/v5/data/event/getCurrentImgAndName?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&eventType_id=${eventType}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        })

     const json = await response.json()
     const array  = json.payload

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
    newDivForImgTheatre.classList.add('getAllEvents_divForImg')
    
    newImgTheatre =  document.createElement('img')
    newImgTheatre.src = img
    newImgTheatre.classList.add('getAllEvents_img')
    newImgTheatre.id = 'preview'

    input = document.createElement('input')
    input.value = name
    input.type = 'text'
    input.required = true
    input.classList.add('admin_input')
    input.placeholder = 'укажите название'

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
});



