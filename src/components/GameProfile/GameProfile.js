import './GameProfile.scss';
import { useParams, NavLink } from "react-router-dom";
import CloseIcon from '../../assets/icons/close-icon-2.webp'

export default function GameProfile({ games, closeModal, addGame }) {

  return (<>
    <div className={`details`} >
      <div className='details__name' key={games.id}>
        <h1>{games.name}</h1>
        <NavLink to='/profile'>
          <img onClick={closeModal} src={CloseIcon} alt='X mark to close modal' />
        </NavLink>
      </div>
      <div className='details__info'>
        <img src={games.background_image} />
        <div className='details__info-more'>
          <p><strong>Released:</strong> {games.released}</p>
          <p><strong>Rating:</strong> {games.rating}</p>
          <p><strong>Genre(s):</strong></p>
          {
            games.genres.map(g => `${g.name} | `)
          }
          <p><strong>Platform(s):</strong></p>
          {
            games.platforms.map(p => `${p.platform.name} | `)
          }
        </div>
        
      </div>
      <p>{games.description_raw}</p>
    </div>
    </>
  );
}