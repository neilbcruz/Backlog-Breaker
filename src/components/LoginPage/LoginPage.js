import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import './LoginPage.scss';

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;

export default function LoginPage({ theme }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.bearerToken);

  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post(loginUrl, {
      username: e.target.username.value,
      password: e.target.password.value
    })
      .then((response) => {
        sessionStorage.setItem('JWTtoken', response.data.token);

        setIsLoggedIn(true);
        setIsLoginError(false);
        setErrorMessage("");
        navigate('/profile')
      })
      .catch((error) => {
        setIsLoginError(true);
        setErrorMessage(error.response.data.error.message);
      });
  };

  return (
    <div className={`login ${theme}`}>
      <h2 className='login__text'>Login</h2>
      {isLoginError && <label className='login__error' style={{ color: "red" }}>{errorMessage}</label>}
      <form className='login__form' onSubmit={handleLogin}>
        <input
          type="text"
          name='username'
          className={`login__input ${theme}`}
          placeholder="Username" />
        <input
          type="password"
          name='password'
          className={`login__input ${theme}`}
          placeholder="Password" />
        <button className={`login__submit ${theme}`} type="submit">
          Login
        </button>
        <a href="#" className="login__forgot p-medium">forgot password?</a>
      </form>
    </div>
  );
}