import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import LogOut from './logout'
import { useSelector, useDispatch } from 'react-redux'



export default function Home(){
  const isloggedIn = useSelector(state => state.isLoggedIn)
  const history = useHistory()
  const [name, SetName] = useState("")
  const [email, SetEmail] = useState("")
  const [password, SetPassword] = useState("")
  const [userName, setUserName] = useState('')
  const [img, SetImg] = useState(null)
  const [downloadedImages, SetDownloadedImages] = useState([])
  const [images, SetImages] = useState('')
  const dispatch = useDispatch()

  axios.defaults.withCredentials = true

  const sendData = () => {
    return {
      type: 'logged in'
    }
  }

  useEffect(() => {

      const ifLoggedCheck = async () => {
        try {
          await axios.get('http://localhost:4000').then(res => {
            if(res.data.msg === 'logged in'){
            // setTest(test => !test)
              dispatch(sendData())
              setUserName(res.data.name)
              SetDownloadedImages(res.data.message[0].children)
            }else{
             /// setTest(test => !test)
            dispatch(() => {
              return {
                type: 'not logged in'
              }
            })
              setUserName(res.data.name)
            }
        })
        } catch (error) {
          console.log(error)
        }}
        ifLoggedCheck() 
  })


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:4000',{
      name,
      email,
      password
    }).then(res => {
      if(res.data.msg === 'this email is already used!'){
        alert('This email is already used!')
        return
      }
      setUserName(res.data.userName)
     dispatch(sendData())
    })
    } catch (error) {
      console.log(error)
    }
    
  
   
    
  }
  const handleClick = (e) => {
    e.preventDefault()
    history.push('/login')
  }
  const handleClickImg = async (e) => {
    e.preventDefault()
    const files = new FormData()
    files.append('file', img)
  await  axios.post('http://localhost:4000/',
      files, {
        headers: {
           'content-type': 'multipart/form-data'
        }
     }
    ).then(res => {
      console.log(res)
    })
  }
  const handleDelete = async (m) => {
   const image = m.image
   await axios.delete(`http://localhost:4000`, {data: {image}}).then(res => {
      SetImages(images => images = res.data.msg)
    })
  }
  

    return (
      isloggedIn.login ? (
        <div className="h-p">
          <LogOut />
          <div className="home-page">
          <div className="home-page-salute">
            Welcome, {userName}! 
          </div>
          <div className="img-container">
           {downloadedImages.map((m) => {
              return (<div key={m._id}>
              <img src={`http://localhost:4000/public/${m.image}`} className="img-style"  />
              <button onClick={() => handleDelete(m)} >delete me</button>
              </div>)
           })}
          </div>
          <div className="upload-form">
          <form encType="multipart/form-data" > 
            <input type="file" accept=".jpeg" onChange={(e) => {
              const file = e.target.files[0]
              SetImg(file)
            }} />
            <button className="upload-btn" onClick={(e) => handleClickImg(e)}>Upload image</button>
          </form>
          </div>
        </div>
        </div>
        
      )
       :
     ( <div className="home-page-register">
          <form className="form">
             <label>Name</label>
             <input type="text" placeholder="name" value={name} onChange={(e) => SetName(e.target.value)}/>
             <label>Email</label>
             <input type="text" placeholder="john@gmail.com" value={email} onChange={(e)=> SetEmail(e.target.value)}/>
             <label>Password</label>
             <input type="password" placeholder="Password" value={password} onChange={(e) => SetPassword(e.target.value)}/>
             <button onClick={(e) => handleSubmit(e)} >Register</button>
          </form>
          <p className="login-p">Alread have an account<button onClick={(e) => handleClick(e)} className="login-btn">login</button></p>
      </div>
     )
    )
}