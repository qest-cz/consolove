import Dexie, { Table } from 'dexie';
import {LogEntry} from "../@types";

export class LogEntryDexie extends Dexie {
  logs!: Table<LogEntry>;

  constructor() {
    super('console-love');
    this.version(1).stores({
      logs: '++id, [type+level], level, type, body' // Primary key and indexed props
    });
  }
}

const db = new LogEntryDexie();
export default db
