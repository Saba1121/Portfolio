class News {
    constructor() {
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
        this.api = `${this.proxy}https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8fb5911839064a9fad35d86ad3616ded`;
    }
    
    fetchNews() {
        fetch(this.api)
            .then(data => { return data.json() })
            .then(data => {
                document.getElementsByClassName('loading')[0].style.display = 'none';

                let articles = data.articles;
                for(let i = 0; i < articles.length; i++) {
                    
                    let post = document.createElement('a');
                        post.className = 'post';
                        post.href = articles[i].url;
                        post.target = '_blank';

                    let p = document.createElement('p');
                        p.innerHTML = articles[i].title;
                        p.href = articles[i].url;
                        p.target = '_blank';

                    let img = document.createElement('img');
                        img.src = articles[i].urlToImage || 'noImage.png';

                    post.appendChild(p);
                    post.appendChild(img);

                    document.querySelector('section.main .container').appendChild(post);
                }

            }).catch(e => console.log)
    }
}

let news = new News();

news.fetchNews()