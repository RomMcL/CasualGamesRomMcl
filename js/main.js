
const bugEnclosure = document.getElementById('bug-enclosure');
const bugDiv = document.getElementById('bug-div');
const staticBug = document.getElementById('static-bug');
const activeBug = document.getElementById('active-bug');



activeBug.style.display = 'none';
activeBug.style.pointerEvents = 'none';
bugEnclosure.style.cursor = 'url("cursor/greenSniper.cur"), auto';

let direction = 0;
let bugSpeed = 3;
const bugWaiting = bugSpeed * 2500;

let peaceLife = true;
let huntIsOn = false;



function moveYourAssBug({timing, draw, duration}) {

    let start = performance.now();
    
    let animationBug = requestAnimationFrame(function animate(time) {             
        // timeFraction изменяется от 0 до 1       
        let timeFraction;
    
        if (peaceLife) { timeFraction = (time - start) / duration;                 
        } else timeFraction = (time - start) / duration*2;  // ускоряем жука при опасности 
       

        if (timeFraction > 1) {
            timeFraction = 1;
            /* console.log('прибежал') */
            staticBug.style.display = 'block';
            activeBug.style.display = 'none';
            bugEnclosure.addEventListener('click', hit, {capture: true});
            bugEnclosure.style.cursor = 'url("cursor/greenSniper.cur"), auto';
            
            if (!peaceLife) cancelAnimationFrame(animationBug);
        }
                       
        // вычисление текущего состояния анимации    
        let progress = timing(timeFraction);          
        draw(progress); // отрисовать движение жука  
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }            
    }); 
}




