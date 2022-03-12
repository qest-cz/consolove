export enum LogType {
  LOG= 'log',
  NETWORK = 'network',
  DATABASE = 'database',
}

export enum LogLevel {
  INFO ='info',
  ERROR = 'error'
}

export interface LogEntry {
  id?: number;
  project: string
  type: LogType
  level: LogLevel
  stack: string
  body: string[]
  timestamp: Date
  duration: number
}

export type FiltersType = {
  fulltext?: string
  types: LogType[]
  levels: LogLevel[]
  projects: string[]
}
