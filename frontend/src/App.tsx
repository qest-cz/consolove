import React from 'react';
import './App.css';
import {FiltersType} from "./@types";
import Filter from './components/Filter';
import Logs from "./components/Logs";
import registerStreamListener from './utils/eventStream';

function App() {
  const [autoscroll, setAutoscroll] = React.useState(true)
  const [filters, setFilters] = React.useState<FiltersType>({
    types: [],
    levels: [],
    projects: []
  })

  React.useEffect(() => {
    registerStreamListener()
  }, [])

  return (
    <div className="app">
      <Filter filters={filters} setFilters={setFilters} autoscroll={autoscroll} setAutoscroll={setAutoscroll} />
      <Logs filters={filters} autoscroll={autoscroll}/>
    </div>
  );
}

export default App;
