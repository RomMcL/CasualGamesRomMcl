import { settingsDict } from "./parametersGame.js"
import { createTagsArray } from "./layoutDesignerUtils.js"
import { createGameCard } from "./gameCard.js"
import { createGameMenu, codeReview } from "./gameMenu.js"
import { startSenorQuestion } from "./gameSenorQuestions.js"




export const gameLogic = (tagsNum) => {
    let indexFirstCard = null;
    let indexSecondCard = null;
    let clickableCard = true;

    const gameSection = document.querySelector('.game-section-container');
    const gameTable = document.createElement('div');

    const cardCenter = document.createElement('div');

    const senorCabinet = document.createElement('div');
    const cabinetSenorImg = document.createElement('div');
    const cabinetInfo = document.createElement('div');
    const cabInfoDeadlineTitle = document.createElement('p');
    const cabInfoDeadline = document.createElement('span');
    const cabInfoBreamTitle = document.createElement('p');
    const cabInfoBream = document.createElement('div');
    const restartBtn = document.createElement('button');

    const cardsTags = createTagsArray(tagsNum);

    gameSection.innerHTML = '';
    gameTable.classList.add('game-table', `table-${tagsNum}`);    
    cardCenter.classList.add('game-card-center', `center-card-${tagsNum}`);
    senorCabinet.classList.add('senor-cabinet');
    cabinetSenorImg.classList.add('cabinet-senorImg');
    cabinetInfo.classList.add('cabinet-info');
    cabInfoDeadlineTitle.classList.add('cabInfo-title');
    cabInfoDeadlineTitle.textContent = 'Дедлайн:';
    cabInfoDeadline.classList.add('cabInfo-timer');    
    cabInfoDeadline.textContent = 'таймер';
    cabInfoBreamTitle.classList.add('cabInfo-title');
    cabInfoBreamTitle.textContent = 'Лещи от Сеньора:';
    cabInfoBream.classList.add('cabInfo-bream'); 
    cabInfoBream.textContent = 'лещи';

    restartBtn.textContent = 'Рестарт';
    restartBtn.classList.add('restart-btn');


    cardsTags.forEach(tag => gameTable.append(createGameCard('cartShirt', tag)));

    gameSection.append(gameTable, senorCabinet);

    gameTable.append(cardCenter);

    senorCabinet.append(cabinetSenorImg, cabinetInfo, restartBtn);
    cabinetInfo.append(cabInfoDeadlineTitle, cabInfoDeadline, cabInfoBreamTitle, cabInfoBream);

    const cards = document.querySelectorAll('.game-card');


    switch(tagsNum) {
        case 8: 
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
                console.log("угадали");
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
                console.log("первая = " + firstTag);
                console.log("вторая = " + secondTag);
                if(firstTag.replace(/[^a-zA-Z]/g, '') == '') currentTag = secondTag.replace(/[^a-zA-Z]/g, '');
                else currentTag = firstTag.replace(/[^a-zA-Z]/g, '');
                startSenorQuestion(currentTag);
            }

            const notGuessedPair = () => {
                console.log("не угадали");
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

                console.log('codeReview = ' + codeReview);



                guessedPair();
                
            } else {
                 
                notGuessedPair();
                
            }

            if (Array.from(cards).every(card => card.className.includes('flip'))) {

                console.log('Приз в студию, ёпта!!!');

            }

        }

        

    }));

    

}