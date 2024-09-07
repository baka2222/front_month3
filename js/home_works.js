//Первое задание
const button = document.querySelector('#gmail_button');
const input = document.querySelector('#gmail_input');


button.addEventListener('click', (e) => {
    e.preventDefault();
    let patternEmail = /^[a-zA-Z0-9._%+-]+@gmail.com$/


    if (input.value === '') {
        alert('Please enter email');
    } else if (patternEmail.test(input.value)) {
        alert('Okay')
    } else {
        alert('Please enter valid email');
    }
})


//Второе задание
const parentBlock = document.querySelector('.parent_block');
const childBlock = document.querySelector('.child_block');
let position_horizontal = 0;
let position_vertical = 0;
let direction = 'right';


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
            direction = 'down';
        }
    }

    if (direction === 'down') {
        if (position_vertical < parentHeight - childHeight) {
            position_vertical += 2;
            childBlock.style.top = `${position_vertical}px`;
        } else {
            direction = 'left';
        }
    }

    if (direction === 'left') {
        if (position_horizontal > 0) {
            position_horizontal -= 2;
            childBlock.style.left = `${position_horizontal}px`;
        } else {
            direction = 'up';
        }
    }

    if (direction === 'up') {
        if (position_vertical > 0) {
            position_vertical -= 2;
            childBlock.style.top = `${position_vertical}px`;
        } else {
            direction = 'right';
        }
    }

    requestAnimationFrame(moveBlock);
}

moveBlock();


//Таймер
const timerNumber = document.querySelector('.interval');
const start = document.querySelector('#start');
const stop = document.querySelector('#stop');
const reset = document.querySelector('#reset');
let number = 0;
let interval;
let started = false;


start.addEventListener('click', (e) => {
    e.preventDefault();
    if (started === false) {
        interval = setInterval(() => {
            number += 1;
            timerNumber.innerText = number;
        }, 1000)

        started = true;
    }
})


stop.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(interval);
    started = false;
})


reset.addEventListener('click', (e) => {
    e.preventDefault();
    clearInterval(interval);
    started = false;
    number = 0;
    timerNumber.innerText = number;
})
