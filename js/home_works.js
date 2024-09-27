const button = document.querySelector('#gmail_button');
const input = document.querySelector('#gmail_input');
const resultSpan = document.querySelector('#gmail_result');

button.addEventListener('click', (e) => {
    e.preventDefault();
    let patternEmail = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (input.value === '') {
        resultSpan.textContent = 'Please enter an email';
        resultSpan.style.color = 'red';
    } else if (patternEmail.test(input.value)) {
        resultSpan.textContent = 'Okay! Valid Gmail address.';
        resultSpan.style.color = 'green';
    } else {
        resultSpan.textContent = 'Please enter a valid Gmail address';
        resultSpan.style.color = 'red';
    }

    input.value = '';
});



//Второе задание
const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');
let position_horizontal = 0;
let position_vertical = 0;
let direction = 'right';

function changeColor() {
    const colors = ['blue', 'red', 'green', 'purple', 'orange'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    childBlock.style.backgroundColor = randomColor;
}

function moveBlock() {
    const parentWidth = parentBlock.offsetWidth;
    const childWidth = childBlock.offsetWidth;
    const parentHeight = parentBlock.offsetHeight;
    const childHeight = childBlock.offsetHeight;

    if (direction === 'right') {
        if (position_horizontal < parentWidth - childWidth) {
            position_horizontal += 2;
            childBlock.style.left = `${position_horizontal}px`;
        } else {
            changeColor();
            direction = 'down';
        }
    }

    if (direction === 'down') {
        if (position_vertical < parentHeight - childHeight) {
            position_vertical += 2;
            childBlock.style.top = `${position_vertical}px`;
        } else {
            changeColor();
            direction = 'left';
        }
    }

    if (direction === 'left') {
        if (position_horizontal > 0) {
            position_horizontal -= 2;
            childBlock.style.left = `${position_horizontal}px`;
        } else {
            changeColor();
            direction = 'up';
        }
    }

    if (direction === 'up') {
        if (position_vertical > 0) {
            position_vertical -= 2;
            childBlock.style.top = `${position_vertical}px`;
        } else {
            changeColor();
            direction = 'right';
        }
    }

    requestAnimationFrame(moveBlock);
}

moveBlock();



// Таймер
const timerNumber = document.querySelector('.interval');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');
let number = 0;
let interval;
let started = false;

function formatTime(ms) {
    let seconds = Math.floor(ms / 1000);
    let hundredths = Math.floor((ms % 1000) / 10);
    return `${seconds}.${hundredths.toString().padStart(2, '0')}`;
}

start.addEventListener('click', (e) => {
    e.preventDefault();
    if (started === false) {
        interval = setInterval(() => {
            number += 10; // увеличиваем на 10 миллисекунд
            timerNumber.innerText = formatTime(number);
        }, 10); // обновляем каждые 10 миллисекунд
        started = true;
    }
});

stop.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(interval);
    started = false;
});

reset.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(interval);
    started = false;
    number = 0;
    timerNumber.innerText = number;
});



//4 домашка
const cardBlock = document.querySelector(".card_switcher .card");
const next = document.querySelector(".card_switcher #btn-next");
const prev = document.querySelector(".card_switcher #btn-prev");


let persons = () => {
    let personsRequest = new XMLHttpRequest;
    let personIndex = 0;

    personsRequest.open('GET', '../data/persons.json');
    personsRequest.setRequestHeader('Content-type', 'application/json');
    personsRequest.send();
    personsRequest.onload = () => {
        let data = JSON.parse(personsRequest.response);
        data.forEach(() => {
            cardBlock.innerHTML = `
            <img src="${data[personIndex].person_photo}" alt="">
                    <div class="text_block">
                        <p class="name">${data[personIndex].name}</p>
                        <div class="age">age: ${data[personIndex].age}</div>
                    </div>
        `
        })

        next.addEventListener('click', () => {
            if (personIndex === data.length - 1) {
                personIndex = 0;
                data.forEach(() => {
                    cardBlock.innerHTML = `
            <img src="${data[personIndex].person_photo}" alt="">
                    <div class="text_block">
                        <p class="name">${data[personIndex].name}</p>
                        <div class="age">age: ${data[personIndex].age}</div>
                    </div>
        `
                })
            } else {
                personIndex++;
                data.forEach(() => {
                    cardBlock.innerHTML = `
            <img src="${data[personIndex].person_photo}" alt="">
                    <div class="text_block">
                        <p class="name">${data[personIndex].name}</p>
                        <div class="age">age: ${data[personIndex].age}</div>
                    </div>
        `
                })
            }
        })

        prev.addEventListener('click', () => {
            if (personIndex === 0) {
                personIndex = data.length - 1;
                data.forEach(() => {
                    cardBlock.innerHTML = `
            <img src="${data[personIndex].person_photo}" alt="">
                    <div class="text_block">
                        <p class="name">${data[personIndex].name}</p>
                        <div class="age">age: ${data[personIndex].age}</div>
                    </div>
        `
                })
            } else {
                personIndex--;
                data.forEach(() => {
                    cardBlock.innerHTML = `
            <img src="${data[personIndex].person_photo}" alt="">
                    <div class="text_block">
                        <p class="name">${data[personIndex].name}</p>
                        <div class="age">age: ${data[personIndex].age}</div>
                    </div>
        `
                })
            }
        })
    }
}


const returnMyJson = () => {
    let myJsonRequest = new XMLHttpRequest();
    myJsonRequest.open('GET', '../data/my_json.json');
    myJsonRequest.setRequestHeader('Content-type', 'application/json');
    myJsonRequest.send();
    myJsonRequest.onload = () => {
        let data = JSON.parse(myJsonRequest.response);
        console.log(data)
    }
}


persons()
returnMyJson()
