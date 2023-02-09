import './GameProfile.scss';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import ActiveStatus from '../../components/ActiveStatus/ActiveStatus';
import FinishStatus from '../../components/FinishStatus/FinishStatus';
import RedditLogo from '../../assets/logo/reddit-logo.png';
import MetacriticLogo from '../../assets/logo/metacritic-logo.png';

const profileUrl = 'http://localhost:8080/profile/'

export default function GameProfile({ theme }) {
  const [game, setGame] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null)

  const { id } = useParams();
  const navigate = useNavigate()

  const newTab = url => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const reload = () => {
    window.location.reload()
  }

  // FUNCTION //
  const activeStatus = async (game, id) => {

    const toActive = {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      status: "active",
      description: game.description,
      description_raw: game.description_raw,
      website: game.website,
      metacritic_url: game.metacritic_url,
      esrb_rating: game.esrb_rating,
      reddit_url: game.reddit_url,
      released: game.released,
      rating: game.rating,
      genres: game.genres,
      platforms: game.platforms
    }

    axios
      .patch(`${profileUrl}${id}`, toActive)
      .then((toActive) => {
        navigate('/profile')
        reload();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const finishStatus = async (game, id) => {

    const toFinish = {
      id: game.id,
      name: game.name,
      background_image: game.background_image,
      status: "finish",
      description: game.description,
      description_raw: game.description_raw,
      website: game.website,
      metacritic_url: game.metacritic_url,
      esrb_rating: game.esrb_rating,
      reddit_url: game.reddit_url,
      released: game.released,
      rating: game.rating,
      genres: game.genres,
      platforms: game.platforms
    }

    axios
      .patch(`${profileUrl}${id}`, toFinish)
      .then((toFinish) => {
        navigate('/profile');
        reload();
      })
      .catch((err) => {
        console.log(err);
      })
  }


  // GET GAME //
  useEffect(() => {
    axios
      .get(`${profileUrl}${id}`)
      .then((resp) => {
        setGame(resp.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  // MODAL //
  function selectAnOpenModal(game) {
    setSelectedGame(game)
    setIsOpen(true)
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement('body');

  return (
    <>
      <div className={`gameprofile ${theme}`} >
        <div className={`gameprofile__box ${theme}`}>
          <div className='gameprofile__name' key={game.id}>
            <h1>{game.name}</h1>
            <div className='gameprofile__status'>
              <h3 className='profile__info-status'>
                {game.status === 'active' ? <ActiveStatus /> : <FinishStatus />}
              </h3>
            </div>
          </div>
          <div className='gameprofile__info'>
            <img src={game.background_image} alt='Game background' />
            <div className='gameprofile__info-more'>
              <p><strong>Released:</strong> {game.released}</p>
              <p><strong>Rating:</strong> {game.rating}</p>
              <p><strong>Genre(s):</strong></p>
              {
                game.genres?.map(g => `${g.name} | `)
              }
              <p><strong>Platform(s):</strong></p>
              {
                game.platforms?.map(p => `${p.platform.name} | `)
              }
            </div>
          </div>
          <div className='gameprofile__button'>
            <button onClick={() => activeStatus(game, game.id)} className={`gameprofile__button-active ${theme}`}>Active</button>
            <button onClick={() => finishStatus(game, game.id)} className={`gameprofile__button-active ${theme}`}>Finish</button>
            <button
              onClick={() => selectAnOpenModal(game)}
              className={`gameprofile__button-active ${theme}`}>Delete</button>
          </div>
          <p>{game.description_raw}</p>
          <div className='gameprofile__other'>
            <div className='gameprofile__other-link'>
              <h3>Website</h3>
              {game.website === '' ? <p className='gameprofile__other-text'>n/a</p> :
                <img onClick={() => newTab(game.website)} src={game.background_image} alt='Game Backround' />
              }
            </div>
            <div className='gameprofile__other-link'>
              <h3>Reddit</h3>
              {game.reddit_url === '' ? <p className='gameprofile__other-text'>n/a</p> :
                <img onClick={() => newTab(game.reddit_url)} src={RedditLogo} alt='Reddit logo look like rabbit' />
              }
            </div>
            <div className='gameprofile__other-link'>
              <h3>Metacritic</h3>
              {game.metacritic_url === '' ? <p className='gameprofile__other-text'>n/a</p> :
                <img onClick={() => newTab(game.metacritic_url)} src={MetacriticLogo} alt='Metacritic circle with M' />
              }
            </div>
          </div>
        </div>
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={`gameprofile__modal ${theme}`}
          overlayClassName='gameprofile__modal-overlay'
        >
          {selectedGame && <DeleteModal
            game={game}
            closeModal={closeModal}
            theme={theme}
          />}
        </Modal>
      </div>
    </>
  );
}