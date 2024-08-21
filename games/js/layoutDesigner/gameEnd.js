import { settingsDict, wordsDict } from "./parametersGame.js"
import { createGameMenu, evilSenor } from "./gameMenu.js"
import { wordDeclension } from "../commonUtilities.js"
import { countersSQ } from "./gameSenorQuestions.js"


const modalEG = document.getElementById('modal-endGame');
const modalSQ = document.getElementById('modal-senorQuestion');



export const endGame = (tagsNum, timeSpent, finalStaus) => {
  
    modalSQ.textContent = '';
    modalSQ.style.display = 'none';
    

    const finalResult = () => {
        let senorText, djunText, senorImgLink, djunImgLink = '';
        let breams = countersSQ['countBream'];
        let countSQ = countersSQ['countSenorQuestion'];
        let assessment = '';
        if ((countSQ-breams)/countSQ <= 0.5) assessment = 'паршиво';
        else if ((countSQ-breams)/countSQ <= 0.75) assessment = 'сносно';
        else assessment = 'хорошо';

        if (finalStaus['isLimitBreams']) {
            senorText = `Но не для тебя!
                         За ${timeSpent} ты успел отхватить ${breams} ${wordDeclension(breams, wordsDict['bream'])} и был отстранён от проекта!
                         Учи матчасть, Джуниор!`;
            djunText = `Я не справился...
                        Мне не хватило знаний.`;
            evilSenor ? senorImgLink = './img/layoutDesigner/evil_senor.png' :
                        senorImgLink = './img/layoutDesigner/menu_senor.png';
            djunImgLink = './img/layoutDesigner/weeping_djun.png';
        } else if (finalStaus['isDeadline']) {
            senorText = `Но не для тебя!
                         Ты правильно ответил на ${countSQ - breams} ${wordDeclension(countSQ - breams, wordsDict['question'])} из ${countSQ}, но это не важно, т.к. ты всё равно не уложился в дедлайн.
                         Подтяни скил многозадачности, Джуниор!`;
            djunText = `Я не справился...
                        Мне не хватило времени.`;
            evilSenor ? senorImgLink = './img/layoutDesigner/evil_senor.png' :
                        senorImgLink = './img/layoutDesigner/menu_senor.png';
            djunImgLink = './img/layoutDesigner/weeping_djun.png';
        } else if (finalStaus['isGameWin']) {
            evilSenor ? senorText = `Неплохо, Джуниор!
                                     Ты правильно ответил на ${countSQ - breams} ${wordDeclension(countSQ - breams, wordsDict['question'])} из ${countSQ} - это ${assessment}, но главное, ты уложился в дедлайн, справился за ${timeSpent}. И раз с многозадачностью ты справляешься...
                                     с завтрашнего дня начинаешь работать в режиме многопоточности!` :
                        senorText = `Молодец, Джуниор!
                                     Ты правильно ответил на ${countSQ - breams} ${wordDeclension(countSQ - breams, wordsDict['question'])} из ${countSQ} - это ${assessment}, но главное, ты уложился в дедлайн, справился за ${timeSpent}.
                                     Учись и развивайся, Джуниор!`
            evilSenor ? djunText = `За ЧТО?! Я же справился!
                                    Я так не могу ...` :
                        djunText = `УРА! Я справился!
                                    Мне за это такую премию дадут...`;
            senorImgLink = './img/layoutDesigner/menu_senor.png';
            evilSenor ? djunImgLink = './img/layoutDesigner/focused_djun.png' :
                        djunImgLink = './img/layoutDesigner/happy_djun.png';
        }
        
        return {'senorText': senorText, 'djunText': djunText, 'senorImgLink': senorImgLink, 'djunImgLink': djunImgLink}
    }

    const result = finalResult();

    const endGameContainer = document.createElement('div');
    endGameContainer.id = 'endGame-container';

    const endGameTitle = document.createElement('h2');
    endGameTitle.id = 'endGame-title';
    endGameTitle.textContent = `Проект на ${tagsNum/2} ${wordDeclension(tagsNum/2, wordsDict['tag'])} завершён...`;

    const endGameBody = document.createElement('div');
    endGameBody.id = 'endGame-body';

    const endGameSenorImg = document.createElement('img');
    endGameSenorImg.id = 'endGame-senorImg';
    endGameSenorImg.src = result['senorImgLink'];
    endGameSenorImg.alt = 'Сеньор-финал';
    const endGameDjunImg = document.createElement('img');
    endGameDjunImg.id = 'endGame-djunImg';
    endGameDjunImg.src = result['djunImgLink'];
    endGameDjunImg.alt = 'Джуниор-финал';

    const endGameSenorSay = document.createElement('div');
    endGameSenorSay.id = 'endGame-senorSay';
    const senorText = document.createElement('p');
    senorText.id = 'endGame-senorText';
    senorText.classList.add('dialog');
    senorText.innerText = result['senorText'];

    const endGameResult = document.createElement('div');
    endGameResult.id = 'endGame-result';
    const djunText = document.createElement('p');
    djunText.id = 'endGame-djunText';
    djunText.classList.add('dialog');
    djunText.innerText = result['djunText'];

    const endGameBtns = document.createElement('div');
    endGameBtns.id = 'endGame-footer';

    

    const restartBtn = document.createElement('button');   
    restartBtn.id = 'btn-returnMenu';
    restartBtn.classList.add('modalGameBtn');
    const iconSpan1 = document.createElement('span');
    iconSpan1.classList.add('icon-span');
    restartBtn.append(iconSpan1, document.createTextNode('В меню игры'));
  
    const exitBtn = document.createElement('a');   
    exitBtn.id = 'btn-closeGame';
    exitBtn.href='../catalog.html';
    exitBtn.classList.add('modalGameBtn');
    const iconSpan2 = document.createElement('span');
    iconSpan2.classList.add('icon-span');
    exitBtn.append(document.createTextNode('К каталогу игр'), iconSpan2);

    /* exitBtn.innerText = 'К каталогу игр'; */


    modalEG.appendChild(endGameContainer);
    endGameContainer.append(endGameTitle,
                            endGameBody,
                            endGameBtns
    );
    endGameBody.append(endGameSenorImg, endGameSenorSay,
                       endGameResult, endGameDjunImg
    );
    endGameSenorSay.appendChild(senorText);
    endGameResult.appendChild(djunText);
    endGameBtns.append(restartBtn, exitBtn);


    restartBtn.addEventListener('click', () => {
        modalEG.style.transition = `opacity ${settingsDict['fadeInDelay']}ms`;
        modalEG.style.opacity = '0';
        modalEG.style.pointerEvents = 'none';
        createGameMenu();
        setTimeout(() => {        
            modalEG.innerHTML = '';
            modalEG.style.display = 'none';
        }, settingsDict['fadeInDelay']);
    });

    
    modalEG.style.transition = `opacity ${settingsDict['fadeOutDelay']}ms`;
    modalEG.style.pointerEvents = 'auto';
    modalEG.style.display = 'block';
    setTimeout(() => modalEG.style.opacity = '1', settingsDict['fadeInDelay']) 
}

