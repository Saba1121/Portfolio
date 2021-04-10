let add = () => {
    let btn = document.getElementsByTagName('button')[0];
    let ul = document.getElementsByTagName('ul')[0];
    
    //Listens for "Enter" click
    document.getElementsByTagName('input')[0].addEventListener('keypress', (e) => {
        if(e.keyCode == 13) btn.click();
    })

    //Listens for button click
    btn.addEventListener('click', () => {
        let input = document.getElementsByTagName('input')[0].value.trim();
        
        document.getElementsByTagName('input')[0].focus();
        //Input must be at least 1 character
        if(input.length < 1) return false;
        
        //deltes already added item from input
        document.getElementsByTagName('input')[0].value = '';

        let li = document.createElement('li');
        li.innerHTML = input;

        let span = document.createElement('span');
        span.innerHTML = 'X';

        //Delete elemen on X click
        span.addEventListener('click', function() {
            this.parentNode.parentNode.removeChild(this.parentNode);
        })

        li.appendChild(span);

        //Line through for done + undo
        li.addEventListener('click', function() {
            if(this.style.textDecoration == 'line-through') this.style.textDecoration = 'none';
            else this.style.textDecoration = 'line-through';
        })

        ul.append(li);
    })
}

add();
