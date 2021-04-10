

let menu = () => {
    let menu_open = document.getElementById('menu-btn-open');
    let menu_close = document.getElementById('menu-btn-close');
    let side_nav = document.getElementById('side-nav');

    menu_open.addEventListener('click', () => {
        side_nav.style.display = 'block';
        side_nav.style.width = '50vw';
    })
    
    menu_close.addEventListener('click', () => {
        side_nav.style.display = 'none';
        side_nav.style.width = '0';
    })
}

menu();
