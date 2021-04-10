let express = require('express');
let session = require('express-session');
let cookieParser = require('cookie-parser');
let registerRoute = require('./routes/register.js');
let loginRoute = require('./routes/login.js');
let homeRoute = require('./routes/home.js');

let app = express();
app.set('views', 'views')

app.use(cookieParser());
app.use(express.static('public'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

app.use(session({
    'secret': '343ji43j4n4jn4jk3n'
}));


app.use('/', homeRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);


app.listen(3000, () => console.log('Start on port 3000'));
