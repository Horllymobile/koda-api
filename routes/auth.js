const hash = require('./../functions/hash');
const { Router } = require('express');
const _ = require('lodash');
const User = require('./../models/User');
const valdate = require('../validations/user');
const bcrypt = require('bcrypt');


const router = Router();

router.post('/auth', async (req, res) => {
    let user = await User.findOne({email: req.body.email});

    if(!user) return res.send('User email was not found');

    const isHash = bcrypt.compareSync(req.body.password, user.password);
    if(!isHash) return res.status(400).send('Password did not match');

    const token = user.generateToken();
    res.setHeader('X-Auth-Token', token);
    return res.send(token);
});


module.exports = router;