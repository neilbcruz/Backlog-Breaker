import { Link, NavLink } from "react-router-dom";
import "./PageHeader.scss";
import bgtLogo from '../../assets/logo/bb_logo.png';

export default function PageHeader() {
  return (
    <header className='header'>
        <div className='header__title'>
            <img className='header__title-logo' src={bgtLogo} alt='BGT Logo' />
            {/* <h1 className='header__title-text'>Backlog Breaker</h1> */}
        </div>
        <div className='header__nav'>
          <NavLink to='/vgames'>
          <button className='header__nav-text'>Video Games</button>
          </NavLink>
            <NavLink to='/profile'>
            <button className='header__nav-text'>Profile</button>
            </NavLink>
            
        </div>
    </header>
  );
}
