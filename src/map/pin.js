import * as React from 'react';
<<<<<<< HEAD
const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;
// const pinStyle = {
//     cursor: 'pointer',
//     fill: '#d00',
//     stroke: 'none'
// };
function Pin({ size , color, onClick }) {
    return (React.createElement("svg", { height: size, viewBox: "0 0 24 24", style: {cursor: 'pointer', stroke: 'none', fill : color}, onClick: onClick },
=======
const ICON = `M8.36 4.67l-0.01 4.02a4.452 4.452 0 0 0-1.1-0.11c-0.37 0.1-0.74 0.63-1.1 0.76a4.202 4.202 0 0 1 2.21-4.67z m2.41-0.64L12.8 7.48a3.183 3.183 0 0 1 0.84-0.61c0.36-0.1 0.94 0.17 1.34 0.11a4.202 4.202 0 0 0-4.21-2.95zM4 16h13c-0.66-0.66-2.64-1.11-4.34-1.33l-1.87-7c0.52-0.05 1.15 0.03 1.53 0l-2.11-3.6H10.2a6.174 6.174 0 0 0-0.7 0.14 4.38 4.38 0 0 0-0.64 0.22l-0.01 4.15c0.35-0.17 0.84-0.54 1.3-0.74l1.8 6.74c-0.58-0.05-1.09-0.08-1.45-0.08C9.030000000000001 14.5 5 15 4 16z"`;
const pinStyle = {
    cursor: 'pointer',
    fill: '#d00',
    stroke: 'none'
};
function Pin({ size = 40, onClick }) {
    return (React.createElement("svg", { height: size, viewBox: "0 0 24 24", style: pinStyle, onClick: onClick },
>>>>>>> fa5058b87349d3090724781691e58ff2cf8cc10e
        React.createElement("path", { d: ICON })));
}
export default React.memo(Pin);

