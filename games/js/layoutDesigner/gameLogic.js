import { settingsDict, senorSayDict, wordsDict, soundsDict } from "./parametersGame.js"
import { wordDeclension } from "../commonUtilities.js"
import { createTagsArray, alertResultAnswer } from "./layoutDesignerUtils.js"
import { createGameCard } from "./gameCard.js"
import { createGameMenu, codeReview, evilSenor, musicSelected } from "./gameMenu.js"
import { startSenorQuestion, countersSQ } from "./gameSenorQuestions.js"
import { endGame } from "./gameEnd.js"
import { createPlayer } from "./gameSound.js"



export const gameLogic = (tagsNum, minute, second) => {
    let indexFirstCard = null;
    let indexSecondCard = null;
    let clickableCard = true;
    
    let isGameWin = false;
    let isDeadline = false;
    let isLimitBreams = false;
    let restarted = false;
 
    // Создание элементов игрового окна
    const header = document.querySelector('.header');
    header.style.display = 'none';
    document.documentElement.style.setProperty('--dialogBubble-color', '');

    const gameSection = document.querySelector('.game-section-container');

    const senorCommit = document.createElement('div');   
    senorCommit.id = 'senor-commit';
    const dialodCommit = document.createElement('p');
    dialodCommit.id = 'dialod-commit';
    dialodCommit.classList.add('dialog');
    dialodCommit.textContent = senorSayDict['startGame'];

    const gameTable = document.createElement('div');
    gameTable.classList.add('game-table', `table-${tagsNum}`); 
    const cardCenter = document.createElement('div');
    cardCenter.classList.add('game-card-center', `center-card-${tagsNum}`);
    musicSelected && (cardCenter.style.backgroundImage = 'url("./img/layoutDesigner/music_djun.png")');

    const senorCabinet = document.createElement('div');
    senorCabinet.classList.add('senor-cabinet');

    const cabinetSenorImg = document.createElement('div');
    cabinetSenorImg.id = 'cabinet-senorImg';

    const deadlineWrapper = document.createElement('div');
    deadlineWrapper.classList.add('deadline-wrapper');   
    const deadlineTitle = document.createElement('span');
    deadlineTitle.classList.add('cabInfo-title');
    deadlineTitle.textContent = 'Дедлайн:';
    const timerHead = document.createElement('span');
    timerHead.classList.add('timer-head-footer');
    timerHead.textContent = 'осталось';
    const cabInfoDeadline = document.createElement('span');
    cabInfoDeadline.id = 'cabInfo-timer';
    cabInfoDeadline.textContent = '--:--';
    const timerFooter = document.createElement('span');
    timerFooter.classList.add('timer-head-footer');
    timerFooter.textContent = 'мин : сек';

    let breamWrapper = null;
    if (evilSenor) {
        breamWrapper = document.createElement('div');
        breamWrapper.classList.add('bream-wrapper');
        const cabInfoBreamTitle = document.createElement('p');
        cabInfoBreamTitle.classList.add('cabInfo-title');
        cabInfoBreamTitle.textContent = 'Лещи от Сеньора:';
        let breamImg = document.createElement('div');
        breamImg.id = 'bream-img';
        let countBreamSpan = document.createElement('span');
        countBreamSpan.id = 'bream-count';
        countBreamSpan.textContent = countersSQ['countBream'];
        breamWrapper.append(cabInfoBreamTitle, breamImg, countBreamSpan);
    }

    const gameFooter = document.createElement('div');
    gameFooter.classList.add('game-footer');
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Рестарт';
    restartBtn.classList.add('game-btns');

    const cardsTags = createTagsArray(tagsNum);

    gameSection.innerHTML = '';
    
    // Компоновка элементов
    gameSection.append(senorCommit,
                       cabinetSenorImg,
                       gameTable,
                       senorCabinet,
                       gameFooter
                       );

    senorCommit.appendChild(dialodCommit);

    gameTable.append(cardCenter);
    cardsTags.forEach(tag => gameTable.append(createGameCard('cartShirt', tag)));

    senorCabinet.append( deadlineWrapper);
    evilSenor && senorCabinet.append(breamWrapper);

    deadlineWrapper.append(deadlineTitle, timerHead, cabInfoDeadline, timerFooter);

    gameFooter.appendChild(restartBtn);
    musicSelected && gameFooter.appendChild(createPlayer());

    // Включение музыки
    if (musicSelected) {
        const player = document.getElementById('music');
        const btnPlayPause = document.getElementById('btn-playPause');
        if (player.paused || player.ended) {
            btnPlayPause.style.backgroundImage = soundsDict['pause'];
            player.play();}
    }
    

    // Кейсы для изменения игрового поля в зависимости от количества карточек 
    const cards = document.querySelectorAll('.game-card');
    switch(tagsNum) {
        case 8: 
            gameTable.style.gap = '3%';
            break;
        default:
            break;
    }

    let allSecondsSpent = 0;
    
    // Остановка и завершение игры
    const stopGame = (message) => {    
        dialodCommit.textContent = senorSayDict[message];
        isGameWin ? dialodCommit.style.backgroundColor = settingsDict['winСolor'] :
                    dialodCommit.style.backgroundColor = settingsDict['lossСolor'];
        for(let card of cards) card.style.pointerEvents = 'none';
        restartBtn.style.pointerEvents = 'none';
        
        const minutesSpent = Math.floor((allSecondsSpent - 1) / 60);
        const secondsSpent = (allSecondsSpent - 1) % 60;
        const timeSpent = `${minutesSpent} ${wordDeclension(minutesSpent, wordsDict['minute'])} и ${secondsSpent} ${wordDeclension(secondsSpent, wordsDict['second'])}`;

        const finalStaus = {'isGameWin': isGameWin, 'isDeadline': isDeadline, 'isLimitBreams': isLimitBreams}
        
        endGame(tagsNum, timeSpent, finalStaus);
    }

    // Таймер дедлайна
    const deadLineTimer = (min, sec) => {
        let currentMin = min;
        let currentSec = sec;
        cabInfoDeadline.style.color = "inherit"
        let timerInterval = setInterval(() => {
            /* console.log('тик') */
            if (isGameWin || isLimitBreams || isDeadline || restarted)  {
                clearInterval(timerInterval);
                // console.log('таймер выключен')
            }
            else {
                if (currentMin == 0 && currentSec <= 10) {
                    cabInfoDeadline.style.color = "red";
                    currentSec > 9 && alertResultAnswer(dialodCommit, 'lossСolor', 200, 'deadlineWarning');
                }

                cabInfoDeadline.textContent = `${currentMin.toString().padStart(2, '0')}:${currentSec.toString().padStart(2, '0')}`;

                if (currentMin <= 0 && currentSec <= 0) {
                    // console.log('Время вышло! Проигрыш.');
                    isDeadline = true;
                    stopGame('deadline');
                } else if (currentSec == 0) {
                    currentSec = 59;
                    currentMin--;
                } else currentSec--;
            }
            allSecondsSpent++;
        }, 1000);
    }
    deadLineTimer(minute, second);

    // Слушатель кнопки Рестарт
    restartBtn.addEventListener('click', () => {
        restarted = true;
        createGameMenu();
    });

    // Слушатель Карточек
    cards.forEach((card, index) => card.addEventListener('click', () => {
        
        if (countersSQ['countBream'] >= settingsDict['maxBreams'] && evilSenor) {
            // console.log('Перебор Лещей! Проигрыш.');
            isLimitBreams = true;
            stopGame('limitBreams');           
        }

        if (clickableCard == true && !card.classList.contains('successfully')) {

            card.classList.add('flip');

            if (indexFirstCard == null) {
                indexFirstCard = index;
            } else {
                if (index != indexFirstCard) {
                    indexSecondCard = index;
                    clickableCard = false;
                }
            }
        }

        if (indexFirstCard != null && indexSecondCard != null && indexFirstCard != indexSecondCard) {

            gameTable.style.pointerEvents = 'none';      /* ---------------------------------- */
            setTimeout(() => {                           /* Фиксим багулю гиперактивного юзера */
                gameTable.style.pointerEvents = 'auto';  /* ---------------------------------- */
            }, settingsDict['conversionDelay']);

            let firstTag = cards[indexFirstCard].firstChild.innerText;
            let secondTag = cards[indexSecondCard].firstChild.innerText;

            // Пара угадана
            const guessedPair = () => {
                // console.log("угадали"); 
                dialodCommit.textContent = senorSayDict['anyQuestions'];
                setTimeout(() => {
                    try {
                        cards[indexFirstCard].classList.add('successfully');
                        cards[indexSecondCard].classList.add('successfully');
                        indexFirstCard = null;
                        indexSecondCard = null;
                        clickableCard = true;
                      } catch (e) {
                        // console.error(e);
                        console.log('Очень часто тыкаешь!');
                      }
                }, settingsDict['conversionDelay']);
                                                
                let currentTag = '';
                /* console.log("первая = " + firstTag);
                console.log("вторая = " + secondTag); */
                if(firstTag.replace(/[^a-zA-Z]/g, '') == '') currentTag = secondTag.replace(/[^a-zA-Z]/g, '');
                else currentTag = firstTag.replace(/[^a-zA-Z]/g, '');

                if (Array.from(cards).every(card => card.className.includes('flip'))) {
                    // console.log('Приз в студию!!!');
                    isGameWin = true;
                    stopGame('projectCompleted');                  
                } else startSenorQuestion(currentTag);                
            }

            // Пара не угадана
            const notGuessedPair = () => {
                // console.log("не угадали");
                setTimeout(() => {  
                    try {
                        cards[indexFirstCard].classList.remove('flip');
                        cards[indexSecondCard].classList.remove('flip');                   
                        indexFirstCard = null;
                        indexSecondCard = null;
                        clickableCard = true; 
                      } catch (e) {
                        // console.error(e);
                        //console.log('Часто тыкаешь!');
                      }
                }, settingsDict['conversionDelay']);
            }

            if (cards[indexFirstCard].firstElementChild.className === cards[indexSecondCard].firstElementChild.className) {

                if (codeReview && firstTag.includes('/')) {
                    // console.log('codeReview: ' + "неверный порядок");
                    if (evilSenor) {
                        cabinetSenorImg.style.backgroundImage = 'url("./img/layoutDesigner/evil_senor.png")';
                        setTimeout(() => cabinetSenorImg.style.backgroundImage = 'url("./img/layoutDesigner/menu_senor.png")', 1000);
                    }
                    alertResultAnswer(dialodCommit, 'lossСolor', 200, 'codeReview');
                    notGuessedPair();
                } else guessedPair();
                 
            } else {                 
                notGuessedPair();               
            }
        }        
    }));
}
