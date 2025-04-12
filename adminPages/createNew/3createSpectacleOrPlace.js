//FIXME:
// Прод
const tlgid = window.Telegram.WebApp.initDataUnsafe.user.id
const username = window.Telegram.WebApp.initDataUnsafe.user.username

// // тесты
// const tlgid = 777;
// const username = 'my777name';

const eventType = localStorage.getItem('eventType');
const choosedTheatreGenre = localStorage.getItem('choosedTheatreGenre');
const choosedSpectaclePlace = localStorage.getItem('choosedSpectaclePlace');
const choosedEvent = localStorage.getItem('choosedEvent');

const title = document.getElementById('title');
title.textContent =
  eventType == 'theatre' ? 'Добавить спектакль' : 'Добавить место';


const categoryBtn_content=document.getElementById('categoryBtn_content')
categoryBtn_content.textContent = eventType == 'theatre' ? 'Балет'  : 'Детям';
categoryBtn_content.dataset.id = eventType == 'theatre' ? 'fc55857e-1647-4541-93ad-dca2c34961ad'  : '73f51d39-c6e3-4195-bd6a-61c2b49bba8c';


let imgIsChanged = false;
let textIsChanged = false; 

const btn_back = document
  .getElementById('btn_back')
  .addEventListener('click', () => {
    window.location.href = '3showSpectacleOrPlace.html';
  });

const btn_gotomainmenu = document
  .getElementById('btn_gotomainmenu')
  .addEventListener('click', () => {
    window.location.href = '../adminMainMenu.html';
  });

const loader = document.getElementById('loader_div');

function showloader() {
  loader.classList.remove('nonvisible');
}

function hideloader() {
  loader.classList.add('nonvisible');
}

hideloader();

document.getElementById('photo').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById('preview');
      preview.src = e.target.result;
      preview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
  imgIsChanged = true;
  //   console.log('img=', imgIsChanged);
  if (textIsChanged) {
    show_DivSaveCancellBtn();
  }
});

const textValue = document.getElementById('text');
textValue.addEventListener('input', () => {
  if (textValue.value != '') {
    textIsChanged = true;
    if (imgIsChanged) {
      show_DivSaveCancellBtn();
    }
  } else {
    textIsChanged = false;
    hide_DivSaveCancellBtn();
  }
});

