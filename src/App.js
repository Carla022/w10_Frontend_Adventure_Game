import {BrowserRouter, Link, Routes, Route} from "react-router-dom";

import Title from './Title';
import Instructions from './Instructions';
import Introduction from './Introduction';
import GameContainer from './containers/GameContainer';
import Footer from './Footer';
import './App.css';

import NavbarComponent from './components/NavbarComponent';
import './NavbarComponent.css';

import './components/Game.css'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      
      <header>
        {/* <NavBar /> */}
        <NavbarComponent/>
        <Title />
        <Introduction />
    
      </header>
      {/* <hr className="GameWindow-border"/> */}

      <main>
        <section>
          <GameContainer />
        </section>
      </main>

      <header><Instructions /></header>

      {/* <hr className="GameWindow-border"/> */}

      <footer>
       <Footer/>
      </footer>
      
    </div>
    </BrowserRouter>
  )
  
}

export default App;
