import { useState } from "react";
import {Link} from "react-router-dom";
import '../components/Game.css';
import playImg from "../assets/btn/play_btn.png";


const Game = ({postGame}) => {

    const [statePlayerName, setStatePlayerName] = useState("");

    const handleChange = (event) => {
        setStatePlayerName(event.target.value);
    };

    const handlePlayerSubmit = (event) => {
        event.preventDefault();
        postGame(statePlayerName);
    }

    return (
        
        <div className = "startGame" 
            style={{ backgroundImage: "url(../assets/background/background_layer_1.png)",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'}}>
            
            <section className="game-section" id="game">
                <form>
                    <input type="text" placeholder="Enter name" name="name" onChange={handleChange} value={statePlayerName} required = "required"/>
                    <Link to="/Lobby"><img src={playImg} id="newplayer-button" onClick={handlePlayerSubmit}/></Link>
                </form>
            </section>
        </div>

    )
}

export default Game;