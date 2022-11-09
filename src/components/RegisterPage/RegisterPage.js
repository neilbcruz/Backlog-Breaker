import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const baseUrl = "http://localhost:8080";
const registerUrl = `${baseUrl}/register`;

export default function LoginPage({ theme }) {
  const [isRegistered, setisRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    axios.post(registerUrl, {
      username: e.target.username.value,
      name: e.target.name.value,
      password: e.target.password.value
    })
      .then(() => {
        setisRegistered(true);
        navigate('/login')
      });

    const validForm = () => {
      if (e.target.username.value === '' || e.target.password.value === '' || e.target.name.value === '') {
        return false;
      }
      return true;
    }

    if (!validForm()) {
      alert('Please fill out the register form')
      window.location.reload()
    }
  };

  return (
    <div className={`login ${theme}`}>
      <h2 className='login__text'>Register</h2>
      <form className='login__form' onSubmit={handleRegister}>
        <input
          type="text"
          name='name'
          className={`login__input ${theme}`}
          placeholder="Name" />
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
          Register
        </button>
      </form>
    </div>
  );
}