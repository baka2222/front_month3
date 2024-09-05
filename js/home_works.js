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
let position = 0;


function moveBlock() {
    const parentWidth = parentBlock.offsetWidth;
    const childWidth = childBlock.offsetWidth;


    if (position <= parentWidth - childWidth) {
        childBlock.style.left = `${position}px`;
        position += 2;
        requestAnimationFrame(moveBlock);
    }
}


moveBlock();