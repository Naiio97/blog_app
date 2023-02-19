import { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import axios from 'axios';
import '../style/login.scss'
import { string } from 'joi';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');



  const hendleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };
    
    try {
      const response = await axios.post("https://fullstack.exercise.applifting.cz/login", formData, {
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": "82e81c5e-f47e-4566-ac95-a7f7fec32c62",
        },
      });
      const data = await response.data;

      if (response.status === 200) {
        localStorage.setItem('access_token', data.access_token);
        navigate('/myArticle')
      }
    } catch (error:any){
      if(error.response.status === 400){
        setError('Invalid login credentials!')
      }

        if (error.response.status === 401) {
          setError('Invalid login invalid!')
        }
    }   
    

  }


  return (
    <div className="login-container">
      <form onSubmit={hendleSubmit} className="login-form">
        <h1>Log in</h1>
        <div className="inputs">
          <label>Email</label><br />
          <input type="text"
            placeholder="my@example.com"
            onChange={(e) => setUsername(e.target.value)}></input>
          <br />
          <label>Heslo</label><br />
          <input type="password"
            placeholder="**********"
            onChange={(e) => setPassword(e.target.value)}></input>
        </div>
        {error && (
        <span>{error}</span>)}
        <button>Log in</button>
      </form>
    </div>
  )
}

export default Login