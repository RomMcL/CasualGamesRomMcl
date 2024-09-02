
const games = {
    'game1': {
        'name': 'Верстальщик',
        'image': './games/img/layoutDesigner/catalogImg.png',
        'info': 'Помоги молодому Верстальщику отыскать пары тегов и ответить на каверзные вопросы Сеньора.',
        'description': 'В игре главному герою предстоит находить пары тегов (открывающий и закрывающий) и правильно отвечать на вопросы Сеньора, чтобы не получить Лещей и не быть отстранённым от проекта. Так же не стоит забывать о дедлайне! Предусмотрена настройка сложности. В режиме Код-ревью Сеньор будет проверять не только сами теги на их соответствие, но и следить за порядком их открывания. А в режиме Злого Сеньора, за неправильные ответы, Джуниор будет получать Лещей, что может привести к фатальным результатам.',
        'type': 'Угадай пару, Викторина',
        'start': './games/layoutDesigner.html'
    },
    'game2': {
        'name': 'Название второй игры',
        'image': './img/isUnderDevelopment.png',
        'info': 'Игра 2 в разработке',
        'description': 'Полное описание игры 2',
        'type': 'Жанр игры 2',
        'start': '#'
    },
    'game3': {
        'name': 'Название третьей игры',
        'image': './img/isUnderDevelopment.png',
        'info': 'Игра 3 в разработке',
        'description': 'Полное описание игры 3',
        'type': 'Жанр игры 3',
        'start': '#',
    },
    'game4': {
        'name': 'Название четвёртой игры',
        'image': './img/isUnderDevelopment.png',
        'info': 'Игра 4 в разработке',
        'description': 'Полное описание игры 4',
        'type': 'Жанр игры 4',
        'start': '#',
    },
    
}


const cardsDiv = document.getElementById('catalog-cards');

(function createCards() {
    for (let game in games) {        
        let card = `
            <div class="card-wrapper">
                <div class="card h-100">
                    <img src=${games[game]['image']} class="card-img-top mt-2 rom-card-img"
                         alt=${games[game]['name']}>
                    <div class="card-body h-100">
                        <h4 class="card-title fs-3 fw-bold">
                            ${games[game]['name']}
                        </h4>
                        <p class="card-text fs-5 lh-sm">
                            ${games[game]['info']}
                        </p>
                    </div>
                    <ul class="list-group list-group-flush fw-bold">
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Полное описание</span>
                            <span id=${game} class="flex-grow-1 fa rom-gameDescription-icon" role="img"></span>
                        </li>
                        <li class="list-group-item d-flex justify-content-between">
                            <span>Тип игры:</span>
                            <span class="flex-grow-1 fw-normal text-center">
                                ${games[game]['type']}
                            </span>
                        </li>
                    </ul>
                    <div class="card-body d-flex justify-content-center">
                        <a href=${games[game]['start']} class="btn btn-success text-uppercase fs-3 fw-bold d-flex align-items-center justify-content-center flex-fill">Начать игру</a>
                    </div>
                </div>
            </div>`;
 
        cardsDiv.insertAdjacentHTML('beforeend', card);   
    }

})();



const fullDescriptionBtn = document.getElementsByClassName('rom-gameDescription-icon'),
      modalDescription = document.querySelector('.rom-modal-wrapper'),
      modalCloseBtn = document.getElementById('modal-closeBtn'),
      modalTitle = document.getElementById('modal-title'),
      modalText = document.getElementById('modal-description'),
      modalStartGame = document.getElementById('modal-startGame');

const fadeIn = (el, timeout, display) => {
    el.style.opacity = 0;
    el.style.display = display || 'block';
    el.style.transition = `opacity ${timeout}ms`;
    setTimeout(() => {
        el.style.opacity = 1;
    }, 10);
};

const fadeOut = (el, timeout) => {
    el.style.opacity = 1;
    el.style.transition = `opacity ${timeout}ms`;
    el.style.opacity = 0; 
    setTimeout(() => {
        el.style.display = 'none';
    }, timeout);
};


for (let i = 0; i < fullDescriptionBtn.length; i++) {
    fullDescriptionBtn[i].addEventListener('click', (e) => {
           
        fadeIn(modalDescription, 1000, 'block');
        modalTitle.innerText = games[e.target.id]['name'];
        modalText.innerText = games[e.target.id]['description'];
        modalStartGame.setAttribute("href", games[e.target.id]['start']);
           
          
            
        





       /*  console.log(games[e.target.id]['description']);   */     

    });
}

modalCloseBtn.addEventListener('click', () => fadeOut(modalDescription, 700))






/* const block = document.querySelector('.block');
const btn = document.querySelector('.btn');

let flag = false;

btn.addEventListener('click', (e) => {
  if (!flag) {
    fadeIn(block, 1000, 'flex');
    flag = true;
  } else {
    fadeOut(block, 1000);
    flag = false;
  }
}); */