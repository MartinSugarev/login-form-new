import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import axios from 'axios'


//axios.defaults.withCredentials = true
export default function LogOut(){
    const logout2 = () => {
        return {
            type: 'not logged in'
        }
    }
    const history = useHistory()
    
    const dispatch = useDispatch()

   const logout = async () => {
   await  axios.post('http://localhost:4000', { 'data': 'logout' },
   {
       withCredentials: true
       
   }).then(res => {
    dispatch(logout2())
    history.push('/')
     })   
     
        
    }
    
    
    return(
        <div className="logout-component">
           <button onClick={() => {
               logout()
           }} className="logout-btn">LogOut</button>
        </div>
    )


}