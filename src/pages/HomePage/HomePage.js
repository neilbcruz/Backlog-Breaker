import { NavLink } from "react-router-dom";
import "./HomePage.scss";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiKey = `7e7ac04c09504338812a93a4b141d292`

export default function HomePage({ theme }) {
  useEffect(() => {
    fetchGames()
  }, [])

  const [games, setGames] = useState([])
  const [gameData, setGameData] = useState([]);

  const addGame = async (game) => {
    // event.preventDefault();
    console.log(game)
    const { data: gameData } = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`)

    console.log(gameData)

    console.log(game.id.toString())

    const gameObj = {
      id: game.id.toString(),
      name: gameData.name,
      background_image: gameData.background_image,
      status: "active",
      description: gameData.description,
      description_raw: gameData.description_raw
    }
    // console.log(gameObj)
    axios
      .post('http://localhost:8080/games/', gameObj)
      .then((resp) => {
        setGameData(resp.data)
        alert(`Added ${gameData.name}`)
      })
      .catch((err) => {
        console.log(err);
      })
  }


  const fetchGames = () => {
    fetch('https://rawg.io/api/collections/must-play/games')
      .then(resp => resp.json())
      .then(({ results }) => setGames(results))
  }

  return (
    <div className={`home ${theme}`}>
      <div className='home__header'>
        <h1 className='home__header-text'>Welcome to Backlogger!</h1>
        <p>You can search for games and keep it in your library!</p>
        <p>Keep track of your games so you know their status!</p>
      </div>
      <div className='home__header'>
        <h1 className='home__header-text'>Get Started!</h1>
        <div className='home__start'>
          <p>Log In to get started: </p>
          <NavLink to='/login'>
            <button className={`home__start-text p-small ${theme}`}>Log In</button>
          </NavLink>
        </div>
        <div className='home__start'>
          <p>Register if you don't have an account: </p>
          <NavLink to='/register'>
            <button className={`home__start-text p-small ${theme}`}>Register</button>
          </NavLink>
        </div>
      </div>
      <div className='home__header'>
        <h1>Pick A Game!</h1>
        <div className='home__start'>
          <p>Search for specific games by clicking here: </p>
          <NavLink to='/games'>
            <button className={`home__start-text p-small ${theme}`}>Search</button>
          </NavLink>
        </div>
        <p>Or choose from must play games:</p>
        <div className='home__top'>
          {
            games.map(game => (
              <div className='home__top-container' key={game.id}>
                <h3 className={`home__top-text ${theme}`}>{game.name}</h3>
                <img src={game.background_image} alt="game image" />
                <button onClick={() => addGame(game)}>Add Game</button>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

