import React from 'react';
import TrashForm from '../trash/trashForm'

function BtnComponent(props) {
  return (
    <div>
      {(props.status === 0)? 
        <button className="stopwatch-btn stopwatch-btn-gre"
        onClick={props.start}>Start</button> : ""
      }

      {(props.status === 1)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-red"
                  onClick={props.stop}>Stop</button>
          <button className="stopwatch-btn stopwatch-btn-yel"
                  onClick={props.finish}>Finish</button>
        </div> : ""
      }

     {(props.status === 2)? 
        <div>
          <button className="stopwatch-btn stopwatch-btn-gre"
                  onClick={props.resume}>Resume</button>
          <button className="stopwatch-btn stopwatch-btn-yel"
                  onClick={props.finish}>Finish</button>
        </div> : ""
      }

      {(props.status === 1 || props.status === 2) ?
        <TrashForm></TrashForm>:""
      }
     
    </div>
  );
}

export default BtnComponent;