function movingBug () {

    let widthBugEnclosure = bugEnclosure.offsetWidth;
    let heightBugEnclosure = bugEnclosure.offsetHeight;
    let cornerBugEnclosure = Math.round(Math.atan(heightBugEnclosure/widthBugEnclosure) * 180/Math.PI);
    let hypotenuseBugEnclosure = Math.sqrt(widthBugEnclosure**2 + heightBugEnclosure**2);


    let widthBug = bugDiv.offsetWidth;
    let heightBug = bugDiv.offsetHeight;

    let posTop = bugDiv.offsetTop;
    let posLeft = bugDiv.offsetLeft;

    let positionTop = posTop + heightBug/2;
    let positionLeft = posLeft + widthBug/2;
    
    bugDiv.style.transition = `transform 2s linear`;
    

    if (positionLeft <= widthBugEnclosure/2 && positionTop <= heightBugEnclosure/2) {
        direction = 1; /* TL -> право или низ + диагональ */
    } else if (positionLeft <= widthBugEnclosure/2 && positionTop > heightBugEnclosure/2) {
        direction = 2; /* BL -> право или верх + диагональ */
    } else if (positionLeft > widthBugEnclosure/2 && positionTop <= heightBugEnclosure/2) {
        direction = 3; /* TR -> лево или низ + диагональ */
    } else direction = 4 /* BR -> лево или верх + диагональ */


    if (getRandomInt(1, 3) == 1) direction = direction + 0.1;
    else if (getRandomInt(1, 3) == 2) direction = direction + 0.2;
    else direction = direction + 0.3;

    /* console.log("direction = " + direction); */

    staticBug.style.display = 'none';
    activeBug.style.display = 'block';
    bugEnclosure.removeEventListener("click", hit, {capture: true});
    bugEnclosure.style.cursor = 'url("cursor/redSniper.cur"), auto';

    switch (direction) {
        case 1.1: /* из TL -> вправо */
            bugDiv.style.transform = 'rotate(90deg)';
            break;
        case 1.2: /* из TL -> вниз */
            bugDiv.style.transform = 'rotate(180deg)';
            break;
        case 1.3: /* из TL -> диагональ */
            bugDiv.style.transform = 'rotate(' + (90 + cornerBugEnclosure) + 'deg)';          
            break;
        case 2.1: /* из BL -> вправо */
            bugDiv.style.transform = 'rotate(90deg)';
            break;
        case 2.2: /* из BL -> вверх */
            bugDiv.style.transform = 'rotate(0deg)';
            break;
        case 2.3: /* из BL -> диагональ */
        bugDiv.style.transform = 'rotate(' + (90 - cornerBugEnclosure) + 'deg)';           
            break;
        case 3.1: /* из TR -> влево */
            bugDiv.style.transform = 'rotate(-90deg)';
            break;
        case 3.2: /* из TR -> вниз */
            bugDiv.style.transform = 'rotate(180deg)';
            break;
        case 3.3: /* из TR -> диагональ */
        bugDiv.style.transform = 'rotate(' + (90 + cornerBugEnclosure)*(-1) + 'deg)';
            break;
        case 4.1: /* из BR -> влево */
            bugDiv.style.transform = 'rotate(-90deg)';
            break;
        case 4.2: /* из BR -> вверх */
            bugDiv.style.transform = 'rotate(0deg)';
            break;
        case 4.3: /* из BR -> диагональ */
        bugDiv.style.transform = 'rotate(' + (90 - cornerBugEnclosure)*(-1) + 'deg)';
            break;
        default:
            console.log("Жук не знает куда идти");
        }


        setTimeout(() =>
            moveYourAssBug({
                timing: function(timeFraction) {
                    if(direction == 2.2 || direction == 3.1 || direction == 4.1 || direction == 4.2 || direction == 4.3) {
                        return 1 - timeFraction; 
                    } else return timeFraction;
                },
                draw: function(progress) {
                    if(direction == 1.1 || direction == 2.1)
    /* вправо */            bugDiv.style.left = progress * (widthBugEnclosure - widthBug) + 'px';
                    else if(direction == 1.2 || direction == 3.2)
    /* вниз */              bugDiv.style.top = progress * (heightBugEnclosure - heightBug) + 'px';
                    else if(direction == 2.2 || direction == 4.2)
    /* вверх */             bugDiv.style.top = progress * (heightBugEnclosure - heightBug) + 'px';
                    else if(direction == 3.1 || direction == 4.1)
    /* влево */             bugDiv.style.left = progress * (widthBugEnclosure - widthBug) + 'px';
                    else if(direction == 1.3 || direction == 4.3) {
    /* вправо(влево) */     bugDiv.style.left = progress * (widthBugEnclosure - widthBug) + 'px';
    /* вниз(вверх) */       bugDiv.style.top = progress * (heightBugEnclosure - heightBug) + 'px';
                    } else if(direction == 2.3) {
    /* вправо */            bugDiv.style.left = progress * (widthBugEnclosure - widthBug) + 'px';
                            bugDiv.style.top = 'auto';    
    /* вверх */             bugDiv.style.bottom = progress * (heightBugEnclosure - heightBug) + 'px';
                    } else if(direction == 3.3) {
    /* вниз */              bugDiv.style.top = progress * (heightBugEnclosure - heightBug) + 'px';
                            bugDiv.style.left = 'auto';    
    /* влево */             bugDiv.style.right = progress * (widthBugEnclosure - widthBug) + 'px';                  
                    }                
                },
                duration: (function () {
                                switch (Math.round((direction % 1)*10)) {
                                    case 1:
                                        return bugSpeed * 1000;           
                                        break;
                                    case 2:
                                        return bugSpeed * 1000 * heightBugEnclosure/widthBugEnclosure;
                                        break;
                                    case 3:
                                        return bugSpeed * 1000 * hypotenuseBugEnclosure/widthBugEnclosure;          
                                        break;
                                    default:
                                        return bugSpeed * 1000;
                                    }                           
                            }())
                }), 
        2000); /* задержка на разворот Жука */       
}


/* стартуем анимацию мирной жизни жука */ 
let bugRunningInterval = setInterval(() => movingBug(), bugWaiting);

/* прекращение повтора анимации, если вкладка не активна  */ 
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        /* console.log('вкладка не активна'); */
        clearInterval(bugRunningInterval);
    }
    else {
        /* console.log('вкладка активна'); */
        bugRunningInterval = setInterval(() => movingBug(), bugWaiting);
    }
});


/*  Охота на Жука */