const adminEdit_btnSave = document
  .getElementById('adminEdit_btnSave')
  .addEventListener('click', async function () {
    const emptyOk = await checkEmpty();
    console.log('emptyOk=', emptyOk);

    if (emptyOk == false) {
      const div_successText = document.getElementById('div_successText');
      const successText = document.getElementById('successText');
      successText.textContent = 'Заполните все поля';
      div_successText.style.display = 'flex';

      setTimeout(() => {
        div_successText.style.display = 'none';
      }, 2000);
    } else {
      console.log('все ок');

      const inputName = document.getElementById('text').value;
      const inputDescription = document.getElementById('description').value;
      const inputMainActor = document.getElementById('mainActor').value;
      const inputAge = document.getElementById('ageBtn_content').dataset.id;
      const inputDuration = document.getElementById('duration').value;
      const subcategory = document.getElementById('categoryBtn_content').dataset.id;

      if (imgIsChanged && textIsChanged) {
        showSaveLoader();
        const imgInput = document.getElementById('photo'); // Получаем input
        const file = imgInput.files[0]; // Берём загруженный файл

        if (!file) {
          console.log('Файл не выбран!');
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

        document.querySelector('.adminEdit_btnSave').disabled = true;

        const response = await fetch(
          'https://api.directual.com/good/api/v5/data/admineditobjects/adminRqstToEdit?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=',
          {
            method: 'POST', 
            body: formData, 
          }
        ).catch((error) => console.error('Ошибка:', error));
        const json = response.json();
        hideSaveLoader();

        setTimeout(() => {
          window.location.href = '3showSpectacleOrPlace.html';
        }, 2000);
      } else {
        console.log('заполните все данные');
      }
    }
  });

function show_DivSaveCancellBtn() {
  const DivSaveCancellBtn = document.getElementById('DivSaveCancellBtn');
  DivSaveCancellBtn.style.display = 'block';
}

function hide_DivSaveCancellBtn() {
  const DivSaveCancellBtn = document.getElementById('DivSaveCancellBtn');
  DivSaveCancellBtn.style.display = 'none';
}

function showSaveLoader() {
  const div_successText = document.getElementById('div_successText');
  const successText = document.getElementById('successText');
  successText.textContent = 'сохраняю ...';
  div_successText.style.display = 'flex';

  setTimeout(() => {
    div_successText.style.display = 'none';
  }, 2000);
}

function hideSaveLoader() {
  const div_successText = document.getElementById('div_successText');
  const successText = document.getElementById('successText');
  successText.textContent = 'Успешно сохранено!';
  div_successText.style.display = 'flex';

  setTimeout(() => {
    div_successText.style.display = 'none';
  }, 2000);
}

function checkEmpty() {
  const inputs = document.querySelectorAll('input[type="text"], textarea');
  let allFilled = true;

  inputs.forEach((input, index) => {
    if (input.value.trim() === '') {
      allFilled = false;
    }
  });

  if (allFilled) {
    return true;
  } else {
    return false;
  }
}

// setsubcategory();

// async function setsubcategory() {
//   const subcategory = document.getElementById('subcategory');

//   const resp = await fetch(
//     `https://api.directual.com/good/api/v5/data/event_subcategory/getSubcategory?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&type=${eventType}`,
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   const json = await resp.json();

//   const array = json.payload;
//   //   console.log(array);

//   array.forEach((e) => {
//     // console.log(e.subcategory_name);

//     const option = document.createElement('option');
//     option.value = e.id;
//     option.text = e.subcategory_name;

//     subcategory.appendChild(option);
//   });

//   subcategory.selectedIndex = 0;
// }

// setAgeCategory();

// async function setAgeCategory() {
//   const age = document.getElementById('age');

//   const resp = await fetch(
//     'https://api.directual.com/good/api/v5/data/age_category/getAgeCategory?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=',
//     {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     }
//   );
//   const json = await resp.json();

//   const array = json.payload;
//   //   console.log(array);

//   array.forEach((e) => {
//     // console.log(e.name);

//     const option = document.createElement('option');
//     option.value = e.id;
//     option.text = e.name;

//     age.appendChild(option);
//   });

//   age.selectedIndex = 0;
// }



const modalAge = document.getElementById('modalAge');
const modalAgeContent = document.getElementById('modalAgeContent');

document.getElementById('ageBtn').addEventListener('click', async () => {
  console.log('clicked');

  try {
    const resp = await fetch(
      'https://api.directual.com/good/api/v5/data/age_category/getAgeCategory?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const json = await resp.json();
    const array = json.payload;

    // Очищаем модальное окно, чтобы не дублировать кнопки при повторных открытиях
    modalAgeContent.innerHTML = '';

    const titleText = document.createElement('div');
    titleText.textContent = 'Возрастные ограничения:';
    modalAgeContent.appendChild(titleText);

    array.forEach((e) => {
      const btn = document.createElement('button');
      btn.textContent = e.name;
      btn.dataset.id = e.id;

      // Добавим класс, если надо стилизовать
      btn.className = 'modal-btn';

      btn.addEventListener('click', () => {
        console.log(`Выбрана категория: ${e.name}`);
        ageBtn_content = document.getElementById('ageBtn_content');
        ageBtn_content.textContent = e.name;
        ageBtn_content.dataset.id = e.id;
        modalAge.style.display = 'none'; // Закрыть модалку
      });

      modalAgeContent.appendChild(btn);
    });

    modalAge.style.display = 'block';
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
  }
});





const modalCategory = document.getElementById('modalCategory');
const modalCategoryContent = document.getElementById('modalCategoryContent');


document.getElementById('categoryBtn').addEventListener('click', async () => {
  

  try {
    const resp = await fetch(
      `https://api.directual.com/good/api/v5/data/event_subcategory/getSubcategory?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=&type=${eventType}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const json = await resp.json();
    const array = json.payload;

    // Очищаем модальное окно, чтобы не дублировать кнопки при повторных открытиях
    modalCategoryContent.innerHTML = '';

    const titleText = document.createElement('div');
    titleText.textContent = 'Выберите категорию:';
    modalCategoryContent.appendChild(titleText);

    array.forEach((e) => {
      const btn = document.createElement('button');
      btn.textContent = e.subcategory_name;
      btn.dataset.id = e.id;
      

      // Добавим класс, если надо стилизовать
      btn.className = 'modal-btn';

      btn.addEventListener('click', () => {
        // console.log(`Выбрана категория: ${e.subcategory_name}`);
        // categoryBtn_content = document.getElementById('categoryBtn_content');
        categoryBtn_content.textContent = e.subcategory_name;
        categoryBtn_content.dataset.id = e.id;
        modalCategory.style.display = 'none'; // Закрыть модалку
      });

      modalCategoryContent.appendChild(btn);
    });

    modalCategory.style.display = 'block';
  } catch (error) {
    console.error('Ошибка при получении категорий:', error);
  }
});


document.getElementById('infoBtn').addEventListener('click', ()=>{
  const modalInfo = document.getElementById('modalInfo')
  modalInfo.style.display = 'block'; 
})

document.getElementById('btnOk').addEventListener('click', ()=>{
  const modalInfo = document.getElementById('modalInfo')
  modalInfo.style.display = 'none'; 
}) 