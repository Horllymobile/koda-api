const jwt = require('jsonwebtoken');

const admin = (req, res, next) => {
    if(req.user.isAdmin){
        next();
    }
    return res.status(401).send('You are not an admin');
}

module.exports = admin;