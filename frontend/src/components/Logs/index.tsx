import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Log from './Log';
import db from '../../utils/db';
import {FiltersType, LogLevel, LogType} from "../../@types";

type LogsProps = {
  filters: FiltersType
}

const Logs = ({ filters }: LogsProps) => {
  const searchTypes = Object.values(LogType).filter(t => !filters.types.includes(t))
  const searchLevels = Object.values(LogLevel).filter(l => !filters.levels.includes(l))

  const logs = useLiveQuery(
    () => {
      let logsCollection = db.logs.where('type').anyOf(searchTypes)
      if (filters.levels) {
        logsCollection = logsCollection.and(val => searchLevels.includes(val.level))
      }
      if (filters.fulltext) {
        logsCollection = logsCollection.and(val => val.body.some(b => b.includes(filters.fulltext ?? '')))
      }
      return logsCollection.toArray()
    }
  , [filters]);

  return (
    <div>
      {logs?.map(log => <Log key={log.id} log={log} />)}
    </div>
  );
};

export default Logs;
