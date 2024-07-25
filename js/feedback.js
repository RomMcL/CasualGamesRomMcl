
const emName = document.getElementById('name');
const emEmail = document.getElementById('email');
const emMessage = document.getElementById('message');
const infoDiv = document.getElementById('information');
const infoText = infoDiv.querySelector('h4');
const modalInfoDiv = document.getElementById('modal-information');
const sendMailBtn = document.getElementById('sendMailBtn');


// Доступ к сервису mailJS
(function(){
    emailjs.init({
      publicKey: "hIlfX1e2Nrxgg8xfw",
    });
})();


// Заполнение формы (общение с пользователем)

const defaultText = infoText.innerText;

const phrasesForUser = {
    nameFocus: 'Представьтесь, пожалуйста! Приятно знать от кого получаешь сообщение.',
    emailFocus: 'Это поле не обязательно для заполнения, однако если ваше сообщение подразумевает ответ, не забудте заполнить его!',
    messageFocus: 'Не скупитесь на слова, проявите фантазию! =)',
    emptyForm: 'Форма не полностью заполнена.',
}

function recommendationsForUser(event) {

    switch (event.target.id) {
        case 'name': 
            infoText.innerText = phrasesForUser['nameFocus'];
            this.classList.remove('bg-warning');
            break;
        case 'email': 
            infoText.innerText = phrasesForUser['emailFocus'];
            break;
        case 'message': 
            infoText.innerText = phrasesForUser['messageFocus'];
            this.classList.remove('bg-warning');
            break;
    }    
}

emName.addEventListener('focus', recommendationsForUser);
emEmail.addEventListener('focus', recommendationsForUser);
emMessage.addEventListener('focus', recommendationsForUser);
infoDiv.addEventListener('click', () => infoText.innerText = defaultText);

// Отправка сообщения

sendMailBtn.addEventListener('click', checkForm);


function checkForm() {

    if (emName.value.length < 1) {
        emName.classList.add('bg-warning');
        infoText.innerText = `${phrasesForUser['emptyForm']}\n
                              ${phrasesForUser['nameFocus']}`; 
    } else if (emMessage.value.length < 20) {
        emMessage.classList.add('bg-warning');
        infoText.innerText = `${phrasesForUser['emptyForm']}\nСообщение слишком короткое.\n
                              ${phrasesForUser['messageFocus']}`;
    } else {
        sendMail();
    }
}


function sendMail() {

    sendingMessage();

    let parameters = {
        name: emName.value,
        email: emEmail.value,
        message: emMessage.value,
    };

    const serviseID = 'service_az3tqdr';
    const templateID = 'template_a035n0n';

    emailjs.send(serviseID, templateID, parameters).then((res) => {
        emName.value = '';
        emEmail.value = '';
        emMessage.value = '';

        resultSending();

        /* console.log(res); */
    }).catch((err) => console.log(err));
}


// Информация о прогрессе отправки сообщения

let modalText = document.createElement('h3');
let modalImg = document.createElement('img');

let intervalAnimIcon = '';

modalInfoDiv.appendChild(modalText);
modalInfoDiv.appendChild(modalImg);


function sendingMessage() {
    
    modalText.classList.add('text-center');
    modalText.textContent = 'Отправляю сообщение...';
    modalImg.classList.add('modal-img', 'bg-light');
    modalImg.alt = 'Прогресс загрузки';
    modalImg.src  = 'img/return.svg';
    sendMailBtn.classList.add('disabled');
    modalInfoDiv.style.display = 'flex';

    intervalAnimIcon = setInterval(animateIcon, 500, {
        duration: 500,
        timing(timeFraction) {
            return timeFraction;
        },
        draw(progress) {
            modalImg.style.transform = `rotate(${-progress*360}deg)`;
        }
    });
}

function resultSending() {
    clearInterval(intervalAnimIcon);
    modalText.textContent = 'Сообщение отправлено. Спасибо за обратную связь!';
    modalImg.src  = 'img/ok.svg';
    sendMailBtn.classList.remove('disabled');
    infoText.innerText = defaultText;
    
    setTimeout(() => {
        modalInfoDiv.innerHTML = '';
        modalInfoDiv.style.display = 'none';
    }, 4000);
}

function animateIcon ({timing, draw, duration}) {

    let start = performance.now();
  
    requestAnimationFrame(function animate(time) {
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) timeFraction = 1;  
      let progress = timing(timeFraction)  
      draw(progress);  
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      } 
    });  
}






