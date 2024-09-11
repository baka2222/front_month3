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