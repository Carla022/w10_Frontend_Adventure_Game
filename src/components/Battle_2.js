import {Link} from "react-router-dom";
import './Battle.css';
import attackBtn from "../assets/btn/attack_btn.png"
import contBtn from "../assets/btn/continue_btn.png"

import Hero_Shop from "./Hero_shop_sprite";
const Battle_2 = ({activePlayer, attackMonsterLevel1, attackMonsterLevel2, attackMonsterLevel3}) => {

    const attackMonster = (event) => {
        if (activePlayer.numberOfWins === 0) {
            attackMonsterLevel1();
        } else if (activePlayer.numberOfWins === 1) {
            attackMonsterLevel2();
        } else {
            attackMonsterLevel3();
        }
        // http://localhost:8080/games/combat?battleId=1
    }


    return(

        <section className="battle-section" id="battle">
            <div className="battle-buttons">
                
                <Link to="#"><img id="attack-btn"src={attackBtn} onClick={attackMonster}/></Link>
                <Link to="/Lobby"><img id="battle-continue-btn" src={contBtn} /></Link>

            </div>

            <div>
                <Hero_Shop/>
         
            </div>
        </section>

    )
}

export default Battle_2;