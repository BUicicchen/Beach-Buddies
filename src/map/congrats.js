import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
// import sizeMe from "react-sizeme";
import Confetti from "react-confetti";
import {useState, useEffect} from 'react';
//new imports
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    width: "100%",
    height: "100vh",
    transition: 'white 1s ease-out',
    // opacity: 1,
};

const defaultProps = {
    bgcolor: "background.paper",
    borderColor: "text.primary",
    m: 1,
    border: 1,
    style: { width: "5rem", height: "5rem" }
  };
// const styling = StyleSheet.create({
//     input: {
//       width: 300,
//       height: 40,
//       backgroundColor: "#fff",
//       paddingVertical: 10,
//       paddingHorizontal: 15,
//       borderColor: "#ccc",
//       borderWidth: 1,
//       borderRadius: 15,
//       fontSize: 16,
//     },
//   });

// const stylesOpen = {
//   fontFamily: "sans-serif",
//   textAlign: "center",
//   width: "100%",
//   height: "100vh",
//   transition: 0.1,
//   opacity: 1,
// };
// const stylesFade = {
//     fontFamily: "sans-serif",
//     textAlign: "center",
//     width: "100%",
//     height: "100vh",
//     // transition: 0.5,
//     opacity: 0,
// };

export default function Congratulations() {
    const [animationDone, setAnimationDone] = useState(true)
    // const propTypes = {
    //   size: PropTypes.shape({
    //     width: PropTypes.number,
    //     height: PropTypes.number
    //   })
    // };
    
    const [fadeProp, setFaceProp] = useState({
        fade : 'fade-out'
    })

    useEffect(() => {
      setTimeout(() => {
        toggleConfetti();
      }, 3000);
    }, []);
    

    const toggleConfetti = () => {
      setAnimationDone(!animationDone)
    };

    return (
// {
//     true ? <div></div>
//     : <div></div>
// }

    <div>
    <style>{'body { background-color: #FFF1CA; }'}</style>
    {animationDone ? 
    // <div className={fadeProp.fade}>

    <div style={styles}>
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%"
            }}
            >
            <Confetti
                gravity={0.4}
                run={animationDone}
                numberOfPieces={400}
                // {...size}
            />
        </div> 
    </div>
    :
    // <body style="background-color:grey;">

    // </body>
    <div>
      <h1 style={{fontFamily: "Poppins", color: "#35559B"}}>
          <center>
          <font>  CONGRATULATIONS! </font>  
          </center>
      </h1>
      {/* <Box display="flex" flexDirection="column" alignItems="flex-start">
        <Box borderRadius="25%" {...defaultProps}></Box>
        <p id="rcorners2">Rounded corners!</p>
        </Box> */}
    </div>
    } 
    {/* style={{fontFamily: "Poppins", color: "#FFF1CA"}}  */}
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',}}> 
    <Card sx={{ minWidth: 275 }} style={{borderRadius: 50, width:"80%",minHeight:"80%", backgroundColor: "#ABBBDF"}}>
      <CardContent>
        {/* <Typography style={{fontFamily: "Poppins", color: "#FFF1CA"}} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography> */}
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA"}} variant="h5" component="div">
          {/* be{bull}nev{bull}o{bull}lent */}
        </Typography>
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA", display: 'flex', justifyContent: 'center', alignItems: 'center'}} sx={{ mb: 1.5 }} color="text.secondary">
          Clean Up Statistics
        </Typography>
        <Typography style={{fontFamily: "Poppins", color: "#FFF1CA"}} variant="body2">
          Time
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </div>
    
  </div>
  )
  };






// import React from "react";
// import { render } from "react-dom";
// import PropTypes from "prop-types";
// // import sizeMe from "react-sizeme";
// import Confetti from "react-confetti";

// const styles = {
//   fontFamily: "sans-serif",
//   textAlign: "center",
//   width: "100%",
//   height: "100vh",
// };

// const DimensionedExample = (
//   class Example extends React.PureComponent {
//     state = {
//       animationDone: true
//     };

//     static propTypes = {
//       size: PropTypes.shape({
//         width: PropTypes.number,
//         height: PropTypes.number
//       })
//     };

//     componentDidMount() {
//       setTimeout(() => {
//         this.toggleConfetti();
//       }, 3000);
//     }

//     toggleConfetti = () => {
//       this.setState({ animationDone: !this.state.animationDone });
//     };
    
//     render() {
//         // if (!this.state.animationDone) {
//             return (
//                 <div
//             style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 width: "100%",
//                 height: "100%"
//             }}
//             >
//             <Confetti
//                 gravity={0.4}
//                 run={this.state.animationDone}
//                 numberOfPieces={400}
//                 {...this.props.size}
//             />
//             </div> 
//             )
//         // } else {
//         //     <div>
//         //         <h1>clear!</h1>
//         //     </div>
//         // }
      
//     }
//   }
// );

// const App = () => (
//   <div style={styles}>
//     <DimensionedExample />
//     <h2>Start editing to see some magic happen {"\u2728"}</h2>
//   </div>
// );

// export default App

