import './GameCard.scss';
import { useState } from "react";
import Modal from "react-modal";
import GameDetails from '../../components/GameDetails/GameDetails';

export default function GameCard({ game, addGame, theme }) {
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    Modal.setAppElement(".App");

    return (<>
        <div className='results__top-container' key={game.id}>
            <h3 className={`results__top-text ${theme}`}>{game.name}</h3>
            <img src={game.background_image} alt="game image" />
            <button onClick={() => addGame(game)}>Add Game</button>
            <button onClick={openModal}>Info</button>
            <div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={`results__modal ${theme}`}
                    overlayClassName='results__modal-overlay'
                >
                    <GameDetails
                        game={game}
                        key={game.id}
                        closeModal={closeModal}
                        addGame={addGame}
                    />
                </Modal>
            </div>
        </div>
    </>
    )
}