import "./DeleteModal.scss";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const profileUrl = 'http://localhost:8080/profile/';

export default function DeleteModal({ closeModal, game, theme }) {
    console.log(game.id)

    const handleDelete = (event) => {
        event.preventDefault();
        axios.delete(`${profileUrl}${game.id}`)
        closeModal()
        alert('Game deleted');
        navigate(`/profile`)
    }

    const navigate = useNavigate()

    return (
        <>
            <div className={`delete ${theme}`}>
                <div className="delete__container">
                    <div className="delete__content">
                        <h2 className="delete__content-header">{`Delete ${game.name}`}</h2>
                        <p className="delete__content-message">
                            {`Would you like to delete ${game.name} from your profile?`}
                        </p>
                    </div>
                </div>
                <div className="delete__buttons">
                    <button onClick={closeModal} className={`button delete__buttons-cancel ${theme}`}>Cancel</button>
                    <button onClick={handleDelete} className={`button delete__buttons-delete ${theme}`}>Delete</button>
                </div>
            </div>
        </>
    )
}