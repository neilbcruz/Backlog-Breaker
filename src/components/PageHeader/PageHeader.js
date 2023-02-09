import { NavLink } from "react-router-dom";
import "./PageHeader.scss";
import Logo from '../../assets/logo/logo-capstone.png';

export default function PageHeader({ theme, toggleTheme, isClicked }) {

  return (
    <header className={`header ${theme}`}>
      <div className='header__top'>
        <button className={`header__button ${theme}`} onClick={toggleTheme}>{isClicked ? "☾" : "☼"}</button>
        <div className='header__nav'>
          <NavLink to='/login'>
            <button className={`header__nav-text ${theme}`}>Log In</button>
          </NavLink>
          <NavLink to='/register'>
            <button className={`header__nav-text ${theme}`}>Register</button>
          </NavLink>
        </div>
      </div>
      <div className='header__title'>
        {/* <NavLink to='/'>
          <img className='header__title-logo' src={Logo} alt='BGT Logo' />
        </NavLink> */}
        <NavLink to='/'>
          <h1 className='header__title-text'>Backlogger</h1>
        </NavLink>
      </div>
      <div className='header__nav'>
        <NavLink to='/'>
          <button className={`header__nav-text ${theme}`}>Home</button>
        </NavLink>
        <NavLink to='/games'>
          <button className={`header__nav-text ${theme}`}>Video Games</button>
        </NavLink>
        <NavLink to='/profile'>
          <button className={`header__nav-text ${theme}`}>Profile</button>
        </NavLink>

      </div>
    </header>
  );
}
