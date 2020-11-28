const mongoose = require('mongoose');


module.exports = async function(){
    try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useFindAndModify: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });

        if(con) {
            console.log('Connected');
        }
    } catch (error) {
        console.log(error.message);
    }
}