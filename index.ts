const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
import {LogEntry, LogLevel, LogType} from "./interfaces"
import { createInterceptor } from '@mswjs/interceptors'
import nodeInterceptors from '@mswjs/interceptors/lib/presets/node'
import axios from "axios"
import * as fs from "fs"
import {type} from "os";
import {timeStamp} from "console";


const port = 1234;

const interceptor = createInterceptor({
  modules: nodeInterceptors,
  resolver(request, ref) {},
})

const log = console.log

console.log = (...params) => {
    const body = params.map((param) => {
        try{ return JSON.parse(param)} catch {
            return param.toString()
        }})
    const logEntry: LogEntry = {
        body: body,
        duration: 0,
        level: LogLevel.INFO,
        timestamp: new Date(),
        project: process.cwd(),
        type: LogType.NETWORK,
        stack: ""
    }

        sendToAllClients(logEntry)
        log(...params)


}

interceptor.on("request", (request) => {
    log('[%s] %s', request.method, request.url.toString())
})

interceptor.on("response",async (response) => {


    const logEntry: LogEntry =  {
        body: [JSON.stringify({
            response

        })],
        level: LogLevel.INFO,
        duration: 0,
        timestamp: new Date(),
        project: process.cwd(),
        type: LogType.NETWORK,
        stack: ""
    }
    sendToAllClients(logEntry)
})
interceptor.apply()


const sendToAllClients = (newLog: LogEntry) => clients.forEach((client) => client.response.write(`data: ${JSON.stringify(newLog)}\n\n`))

let clients = [];
const logs: LogEntry[] = [];

app.use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .post('/log-entry', (request, response )=> {
        const newLog = request.body;
        logs.push(newLog);
        response.json(newLog);
        return ;
    })
    .get('/', (request, response) => {
        const headers = {
            'Content-Type': 'text/event-stream',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
        };
        response.writeHead(200, headers);

        const data = `data: ${JSON.stringify(logs)}\n\n`;

        response.write(data);

        const clientId = Date.now();

        const newClient = {
            id: clientId,
            response,
        };

        clients.push(newClient);

        request.on('close', () => {
            log(`${clientId} Connection closed`);
            clients = clients.filter((client) => client.id !== clientId);
        });
    });

app.listen(port, () => {
    log(`Example app listening on port ${port}`);
});
