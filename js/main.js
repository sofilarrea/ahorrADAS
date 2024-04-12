const open = document.getElementById('open');
const close = document.getElementById('close');
const navIcon = document.querySelector('.nav-icon');
const navbarLinks = document.getElementById('navbar-links')

open.addEventListener('click', () => {
    open.style.display = 'none';
    close.style.display = 'block';
    navIcon.style.display = 'block';
    navbarLinks.style.display = 'block';
   

});

close.addEventListener('click', () => {
    close.style.display = 'none';
    open.style.display = 'block';
    navIcon.style.display = 'none';   

});

/* 
document.addEventListener('DOMContentLoaded', () => {
    const open = document.getElementById('open');
    const close = document.getElementById('close');
    const navIcon = document.querySelector('.nav-icon');

    open.addEventListener('click', () => {
        open.style.display = 'none';
        close.style.display = 'block';
        navIcon.style.display = 'block';
    });

    close.addEventListener('click', () => {
        close.style.display = 'none';
        open.style.display = 'block';
        navIcon.style.display = 'none';
    });
});
 */