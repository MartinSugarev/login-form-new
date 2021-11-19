import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


export default function Login(){
   const history = useHistory()
   const [email, SetEmail] = useState('')
   const [password, SetPassword] = useState('')


   const handleSubmit = async (e) => {
       e.preventDefault()
      await axios.post('http://localhost:4000/login', {
          email,
          password
      }).then(res => {
         if(res.data.msg === 'incorect email'){
             alert('incorect email')
             return
         }else if(res.data.msg === 'incorect password'
         ){
             alert('incorect password')
             return
         }else if(res.data.msg === 'logged in'){
            history.push('/')
        }else{
            return
        }
        
    })

   }

    return (
        <div className="home-page-login">
        <form className="login-form">
           <label>Email</label>
           <input type="text" placeholder="john@gmail.com" value={email} onChange={(e)=> SetEmail(e.target.value)}/>
           <label>Password</label>
           <input type="password" placeholder="Password" value={password} onChange={(e) => SetPassword(e.target.value)}/>
           <button onClick={(e) => handleSubmit(e)} >login</button>
        </form>
    </div>
    )
}