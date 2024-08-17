
import { pairedTagsDict, singleTagsDict, settingsDict } from "./parametersGame.js"
import { shufflingArray } from "../commonUtilities.js"


const modalSQ = document.getElementById('modal-senorQuestion');
modalSQ.style.transition = `opacity ${settingsDict['fadeOutDelay']}ms`;

const tagsDict = Object.assign({}, pairedTagsDict, singleTagsDict);


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
    setTimeout(() => modalSQ.style.opacity = '1', 500)  
    modalSQ.style.pointerEvents = 'auto';    
}



const createModalQuestion = (tag, answers) => {

        const questionTag = `<${tag}>`
    
        const sqContainer = document.createElement('div');
        sqContainer.id = 'senorQuestion-container';
        const sqSenorImg = document.createElement('img');
        sqSenorImg.id = 'senorQuestion-senorImg';
        sqSenorImg.src = './img/layoutDesigner/menu_senor.png';
        sqSenorImg.alt = 'Вопрос от Сеньора';
        const sqQuestion = document.createElement('h2');
        sqQuestion.id = 'senorQuestion-question';
        const sqAnswersList = document.createElement('ul');
        sqAnswersList.id = 'senorQuestion-answersList';        
        const answerBtn = document.createElement('span');
        answerBtn.id = 'senorQuestion-btn';
        answerBtn.classList.add('modalGameBtn', 'btn-notActive');


        sqQuestion.innerText = `Джуниор, ты используешь тег ${questionTag}.\nА для чего он нужен?`;

        for (let i=0; i<4; i++) {

            const keyOption = Object.keys(tagsDict).find(k => tagsDict[k] === answers[i]);


            const option = document.createElement('li');

            const optionRadio = document.createElement('input');
            optionRadio.type = "radio";
            optionRadio.name = "optionRadio";
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
}


const giveAnswer = (tag) => {

    let options = document.getElementsByName('optionRadio');
    let optionValue = '';
    let currentOption = null;
    /* for(let option of options) option.checked && (optionValue = option.value); */
    for(let option of options) {
        if (option.checked) {
            optionValue = option.value;
            currentOption = option;
        }
    }



    if (tag == optionValue) {
        console.log('правильно');
        currentOption.parentElement.style.backgroundColor = 'green';
    } else {
        console.log('не правильно');
        currentOption.parentElement.style.backgroundColor = 'red';
    }

    

    /* console.log(optionValue); */

    

    modalSQ.style.opacity = '0';
    modalSQ.style.pointerEvents = 'none';
    setTimeout(() => {
        modalSQ.innerHTML = '';
        modalSQ.style.display = 'none';
    }, settingsDict['fadeOutDelay']);
   
}