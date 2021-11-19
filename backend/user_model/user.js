const mongoose = require("mongoose")

const dataImages = new mongoose.Schema({
    image: 
        {
            type: String
        }
    
})

const user = new mongoose.Schema({
    email: {
        type: String,
        
    },
    password: {
        type: String,
        
    },
    name: {
        type: String,
        
    },
    children: [dataImages]
})

module.exports = User = mongoose.model('user', user)