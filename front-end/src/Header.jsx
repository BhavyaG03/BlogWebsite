import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from './UserContext'

const API_URL=import.meta.env.VITE_API_URL;

const Header = () => {
  const{setUserInfo,userInfo}=useContext(UserContext)
  useEffect(()=>{
    fetch(`${API_URL}/profile`,{
      credentials:'include'
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
      })
    })
  },[])
  function logout() {
    fetch(`${API_URL}/logout`,{
      credentials :'include',
      method:'POST',
    })
    setUserInfo(null)
}
const username=userInfo?.username

  return (
    <div>
    <header>
      <Link to="/" className="logo">MyBlog</Link>
      <nav>
        {username && (
          <>
            <Link to='/create'>Create New Post</Link>
            <a onClick={logout}>Logout</a>
          </>
        )}
        {!username && (<>
          <Link to="/login" className="login">Login</Link>
        <Link to="/register" className="register">Register</Link>
        </>)}
        </nav>
    </header>
    </div>
  )
}

export default Header