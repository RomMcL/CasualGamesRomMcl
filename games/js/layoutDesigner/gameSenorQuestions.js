
import { pairedTagsDict, singleTagsDict, settingsDict, senorSayDict } from "./parametersGame.js"
import { createBream, alertResultAnswer } from "./layoutDesignerUtils.js"
import { shufflingArray } from "../commonUtilities.js"
import { evilSenor } from "./gameMenu.js"

export let countersSQ = {'countBream': 0, 'countSenorQuestion': 0};

const modalSQ = document.getElementById('modal-senorQuestion');
modalSQ.style.transition = `opacity ${settingsDict['fadeOutDelay']}ms`;

const tagsDict = Object.assign({}, pairedTagsDict, singleTagsDict);

// Запуск модального окна с вопросом Сеньора
export const startSenorQuestion = (currentTag) => {
  
    let keysTagsDict = Object.keys(tagsDict);
    let indexCorrectKeys = keysTagsDict.indexOf(currentTag);
    indexCorrectKeys !== -1 && keysTagsDict.splice(indexCorrectKeys, 1);
    const uncorrectKeys = shufflingArray(keysTagsDict).slice(0, 3);

    const answers = [];
    for(let uncorrectKey of uncorrectKeys) {
        answers.push(tagsDict[uncorrectKey]);
    }
    answers.push(tagsDict[currentTag]);

    const shufflingAnswers = shufflingArray(answers);

    createModalQuestion(currentTag, shufflingAnswers);

    modalSQ.style.display = 'block';
    setTimeout(() => modalSQ.style.opacity = '1', settingsDict['fadeInDelay'])  
    modalSQ.style.pointerEvents = 'auto';    
}

// Создание модального окна с вопросом Сеньора
const createModalQuestion = (tag, answers) => {

        const questionTag = `<${tag}>`
    
        const sqContainer = document.createElement('div');
        sqContainer.id = 'senorQuestion-container';

        const sqSenorImg = document.createElement('img');
        sqSenorImg.id = 'senorQuestion-senorImg';
        sqSenorImg.src = './img/layoutDesigner/menu_senor.png';
        sqSenorImg.alt = 'Сеньор';

        const sqQuestion = document.createElement('div');
        sqQuestion.id = 'senorQuestion-question';

        const sqQuestionTitle = document.createElement('h1');
        sqQuestionTitle.id = 'senorQuestion-title';
        sqQuestionTitle.textContent = senorSayDict['questionTitle'];

        const sqQuestionText = document.createElement('h2');
        sqQuestionText.id = 'senorQuestion-text';
        sqQuestionText.classList.add('dialog');
        sqQuestionText.innerText = `Джуниор, ты используешь тег ${questionTag}.\nА для чего он нужен?`;

        const sqAnswersList = document.createElement('ul');
        sqAnswersList.id = 'senorQuestion-answersList'; 

        const answerBtn = document.createElement('span');
        answerBtn.id = 'senorQuestion-btn';
        answerBtn.classList.add('modalGameBtn', 'btn-notActive');

        for (let i=0; i<4; i++) {
            const keyOption = Object.keys(tagsDict).find(k => tagsDict[k] === answers[i]);

            const option = document.createElement('li');

            const optionRadio = document.createElement('input');
            optionRadio.type = 'radio';
            optionRadio.name = 'optionRadio';
            optionRadio.value = keyOption;
            optionRadio.id = `optionRadio-${i+1}`;
            optionRadio.classList.add('option-radio');

            const label_optionRadio = document.createElement('label')
            label_optionRadio.htmlFor = `optionRadio-${i+1}`;
            label_optionRadio.appendChild(optionRadio);
            label_optionRadio.appendChild(document.createTextNode(answers[i]));
            option.appendChild(label_optionRadio);
            sqAnswersList.appendChild(option);

            option.addEventListener('change', () => {
                answerBtn.classList.contains('btn-notActive') && answerBtn.classList.remove('btn-notActive')
            })
        }

        answerBtn.textContent = 'Ответить';
        answerBtn.addEventListener('click', giveAnswer.bind(null, tag));

        modalSQ.appendChild(sqContainer);
        sqContainer.append(sqSenorImg, sqQuestion, sqAnswersList, answerBtn);
        sqQuestion.append(sqQuestionTitle, sqQuestionText);
}

// Обработка ответа на вопрос Сеньора
const giveAnswer = (tag) => {

    const dialodCommit = document.getElementById('senor-commit').firstChild;
    let options = document.getElementsByName('optionRadio');
    let optionValue = '';
    let currentOption = null;

    for(let option of options) {
        if (option.checked) {
            optionValue = option.value;
            currentOption = option;
        }
    }

    if (tag == optionValue) {
        // console.log('правильно ответил');
        currentOption.parentElement.style.backgroundColor = settingsDict['winСolor'];
        alertResultAnswer(dialodCommit, 'winСolor', 200, 'correctAnswer');
    } else {
        // console.log('не правильно ответил');
        currentOption.parentElement.style.backgroundColor = settingsDict['lossСolor'];
        alertResultAnswer(dialodCommit, 'lossСolor', 200, 'incorrectAnswer');
        countersSQ['countBream']++
        if (evilSenor) {
            document.getElementById('bream-count').textContent = countersSQ['countBream'];
            createBream(countersSQ['countBream']);
            dialodCommit.textContent += senorSayDict['evilIncorrectAnswer'];
            const cabinetSenorImg = document.getElementById('cabinet-senorImg');
            cabinetSenorImg.style.backgroundImage = 'url("./img/layoutDesigner/evil_senor.png")';
            setTimeout(() => cabinetSenorImg.style.backgroundImage = 'url("./img/layoutDesigner/menu_senor.png")', 2000);
        } else dialodCommit.textContent += ` Правильный ответ: <${tag}> ${tagsDict[tag]}`;
    }

    countersSQ['countSenorQuestion']++;
    
    modalSQ.style.opacity = '0';
    modalSQ.style.pointerEvents = 'none';
    setTimeout(() => {
        modalSQ.innerHTML = '';
        modalSQ.style.display = 'none';
    }, settingsDict['fadeOutDelay']);  
}

