let menuIcon = document.getElementById('menuIcon');
let mobileNav = document.getElementById('mobileNav');

menuIcon.addEventListener('click', function () {
    menuIcon.classList.toggle('menuActive');
    menuIcon.classList.toggle('menuActiveCross');
    mobileNav.classList.toggle('activeFlex');
});
