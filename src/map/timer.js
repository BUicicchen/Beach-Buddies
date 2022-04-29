import React, {useState} from 'react';
import DisplayComponent from './DisplayComponent';
import BtnComponent from './BtnComponent';
import './timer.css';

function Timer(props) {
  const [time, setTime] = useState({ms:0, s:0, m:0, h:0});
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);
  const beachInfo = props.beachInfo;
  // Not started = 0
  // started = 1
  // stopped = 2

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  var updatedMs = time.ms, updatedS = time.s, updatedM = time.m, updatedH = time.h;

  const run = () => {
    if(updatedM === 60){
      updatedH++;
      updatedM = 0;
    }
    if(updatedS === 60){
      updatedM++;
      updatedS = 0;
    }
    if(updatedMs === 100){
      updatedS++;
      updatedMs = 0;
    }
    updatedMs++;
    return setTime({ms:updatedMs, s:updatedS, m:updatedM, h:updatedH});
  };

  const stop = () => {
    clearInterval(interv);
    setStatus(2);
  };

  const finish = () => {
    // clearInterval(interv);
    setStatus(0);
    setTime({ms:0, s:0, m:0, h:0})
  };

  const resume = () => start();

  return (
    <div className="main-section" >
     <div className="clock-holder"  style={{background: "#35559B"}}>
        <div className="stopwatch" style={{paddingTop:0}}>
              <DisplayComponent time={time} style={{background:"#FFF1CA"}}/>
              <BtnComponent status={status} resume={resume} finish={finish} stop={stop} start={start} beachInfo={beachInfo}/>
        </div>
      </div>
    </div>
  );
}

export default Timer;
