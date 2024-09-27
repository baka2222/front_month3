// Phone checker
const phoneButton = document.getElementById('phone_button');
const phoneInput = document.getElementById('phone_input');
const phoneResult = document.getElementById('phone_result');


const checkPhoneNumber = () => {
    const phoneRegex = /^(?:\+?\d{1,3}\s?)?(?:\(?\d{2,3}\)?[\s-]?(\d{3})[\s-]?(\d{4}))$/;
    const phoneValue = phoneInput.value.trim();


    if (!phoneRegex.test(phoneValue)) {
        phoneResult.textContent = 'Неправильный формат номера';
        phoneResult.style.color = 'red';
        return;
    }


    phoneResult.textContent = 'Проверка номера...';
    phoneResult.style.color = 'blue';

    setTimeout(() => {
        phoneResult.textContent = `Номер ${phoneValue} корректен!`;
        phoneResult.style.color = 'green';
    }, 2000);
};


phoneButton.addEventListener('click', checkPhoneNumber);



// Tab slider
const tabContentBlocks = document.querySelectorAll(".tab_content_block");
const tabContentItems = document.querySelectorAll(".tab_content_item");


const hideBlocks = () => {
    tabContentBlocks.forEach(block => {
        block.style.display = "none";
    })
}


const showBlock = (id) => {
    tabContentBlocks[id].style.display = "block";
}


const deactivateTabContentItems = () => {
    tabContentItems.forEach(block => {
        block.classList.remove('tab_content_item_active');
    })
}


tabContentItems.forEach((tabItem, id) => {
    tabItem.onclick = () => {
        deactivateTabContentItems()
        tabItem.classList.add("tab_content_item_active");
        hideBlocks()
        showBlock(id)
        index = id
    }
})


let index = 1;


setInterval(() => {
    deactivateTabContentItems()
    tabContentItems[index].classList.add("tab_content_item_active");
    hideBlocks()
    showBlock(index)
    index++

    if (index >= tabContentItems.length) {
        index = 0
    }
}, 3000)


deactivateTabContentItems();
tabContentItems[0].classList.add("tab_content_item_active");
hideBlocks();
showBlock(0);


// CONVERTER
const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');


const converter = (elem, target1, target2, currency) => {
    elem.oninput = async () => {
        let data;

        try {
            const request = await fetch('../data/converter.json');
            const datas = await request.json();
            data = datas
        } catch (e) {
            console.log(e)
        }

        if (currency === 'usd') {
            target1.value = (elem.value * data.usd).toFixed(2);
            target2.value = (elem.value * data.euro / data.usd).toFixed(2);
        }

        if (currency === 'som') {
            target1.value = (elem.value / data.usd).toFixed(2);
            target2.value = (elem.value / data.euro).toFixed(2);
        }

        if (currency === 'euro') {
            target1.value = (elem.value * data.euro).toFixed(2);
            target2.value = (elem.value * data.usd / data.euro).toFixed(2);
        }

        if (elem.value === '') {
            target1.value = '';
            target2.value = '';
        }
    }
}


converter(usdInput, somInput, eurInput, 'usd');
converter(somInput, usdInput, eurInput, 'som');
converter(eurInput, somInput, usdInput, 'euro');


// CARD SWITCHER
const cardBlock = document.querySelector('.card');
const prev = document.querySelector('#btn-prev');
const next = document.querySelector('#btn-next');
const URL = 'https://jsonplaceholder.typicode.com/todos/';
let id = 1;
const totalTodos = 200;

const fillBlock = (data) => {
    cardBlock.innerHTML = `
        <div>
            <p>${data.title}</p>
            <p style="color: ${data.completed ? 'green' : 'red'}">
                ${data.completed ? 'Completed' : 'Not Completed'}
            </p>
            <span>ID: ${data.id}</span>
        </div>
    `;
};

const fetchTodo = async (id) => {
    cardBlock.innerHTML = `
    <div>
            <div id="loading-indicator">Loading...</div>
        </div>
    `;
    try {
        const request = await fetch(`${URL}${id}`);
        if (!request.ok) throw new Error('Failed to fetch data');
        const data = await request.json();
        fillBlock(data);
        updateButtonState();
    } catch (e) {
        cardBlock.innerHTML = `<p style="color: red;">Error: ${e.message}</p>`;
    }
};

const setNext = () => {
    id = id < totalTodos ? id + 1 : 1;
    fetchTodo(id);
};

const setPrev = () => {
    id = id > 1 ? id - 1 : totalTodos;
    fetchTodo(id);
};

const updateButtonState = () => {
    prev.disabled = false;
    next.disabled = false;
};


fetchTodo(id);
next.onclick = setNext;
prev.onclick = setPrev;



//Последнее задание 6-ой дз
const logData = async () => {
    const request = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await request.json();
    console.log(data)
}


logData()


// Weather
const apiKey = 'e417df62e04d3b1b111abeab19cea714'; // Замените на ваш API-ключ
const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.querySelector('.cityName');
const cityDisplay = document.querySelector('.city');
const tempDisplay = document.querySelector('.temp');

const getWeather = async () => {
    const cityName = cityInput.value;
    if (!cityName) {
        cityDisplay.textContent = 'Пожалуйста, введите название города.';
        tempDisplay.textContent = '';
        return;
    }

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Город не найден');

        const data = await response.json();
        cityDisplay.textContent = data.name;
        tempDisplay.textContent = `Температура: ${data.main.temp} °C`;
    } catch (error) {
        cityDisplay.textContent = error.message;
        tempDisplay.textContent = '';
    }
};

getWeatherBtn.onclick = getWeather;



