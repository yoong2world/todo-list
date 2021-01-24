const bgWrap = document.querySelector('.bgWrap');
const IMG_NUMBER = 4;

function init() {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

function getRandom() {
    const number = Math.floor(Math.random() * IMG_NUMBER);
    return number;
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `./assets/img/${imgNumber + 1}.jpg`;
    image.classList.add('bgImage');
    bgWrap.appendChild(image);
    image.addEventListener('loadend', handleImgLoad);
}

function handleImgLoad() {
    console.log('finishied loading');
}


init(); 