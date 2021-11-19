const User = require('./user_model/user')
const multer = require('multer')


const routes = (app) => {

  const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

const upload = multer({ storage: storage })


app.get('/', async (req, res) => {
  
  const user = req.cookies
    
  const isUserExist = Object.entries(user).length
    if(isUserExist > 0){
      const info = await User.find({'email': user.userCookie})
      const name = info[0]['name']
  
      res.send({msg: 'logged in', name: name, message: info })
    }else{
      res.send({msg: 'not logged in', name: '', message: []})
    } 

  
})    

app.post('/', upload.single('file'),  async (req, res) => {
    const { name, email, password } = req.body
    
    
    const userCookie = req.cookies
    const isUserExist = Object.entries(userCookie).length
    
    if(name && email && password){
      const user = {}
      const isLogged = await User.find({'email': email})
      if(isLogged.length > 0){
            res.send({msg:'this email is already used!'})
            return
        }
      user.name = name;
      user.email = email;
      user.password = password
  
      const newUser = new User(user)
      await newUser.save()
      res.cookie('userCookie', email)
      res.status(200).send({msg: 'logged in', data: user, userName: user.name})
      
    }
    
    if(isUserExist > 0 && req.file.filename){
      const img = req.file.filename
      const user = await User.findOne({ 'email': userCookie.userCookie }) 
      if(user.children === null){
        return
      }else{
      user.children.push({'image': img})
      const updated = await user.save()
      }
    }
    
    
    if(req.body.data === 'logout' ){
      res.clearCookie('userCookie')
      res.status(200).send({msg: 'logged out'})
    }else{
      return
    }
    
    
    
 })
 
app.post('/login', async (req, res) => {
   const { email, password } = req.body


   
   const submittedEmail = await User.find({'email': email})
   const submittedPass = await User.find({'password': password})
   
   if(submittedEmail.length === 0){
     res.send({msg: 'incorect email'})
   }else if(submittedPass.length === 0){
     res.send({msg: 'incorect password'})
   }
    else if(email === submittedEmail[0].email && password === submittedPass[0].password){
     res.cookie('userCookie', email)
     res.send({'msg': 'logged in', name: submittedPass.name})
   }else{
     res.send({'user': 'not logged in', name: ''})
   } 
 })
app.delete('/', async (req, res) => {
 const info = req.cookies
 const user = info.userCookie
 const image = req.body.image
console.log(image)
 const userInfo = await User.findOne({'email': user}) 
console.log(userInfo)
const updated = userInfo.children.filter(obj => obj.image !== image)
userInfo.children = updated
const newArr = await userInfo.save()
res.status(200).send({msg: 'you deleted the item'})
})


}

module.exports = routes