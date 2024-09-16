import {React,useState} from 'react'
import axios from 'axios'

const API_URL=import.meta.env.VITE_API_URL;

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const register=async(e)=>{
        e.preventDefault()
          const response = await axios.post(`${API_URL}/register`,
          {
            username:username,
            password:password
          })
          if (response.status===201) {
            console.log(response.data)
            alert('Registration successful')
          } else {
            alert('Registration failed')
          }
          
         
         setUsername('');
         setPassword('');
    }
  return (
    <div>
        <form className="register" onSubmit={register}>
      <h1>Register</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
      <button>Register</button>
    </form>
    </div>
  )
}

export default RegisterPage