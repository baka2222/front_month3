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


// CONVERTER
const usdInput = document.querySelector('#usd');
const somInput = document.querySelector('#som');
const eurInput = document.querySelector('#eur');


const converter = (elem, target1, target2, currency) => {
    elem.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../data/converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            let data = JSON.parse(request.response);

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
}


converter(usdInput, somInput, eurInput, 'usd');
converter(somInput, usdInput, eurInput, 'som');
converter(eurInput, somInput, usdInput, 'euro');

