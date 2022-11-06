import React from 'react';
// import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './GameResult.scss';
// import { useState, useEffect } from "react";

const apiKey = `7e7ac04c09504338812a93a4b141d292`

export default function GameResult({ gameResults }) {
  // const { id } = useParams();
  // const [addGame, setAddGame] = useState([]);
  // const [gameData, setGameData] = useState([]);



  // useEffect(() => {
  //   axios.get(`https://api.rawg.io/api/games/${id}?key=${apiKey}`)
  //     .then((resp) => {
  //       setGameData(resp.data)
  //       console.log(resp.data)
  //     })
  // }, [id])

  const addGame = async (game) => {
    // event.preventDefault();
    // console.log(game)
    // const {data: gameData} = await axios.get(`https://api.rawg.io/api/games/${game.id}?key=${apiKey}`)

    // console.log(gameData.name)

    console.log(game.id.toString())

    const gameObj = {
      id: game.id.toString(),
      name: game.name,
      background_image: game.background_image,
      status: "active"
    }
    // console.log(gameObj)
    axios
      .post('http://localhost:8080/games/', gameObj)
      .then((resp) => {
      })
      .catch((err) => {
        console.log(err);
      })
  }
  
  return (
    <div className="results__container">
      <ul>
        {
          gameResults.map(game => (
            <li className='results__card' key={game.id}>
                <h3>{game.name}</h3>
                <img className='results__image' src={game.background_image} alt="game" />
                <p>Release Date: {game.released}</p>
                <button onClick={() => addGame(game)}>Add Game</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}
