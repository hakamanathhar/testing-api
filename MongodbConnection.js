
require('dotenv').config()
const mongoose = require('mongoose');

module.exports = {
    connect: async(req, res) =>{
        try {
            const url = process.env.MONGODB_URL
            mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            }, (error, client) => {
            if(error){
                return console.log(error)
            }
            
            console.log(`MongoDB Connected: ${url}`);
        });
        } catch (error) {
            console.log(error)
        }
    }
}
