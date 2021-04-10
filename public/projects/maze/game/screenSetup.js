//easy 10x10 
//medium 20x20
//hard 30x30
//legend 50x50

document.documentElement.style.setProperty('--bodyHeight', `${window.innerHeight}px`);
let rows = null;

let difficulty = localStorage.getItem('difficulty');

if(!difficulty || difficulty == 'easy') rows = 15;
else if(difficulty == 'medium') rows = 25;
else rows = 35;


let columns = rows;

let screen = {
    width : window.innerWidth,
    height : window.innerHeight
}


if(screen.width <= screen.height) {
    canvas.width = `${screen.width*0.90 - screen.width*0.90%columns}`;
    canvas.height = `${screen.width*0.90 - screen.width*0.90%rows}`; 
} else {
    canvas.width = `${screen.height*0.80 - screen.height*0.80%columns}`;
    canvas.height = `${screen.height*0.80 - screen.height*0.80%rows}`;
}


let blockSize = canvas.width/rows;
