let router = require('express').Router();
let Users = require('../models/usersModel.js');
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/lithub', {useNewUrlParser: true, useUnifiedTopology: true});

router.get('/', (req, res) => {
    res.render('login.ejs', {errors : [] });
})

router.post('/', async (req, res) => {
    console.log('started');


    let {email, password} = req.body;

    if(email.length < 8 || !email.includes('@')) {
        res.status(400).send();
        return false;
    }

    if(password.length < 6) {
        res.status(400).send();
        return false;
    }

    let user = await Users.findOne({
        email : email
    })
    
    if(await bcrypt.compare(password, user.password)) {
        req.session.userId = user._id;

        console.log(req.session)

        res.status(200).send();
        
        return false;
    } else {
        res.status(400).send();
        return false;
    }
})

module.exports = router;