const dstart = localStorage.getItem('dstart');
const dfinish = localStorage.getItem('dfinish');
const eventType = localStorage.getItem('eventType');
const choosedEvent = localStorage.getItem('choosedEvent');
const choosedEventName = localStorage.getItem('choosedEventName');
const choosedName = localStorage.getItem('choosedName');

const btn_back = document
  .getElementById('btn_back')
  .addEventListener('click', () => {
    window.location.href = '../adminMainMenu.html';
  });

const btn_gotomainmenuk = document
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

getInfoAboutTicket();

async function getInfoAboutTicket() {
  const response = await fetch(
    'https://api.directual.com/good/api/v5/data/rqsttocreatenewticket/adminShowAllRqstToCreateNewTicket?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const json = await response.json();
  payload = json.payload;

  if (payload.length == 0) {
    const noTicketInfo = document.getElementById('noTicketInfo');
    noTicketInfo.style.display = 'block';
  }

  if (!payload) {
    console.error('Некорректные данные в payload');
    return;
  }

  payload.forEach((item) => {
    const schedulediv = document.getElementById('schedulediv');

    const newDiv = document.createElement('div');
    newDiv.classList.add('ShowChoosedEvent_scheduleItemContainer');

    const title = document.createElement('div');
    title.textContent = `${item.schedule_id.dateString} в ${item.schedule_id.timeString}`;
    title.classList.add('ticketModeration_div');
    title.classList.add('ticketModeration_title');

    const description = document.createElement('div');
    description.textContent = `${item.spectacleOrPlace_id.theatreOrGenre_id.name} |  ${item.spectacleOrPlace_id.name}`;
    description.classList.add('ticketModeration2_div');

    const placeLocation = document.createElement('div');
    placeLocation.textContent = `Расположение мест: ${item.placeLocation}`;
    placeLocation.classList.add('ticketModeration_div');

    const row = document.createElement('div');
    row.textContent = `Ряд: ${item.row} ${'\u00A0\u00A0\u00A0'} Номер места: ${
      item.placeNumber
    }`;
    row.classList.add('ticketModeration2_div');

    const qty = document.createElement('div');
    qty.textContent = `Количество билетов: ${item.qty}`;
    qty.classList.add('ticketModeration_div');

    const pricePerTicket = document.createElement('div');
    pricePerTicket.textContent = `Цена за 1 билет: ${item.pricePerTicket}`;
    pricePerTicket.classList.add('ticketModeration2_div');

    const sellerUsername = document.createElement('div');
    sellerUsername.textContent = `Продавец: @${item.username}`;
    sellerUsername.classList.add('ticketModeration2_div');

    const btnYes = document.createElement('button');
    btnYes.textContent = 'разместить';
    btnYes.classList.add('ticketModerationBtn_yes');
    btnYes.dataset.uniqueId = item.id;

    btnYes.addEventListener('click', async () => {
      btnYes.disabled = true;
      const uid = event.target.dataset.uniqueId;

      const elementsYes = document.querySelectorAll('.ticketModerationBtn_yes');
      elementsYes.forEach((el) => {
        el.disabled = true;
      });

      const elementsNo = document.querySelectorAll('.ticketModerationBtn_no');
      elementsNo.forEach((el) => {
        el.disabled = true;
      });

      const resp = await fetch(
        'https://api.directual.com/good/api/v5/data/rqstfromadminticketmoderation/rqstfromAdminTicketModeration?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=',
        {
          method: 'POST',
          body: JSON.stringify({
            action: 'approve',
            rqstToTicket_id: uid,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await resp.json();
      console.log(json);

      const div_successText = document.getElementById('div_successText');
      const successText = document.getElementById('successText');
      successText.textContent = 'Билет одобрен и размещен';
      div_successText.style.display = 'flex';

      setTimeout(() => {
        div_successText.style.display = 'none';
        window.location.href = 'showTicketShouldBeModerated.html';
      }, 1500);
    });

    const btnNo = document.createElement('button');
    btnNo.textContent = 'отклонить';
    btnNo.classList.add('ticketModerationBtn_no');
    btnNo.dataset.uniqueId = item.id;

    btnNo.addEventListener('click', async () => {
      const uid = event.target.dataset.uniqueId;

      // добавляем disabled на все кнопки, чтобы нельзя было их нажать во время запроса
      const elementsYes = document.querySelectorAll('.ticketModerationBtn_yes');
      elementsYes.forEach((el) => {
        el.disabled = true;
      });

      const elementsNo = document.querySelectorAll('.ticketModerationBtn_no');
      elementsNo.forEach((el) => {
        el.disabled = true;
      });

      const resp = await fetch(
        'https://api.directual.com/good/api/v5/data/rqstfromadminticketmoderation/rqstfromAdminTicketModeration?appID=5481b0b8-ec7f-457d-a582-3de87fb4f347&sessionID=',
        {
          method: 'POST',
          body: JSON.stringify({
            action: 'reject',
            rqstToTicket_id: uid,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const json = await resp.json();
      console.log(json);

      const div_successText = document.getElementById('div_successText');
      const successText = document.getElementById('successText');
      successText.textContent = 'Билет отклонен';
      div_successText.style.display = 'flex';

      setTimeout(() => {
        div_successText.style.display = 'none';
        window.location.href = 'showTicketShouldBeModerated.html';
      }, 1500);
    });

    newDiv.appendChild(title);
    newDiv.appendChild(description);
    newDiv.appendChild(placeLocation);
    newDiv.appendChild(row);
    newDiv.appendChild(qty);
    newDiv.appendChild(pricePerTicket);
    newDiv.appendChild(sellerUsername);
    newDiv.appendChild(btnYes);
    newDiv.appendChild(btnNo);
    schedulediv.appendChild(newDiv);
  });

  hideloader();
}
