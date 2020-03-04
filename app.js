const app = require('express')();
const mongoose = require('mongoose');
const User = require('./models/User');
const express = require('express');

mongoose.connect('mongodb://localhost:27017/census_db', {useNewUrlParser: true})
    .then(() => {
        console.log("Connected to db");
    })
    .catch(err => {
        console.error(err);
    });

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const logger = require('morgan');
app.use(logger('dev'));

app.post('/register', async (req, res) => {

    try {
        let user = await User.create(req.body);
        res.send({
            id: user.id
        })
    } catch (e) {
        console.error(e);
        res.status(422).send({
            code: e.code,
            error: e.name
        })
    }

});

app.get('/user_profile', async(req, res)=>{
    let userId = req.headers['user_id'];
    let user = await User.findById(userId);
    if(user){
        res.send(user)
    }
    else {
        res.status(404)
            .send({error: 'User not found'});
    }
})

app.post('/user_details', async (req, res)=>{
    let userId = req.headers['user_id'];

    let user = await User.findById(userId);
    if(!user)
        return res.status(404)
            .send({
                error: "User not found"
            });

    try {
        await User.findByIdAndUpdate(user.id, {
            maritalStatus: req.body.maritalStatus,
            digitalAddress: req.body.digitalAddress,
            employmentStatus: req.body.employmentStatus,
            address: req.body.address
        })

        res.send({success: true})
    }
    catch (e) {
        res.status(522)
            .send({error: e.name})
    }



});

app.post('/login', async (req, res) => {

    let user = await User.findOne(
        {
            email: req.body.email,
            password: req.body.password
        });
    if (!user) {
        res.status(404)
            .send({error: 'User not found'})
    } else {
        res.send({
            id: user.id
        })
    }
});

app.listen(3000, () => {
    console.log("App Listening on Port 3000!");
});