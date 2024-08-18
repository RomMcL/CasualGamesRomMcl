import { gameLogic } from "./gameLogic.js"
import { senorSayDict } from "./parametersGame.js"
import { countBreamObj } from "./gameSenorQuestions.js"

export let codeReview = false;
export let evilSenor = false;


export const createGameMenu = () => {

    const header = document.querySelector('.header');
    header.style.display = 'block';

    /* Раздел Выбор проекта */
    const block_startGame = document.createElement('div');
    block_startGame.classList.add('game-menu__block_startGame');
    const title_startGame = document.createElement('h2');
    title_startGame.textContent = 'Выбор проекта';
    title_startGame.classList.add('game-menu__title_startGame');

    /* Раздел Настройка сложности */
    const block_complexityGame = document.createElement('div');
    block_complexityGame.classList.add('game-menu__block_complexityGame');
    const title_complexityGame = document.createElement('h3');
    title_complexityGame.textContent = 'Настройка сложности';
    title_complexityGame.classList.add('game-menu__title_complexityGame');

    const codeReview_CheckBox = document.createElement('input');
    codeReview_CheckBox.type = "checkbox";
    codeReview_CheckBox.id = "checkbox_codeReview";
    const label_codeReview_CheckBox = document.createElement('label')
    label_codeReview_CheckBox.htmlFor = "checkbox_codeReview";
    label_codeReview_CheckBox.append(codeReview_CheckBox);
    label_codeReview_CheckBox.append(document.createTextNode('Код Ревью'));

    const evilSenor_CheckBox = document.createElement('input');
    evilSenor_CheckBox.type = "checkbox";
    evilSenor_CheckBox.id = "checkbox_evilSenor";
    const label_evilSenor_CheckBox = document.createElement('label')
    label_evilSenor_CheckBox.htmlFor = "checkbox_evilSenor";
    label_evilSenor_CheckBox.append(evilSenor_CheckBox);
    label_evilSenor_CheckBox.append(document.createTextNode('Злой Сеньор'));

    codeReview ? codeReview_CheckBox.checked = true : codeReview_CheckBox.checked = false;
    evilSenor ? evilSenor_CheckBox.checked = true : evilSenor_CheckBox.checked = false;

    
    /* Раздел Инфо */
    const senorSay = document.createElement('div');
    senorSay.classList.add('game-menu__senorSay');
    senorSay.innerText = senorSayDict['hello'];

    /* Раздел Вопросов */
    const djunrAsk = document.createElement('div');
    djunrAsk.classList.add('game-menu__djunrAsk');
    djunrAsk.innerText = 'Вопросики';


    /* Изображения Сеньора и Джуна */
    const heroesImgs = document.createElement('div');
    heroesImgs.classList.add('game-menu__heroesImgs');
    const djunImg = document.createElement('div');
    djunImg.classList.add('game-menu__djunImg');
    const senorImg = document.createElement('div');
    senorImg.classList.add('game-menu__senorImg');

    
    /* Очистка контейнера и обнуление переменных */
    const gameSection = document.querySelector('.game-section-container');
    gameSection.innerHTML = '';
    countBreamObj['countBream'] = 0;
   

    /* Создание кнопок */
    const createStarttButton = (tagsNum, minute, second) => {
        const button = document.createElement('button');
        button.classList.add('game-menu__difficult-btn');
        button.innerText = `Сверстать проект на\n${tagsNum} тегов`;
        button.addEventListener('click', () => gameLogic(tagsNum, minute, second));
        return button;
    }

    /* Слушатели чекбоксов */
    codeReview_CheckBox.addEventListener('change', () => codeReview_CheckBox.checked ? codeReview = true : codeReview = false);
    evilSenor_CheckBox.addEventListener('change', () => evilSenor_CheckBox.checked ? evilSenor = true : evilSenor = false);


    /* Компановка элементов */
    gameSection.append(
        block_startGame,
        block_complexityGame,
        senorSay,
        djunrAsk,
        heroesImgs,        
    );

    block_startGame.append(
        title_startGame,
        createStarttButton(8, 1, 5),     //кол-во карточек, минуты, секунды дедлайна
        createStarttButton(12, 2, 10),
        createStarttButton(24, 3, 20),
        createStarttButton(32, 4, 30),
    );

    block_complexityGame.append(
        title_complexityGame,
        label_codeReview_CheckBox,
        label_evilSenor_CheckBox,
    );

    heroesImgs.append(
        djunImg,
        senorImg,
    );

   


}