import { gameLogic } from "./gameLogic.js"

export let codeReview = false;
export let evilSenor = false;


export const createGameMenu = () => {

    /* Раздел Выбор проекта */
    const block_startGame = document.createElement('div');
    block_startGame.classList.add('game-menu__block_startGame');
    const title_startGame = document.createElement('h2');
    title_startGame.textContent = 'Выбор проекта';
    title_startGame.classList.add('game-menu__title_startGame');

    /* Раздел инфо и настройки сложности */
    const block_infoGame = document.createElement('div');
    block_infoGame.classList.add('game-menu__block_infoGame');

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
    senorSay.innerText = 'Привет, Джуниор! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex saepe quam libero qui, incidunt labore mollitia accusamus, debitis, voluptatibus sit cumque ducimus porro. Unde doloremque dolore neque illo, inventore dolores. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex saepe quam libero qui, incidunt labore mollitia accusamus, debitis, voluptatibus sit cumque ducimus porro. Unde doloremque dolore neque illo, inventore dolores.';
    const menuImgs = document.createElement('div');
    menuImgs.classList.add('game-menu__menuImgs');
    const djunImg = document.createElement('div');
    djunImg.classList.add('game-menu__djunImg');
    const senorImg = document.createElement('div');
    senorImg.classList.add('game-menu__senorImg');



    /* Очистка контейнера */
    const gameSection = document.querySelector('.game-section-container');
    gameSection.innerHTML = '';
    /* document.querySelector('.confetti').innerHTML = ''; */



    /* Создание кнопок */
    const createStarttButton = (tagsNum) => {
        const button = document.createElement('button');
        button.classList.add('game-menu__difficult-btn');
        button.innerText = `Сверстать проект на\n${tagsNum} тегов`;
        button.addEventListener('click', () => gameLogic(tagsNum));
        return button;
    }

    /* Слушатели чекбоксов */
    codeReview_CheckBox.addEventListener('change', () => codeReview_CheckBox.checked ? codeReview = true : codeReview = false);
    evilSenor_CheckBox.addEventListener('change', () => evilSenor_CheckBox.checked ? evilSenor = true : evilSenor = false);


    /* Компановка элементов */
    gameSection.append(
        block_startGame,
        block_infoGame,        
    );

    block_startGame.append(
        title_startGame,
        createStarttButton(8),
        createStarttButton(12),
        createStarttButton(24),
        createStarttButton(32),
    );

    block_infoGame.append(
        block_complexityGame,
        senorSay,
        menuImgs,
    );

    block_complexityGame.append(
        title_complexityGame,
        /* codeReview_CheckBox, */
        label_codeReview_CheckBox,
        /* evilSenor_CheckBox, */
        label_evilSenor_CheckBox,
    );

    menuImgs.append(
        djunImg,
        senorImg,
    );
}