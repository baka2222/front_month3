const clickMe = document.getElementById("btn-get");
const modalDialog = document.querySelector(".modal");
const modalClose = document.querySelector(".modal_close");


const showModal = () => {
    modalDialog.style.display = "block";
    document.body.style.overflow = "hidden";
}


const hideModal = () => {
    modalDialog.style.display = "none";
    document.body.style.overflow = "";
}


const handleScroll = () => {
    const scrollPosition = window.innerHeight + window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;


    if (scrollPosition + 10 >= documentHeight) {
        showModal();
        window.removeEventListener('scroll', handleScroll);
    }
}


document.body.onclick = (e) => {
    if (e.target === clickMe) {
        showModal();
    } else if (e.target === modalClose || e.target.classList.contains("modal")) {
        hideModal();
    }
}


setTimeout(showModal, 10000);


window.addEventListener('scroll', handleScroll);


