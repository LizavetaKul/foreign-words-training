const worlds = {
    frontWorlds: ["hello", "bye", "cup", "phone", "car", "mouse", "videogame", "desk"],
    backWorlds: ["привет", "пока", "чашка", "телефон", "машина", "мышь", "видео игра", "стол"],
    examples: ["hello my dear friend", "good bye, nice to meet you", "would you like a cup of coffee", "your phone is calling", "your car is so fast", "i afraid a mouse", "i like to play video game", "this desk is comfortale"]
};
let iterator = 0;
const card = document.querySelector(".flip-card");
const example = card.querySelector("span");
const frontCard = document.querySelector("#card-front").querySelector("h1");
const backCard = document.querySelector("#card-back").querySelector("h1");
const cardNext = document.querySelector("#next");
const cardBack = document.querySelector("#back");
const currentWord = document.querySelector("#current-word");
const totalWord = document.querySelector("#total-word");
const progressStudy = document.querySelector("#words-progress");
const progressExam = document.querySelector("#exam-progress");
const exam = document.querySelector("#exam");
const sizeArray = worlds.backWorlds.length;

function getProgress(i) {
    return (100 * (i + 1)) / sizeArray;
}
frontCard.textContent = worlds.frontWorlds[0];
backCard.textContent = worlds.backWorlds[0];
example.textContent = worlds.examples[0];
progressStudy.value = getProgress(0);
currentWord.textContent = 1;
totalWord.textContent = sizeArray;
card.addEventListener('click', () => {
    if (card.classList.contains("active")) {
        card.classList.remove("active");
    } else {
        card.classList.add("active");
    }

})
cardNext.addEventListener('click', () => {
    if (iterator >= sizeArray - 1) {
        return;
    } else {
        iterator++;
        currentWord.textContent = iterator + 1;
        progressStudy.value = getProgress(iterator);
        cardBack.disabled = false;
        frontCard.textContent = worlds.frontWorlds[iterator];
        backCard.textContent = worlds.backWorlds[iterator];
        example.textContent = worlds.examples[iterator];
        if (iterator >= sizeArray - 1) {
            cardNext.disabled = true;
        }
    }

})
cardBack.addEventListener('click', () => {
    if (iterator <= 0) {
        return;
    } else {
        iterator--;
        progressStudy.value = getProgress(iterator);
        currentWord.textContent = iterator + 1;
        cardNext.disabled = false;
        frontCard.textContent = worlds.frontWorlds[iterator];
        backCard.textContent = worlds.backWorlds[iterator];
        example.textContent = worlds.examples[iterator];
        if (iterator <= 0) {
            cardBack.disabled = true;
        }
    }

})
let seconds = 0;
let minutes = 0;
const container = document.querySelector("#exam-cards");
const time = document.querySelector("#time");
let timer;
exam.addEventListener('click', () => {
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
        if (seconds < 10) {
            time.textContent = minutes + ":0" + seconds;
        } else {
            time.textContent = minutes + ":" + seconds;
        }


    }, 1000)
    document.querySelector("#study-mode").hidden = true;
    document.querySelector("#exam-mode").classList.remove("hidden");
    card.hidden = true;
    document.querySelector(".slider-controls").hidden = true;
    for (let i = 0; i < sizeArray * 2; i++) {
        if (i < sizeArray) {
            const firstCard = document.createElement('div');
            firstCard.classList.add("card");
            firstCard.textContent = worlds.backWorlds[i];
            container.append(firstCard);
        } else {
            const firstCard = document.createElement('div');
            firstCard.classList.add("card");
            firstCard.textContent = worlds.frontWorlds[i - sizeArray];
            container.append(firstCard);
        }

        let divs = container.children;
        let frag = document.createDocumentFragment();
        while (divs.length) {
            frag.appendChild(divs[Math.floor(Math.random() * divs.length)]);
        }
        container.appendChild(frag);
    }

})
let one = 0;
let indexOne = 0;
let two = 0;
let indexTwo = 0;
let click = false;
let finishIndex = 0;

container.addEventListener('click', (event) => {
    let card = event.target.closest(".card");
    if (click === false) {
        card.classList.add('correct');
        one = card;
        indexOne = worlds.frontWorlds.indexOf(card.textContent);
        if (indexOne === -1) {
            indexOne = worlds.backWorlds.indexOf(card.textContent);
        }

        click = true;

    } else if (click === true) {
        two = card;
        indexTwo = worlds.frontWorlds.indexOf(card.textContent);
        if (indexTwo === -1) {
            indexTwo = worlds.backWorlds.indexOf(card.textContent);
        }
        if (indexOne === indexTwo) {
            document.querySelector("#correct-percent").textContent = getProgress(finishIndex) + "%";
            finishIndex++;
            two.classList.add("correct");
            one.classList.add("fade-out");
            two.classList.add("fade-out");
            if (finishIndex == sizeArray) {
                clearInterval(timer);
                alert("the end");
            }
            click = false;
            progressExam.value = getProgress(finishIndex);
        } else if (indexOne !== indexTwo) {
            click = false;
            two.classList.add("wrong");
            setTimeout(() => {
                one.classList.remove("correct");
                two.classList.remove("wrong");
            }, 500);
        }


    }

})
