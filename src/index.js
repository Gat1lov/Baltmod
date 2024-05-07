import '../src/styles/index.css'

import {dotButtons, yuri, aleksey, scrollButton, images, buttons, popup, popupImage, popupCloseButton, projects, prevButton, nextButton} from './components/constants'

export let isPopupOpen = false;

dotButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        const parentContainerId = button.parentElement.id;
        const projectId = parentContainerId.split("-")[0];
        
        const currentButtons = document.getElementById(parentContainerId).querySelectorAll('.projects__dot-button');
        currentButtons.forEach(function(btn) {
            btn.classList.remove('projects__dot-button_active');
        });
        button.classList.add('projects__dot-button_active');
        const imagePath = button.getAttribute('data-image');
        const projectImage = document.getElementById(projectId);
        projectImage.src = imagePath;
    });
});

function autoSwitchImages(elementId, dotsId) {
    let currentImageIndex = 0;
    const intervalTime = 5000;

    setInterval(() => {
        if (isPopupOpen) return;

        const dotButtons = document.querySelectorAll(`#${dotsId} .projects__dot-button`);
        const activeButton = document.querySelector(`#${dotsId} .projects__dot-button_active`);
        activeButton.classList.remove('projects__dot-button_active');
        currentImageIndex = (currentImageIndex + 1) % dotButtons.length;
        const nextButton = dotButtons[currentImageIndex];
        nextButton.classList.add('projects__dot-button_active');
        const imagePath = nextButton.getAttribute('data-image');
        const projectImage = document.getElementById(elementId);

        projectImage.style.opacity = 0;

        setTimeout(() => {
            projectImage.src = imagePath;

            setTimeout(() => {
                projectImage.style.opacity = 1;
            }, 100);
        }, 500);

    }, intervalTime);
}

function showNextImage() {
    const activeImageSrc = popupImage.getAttribute('src');
    const activeDot = document.querySelector(`.projects__dot-button[data-image="${activeImageSrc}"]`);
    const nextDot = activeDot.nextElementSibling || activeDot.parentElement.firstElementChild;
    activeDot.classList.remove('projects__dot-button_active');
    nextDot.classList.add('projects__dot-button_active');
    popupImage.src = nextDot.getAttribute('data-image');
}

function showPrevImage() {
    const activeImageSrc = popupImage.getAttribute('src');
    const activeDot = document.querySelector(`.projects__dot-button[data-image="${activeImageSrc}"]`);
    const prevDot = activeDot.previousElementSibling || activeDot.parentElement.lastElementChild;
    activeDot.classList.remove('projects__dot-button_active');
    prevDot.classList.add('projects__dot-button_active');
    popupImage.src = prevDot.getAttribute('data-image');
}

function enableScroll() {
    document.body.style.overflow = 'auto';
}

function disableScroll() {
    document.body.style.overflow = 'hidden';
}


//Добавляем работу попапа с увеличением картинок
images.forEach(image => {
    image.addEventListener("click", function () {
        const imageUrl = this.getAttribute("src");
        popupImage.setAttribute("src", imageUrl);
        popup.classList.add("popup__opened");
        disableScroll()
        isPopupOpen = true; 
    });
});

//Добавляем слушатель кнопки закрытия
popupCloseButton.addEventListener("click", function () {
    popup.classList.remove("popup__opened");
    enableScroll()
    isPopupOpen = false; 
});

//Добавляем обработчик закрытия, после нажатия кнопки ESC
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        popup.classList.remove("popup__opened");
        enableScroll()
        isPopupOpen = false; 
    }
});

//Добавляем обработчик клика по оверлею, чтобы закрыть
popup.addEventListener("click", function (event) {
    if (event.target === this) {
        popup.classList.remove("popup__opened");
        enableScroll()
        isPopupOpen = false; 
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

//Добавляем обработчик клика по кнопке "Домой"
scrollButton.addEventListener('click', function() {
    const targetOffset = 0; // Позиция, до которой нужно прокрутить
    window.scrollTo({ top: targetOffset, behavior: 'smooth' });
});

//Добавляем появление кнопки при прокрутке
function toggleScrollButton() {
    if (window.scrollY > projects.offsetTop) {
        scrollButton.classList.add("show");
    } else {
        scrollButton.classList.remove("show");
    }
}

nextButton.addEventListener('click', showNextImage);
prevButton.addEventListener('click', showPrevImage);
toggleScrollButton();
window.addEventListener("scroll", toggleScrollButton);
window.addEventListener('load', () => {
    autoSwitchImages('chasovnya', 'chasovnya-dots');
    autoSwitchImages('dinopark', 'dinopark-dots');
    autoSwitchImages('sport', 'sport-dots');
});