/*  Возвращение домой после охоты */
function returnHomeBug () {

    let widthBugEnclosure = bugEnclosure.offsetWidth;
    let heightBugEnclosure = bugEnclosure.offsetHeight;

    let widthBug = bugDiv.offsetWidth;
    let heightBug = bugDiv.offsetHeight;
   
    // позиция жука после охоты
    let currentPosX = parseInt(bugDiv.style.left);
    let currentPosY = parseInt(bugDiv.style.top);
  
    let A = [0, -(heightBugEnclosure - heightBug)]; 
    let B = [currentPosX, -currentPosY]; 
    let C = [0, 0];

    anglesOfTriangle(A, B, C)
    let gamma = anglesOfTriangle(A, B, C)['gamma'];

    staticBug.style.display = 'none';
    activeBug.style.display = 'block';
    bugEnclosure.removeEventListener("click", hit, {capture: true});
    bugEnclosure.style.cursor = 'url("cursor/redSniper.cur"), auto';
    
    bugDiv.style.transform = `rotate(${-gamma}deg)`

    setTimeout(() =>
        moveYourAssBug({
            timing: function(timeFraction) {
                return 1 - timeFraction;              
            },
            draw: function(progress) {
                bugDiv.style.left = progress * (currentPosX) + 'px';
                bugDiv.style.top = progress * (currentPosY) + 'px';                            
            },
            duration: (function () {
                return bugSpeed * 500;                          
                        }())
            }), 
    300); // задержка на разворот перед походом домой  
}


/*  Охота (выстрелы) */
let clickPosX = 0;
let clickPosY = 0;
let boomCount = 0;
let centerBoomX = 0;
let centerBoomY = 0;

function boom() {
    let boomDiv = document.createElement('div');
    boomDiv.classList.add('boom-div', `boom-${boomCount}`);

    bugEnclosure.appendChild(boomDiv);
    
    centerBoomX = boomDiv.getBoundingClientRect().width/2;
    centerBoomY = boomDiv.getBoundingClientRect().height/2;

    let angleBoom = getRandomInt(0, 360);
    let scaleBoom = getRandomInt(6, 9);

    Object.assign(boomDiv.style, {
        left: `${clickPosX - centerBoomX}px`,
        top: `${clickPosY - centerBoomY}px`,
        zIndex: `${-boomCount}`,
        transform: `rotate(${angleBoom}deg) scale(0.${scaleBoom})`
      });

    let boomN = bugEnclosure.querySelector(`.boom-${boomCount}`);  
    setTimeout(() => {
        boomN.style.opacity = '0';
        setTimeout(() => {
            bugEnclosure.removeChild(boomN);
        }, 2000)
    }, 1000)
}


/*  Слушатели */

bugEnclosure.addEventListener('mouseenter', () => {
    clearInterval(bugRunningInterval);
    peaceLife = false;
});


bugEnclosure.addEventListener('mouseleave', () => {
    bugRunningInterval = setInterval(() => movingBug(), bugWaiting);
    peaceLife = true;
    if (huntIsOn) returnHomeBug();
    huntIsOn = false;
});


function hit(e) {
    if (e.target && e.target.id == 'bug-enclosure'){
        clickPosX = e.offsetX;
        clickPosY = e.offsetY;
    /* } else if (e.target && e.target.classList.contains('boom-div')){
        clickPosX = e.offsetX + parseInt(e.target.style.left);
        clickPosY = e.offsetY + parseInt(e.target.style.top);
    */
    } else {
        huntIsOn = true;
        let currentPosX = 0;
        let currentPosY = 0;
        if (parseInt(bugDiv.style.left)) currentPosX = parseInt(bugDiv.style.left);
        if (parseInt(bugDiv.style.top)) currentPosY = parseInt(bugDiv.style.top);
        clickPosX = e.offsetX + currentPosX;
        clickPosY = e.offsetY + currentPosY;
    }
    boomCount++;
    boom();

}

bugEnclosure.addEventListener('click', hit, {capture: true});



let bugWidth = bugDiv.getBoundingClientRect().width;
let bugHeight = bugDiv.getBoundingClientRect().height;

