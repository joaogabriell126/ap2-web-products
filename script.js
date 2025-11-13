const headerMenu = document.getElementById("headerMenu")
const sideMenu = document.getElementById("sideMenu")

headerMenu.addEventListener('click', () => {
    sideMenu.classList.toggle('active');

    const isActive = sideMenu.classList.contains('active');

    if (isActive) {
        headerMenu.classList.remove('fa-bars');
        headerMenu.classList.add('fa-xmark');
    } else {
        headerMenu.classList.remove('fa-xmark');
        headerMenu.classList.add('fa-bars');
    }

});