import { useState, useEffect } from "react";
import axios from "axios";
import UploadImage from '../../components/UploadImage/UploadImage';
import './ProfilePage.scss';
import { NavLink } from "react-router-dom";
import LoginPage from '../../components/LoginPage/LoginPage';

const gamesUrl = 'http://localhost:8080/games/'
const profileUrl = 'http://localhost:8080/profile'

export default function Profile({ theme }) {
  const [game, setGame] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!sessionStorage.bearerToken
  );
  const reload = () => {
    window.location.reload()
  }

  useEffect(() => {
    const token = sessionStorage.getItem('JWTtoken');

    if (!token) {
      return;
    }

    axios.get(profileUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setIsLoading(false);
        setUserInfo({ name: response.data.username });
      });


  }, []);

  const logOut = () => {
    sessionStorage.removeItem('JWTtoken');
    setIsUserLoggedIn(false);
    reload();
  }

  useEffect(() => {
    axios.get(gamesUrl)
      .then((resp) => {
        setGame(resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const activeStatus = async (games, id) => {
    console.log(games)

    const toActive = {
      id: games.id,
      name: games.name,
      background_image: games.background_image,
      status: "active"
    }

    axios
      .put(`${gamesUrl}${id}`, toActive)
      .then((toActive) => {
        console.log(toActive);
      })
      .catch((err) => {
        console.log(err);
      })
    reload()
  }

  const finishStatus = async (games, id) => {
    console.log(games)

    const toFinish = {
      id: games.id,
      name: games.name,
      background_image: games.background_image,
      status: "finished"
    }

    axios
      .put(`http://localhost:8080/games/${id}`, toFinish)
      .then((toFinish) => {
        console.log(toFinish);
      })
      .catch((err) => {
        console.log(err);
      })
    reload()
  }



  const handleDelete = async (games, id) => {
    axios.delete(`http://localhost:8080/games/${id}`)
    // closeModal()
    // alert('Game deleted');
    // navigate('/profile')
    reload()

  }

  return (isUserLoggedIn ?
    <div className='message'>
      <h1 className='message__text'>Hello! Please Register/Login!</h1>
      <div className='message__nav'>
        <NavLink to='/login'>
          <button className={`message__nav-text ${theme}`}>Log In</button>
        </NavLink>
        <NavLink to='/register'>
          <button className={`message__nav-text ${theme}`}>Register</button>
        </NavLink>
      </div>
    </div>
    :
    <header className='profile'>
      <div className='profile__header'>
        {/* <UploadImage className='profile__header-pic' /> */}
        <h1 className='profile__header-name'>{userInfo.name}</h1>
        <div className='profile__logout'>
          {isUserLoggedIn ? <></> : <button className={`profile__logout-text ${theme}`} onClick={logOut}>Log Out</button>}
        </div>
      </div>
      {
        game
          .map((games) => {
            return (
              <div className={`profile__container ${theme}`} key={games.id}>
                <div className='profile__title'>
                  <h2>{games.name}</h2>
                </div>
                <div className='profile__info'>
                  <img src={games.background_image} />
                  <div className='profile__info-more'>
                    <p className='profile__info-status'>Status: {games.status}</p>
                    {games.description_raw}
                    <div className='profile__info-edit'>
                      <button onClick={() => activeStatus(games, games.id)} className={`profile__info-active ${theme}`}>Active</button>
                      <button onClick={() => finishStatus(games, games.id)} className={`profile__info-active ${theme}`}>Finish</button>
                      <button onClick={() => handleDelete(games, games.id)} className={`profile__info-active ${theme}`}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
      }
    </header>
  );
}

// Profile Page after Signing in //
// export default function Profile() {


//   return isLoading ? <h1>Loading...</h1> : <h1>Welcome {userInfo.name}!</h1>;
// }