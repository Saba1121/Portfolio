let express = require('express');
let router =  express.Router();
let postsModel = require('./../models/postsModel'); 
let usersModel = require('./../models/usersModel'); 


router.get('/', async (req, res) => {
    let {userId} = req.session; 
    console.log('req.session', req.session)
    if(userId) {
        let posts = await postsModel.find({}).populate('author').sort({_id : -1});
        let user = await usersModel.findOne({_id : userId});
        console.log('user', user);
        console.log('posts', posts)
        res.render('home.ejs', { posts : posts, user : user });
    } else {
        res.redirect('/login');
    }
})

router.post('/logout', (req, res) => {
    console.log(req.session)

    req.session.destroy();

    res.status(200).send();
})

router.post('/post', async (req, res) => {
    let {text} = req.body
    let {userId} = req.session;

    console.log(req.session)

    if(!userId) {
        res.status(400).send();
        return false;
    }

    postsModel.create({
        text : text,
        author : userId
    })

    res.status(200).send();
})

module.exports = router;