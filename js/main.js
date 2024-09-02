
const headerContent = `<nav class="navbar navbar-expand-lg container-md bg-light border-start border-end border-dark border-1 py-0 py-lg-1">
                        <div class="container-fluid justify-content-end">
                            <a class="navbar-brand bg-light px-2 rom-logo" href="index.html">
                                <img src="./img/logo.png" alt="Логотип сайта" class="img-fluid fl-gr-75 fl-gr-0-hover">
                            </a>
                            <button class="navbar-toggler mx-3 my-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>                                
                            <div class="collapse navbar-collapse justify-content-end mx-xxl-3 mx-xl-2 container-md" id="navbarNavDropdown">
                                <ul class="navbar-nav text-center border-top border-top-lg-0 border-start border-start-lg-0 border-dark border-3 mt-lg-2 fs-3 fw-bold">
                                    <li class="nav-item ms-2">
                                        <a class="nav-link py-0" aria-current="page" href="index.html">Главная</a>
                                    </li>
                                    <li class="nav-item ms-2">
                                        <a class="nav-link py-0" href="catalog.html">Каталог игр</a>
                                    </li>
                                    <li class="nav-item ms-2">
                                        <a class="nav-link py-0" href="weather.html">Погода</a>
                                    </li>
                                    <li class="nav-item ms-2">
                                        <a class="nav-link py-0" href="feedback.html">Обратная связь</a>
                                    </li>
                                </ul>
                            </div>        
                        </div>
                       </nav>`

const footerContent = `<div class="d-flex justify-content-between align-items-center">
                            <div class="d-flex flex-column text-center">
                                <h4>&copy; Денисенков Роман, 2024</h4>
                                <span>(учебный проект)</span>
                            </div>
                            <div class="d-flex flex-column text-center fs-5">
                                <span>Не стесняйся, заходи, </span>
                                <div class="d-flex justify-content-center align-items-center gap-3">
                                    <a href="https://vk.com/romanmcl" target="_blank"> <img src="./img/vk.png" class="social_network_img" alt="logoVK"></a>
                                    <a href="https://github.com/RomMcL" target="_blank"> <img src="./img/github.png" class="social_network_img" alt="logoGitHub"></a>
                                </div>
                                <span>в соцсетях меня ищи. </span>
                            </div>
                        </div>`

document.getElementById('header').insertAdjacentHTML('beforeend', headerContent);
document.getElementById('footer').insertAdjacentHTML('beforeend', footerContent);

const menuLinks = document.getElementsByClassName('nav-link');
const pathname = window.location.pathname;
const currentPageName = pathname.slice(1, pathname.length);

let pages = [];

for (let link of menuLinks) {
    pages.push(link.getAttribute('href'));
}

for (let index in pages) {
    pages[index] == currentPageName && menuLinks[index].classList.add('nav-activePage');
}

