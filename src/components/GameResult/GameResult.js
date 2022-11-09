import React from 'react';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GameResult.scss';
import { useState, useEffect } from "react";
import Modal from "react-modal";
import GameDetails from '../GameDetails/GameDetails';
import GameCard from '../../components/GameCard/GameCard';

const apiKey = `7e7ac04c09504338812a93a4b141d292`

export default function GameResult({ gameResults, theme, loading }) {
  const { id } = useParams();
  // const [addGame, setAddGame] = useState([]);
  const [gameData, setGameData] = useState([]);

  const addGame = async (game) => {
    // event.preventDefault();
    const {data: gameData} = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`)

    console.log(gameData)

    console.log(game.id.toString())

    const gameObj = {
      id: game.id.toString(),
      name: gameData.name,
      background_image: gameData.background_image,
      status: "active",
      description: gameData.description,
      description_raw: gameData.description_raw,
      website: gameData.website,
      metacritic_url: gameData.metacritic_url,
      esrb_rating: gameData.esrb_rating,
      reddit_url: gameData.reddit_url,
      released: gameData.released,
      rating: gameData.rating,
      genres: gameData.genres,
      platforms: gameData.platforms
    }
    // console.log(gameObj)
    axios
      .post('http://localhost:8080/games/', gameObj)
      .then((resp) => {
        setGameData(resp.data)
        console.log(resp.data)
        alert(`Added ${gameData.name}`)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return ( loading ? <h1>Loading...</h1> : 
    <div className="results__top">
        {
          gameResults.map(game => (
            <GameCard game={game} key={game.id} theme={theme} addGame={addGame} />
          ))
        }

    </div>
  );
}