staticBug.addEventListener('click', (e) => {
       
    let maxX = bugEnclosure.offsetWidth - bugWidth;
    let maxY = bugEnclosure.offsetHeight - bugHeight;

    let currentPosX = 0;
    let currentPosY = 0;

    if (parseInt(bugDiv.style.left)) currentPosX = parseInt(bugDiv.style.left) + bugWidth/2;
    else currentPosX = bugWidth/2;

    if (parseInt(bugDiv.style.top)) currentPosY = parseInt(bugDiv.style.top) + bugHeight/2;
    else currentPosY = bugHeight/2;
    
    let randomOffsetX = getRandomInt(0, maxX);
    let randomOffsetY = getRandomInt(0, maxY);
    let tryWhile = 10;  // ограничение на while, т.к. при неудачных рандомах может подвиснуть
    let tryWhileCount = 0;

    if (Math.abs(currentPosX - randomOffsetX) < bugWidth) {
        while (Math.abs(currentPosX - randomOffsetX) < bugWidth && tryWhileCount <= tryWhile) { 
            randomOffsetX = getRandomInt(0, maxX);        
            tryWhileCount++;
            /* console.log('x '+ tryWhileCount); */
        }
        tryWhileCount = 0;
    }

    if (Math.abs(currentPosY - randomOffsetY) < bugHeight) {
        while (Math.abs(currentPosY - randomOffsetY) < bugHeight && tryWhileCount <= tryWhile) { 
            randomOffsetY = getRandomInt(0, maxY);        
            tryWhileCount++;
            /* console.log('y '+ tryWhileCount); */
        }
        tryWhileCount = 0;
    }
    
    
    bugDiv.style.left = randomOffsetX + 'px';
    bugDiv.style.top = randomOffsetY + 'px';

    let newCenterBugX = randomOffsetX + bugWidth/2;
    let newCenterBugY = randomOffsetY + bugHeight/2;
     
    /* console.log(`Позиция клика: X = ${clickPosX} Y = ${clickPosY}`);
    console.log(`Центр жука: X = ${currentPosX} Y = ${currentPosY}`);
    console.log(`Новая позиция жука: X = ${newCenterBugX}  Y = ${newCenterBugY}`); */


    let A = [clickPosX, clickPosY]; 
    let B = [newCenterBugX, newCenterBugY]; 
    let C = [clickPosX, newCenterBugY];

    let angleBoom = 0;
    const speedRotate = 300;
    
    if (clickPosX>=newCenterBugX && clickPosY<=newCenterBugY) angleBoom = anglesOfTriangle(A, B, C)['alpha'];
    else if (clickPosX>=newCenterBugX && clickPosY>=newCenterBugY) angleBoom = 90+anglesOfTriangle(A, B, C)['beta'];      
    else if (clickPosX<=newCenterBugX && clickPosY<=newCenterBugY) angleBoom = -anglesOfTriangle(A, B, C)['alpha'];      
    else if (clickPosX<=newCenterBugX && clickPosY>=newCenterBugY) angleBoom = -90-anglesOfTriangle(A, B, C)['beta'];

    
    Object.assign(e.target.offsetParent.style, {
        transition: `transform 0.${speedRotate}s linear`,
        transform: `rotate(${angleBoom}deg)`
      });


    staticBug.style.display = 'none';
    activeBug.style.display = 'block';

    setTimeout (() => {
        staticBug.style.display = 'block';
        activeBug.style.display = 'none';
    }, speedRotate);
    
   
});


/* Вспомогательные функции */

/* Рандомные числа из диапазона */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Углы тругольника по координатам вершин */
function anglesOfTriangle(vertexA, vertexB, vertexC) {
    // квадрат расстояния между  2-мя точками
    function lengthSquare(X, Y){ 
        let xDiff = X[0] - Y[0]; 
        let yDiff = X[1] - Y[1]; 
        return xDiff*xDiff + yDiff*yDiff; 
    } 
    // квадраты длин сторон
    let a2 = lengthSquare(vertexB, vertexC); 
    let b2 = lengthSquare(vertexA, vertexC); 
    let c2 = lengthSquare(vertexA, vertexB);
    // длины сторон
    let a = Math.sqrt(a2); 
    let b = Math.sqrt(b2);
    let c = Math.sqrt(c2);
    // углы
    let gamma = Math.acos((a2 + b2 - c2)/(2*a*b)) * 180 / Math.PI;
    let beta = Math.acos((a2 + c2 - b2)/(2*a*c)) * 180 / Math.PI;
    let alpha = Math.acos((b2 + c2 - a2)/(2*b*c)) * 180 / Math.PI;

    return {'alpha': alpha, 'beta': beta, 'gamma': gamma,}
}