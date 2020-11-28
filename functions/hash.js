const bcrypt = require('bcrypt');

module.exports = function(password) {
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    return hash
}
