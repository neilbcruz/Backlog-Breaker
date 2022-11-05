import { useState } from "react";
import ProfilePage from "../../pages/ProfilePage/ProfilePage";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/login`;
const registerUrl = `${baseUrl}/register`;

export default function LoginPage() {
  const [isRegistered, setisRegistered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginError, setIsLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
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
      if (e.target.username.value === '' || e.target.password.value === '' || e.target.name.value) {
        return false;
      }
      return true;
    }

    if (!validForm()) {
      alert('Please fill out the register form')
      window.location.reload()
    }
  };

  // const handleLogin = (e) => {
  //   e.preventDefault();

  //   axios.post(loginUrl, {
  //     username: e.target.username.value,
  //     password: e.target.password.value
  //   })
  //     .then((response) => {
  //       sessionStorage.setItem('JWTtoken', response.data.token);

  //       setIsLoggedIn(true);
  //       setIsLoginError(false);
  //       setErrorMessage("");
  //     })
  //     .catch((error) => {
  //       setIsLoginError(true);
  //       setErrorMessage(error.response.data.error.message);
  //     });
  // };

  // const renderRegister = () => (
  //   <div>
  //     <h1>Register</h1>
  //     <form onSubmit={handleRegister}>
  //       <div className="form-group">
  //         Username: <input type="text" name="username" />
  //       </div>
  //       <div className="form-group">
  //         Name: <input type="text" name="name" />
  //       </div>
  //       <div className="form-group">
  //         Password: <input type="password" name="password" />
  //       </div>
  //       <button className="btn btn-primary" type="submit">
  //         Register
  //       </button>
  //     </form>
  //   </div>
  // );

  // const renderLogin = () => (
  //   <div>
  //     <h1>Login</h1>
  //     {isLoginError && <label style={{ color: "red" }}>{errorMessage}</label>}
  //     <form onSubmit={handleLogin}>
  //       <div className="form-group">
  //         Username: <input type="text" name="username" />
  //       </div>
  //       <div className="form-group">
  //         Password: <input type="password" name="password" />
  //       </div>
  //       <button className="btn btn-primary" type="submit">
  //         Login
  //       </button>
  //     </form>
  //   </div>
  // );

  // Handle the Signup/Login
  // if (!isRegistered) return renderRegister();
  // if (!isLoggedIn) return renderLogin();

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            Username: <input type="text" name="username" />
          </div>
          <div className="form-group">
            Name: <input type="text" name="name" />
          </div>
          <div className="form-group">
            Password: <input type="password" name="password" />
          </div>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}