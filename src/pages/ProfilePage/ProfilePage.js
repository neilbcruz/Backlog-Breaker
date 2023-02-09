import { useState, useEffect } from "react";
import axios from "axios";
import './ProfilePage.scss';
import { NavLink } from "react-router-dom";
import ActiveStatus from '../../components/ActiveStatus/ActiveStatus';
import FinishStatus from '../../components/FinishStatus/FinishStatus';


const gamesUrl = 'http://localhost:8080/games/'
const userUrl = 'http://localhost:8080/user/'

export default function Profile({ theme }) {
  const [game, setGame] = useState([]);
  const [_isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    !!sessionStorage.bearerToken
  );

  // User Login Functions //
  const reload = () => {
    window.location.reload()
  }

  useEffect(() => {
    const token = sessionStorage.getItem('JWTtoken');

    if (!token) {
      return;
    }

    axios.get(userUrl, {
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

  // Game Functions //
  useEffect(() => {
    axios.get(gamesUrl)
      .then((resp) => {
        setGame(resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (!!isUserLoggedIn ?
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
    <header className={`profile ${theme}`}>
      <div className={`profile__box ${theme}`}>
        <div className='profile__header'>
          <h1 className='profile__header-name'>{userInfo.name}</h1>
          <div className='profile__logout'>
            {isUserLoggedIn ? <></> : <button className={`profile__logout-text ${theme}`} onClick={logOut}>Log Out</button>}
          </div>
        </div>
        <div className={'profile__top'} >
          {
            game
              .sort((a, b) => a.status > b.status ? 1 : -1)
              .map((games) => {
                return (

                  <div className={`profile__container ${theme}`} key={games.id}>
                    <h3 className={`results__container-text ${theme}`}>{games.name}</h3>
                    <img src={games.background_image} />
                    <div className='profile__info-more'>
                      <div className='profile__info-status'>
                        {games.status === 'active' ? <ActiveStatus /> : <FinishStatus />}
                      </div>
                      <NavLink to={`/profile/${games.id}`} games={games}>
                        <button className={`profile__nav-text ${theme}`}>Game Info</button>
                      </NavLink>
                    </div>
                  </div>
                )
              })
          }
        </div>
      </div>
    </header>
  );
}