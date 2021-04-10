document.body.style.height = `${window.innerHeight}px`;

(() => {
    let loadingScreen = document.getElementsByClassName('loadingScreen')[0]; 

    window.addEventListener('load', () => {
        
        loadingScreen.style.opacity = '0';

        setTimeout(() => loadingScreen.style.display = 'none', 1000)
    })
})();


(() => {

    document.getElementById('loginForm').addEventListener('submit', async e => {
        e.preventDefault();

        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;


        let fetched = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                email : email,
                password: password
            })
        });

        // let text = JSON.parse(await fetched.text());

        // console.log('isArray', Array.isArray(text));

        if(fetched.status == 400) {
            document.getElementsByClassName('errors')[0].innerHTML = 'Invalid Email Or Password';
        } else if(fetched.status == 200) {
            location.replace('/');
        }

    })

})()