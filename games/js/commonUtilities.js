/* 
    Общие вспомогательные функции для всех игр 
*/

// Перемешивание массива
export function shufflingArray(arrForShuffling) {
    for (let i = arrForShuffling.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [arrForShuffling[i], arrForShuffling[j]] = [arrForShuffling[j], arrForShuffling[i]]; 
    }
    return arrForShuffling;
}

// Склонение слов
export function wordDeclension(num, arrText) {
  if (num % 10 === 1 && num % 100 !== 11) {
    return arrText[0];
  } else if (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)) {
    return arrText[1];
  }
  return arrText[2];
};

