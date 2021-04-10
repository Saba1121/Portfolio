document.body.style.height = `${window.innerHeight}px`;

(() => {
    let loadingScreen = document.getElementsByClassName('loadingScreen')[0]; 

    window.addEventListener('load', () => {
        
        loadingScreen.style.opacity = '0';

        setTimeout(() => loadingScreen.style.display = 'none', 1000)
    })
})();


(() => {
    function parseJSON(json) {
        try {
            return JSON.parse(json);
        } catch(e) {
            return json;
        }
    }

    function error(errors) {
        let errorsTag = document.getElementsByClassName('errors')[0];

        errorsTag.innerHTML = '';
        for(let i = 0; i < errors.length; i++) {
            errorsTag.innerHTML += `<span>${errors[i]}</span><br>`
        }
    }

    document.getElementById('registerForm').addEventListener('submit', async e => {
        e.preventDefault();

        let username = document.getElementById('username').value; 
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let rpassword = document.getElementById('rpassword').value;

        try {
            let fetched = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    username : username,
                    email : email,
                    password : password,
                    rpassword : rpassword
                })
            });

            if(fetched.status == 200) {
                location.replace('/');
            } else {

                // let errs = JSON.parse(await fetched.text());    
                let errs = parseJSON(await fetched.text());

                error(errs)
            }
        } catch(e) {
            console.log('e->', e)
        }
    })
})()