import React from 'react';
import './App.css';
import Filter from './components/Filter';
import Logs from "./components/Logs";
import {FiltersType} from "./@types";

function App() {
  const [filters, setFilters] = React.useState<FiltersType>({
    types: [],
    levels: [],
    projects: []
  })

  return (
    <div className="app">
      <Filter filters={filters} setFilters={setFilters}/>
      <Logs filters={filters}/>
    </div>
  );
}

export default App;
