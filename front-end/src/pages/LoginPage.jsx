import {React,useContext,useState} from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
const API_URL=import.meta.env.VITE_API_URL;
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const[redirect,setRedirect]=useState(false)
    const{setUserInfo}= useContext(UserContext)
    const login=async(e)=>{
        e.preventDefault()
       
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username: username,
                password: password
            }, {
                withCredentials: true
            });
            
            if (response.status === 200) {
                setUserInfo(response.data);
                setRedirect(true);
            }
            
        } catch (error) {
            if (error.response && error.response.status === 401) {
                alert('wrong credentials');
            } else {
                console.error(error);
                alert('An error occurred.');
            }
        }
           
       setUsername('');
       setPassword('');
    }
    if (redirect) {
        return<Navigate to={'/'}></Navigate>
    }
  return (
    <div>
         <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input type="text"
             placeholder="username"
             value={username}
             onChange={e => setUsername(e.target.value)}/>
      <input type="password"
             placeholder="password"
             value={password}
             onChange={e => setPassword(e.target.value)}/>
      <button>Login</button>
    </form>
    </div>
  )
}

export default LoginPage