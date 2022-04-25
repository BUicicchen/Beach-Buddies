import React from "react";
import { useLocation } from 'react-router-dom';
import { render } from "react-dom";
import PropTypes from "prop-types";
// import sizeMe from "react-sizeme";
import Confetti from "react-confetti";
import firebase from '../firebase/firebase';
import { doc, updateDoc } from "firebase/firestore";
import {useState, useEffect, TextInput, View, StyleSheet} from 'react';

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    width: "100%",
    height: "100vh",
    transition: 'white 1s ease-out',
    // opacity: 1,
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

export default function Congratulations(props) {
    const [animationDone, setAnimationDone] = useState(true)
    const location = useLocation();
    const beach = location.state;
    console.log("props 3")
    console.log(beach)


    // const beach = props.beach;
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
        const currTime = new Date()
        const created = firebase.firestore.Timestamp.fromDate(currTime).toDate();

        updateBeachData();
        async function updateBeachData(){
            console.log(created)
            await firebase.firestore().collection("beaches_MA").doc(beach.doc_id).update({lastCleaned: created});
            // console.log(beachData)
            // const fbeachData = beachData.docs[0].data();
            console.log(beach, currTime)
            // await updateDoc(beach, {
            //     last_cleaned: currTime
            //   });
            // fbeachData.update({'lastCleaned' : currTime});
            console.log(beach)
        }
       
        
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
        <h1>
            <center>
            <font color="#35559B">  CONGRATULATIONS! </font>  
            </center>
        </h1>
        {/* <View style={styles.screen}>
        <TextInput style={styles.input} placeholder="Type something here" />
        </View> */}
        <p id="rcorners2">Rounded corners!</p>
    </div>
    }
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

