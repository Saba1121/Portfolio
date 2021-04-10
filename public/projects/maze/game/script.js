let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');


let canvasWidth = parseInt(window.getComputedStyle(canvas).width);
let canvasHeight = parseInt(window.getComputedStyle(canvas).height);
 

let cells = [];
let currentCell;
let lastVisited = [];

let blockCount = rows*columns;

function line(x1, y1, x2, y2, color = 'white') {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

function Cell(x, y) {
    this.x = x;
    this.y = y;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.neighbors = [];

    this.draw = function() {
        let posX = this.x * blockSize;
        let posY = this.y * blockSize;
        
        if(this.walls[0]) line(posX, posY, posX + blockSize, posY);
        if(this.walls[1]) line(posX + blockSize, posY, posX + blockSize, posY + blockSize);
        if(this.walls[2]) line(posX + blockSize, posY + blockSize, posX, posY + blockSize);
        if(this.walls[3]) line(posX, posY + blockSize, posX, posY); 
    }

    this.visit = function() {
        currentCell = [this.x, this.y];
        this.visited = true;

        let posX = this.x * blockSize;
        let posY = this.y * blockSize;

        this.neighbors = [];
        
        if(this.x != 0 && !cells[this.x-1][this.y].visited) this.neighbors.push([this.x-1, this.y]);
        if(this.x != cells.length-1 && !cells[this.x+1][this.y].visited) this.neighbors.push([this.x+1, this.y]);
        if(this.y != 0 && !cells[this.x][this.y-1].visited) this.neighbors.push([this.x, this.y-1]);
        if(this.y != cells[0].length-1 && !cells[this.x][this.y+1].visited) this.neighbors.push([this.x, this.y+1]);

        if(this.neighbors.length > 0) {
            let random = Math.floor(Math.random() * this.neighbors.length);
            let next = this.neighbors[random];

            if(next[0] > currentCell[0]) {
                this.walls[1] = false;
                cells[next[0]][next[1]].walls[3] = false;
                line(posX + blockSize, posY, posX + blockSize, posY + blockSize, 'rgb(40, 40, 40)');
            }
            else if(next[0] < currentCell[0]) {
                this.walls[3] = false;
                cells[next[0]][next[1]].walls[1] = false;
                line(posX, posY + blockSize, posX, posY, 'rgb(40, 40, 40)'); 
            }
            else if(next[1] > currentCell[1]) {
                this.walls[2] = false;
                cells[next[0]][next[1]].walls[0] = false;
                line(posX + blockSize, posY + blockSize, posX, posY + blockSize, 'rgb(40, 40, 40)');
            }
            else if(next[1] < currentCell[1]) {
                this.walls[0] = false;
                cells[next[0]][next[1]].walls[2] = false;
                line(posX, posY, posX + blockSize, posY, 'rgb(40, 40, 40)');
            }


            lastVisited.push([this.x, this.y])

            blockCount--;
            setTimeout(() => cells[next[0]][next[1]].visit(), 1);
            // cells[next[0]][next[1]].visit()
        } else {
            if(blockCount > 1) {
                let random = Math.floor(Math.random() * lastVisited.length);

                cells[lastVisited[random][0]][lastVisited[random][1]].visit();
            } else {          
                line(0, 0, blockSize, 0, 'rgb(40, 40, 40)')
                line((columns-1)*blockSize, rows*blockSize, columns*blockSize, rows*blockSize, 'rgb(40, 40, 40)');

                game();
            }
        }
    }
}

function game() {
    let pos = [0,0];
    let timer = document.getElementById('timer');
    let moves = document.getElementById('moves');
    let moveCounter = -1;
    let timeCounter = 0;
    let key = {
        up : false,
        down : false,
        left : false,
        right : false,
    }

    let timerInterval = setInterval(() => {
        timer.innerHTML = `${++timeCounter} seconds`;
    }, 1000);

    let wall = num => cells[pos[0]][pos[1]].walls[num];

    function move(x = 0, y = 0) {
        if(y == 1 && !(pos[1] != rows.length-1 && !wall(2))) return false;
        else if(y == -1 && !(pos[1] != 0 && !wall(0))) return false;
        else if(x == 1 && !(pos[0] != columns.length-1 && !wall(1))) return false;
        else if(x == -1 && !(pos[0] != 0 && !wall(3))) return false;

        let tob = blockSize/10; //tob == Tenth Of Block
        ctx.clearRect(pos[0]*blockSize+blockSize/4-tob, pos[1]*blockSize+blockSize/4-tob, blockSize/2+tob*2, blockSize/2+tob*2);

        pos[0] += x;
        pos[1] += y;

        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'rgb(40, 40, 40)';
        ctx.fillRect(pos[0]*blockSize+blockSize/4, pos[1]*blockSize+blockSize/4, blockSize/2, blockSize/2);
        ctx.closePath();

        moves.innerHTML = `${++moveCounter} moves`;

        setTimeout(() => {
            if(pos[0] == columns-1 && pos[1] == rows-1) {
                clearInterval(timerInterval);
                clearInterval(keyInterval);
                document.getElementById('results').innerHTML = `Moves: ${moveCounter} - Time: ${timeCounter}s`;
                document.getElementById('header').innerHTML = `${columns}x${rows} Completed`;
                document.getElementsByClassName('endScreen')[0].style.display = 'flex';
                document.getElementsByClassName('endScreen')[0].addEventListener('click', () => location.reload());
            }
        }, 100)
    }

    move();

    function swipe() {
        console.log('Swipe V1.0')

        let swiped = false;
    
        document.addEventListener('touchstart', e => {
            swiped = false;
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        })
            
        document.addEventListener('touchmove', e => {
            if(swiped) return false;
            diffX = startX - e.changedTouches[0].clientX;
            diffY = startY - e.changedTouches[0].clientY;   
            
            if(Math.abs(diffX) > 50 || Math.abs(diffY) > 50) {
                swiped = true; 
    
                //Horizontall Swipe
                if(Math.abs(diffX) > Math.abs(diffY)) {
                    
                    //Swipe Left
                    if(diffX > 0) {
                        console.log('swipe left')
                        move(-1, 0);
                    }
                    
                    //Swipe Right
                    else if(diffX < 0) {
                        console.log('swipe right')
                        move(1, 0);
                    } ;
                }
                
                //Vartical Swipe
                else if(Math.abs(diffX) < Math.abs(diffY)) {
                    
                    //Swipe Up
                    if(diffY > 0) {
                        console.log('swipe up')
                        move(0, -1);
                    }
                    
                    //Swipe Down
                    else if(diffY < 0) {
                        console.log('swipe down')
                        move(0, 1);
                    } ;
                }
    
            }
        })
    }

    swipe();

    document.addEventListener('keydown', (e) => {
        if(e.code == 'KeyW' && pos[1] != 0 && !wall(0)) {
            key.up = true;
        } 
        else if(e.code == 'KeyS' && pos[1] != rows.length-1 && !wall(2)) {
            key.down = true;
        }
        else if(e.code == 'KeyA' && pos[0] != 0 && !wall(3)) {
            key.left = true;
        }
        else if(e.code == 'KeyD' && pos[0] != columns.length-1 && !wall(1)) {
            key.right = true;
        }
    })

    document.addEventListener('keyup', (e) => {
        if(e.code == 'KeyW') key.up = false;
    
        else if(e.code == 'KeyS') key.down = false;

        else if(e.code == 'KeyA') key.left = false;

        else if(e.code == 'KeyD') key.right = false;

    })
    

    let keyInterval = setInterval(() => {
        if(key.up) {
            move(0, -1);
        } else if(key.down) {
            move(0, 1);
        } else if(key.left) {
            move(-1, 0)
        } else if(key.right) {
            move(1, 0);
        }
    }, 100);
}

for(let i = 0; i < columns; i++) {
    cells.push([]);
    for(let a = 0; a < rows; a++) {
        let cell = new Cell(i, a);
        cells[i].push(cell)
        cell.draw();
    }
}


// ctx.fillStyle = 'red';
// ctx.fillRect((columns-1)*blockSize, (rows-1)*blockCount+blockSize, blockSize, blockSize);

cells[0][0].visit();