const hash = require('./../functions/hash');
const { Router } = require('express');
const _ = require('lodash');
const User = require('./../models/User');
const valdate = require('../validations/user');
const authentication = require('./../middlewares/auth');
const authorization = require('../middlewares/admin');


const router = Router();

router.get('/users', [authentication, authorization], async (req, res) => {
    try {
        let user = await User.find();
        return res.send(user);
    } catch (error) {
        res.send(error.message);
    }
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    try {
        let user = await User.findById(id);
        user = _.pick(user, ['_id', 'name', 'email', 'isAdmin']);
        return res.send(user);
    } catch (error) {
        res.send(error.message);
    }
});

router.post('/users', async (req, res) => {
    const { error } = valdate(req.body);

    if(error) return res.status(404).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});

    if(user) return res.status(403).send('User with this email already exist');

    user =  { ...req.body };

    user = new User(req.body);
    const token = user.generateToken()
    user.password = hash(user.password);

    await user.save();

    user = _.pick(user, ['_id', 'name', 'email', 'isAdmin']);
    return res.header('X-Auth-Token', token).send(user)

});


module.exports = router;