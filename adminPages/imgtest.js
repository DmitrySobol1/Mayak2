document.getElementById('imgform').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    const imgInput = document.getElementById('photo'); // Получаем input
    const file = imgInput.files[0]; // Берём загруженный файл

    if (!file) {
        console.log("Файл не выбран!");
        return;
    }

    // Создаём объект FormData
    const formData = new FormData();
    formData.append('id', ''); 
    formData.append('type', 'first'); 
    formData.append('img3', file); // Добавляем файл

    fetch('https://api.directual.com/good/api/v5/data/adminrqsttocreatesmthnew/rqst?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=', {
        method: 'POST', // Должен быть POST
        body: formData // Отправляем FormData
    })
    .then(res => res.json()) // Парсим JSON-ответ
    .then(data => console.log("Ответ сервера:", data))
    .catch(error => console.error("Ошибка:", error));
});



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