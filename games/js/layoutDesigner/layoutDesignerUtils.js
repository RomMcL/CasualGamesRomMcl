import { pairedTagsDict, singleTagsDict, settingsDict } from "./parametersGame.js"
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