import React from 'react';
import logo from './logo.svg';
import './App.css';
import Iframes from './iframes';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Iframes names={['app', 'app', 'app']} />
      </header>
    </div>
  );
}

export default App;
