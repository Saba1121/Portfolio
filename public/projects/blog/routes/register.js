let mongoose = require('mongoose');
let router = require('express').Router();
let Users = require('../models/usersModel.js');
let bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost/lithub', {useNewUrlParser: true, useUnifiedTopology: true});

router.get('/', (req, res) => {
    res.render('register.ejs', { errors: [] });
})

router.post('/', async (req, res) => {

    console.log(req.body)

    let {username, email, password, rpassword} = req.body;

    let errors = [];
    
    if(username.legth < 6) errors.push('Username Must Be At Least 6 Characters');

    if(email.length < 8 || !email.includes('@')) errors.push('Enter Valid Email');

    if(password.length < 6) errors.push('Passowrd Must Be At Least 6 Characters');

    if(password != rpassword) errors.push('Passowrd Doesn\'t Match');

    if(errors.length > 0) {
        // res.render('register.ejs', {errors : errors});
        res.status(400).send(errors);
        return false;
    }

    try {
        let emailExists = await Users.find({ email : email });
        console.log('email exists:', emailExists);
        
        if(emailExists.length > 0) {
            res.status(400).send(['Email Exists']);
            return false;
        }

        let hashedPassword = await bcrypt.hash(password, 10);
        
        let upload = await Users.create({
            username : username,
            email : email,
            password : hashedPassword
        })
        

        req.session.userId = upload._id;

        res.status(200).send();

    } catch(e) {
        res.status(400).send(['Something Went Wrong']);
        console.log('ERROR', e);
        return false;
    }
});

module.exports = router;