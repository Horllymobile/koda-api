const Joi = require('joi');

module.exports = function(user){
    const schema = Joi.object({
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().min(5).max(100).email(),
        password: Joi.string().required().min(5).max(16)
    });

    return schema.validate(user);
}