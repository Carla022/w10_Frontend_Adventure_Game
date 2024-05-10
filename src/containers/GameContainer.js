import Game from "../components/Game";
import Lobby from "../components/Lobby";
import Shop from "../components/Shop";
import Battle from "../components/Battle";
import {Routes, Route, useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import MusicPlayer from "../components/MusicPlayer";

const GameContainer = () => {
    const navigate = useNavigate();
    
    const [players, setPlayers] = useState([]);
    const [activePlayer, setActivePlayer] = useState(null);

    const fetchPlayersData = async() => {
        const response = await fetch("http://localhost:8080/players");
        const jsonData = await response.json();
        setPlayers(jsonData);
    };

    const fetchPlayerById = async() => {
        const response = await fetch("http://localhost:8080/players/" + activePlayer.id);
        const jsonData = await response.json();
        setActivePlayer(jsonData);
    };

    useEffect(() => {
        fetchPlayersData();
        // fetchPlayerById();
        fetchShopData();
    }, []);

    const postPlayer = async(newPlayerName) => {
        // const newPlayerName = newPlayer.name;
        const response = await fetch("http://localhost:8080/players?name=" + newPlayerName, {
            method:"POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name: newPlayerName })
        });
        const savedPlayer = await response.json();
        setPlayers([...players, savedPlayer]);
        setActivePlayer(savedPlayer);
        return savedPlayer;
    }

    const [games, setGames] = useState([]);
    const [messages, setMessages] = useState([]);
    const reversedMessages = messages.slice().reverse();

    const postGame = async(newPlayerName) => {
        const playerIndex = players.findIndex(player => player.name === newPlayerName);
        let player;
        if(playerIndex === -1) {
            // player does not exist
            player  = await postPlayer(newPlayerName);
        } else {
            player = players[playerIndex];
            setActivePlayer(player);
        }
        const response = await fetch("http://localhost:8080/games?playerId=" + player.id, {
            method:"POST", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: player.id })
        });
        const savedGame = await response.json();
        setGames([...games, savedGame]);
        navigate(`/Lobby`);
        // getting the Welcome Message
        const copiedMessages = [...messages, savedGame.message];
        setMessages(copiedMessages);
    }

    const [shop, setShop] = useState([]);
    const fetchShopData = async() => {
        const response = await fetch("http://localhost:8080/shops");
        const jsonData = await response.json();
        setShop(jsonData[0]);
    };

    const buyWeapon = async (weaponId) => {
        const response = await fetch(`http://localhost:8080/players?playerId=${activePlayer.id}&weaponId=${weaponId}`, {
            method:"PATCH", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: activePlayer.id })
        })
        const buyingMessage = await response.json();
        const copiedMessages = [...messages, buyingMessage.message];
        setMessages(copiedMessages);
        fetchPlayersData();
        fetchPlayerById();
    }

    const attackMonsterLevel1 = async () => {
        const response = await fetch(`http://localhost:8080/games/${activePlayer.id}?battleId=1`,{
            method:"PATCH", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: activePlayer.id })
            // game id
        })
        const attackMessage = await response.json();
        const copiedMessages = [...messages, attackMessage.message];
        setMessages(copiedMessages);
        fetchPlayersData();
        fetchPlayerById();
    }
    const attackMonsterLevel2 = async () => {
        const response = await fetch(`http://localhost:8080/games/${activePlayer.id}?battleId=2`,{
            method:"PATCH", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: activePlayer.id })
            // game id
        })
        const attackMessage = await response.json();
        const copiedMessages = [...messages, attackMessage.message];
        setMessages(copiedMessages);
        fetchPlayersData();
        fetchPlayerById();
    }
    const attackMonsterLevel3 = async () => {
        const response = await fetch(`http://localhost:8080/games/${activePlayer.id}?battleId=3`,{
            method:"PATCH", 
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ id: activePlayer.id })
            // game id
        })
        const attackMessage = await response.json();
        const copiedMessages = [...messages, attackMessage.message]
        setMessages(copiedMessages);
        fetchPlayersData();
        fetchPlayerById();
    }

    const startLevel1 = async () => {
        const response = await fetch("http://localhost:8080/games/combat?battleId=1");
        const startLevel1Message = await response.json();
        const copiedMessages = [...messages, startLevel1Message.message];
        setMessages(copiedMessages);
        fetchPlayersData();
        fetchPlayerById();
    }
    const startLevel2 = async () => {
        const response = await fetch("http://localhost:8080/games/combat?battleId=2");
        const startLevel2Message = await response.json();
        const copiedMessages = [...messages, startLevel2Message.message];
        setMessages(copiedMessages);
        fetchPlayersData();
        fetchPlayerById();
    }
    const startLevel3 = async () => {
        const response = await fetch("http://localhost:8080/games/combat?battleId=3");
        const startLevel3Message = await response.json();
        const copiedMessages = [...messages, startLevel3Message.message];
        setMessages(copiedMessages);
        fetchPlayersData();
        fetchPlayerById();
    }

    return (
            <div>
                <Routes>
                    <Route path="/Game" element={<Game postGame={postGame}/>}/>

                    <Route path="/Lobby" element={<Lobby 
                                                    activePlayer={activePlayer}
                                                    startLevel1={startLevel1}
                                                    startLevel2={startLevel2}
                                                    startLevel3={startLevel3}/>}/>
                    <Route path="/Shop" element={<Shop 
                                                    shop={shop} 
                                                    buyWeapon={buyWeapon} 
                                                    activePlayer={activePlayer} 
                                                    startLevel1={startLevel1}
                                                    startLevel2={startLevel2}
                                                    startLevel3={startLevel3}/>}/>
                    <Route path="/Battle" element={<Battle 
                                                    messages={messages}
                                                    activePlayer={activePlayer}  
                                                    attackMonsterLevel1={attackMonsterLevel1}
                                                    attackMonsterLevel2={attackMonsterLevel2}
                                                    attackMonsterLevel3={attackMonsterLevel3}/>}/>
                </Routes>
                <MusicPlayer />
                <div className="log">
                    <h4><em>Adventure Scroll:</em></h4>
                        {reversedMessages.map((message, index) => {
                            return (
                                <li key={index}>{message}</li>
                            )})}
                </div>
            </div>
        )
}

export default GameContainer;