

(() => {

    document.getElementById('logout').addEventListener('click', async () => {
        await fetch('http://localhost:3000/logout', {
            method: 'POST'
        });

        location.replace('/');
    })

})();


(() => {

    function post(text) {
        let username = document.getElementById('username').value;
        let posts = document.getElementsByClassName('posts')[0]; 
        posts.innerHTML = `
            <div class="post">
                <h3>${username}</h3>
                <p>${text}</p>
            </div>
        ` + posts.innerHTML;
    }

    document.getElementById('post').addEventListener('submit', async e => {
        e.preventDefault();

        let text = document.getElementById('text').value;

        document.getElementById('text').value = '';

        try {
            await fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    text : text
                })
            })

            post(text);
        } catch(e) {
            console.log('e', e)
            // location.replace('/')        
        }
    })

})();