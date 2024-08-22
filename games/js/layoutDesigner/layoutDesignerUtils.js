import { pairedTagsDict, singleTagsDict, settingsDict, senorSayDict } from "./parametersGame.js"
import { shufflingArray } from "../commonUtilities.js"


export const createTagsArray = (difficult) => {

    let randomSingleTagKey = shufflingArray(Object.keys(singleTagsDict))[0];
    let randomKeysArr = shufflingArray(Object.keys(pairedTagsDict)).slice(0, (difficult-2)/2);
    randomKeysArr.push(randomSingleTagKey);
    
    let openingTags = [];
    let closingTags = [];

    for (let i = 0; i < randomKeysArr.length; i++) { 
        openingTags.push("<" + randomKeysArr[i] + ">");
        closingTags.push(openingTags[i].substring(0, 1) + "/" + openingTags[i].substring(1));  
    }
    closingTags[closingTags.length - 1] = settingsDict['soloTagName'];

    const tagsArray = [...openingTags, ...closingTags];
  
    return shufflingArray(tagsArray);

}


export const createBream = (numberBream) => {
    const bream = document.createElement('div');
    bream.id = `bream-${numberBream}`;
    document.getElementById('bream-img').appendChild(bream);
    setTimeout(() => bream.style.opacity = '1', 500)        
}


export const alertResultAnswer = (element, color, speed, message) => {
    element.textContent = senorSayDict[message];
    let count = 3;
    const interval = setInterval(() => {
                        element.style.backgroundColor = settingsDict[color];
                        document.documentElement.style.setProperty('--dialogBubble-color', settingsDict[color]);                           
                        setTimeout(() => {
                            element.style.backgroundColor = '';
                            document.documentElement.style.setProperty('--dialogBubble-color', '');
                        }, speed);
                        count--;
                        count <= 0 && clearInterval(interval)
                    }, speed*2);
}