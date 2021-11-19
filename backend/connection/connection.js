const mongoose = require("mongoose")
const URI = "mongodb+srv://test-user:test123456@cluster0.ufu7w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"


const connect =  () => {
     mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err))
   
}

module.exports = connect