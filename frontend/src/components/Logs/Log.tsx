import React from 'react';
import {LogEntry} from "../../@types";
import ReactJson from "react-json-view";

const Log = ({log: {type, duration, id, level, project, stack, body, timestamp}}: { log: LogEntry }) => {

  const formatBody = (bodyPart: string, index: number) => {
    try {
      const parsedBody = JSON.parse(bodyPart)
      return <ReactJson key={index} src={parsedBody} collapsed={4} />
    } catch (e) {
     return <span className="log-body-plain" key={index}>{bodyPart}</span>
    }
  }

  return (
    <div className="log">
      <div className="log-row">
        <div className="date">{timestamp.toLocaleString()}:</div>

        {/*<div>Project: {project}</div>*/}
        <div className="item">Type: {type}</div>
        <div className="item">Level: {level}</div>
        <div className="item">Duration: {duration}ms {duration > 100 ? <span className="warning">🐢</span>:''}</div>
      </div>

      <div className="log-body">
        {body.map(formatBody)}
      </div>
    </div>
  );
};

export default Log;
