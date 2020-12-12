import React from 'react';
import { ListCountDowns } from './components/ListCountDowns';
import { SearchBar } from './components/SearchBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <SearchBar />
      <ListCountDowns />
    </div>
  );
}

export default App;
