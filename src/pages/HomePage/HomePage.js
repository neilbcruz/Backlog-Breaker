// import { Link } from "react-router-dom";
import "./HomePage.scss";
import React, { useEffect, useState } from 'react';

export default function HomePage() {
  useEffect(() => {
    fetchGames()
  }, [])

  const [games, setGames] = useState([])

  const fetchGames = () => {
    fetch('https://rawg.io/api/collections/must-play/games')
      .then(resp => resp.json())
      .then(({ results }) => setGames(results))
  }

  return (

    <div className='home'>
      <ul className='home__list'>
        {
          games.map(game => (
            <div className='home__top'>
              <li key={game.id}>
                <h3>{game.name}</h3>
                <img className='home__image' src={game.background_image} alt="game" />
              </li>
            </div>

          ))
        }
      </ul>
    </div>
  );
}
