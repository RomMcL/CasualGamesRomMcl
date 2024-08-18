

// Перемешивание массива
export function shufflingArray(arrForShuffling) {
    for (let i = arrForShuffling.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [arrForShuffling[i], arrForShuffling[j]] = [arrForShuffling[j], arrForShuffling[i]]; 
    }
    return arrForShuffling;
}



// склонение слов
export function declensionNum(num, words) {
    return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
}







/* Плавное появление */
/* export const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
}; */

/* Плавное скрытие */
/* export const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0; 
    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
}; */