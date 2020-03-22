import React, { useState } from 'react';
import './App.css';
import VideoChat from './VideoChat';
// import Donate from './Donate';



const App = () => {
  const [toggle, setToggle] = useState(true);
  const handleCloseFooter = (ev) => {
    ev.preventDefault();
    setToggle(false);
  }
  return (
    <div className="app">
      <main>
        <VideoChat />
      </main>
      {toggle &&
        <footer>
          <p>
            Made with &hearts; by <a href="https://www.linkedin.com/in/ryaneberhardt1/" rel="noopener noreferrer" target="_blank">Ryan Eberhardt</a>
          </p>
          <button onClick={handleCloseFooter}>&times;</button>
        </footer>
      }
      {/* <Donate /> */}
    </div>
  );
};

export default App;
