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
  console.log(filters.types);
  console.log('searchTypes: ', searchTypes);
  console.log('searchLevels: ', searchLevels);

  const logs = useLiveQuery(
    () => db.logs
      // .where('[type+level]').anyOf([searchTypes, searchLevels])
      .where('type').anyOf(searchTypes)
      .toArray()
  );

  return (
    <div>
      {logs?.map(log => <Log key={log.id} log={log} />)}
    </div>
  );
};

export default Logs;
