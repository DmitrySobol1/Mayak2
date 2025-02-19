const container = document.getElementById("datePickerContainer");

const btn_gotomainmenu = document.getElementById('btn_gotomainmenu').addEventListener('click',()=>{
    window.location.href = "index.html";
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
function formatDate(dateString) {
    const [year, month, day] = dateString.split("-"); // Разбиваем строку по тире
    return `${day}.${month}.${year}`; // Возвращаем в нужном формате
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
function validateDates() {
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
}

startDate.input.addEventListener("change", validateDates);
endDate.input.addEventListener("change", validateDates);

        
submitBtn.addEventListener("click", () => {
        const startFormatted = formatDate(startDate.input.value); // Преобразуем дату начала
        const endFormatted = formatDate(endDate.input.value); // Преобразуем дату окончания
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