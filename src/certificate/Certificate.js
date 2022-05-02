import React from 'react'
import { useLocation } from 'react-router-dom';
import Summary from './Summary'
import BeachBall from '../public/assets/beach-ball_NEW.svg'
import NPOSignature from '../public/assets/NPO-signature.png'
import BBlogo from '../public/assets/logo_updated.svg'
export default function Certificate(props) {
    const location = useLocation();
    const beach = location.state.beach;
    const trashList = location.state.trashList;
    const time = location.state.currTime;
    const Day = new Date(time);
    console.log(Day)
    console.log(beach, trashList, time)
    //console.log(trashList[1].name)
  return (
      //not setting PDF size for borders at PDF converter will resize the elements
    <div style={{border:' 1px solid #2E4E9A', margin: '20px', height:'auto', borderRadius: '10px'}} >
    <div style={{border:' 5px solid #2E4E9A', margin: '2px', height:'auto', borderRadius: '10px'}} >
        
        {/** header box */}
        <div style={{margin: '20px', display:'flex', justifyContent:'space-around'}}>
            
            {/* Left Side of header*/}
            <div>  
               <img src={BeachBall} style={{width:100, transform:`rotate(${-20}deg)`}} />
            </div>
            
            {/* middle of header*/}
            <div style={{justifyContent:'center'}}> 
                <p style={{fontSize:'36px',fontWeight:'bold'}}>Volunteer Certificate</p>
            </div>
           
            {/* right side of header*/}
            <div style={{textAlign:'end', marginTop:'1px'}}> 
                <p style={{fontSize:'12px',fontWeight:'bold'}}>Beach Buddies</p>
            </div>
          </div>

        
        <div style={{textAlign: 'center', margin: '20px'}}>
            <p>This Certificate is presented to </p>
            <p>__USER_NAME__</p>
        </div>
        
        <div style={{textAlign: 'center', margin: '20px'}}>
            <p>In recognition of them cleaning {beach.name} for TIME___  hours.</p>
            <p>During their time with Beach Buddies, they have helped clean up this much trash:</p>
        </div>

        {/* <Summary /> */}

        <table>
        <tr><td>Type of Trash</td><td>Amount</td></tr>
          {trashList.map((value, index) => {
            return <tr><td>{value.name}</td><td>{value.count}</td></tr>
          })}
        </table>
       
        {/** bottom date, signature */}
        <div style={{ margin:'20px', display:'flex', justifyContent:'space-around'}}>
          
          <div>
            <p>Date {time}</p>
          </div>

          <div style={{display:'flex', justifyContent:'space-around'}}>
            <p>Signature</p>
            <img src={NPOSignature} alt="Italian Trulli" height="50px" width="50px"/>
          </div>
        </div>

        {/** bottom image */}
        <div style={{ margin: '20px', textAlign: 'right'}}>
          <img src={BBlogo} style={{height:"89px", width:"136px", opacity:'0.7'}}/>
        </div>
    </div>
    </div>
  )
}






