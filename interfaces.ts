export enum LogType {
    LOG = 'log',
    NETWORK = 'network',
    DATABASE = 'databse',
}

export enum LogLevel {
    INFO = 'info',
    ERROR = 'error',
}

export interface LogEntry {
    id?: number;
    project: string;
    type: LogType;
    level: LogLevel;
    stack: string;
    body: string[];
    timestamp: Date;
    duration: number;
}