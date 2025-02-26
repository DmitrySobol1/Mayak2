const container = document.getElementById("datePickerContainer");

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click',()=>{
    window.location.href = "../index.html";
})

const btn_back = document.getElementById('btn_back').addEventListener('click',()=>{
    window.location.href = "../doska.html";
})



// Функция для создания поля даты
function createDatePicker(inputId,labelText) {
    const dateContainer = document.createElement("div");
    dateContainer.classList.add("date-container");
           
    const input = document.createElement("input");
     input.setAttribute("type", "date");
         		
    input.setAttribute("id", inputId);
    input.setAttribute("name", inputId);
    input.setAttribute("required", true);
  	input.setAttribute("class", "inputdate");
           
	const label = document.createElement("label");
	label.textContent = labelText; 
	label.setAttribute("for", inputId);	
    label.setAttribute("class","labeldi")		
						
	dateContainer.appendChild(label);            
	dateContainer.appendChild(input);

    return { dateContainer, input };
}

// Функция для преобразования даты из формата YYYY-MM-DD в DD.MM.YYYY
function formatDate(dateString,type) {
    const [year, month, day] = dateString.split("-"); // Разбиваем строку по тире
    const str = `${day}.${month}`; // Возвращаем в нужном формате
    
    type === 'start' ? localStorage.setItem('dstartString',str) : localStorage.setItem('dfinishString',str)
    // console.log(type,str);
}


// Создаем поля для даты начала и окончания
const startDate = createDatePicker("startDateInput","Дата начала:");
const endDate = createDatePicker("endDateInput","Дата окончания:");


     
// Кнопка для подтверждения
const submitBtn = document.createElement("button");
submitBtn.textContent = "Далее >";
submitBtn.setAttribute("id", "submitBtn");
submitBtn.setAttribute("disabled", true);
submitBtn.setAttribute("class", "nextBtn");
  			
 // Обработчик событий для активации кнопки
function validateDates(type) {
    const startValue = startDate.input.value;
    const endValue = endDate.input.value;
    const today = new Date().toISOString().split("T")[0]; // Сегодняшняя дата в формате YYYY-MM-DD

            
    if (
        startValue &&
        endValue &&
        startValue <= endValue &&
        startValue >= today &&
        endValue >= today
       ) {
            submitBtn.disabled = false;
            const textunderbutton = document.getElementById("textunderbutton");
	    	textunderbutton.classList.add('nonvisible')
         } else {
                submitBtn.disabled = true;
              	const textunderbutton = document.getElementById("textunderbutton");
				textunderbutton.classList.remove('nonvisible')
            }

    // const res = type==='start' ? formatDate(startValue,type) : formatDate(endValue,type)
    type==='start' ? formatDate(startValue,type) : formatDate(endValue,type)
}

// startDate.input.addEventListener("change", validateDates);
startDate.input.addEventListener("change", () => validateDates('start'));
endDate.input.addEventListener("change", () => validateDates('finish'));

        
submitBtn.addEventListener("click", () => {
        const startToUnix =  Math.floor(new Date(startDate.input.value).getTime() / 1000);
        const finishToUnix =  Math.floor(new Date(endDate.input.value).getTime() / 1000);

        // чтобы в выборку попадали все мероприятия dfinish
        const finishToUnixEndOfDay = Number(finishToUnix) + 86300

        localStorage.setItem('dstart',startToUnix)
        localStorage.setItem('dfinish',finishToUnixEndOfDay)

        // const start = document.getElementById('start')
        // start.textContent = 'start='+startToUnix

        // const finish = document.getElementById('finish')
        // finish.textContent = 'finish='+finishToUnix

        window.location.href = "2ticketsGroupedByEventType.html"

});

// Добавляем элементы в контейнер
container.appendChild(startDate.dateContainer);
container.appendChild(endDate.dateContainer);


// Создаем контейнер для кнопок
const buttonContainer = document.createElement("div");
buttonContainer.setAttribute("class", "button-container");

const textunderbtn = document.createElement("p");
textunderbtn.textContent = "*Укажите корректные даты для поиска";
textunderbtn.id = "textunderbutton";
textunderbtn.classList.add('textunderbtnclass');


// Добавляем кнопки в контейнер
buttonContainer.appendChild(submitBtn);
buttonContainer.appendChild(textunderbtn);


// Добавляем контейнер в основной контейнер
container.appendChild(buttonContainer); 