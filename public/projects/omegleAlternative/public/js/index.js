document.getElementsByClassName('container')[0].style.height = window.innerHeight + 'px';

// document.getElementsByClassName('container')[0].style.gridTemplateRows = `${window.innerHeight-50}px 50px`

window.addEventListener('resize', () => {
    document.getElementsByClassName('container')[0].style.height = window.innerHeight + 'px';

})

class Main {
    constructor() {
        this.socket = io();
        this.user = false;
        this.searching = true;
    }

    messageAppender(data, cssClass) {
        let msgs = document.getElementsByClassName('messages')[0];
        let toScroll = false;

        if(msgs.scrollTop + msgs.clientHeight >= msgs.scrollHeight) {
            toScroll = true;
        }

        let p = document.createElement('p');
        
        p.innerHTML = data;
        
        cssClass ? p.className = cssClass : null; 
        
        document.getElementsByClassName('messages')[0].appendChild(p);
        
        if(toScroll) msgs.scrollTop = msgs.scrollHeight;
    }

    clearMessages() {
        let messages = document.getElementsByClassName('messages')[0];

        while(messages.firstChild) {
            messages.removeChild(messages.firstChild)
        }
    }

    send(msg) {
        if(msg.trim().length == 0) return false;

        this.socket.emit('send', {msg : msg, user : this.user})
        
        this.messageAppender(msg, 'mine');
    }

    eventListeners() {

        document.getElementsByClassName('send')[0].addEventListener('submit', (e) => {
            e.preventDefault();

            let input = document.getElementById('input');

            this.send(input.value);

            input.value = '';
        })

        document.getElementById('next').addEventListener('click', () => {
            // let messages = document.getElementsByClassName('messages')[0];
            if(this.searching) return false;

            this.searching = true;

            if(this.user) this.socket.emit('user disconnected', this.user);
            
            this.user = false;

            this.socket.emit('find new');

            this.clearMessages();

            this.messageAppender('Searching...')
        });
    }

    disableInput(disabled = true) {
        document.getElementById('send').disabled = disabled;
        document.getElementById('input').disabled = disabled;
    }

    socketHandlers() {
        this.socket.on('user joined', data => {
            this.user = data;
            this.searching = false;

            this.clearMessages();

            this.messageAppender('Connected');
            
            this.disableInput(false);

        })
        
        this.socket.on('send', data => {
            this.messageAppender(data, 'guests');
        })
        
        this.socket.on('user left', () => {
            this.user = false;

            this.messageAppender('User Disconnected');

            this.disableInput();
        })
    }


} 


let main = new Main();

main.socketHandlers();
main.eventListeners();
