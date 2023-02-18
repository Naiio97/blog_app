import React from 'react'
import '../style/login.scss'

const Login = () => {
  return (
    <div className="login-container">
      <form className="login-form">
        <h1>Log in</h1>
        <div className="inputs">
          <label>Email</label><br />
          <input type="email" placeholder="my@example.com"></input>
          <br />
          <label>Heslo</label><br />
          <input type="password" placeholder="**********"></input>
        </div>
      </form>
    </div>
  )
}

export default Login