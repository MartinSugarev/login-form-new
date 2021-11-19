const mongoose = require("mongoose")

const user = process.env.USERNAME;
const pass = process.env.PASSWORD;



const URI = `mongodb+srv://${user}:${pass}@cluster0.ufu7w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`


const connect =  () => {
     mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true })   
.then(() => console.log("Database connected!"))
.catch(err => console.log(err))
   
}

module.exports = connect