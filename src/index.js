import '../src/styles/index.css'

import {chapel, dino, sport} from './components/cards';

//Константы 
const chapelContainer = document.getElementById('chasovnya');
const dinoContainer = document.getElementById('dinopark');
const sportContainer = document.getElementById('sport');
const yuri = document.getElementById('buttonYuri');
const aleksey = document.getElementById('buttonAleksey');
const scrollButton = document.getElementById('scrollButton');
const images = document.querySelectorAll(".projects__image, .projects__image-mini");
const buttons = document.querySelectorAll('.header__button a');
const popup = document.querySelector(".popup");
const popupImage = document.querySelector(".popup__image");
const popupCloseButton = document.querySelector(".popup__close");
const projects= document.querySelector(".projects");

//Функция создания фотографий  
function createMiniImages(container, imagesArray) {
    imagesArray.forEach(image => {
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        img.classList.add('projects__image-mini');
        img.addEventListener("click", function () {
            const imageUrl = this.getAttribute("src");
            popupImage.setAttribute("src", imageUrl);
            popup.classList.add("popup__opened");
        });
        container.appendChild(img);
    });
}

//Добавляем работу попапа с увеличением картинок
images.forEach(image => {
    image.addEventListener("click", function () {
        const imageUrl = this.getAttribute("src");
        popupImage.setAttribute("src", imageUrl);
        popup.classList.add("popup__opened");
    });
});

//Добавляем слушатель кнопки закрытия
popupCloseButton.addEventListener("click", function () {
    popup.classList.remove("popup__opened");
});

//Добавляем обработчик закрытия, после нажатия кнопки ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        popup.classList.remove("popup__opened");
    }
});

//Добавляем обработчик клика по оверлею, чтобы закрыть
popup.addEventListener("click", function (event) {
    if (event.target === this) {
        popup.classList.remove("popup__opened");
    }
});

//Добавляем обработчик клика по кнопкам WhatsApp
yuri.addEventListener('click', function () {
    sendMessageToWhatsApp('89997550101');
});

aleksey.addEventListener('click', function () {
    sendMessageToWhatsApp('89103040101');
});

function sendMessageToWhatsApp(phoneNumber) {
    window.location.href = 'https://api.whatsapp.com/send?phone=' + phoneNumber;
};


//Добавляем плавное прокручивание при клике на кнопки в навигации
buttons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();

        const targetId = this.getAttribute('href');

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


//Добавляем обработчик клика по кнопке "Домой"
scrollButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

//Добавляем появление кнопки при прокрутке
function toggleScrollButton() {
    if (window.scrollY > projects.offsetTop) {
        scrollButton.classList.add("show");
    } else {
        scrollButton.classList.remove("show");
    }
}

//Добавляем массивы на страницу
createMiniImages(chapelContainer, chapel);
createMiniImages(dinoContainer, dino);
createMiniImages(sportContainer, sport);
toggleScrollButton();
window.addEventListener("scroll", toggleScrollButton);
