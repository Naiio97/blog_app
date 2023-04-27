import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import axios from 'axios';
import '../style/login.scss';

import { string } from 'joi';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const hendleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      username,
      password,
    };

    try {
      const response = await axios.post(
        'https://fullstack.exercise.applifting.cz/login',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'bc3f9b9d-31d8-4b64-acb8-6476f166653c',
          },
        }
      );
      const data = await response.data;

      if (response.status === 200) {
        localStorage.setItem('access_token', data.access_token);
        navigate('/myArticles');
      }
    } catch (err: any) {
      if (err.response.status === 400) {
        setError('Invalid login credentials!');
      }

      if (err.response.status === 401) {
        setError('Invalid login invalid!');
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="login-container">
        <form onSubmit={hendleSubmit} className="login-form">
          <h1>Log in</h1>
          <div className="inputs">
            <label>Username</label>
            <br />
            <input
              type="text"
              placeholder="my@example.com"
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <br />
            <label>Password</label>
            <br />
            <input
              type="password"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          {error && <span>{error}</span>}
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
