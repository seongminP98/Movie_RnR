import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Create from './screens/Create';
import Home from './screens/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
      </HashRouter>
    </div>
  );
}

export default App;
