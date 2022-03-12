import React from 'react';
import {LogEntry} from "../../@types";
import ReactJson from "react-json-view";

const Log = ({log: {type, duration, id, level, project, stack, body, timestamp}}: { log: LogEntry }) => {

  const formatBody = (bodyPart: string, index: number) => {
    try {
      const parsedBody = JSON.parse(bodyPart)
      return <ReactJson key={index} src={parsedBody} collapsed />
    } catch (e) {
     return <span className="log-body-plain" key={index}>{bodyPart}</span>
    }
  }

  return (
    <div className="log">
      <div className="log-row">
        <div>id: {id}</div>
        <div>Project: {project}</div>
        <div>Type: {type}</div>
        <div>Level: {level}</div>

        <div>Timestamp: {timestamp.toLocaleString()}</div>
        <div>Duration: {duration}ms</div>
      </div>


      <div>Stack: {stack}</div>
      <div className="log-body">
        {body.map(formatBody)}
      </div>
    </div>
  );
};

export default Log;
