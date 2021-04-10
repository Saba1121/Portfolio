document.documentElement.style.setProperty('--bodyHeight', `${window.innerHeight}px`);

let difficulty = localStorage.getItem('difficulty') ? localStorage.getItem('difficulty') : 'easy'

document.getElementById(difficulty).className = 'selected';

document.querySelectorAll('.difficulty ul li').forEach(x => {
    x.addEventListener('click', function() {
        localStorage.setItem('difficulty', this.id);

        document.getElementsByClassName('selected')[0].className = '';
    
        this.className = 'selected'
    })
})


