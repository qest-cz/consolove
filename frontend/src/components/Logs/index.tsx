import React from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import Log from './Log';
import db from '../../utils/db';
import {FiltersType, LogLevel, LogType} from "../../@types";

type LogsProps = {
  filters: FiltersType
  autoscroll: boolean
}

const Logs = ({ filters, autoscroll }: LogsProps) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null)
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

  React.useEffect(() => {
    if (autoscroll) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs, autoscroll])

  return (
    <div>
      {logs?.map(log => <Log key={log.id} log={log} />)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Logs;
