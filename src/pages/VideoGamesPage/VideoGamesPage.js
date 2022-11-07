import React, { useState } from 'react';
import GameResults from '../../components/GameResult/GameResult';
import './VideoGamesPage.scss';

const apiKey = `7e7ac04c09504338812a93a4b141d292`

export default function VideoGamesPage({ theme }) {

  const [searchGame, setSearchGame] = useState("");
  const [gameResults, setGameResults] = useState([]);
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setSearchGame(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    let game = searchGame.split(' ').join('-').toLowerCase()

    setGameResults([])
    fetch(`https://rawg.io/api/games?key=${apiKey}&search=${game}`)
      .then(resp => resp.json())    
      .then(({ results }) => {
        setLoading(true)
        results === undefined ? alert('no games found') : setGameResults(results)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    setSearchGame("")
  }

  if (!gameResults) {
    return <p> Loading... </p>;
  }

  return (
    <div className="search">
      <form className='search__form' onSubmit={onSubmit}>
        <label className='search__label' htmlFor='search'>Search</label>
        <input
          className={`search__input ${theme}`}
          type="text"
          name='search'
          value={searchGame}
          onChange={handleChange} />
        <button className='search__button' type='submit'>Submit</button>
      </form>
      <GameResults gameResults={gameResults} theme={theme} />
    </div>
  );
}