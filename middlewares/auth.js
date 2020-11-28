const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('X-Auth-Token');
    if(!token) return res.status(401).send('Access denied. No token provided');

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token provided');
        console.log(error);
    }

}

module.exports = auth;