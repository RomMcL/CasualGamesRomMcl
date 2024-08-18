import { settingsDict, senorSayDict } from "./parametersGame.js"
import { createTagsArray } from "./layoutDesignerUtils.js"
import { createGameCard } from "./gameCard.js"
import { createGameMenu, codeReview, evilSenor } from "./gameMenu.js"
import { startSenorQuestion, countBreamObj } from "./gameSenorQuestions.js"


export const gameLogic = (tagsNum, minute, second) => {
    let indexFirstCard = null;
    let indexSecondCard = null;
    let clickableCard = true;
    let isDeadline = false;
    
    const header = document.querySelector('.header');
    header.style.display = 'none';

    const gameSection = document.querySelector('.game-section-container');

    const senorCommit = document.createElement('div');
    senorCommit.textContent = senorSayDict['startGame'];
    senorCommit.id = 'senor-commit';
    const gameTable = document.createElement('div');
    gameTable.classList.add('game-table', `table-${tagsNum}`); 
    const cardCenter = document.createElement('div');
    cardCenter.classList.add('game-card-center', `center-card-${tagsNum}`);
    const senorCabinet = document.createElement('div');
    senorCabinet.classList.add('senor-cabinet');
    const cabinetSenorImg = document.createElement('div');
    cabinetSenorImg.classList.add('cabinet-senorImg');
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
    cabInfoDeadline.textContent = '-- : --';
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
        countBreamSpan.textContent = countBreamObj['countBream'];
        breamWrapper.append(cabInfoBreamTitle, breamImg, countBreamSpan);
    }
    const gameFooter = document.createElement('div');
    gameFooter.classList.add('game-footer');
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Рестарт';
    restartBtn.classList.add('restart-btn');

    const cardsTags = createTagsArray(tagsNum);

    gameSection.innerHTML = '';
       
    gameSection.append(senorCommit,
                       cabinetSenorImg,
                       gameTable,
                       senorCabinet,
                       gameFooter
                       );

    gameTable.append(cardCenter);
    cardsTags.forEach(tag => gameTable.append(createGameCard('cartShirt', tag)));

    senorCabinet.append( deadlineWrapper);
    evilSenor && senorCabinet.append(breamWrapper);

    deadlineWrapper.append(deadlineTitle, timerHead, cabInfoDeadline, timerFooter);

    gameFooter.append(restartBtn);

    const cards = document.querySelectorAll('.game-card');


    switch(tagsNum) {
        case 8: 
            gameTable.style.gap = '3%';
            break;
        case 12: 
            break;
        case 24: 
            cards[2].style.cssText = 'grid-column: 5;';
            cards[10].style.cssText = 'grid-column: 2;';
            cards[12].style.cssText = 'grid-column: 2;';
            cards[14].style.cssText = 'grid-column: 1;';
            cards[22].style.cssText = 'grid-column: 5;';
            break;
        case 32: 
            break;
        default:
            console.log("Неведомая ошибка.");
    }
    
    const deadLineTimer = (min, sec) => {
        let currentMin = min;
        let currentSec = sec;
        cabInfoDeadline.style.color = "inherit"
        let timerInterval = setInterval(() => {
            if (currentMin == 0 && currentSec <= 10) cabInfoDeadline.style.color = "red";
            cabInfoDeadline.textContent = `${currentMin.toString().padStart(2, '0')} : 
                                           ${currentSec.toString().padStart(2, '0')}`; 
            if (currentMin == 0 && currentSec == 0) {
                isDeadline = true;
                for(let card of cards) card.style.pointerEvents = 'none';
                restartBtn.style.pointerEvents = 'none';
                clearInterval(timerInterval);
            } else if (currentSec == 0) {
                currentSec = 59;
                currentMin--;
            } else currentSec--;       
        }, 1000);
    }
    deadLineTimer(minute, second);


    restartBtn.addEventListener('click', createGameMenu);

    cards.forEach((card, index) => card.addEventListener('click', () => {

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

            const guessedPair = () => {
                /* console.log("угадали"); */
                senorCommit.textContent = senorSayDict['anyQuestions'];
                setTimeout(() => {
                    try {
                        cards[indexFirstCard].classList.add('successfully');
                        cards[indexSecondCard].classList.add('successfully');
                        indexFirstCard = null;
                        indexSecondCard = null;
                        clickableCard = true;
                      } catch (e) {
                        /* console.error(e); */
                        console.log('Очень часто тыкаешь!');
                      }
                }, settingsDict['conversionDelay']);
                                                
                let currentTag = '';
                /* console.log("первая = " + firstTag);
                console.log("вторая = " + secondTag); */
                if(firstTag.replace(/[^a-zA-Z]/g, '') == '') currentTag = secondTag.replace(/[^a-zA-Z]/g, '');
                else currentTag = firstTag.replace(/[^a-zA-Z]/g, '');
                startSenorQuestion(currentTag);
            }

            const notGuessedPair = () => {
                /* console.log("не угадали"); */
                setTimeout(() => {  
                    try {
                        cards[indexFirstCard].classList.remove('flip');
                        cards[indexSecondCard].classList.remove('flip');                   
                        indexFirstCard = null;
                        indexSecondCard = null;
                        clickableCard = true; 
                      } catch (e) {
                        /* console.error(e); */
                        console.log('Часто тыкаешь!');
                      }
                }, settingsDict['conversionDelay']);
            }

            if (cards[indexFirstCard].firstElementChild.className === cards[indexSecondCard].firstElementChild.className) {

                if (codeReview && firstTag.includes('/')) {
                    /* console.log('codeReview: ' + "неверный порядок"); */
                    senorCommit.textContent = senorSayDict['codeReview'];
                    notGuessedPair();
                } else guessedPair();
                 
            } else {                 
                notGuessedPair();               
            }

            if (Array.from(cards).every(card => card.className.includes('flip'))) {

                console.log('Приз в студию, ёпта!!!');

            }

        }

        

    }));


    console.log('опыты');

    


    

    
    

}