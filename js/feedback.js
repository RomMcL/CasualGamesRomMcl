
const emName = document.getElementById('name');
const emEmail = document.getElementById('email');
const emMessage = document.getElementById('message');
const messCount = document.getElementById('mess-count');
const checkRobot = document.getElementById('flexCheckRobot');
const switchCheckMood = document.getElementById('flexSwitchCheckMood');
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
const minMessLen = 30;
messCount.children[1].innerText = minMessLen;


const phrasesForUser = {
    nameFocus: 'Представьтесь, пожалуйста! Приятно знать от кого получаешь сообщение.',
    emailFocus: 'Это поле не обязательно для заполнения, однако если ваше сообщение подразумевает ответ, не забудте заполнить его!',
    messageFocus: 'Не скупитесь на слова, проявите фантазию! =)',
    badRobot: 'Я предпочитаю не общаться с роботами, особенно если они в плохом настроении. Да и с депрессивными людьми тоже! Вы же не такой человек?',
    emptyForm: 'Форма не полностью заполнена.',
}

function recommendationsForUser(event) {

    switch (event.target.id) {
        case 'name': 
            infoText.innerText = phrasesForUser['nameFocus'];
            this.setAttribute('placeholder', '')
            this.classList.add('fw-bold');
            this.classList.remove('bg-warning');
            break;
        case 'email': 
            infoText.innerText = phrasesForUser['emailFocus'];
            break;
        case 'message': 
            infoText.innerText = phrasesForUser['messageFocus'];
            this.setAttribute('placeholder', '')
            this.classList.add('fw-bold');
            this.classList.remove('bg-warning');
            break;
    }    
}

function choiceCheckbox(event) {

    event.target.classList.remove('bg-warning');
    event.target.nextElementSibling.classList.remove('bg-warning');
        
    switch (event.target.id) {
        case 'flexCheckRobot':
            if (event.target.checked) event.target.nextElementSibling.children[0].innerHTML = '&#128125;';
            else event.target.nextElementSibling.children[0].innerHTML = '&#129302;';                 
            break;
        case 'flexSwitchCheckMood':
            if (event.target.checked) event.target.nextElementSibling.innerText = 'Я на пизитиве!';
            else event.target.nextElementSibling.innerText = 'Я в плохом настроении';        
            break;
    }    
}



function countChar(event) {
       const messLength = event.target.value.length;
       messCount.children[0].innerText = messLength;
}


emName.addEventListener('focus', recommendationsForUser);
emEmail.addEventListener('focus', recommendationsForUser);
emMessage.addEventListener('focus', recommendationsForUser);
emMessage.addEventListener('keyup', countChar);
infoDiv.addEventListener('click', () => infoText.innerText = defaultText);
checkRobot.addEventListener('change', choiceCheckbox);
switchCheckMood.addEventListener('change', choiceCheckbox);

// Отправка сообщения

sendMailBtn.addEventListener('click', checkForm);


function checkForm() {

    if (emName.value.length < 1) {
        emName.classList.add('bg-warning');
        infoText.innerText = `${phrasesForUser['emptyForm']}\n
                              ${phrasesForUser['nameFocus']}`; 
    } else if (emMessage.value.length < minMessLen) {
        emMessage.classList.add('bg-warning');
        infoText.innerText = `${phrasesForUser['emptyForm']}\nСообщение слишком короткое.\n
                              ${phrasesForUser['messageFocus']}`;
    } else if (!checkRobot.checked) {
        checkRobot.nextElementSibling.classList.add('bg-warning');
        checkRobot.classList.add('bg-warning');
        infoText.innerText = `${phrasesForUser['emptyForm']}\n
                              ${phrasesForUser['badRobot']}`;
        
    } else if (!switchCheckMood.checked) {
        switchCheckMood.nextElementSibling.classList.add('bg-warning');
        switchCheckMood.classList.add('bg-warning');
        infoText.innerText = `${phrasesForUser['emptyForm']}\n
                              ${phrasesForUser['badRobot']}`;
       
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
    emName.setAttribute('placeholder', 'Введите имя')
    emName.classList.remove('fw-bold');
    emMessage.setAttribute('placeholder', 'Ваше сообщение...')
    emMessage.classList.remove('fw-bold');
    messCount.children[0].innerText = '0';

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






