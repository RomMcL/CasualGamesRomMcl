

/* Перемешивание массива */
export function shufflingArray(arrForShuffling) {
    for (let i = arrForShuffling.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [arrForShuffling[i], arrForShuffling[j]] = [arrForShuffling[j], arrForShuffling[i]]; 
    }
    return arrForShuffling;
}