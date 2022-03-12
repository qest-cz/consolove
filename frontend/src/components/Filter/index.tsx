import React, {ChangeEvent} from 'react';
import {FiltersType, LogEntry, LogLevel, LogType} from '../../@types';
import db from "../../utils/db";

type FilterProps = {
  filters: FiltersType
  setFilters: (filters: FiltersType) => void
}

const Filter = ({filters, setFilters}: FilterProps) => {
  const handleSaveData = async () => {
    const data: LogEntry = {
      body: ['{"key": "val"}', 'plain string', '{"A": "B"}'],
      duration: 0,
      level: LogLevel.INFO,
      project: "my-project",
      stack: "",
      timestamp: new Date(),
      type: LogType.LOG
    }
    console.log(data);

    const id = await db.logs.add(data);
    console.log('saved id: ', id);
  }

  const handleClear = () => {
    db.logs.clear()
  }

  const handleFulltextChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setFilters({...filters, fulltext: ev.target.value})
  }

  const handleTypesChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const type = ev.target.id as LogType
    if (filters.types.includes(type)) {
      setFilters({...filters, types: filters.types.filter(f => f !== type)})
    } else {
      setFilters({...filters, types: [...filters.types, type]})
    }
  }

  const handleLevelsChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const level = ev.target.id as LogLevel
    if (filters.levels.includes(level)) {
      setFilters({...filters, levels: filters.levels.filter(l => l !== level)})
    } else {
      setFilters({...filters, levels: [...filters.levels, level]})
    }
  }

  return (
    <div className="filter">
      <div>Search: <input type="text" name="fulltext" placeholder="Enter fulltext search query"
                          value={filters.fulltext ?? ''} onChange={handleFulltextChange}/></div>
      <div>Types: {Object.values(LogType)
        .map(type => <span key={type}><input id={type} type="checkbox" checked={!filters.types.includes(type)}
                                             onChange={handleTypesChange}/><label
          htmlFor={type}>{type}</label></span>)}</div>
      <div>Levels: {Object.values(LogLevel)
        .map(level => <span key={level}><input id={level} type="checkbox" checked={!filters.levels.includes(level)}
                                               onChange={handleLevelsChange}/><label
          htmlFor={level}>{level}</label></span>)}</div>
      <div>Projects: @todo</div>
      <div>Auto-scroll: @todo</div>
      <div>
        <button onClick={handleSaveData}>Save data</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default Filter;
