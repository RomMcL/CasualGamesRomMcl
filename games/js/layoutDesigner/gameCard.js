import { pairedTagsDict, singleTagsDict, settingsDict } from "./parametersGame.js"

export const createGameCard = (shirtCart, faceCard) => {

    const card = document.createElement('div');
    card.classList.add('game-card');

    const notFlippedCard = document.createElement('span');
    const flippedCard = document.createElement('span');

    const tagName = faceCard.replace(/[^a-zA-Z]/g, '');

    let faceCardStyleName = '';
    if (faceCard == settingsDict['soloTagName'] || Object.keys(singleTagsDict).includes(tagName) ) {
        faceCardStyleName = 'solo';
    } else faceCardStyleName = tagName;

    notFlippedCard.classList.add('side-card', `sc-${shirtCart}`);
    flippedCard.classList.add('side-card', `sc-${faceCardStyleName}`);

    flippedCard.innerText = faceCard;

    card.append(flippedCard, notFlippedCard);

    return card;
}