const dstart = localStorage.getItem('dstart')
const dfinish = localStorage.getItem('dfinish')
const eventType = localStorage.getItem('eventType')
const choosedEvent = localStorage.getItem('choosedEvent')
const choosedEventName = localStorage.getItem('choosedEventName')
const choosedName = localStorage.getItem('choosedName')

const subtitle = document.getElementById('subtitle')
const dstartString = localStorage.getItem('dstartString')
const timeString = localStorage.getItem('timeString')
const subtitleFull = `${dstartString} в ${timeString}`
subtitle.textContent = subtitleFull


const title = document.querySelector('.title')
title.textContent = eventType === 'theatre'? `${choosedEventName} в ${choosedName}` : `${choosedName} в ${choosedEventName}`



const btn_back = document.getElementById('btn_back').addEventListener('click', async () => {
    window.location.href = '5ChooseSchedule.html';
});


const btn_gotomainmenuk = document.getElementById('btn_gotomainmenu').addEventListener('click', async () => {
    window.location.href='../index.html'
});



document.getElementById('ticketForm').addEventListener('submit', function(event) {
    // Предотвращаем стандартное поведение формы
    event.preventDefault();

    // Вызываем вашу функцию
    handleFormSubmit();
});

// Ваша функция
function handleFormSubmit() {
    // Получаем данные из формы
    const placeLocation = document.getElementById('placeLocation').value;
    const row = document.getElementById('row').value;
    const placeNumber = document.getElementById('placeNumber').value;
    const qty = document.getElementById('qty').value;
    const price = document.getElementById('price').value;

    // Выводим данные в консоль (или отправляем на сервер)
    console.log('Расположение мест:', placeLocation);
    console.log('Ряд:', row);
    console.log('Номер места:', placeNumber);
    console.log('Количество мест:', qty);
    console.log('Цена за 1 билет:', price);

    // Дополнительная логика (например, отправка данных на сервер)
    // fetch('/submit', {
    //     method: 'POST',
    //     body: JSON.stringify({ placeLocation, row, placeNumber, qty, price }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(response => response.json())
    //   .then(data => console.log(data))
    //   .catch(error => console.error('Ошибка:', error));

    // Очистка формы (опционально)
    document.getElementById('ticketForm').reset();
}



