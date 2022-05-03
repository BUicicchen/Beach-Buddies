import React from "react";
import { useLocation } from "react-router-dom";
import Summary from "./Summary";
import BeachBall from "../public/assets/beach-ball_NEW.svg";
import NPOSignature from "../public/assets/NPO-signature.png";
import BBlogo from "../public/assets/logo_updated.png";
import { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const Certificate = (props) => {
  //pass in variables
  const location = useLocation();
  const beach = location.state.beach;
  const trashList = location.state.trashList;
  const time = location.state.currTime;
  const name = location.state.name;
  const Day = new Date(time);
  console.log(Day);
  console.log(beach, trashList, time);

  //define PDF conversion and download
  const inputRef = useRef();
  const printDocument = () => {
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProperties = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
    });
  };
  return (
    <div>
      <div id="divToPrint" ref={inputRef}>
        {/** certification */}
        <div
          style={{
            border: " 1px solid #2E4E9A",
            margin: "20px",
            height: "auto",
            width: "auto",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              border: " 5px solid #2E4E9A",
              margin: "2px",
              height: "auto",
              width: "auto",
              borderRadius: "10px",
            }}
          >
            {/** header box */}
            <div
              style={{
                margin: "20px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              {/* Left Side of header*/}
              <div>
                <img
                  src={BeachBall}
                  style={{ width: 100, transform: `rotate(${-20}deg)` }}
                />
              </div>

              {/* middle of header*/}
              <div style={{ justifyContent: "center", paddingTop:20, paddingLeft:20 }}>
                <p style={{ fontSize: "36px", fontWeight: "bold", color: "#35559B" }}>
                  Volunteer Certificate
                </p>
              </div>

              {/* right side of header*/}
              <div style={{ textAlign: "end", marginTop: "1px" }}>
                <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                  Beach Buddies
                </p>
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: "-30px" }}>
              <p >This Certificate is presented to </p>
              <p>{name}</p>
            </div>

            <div style={{ textAlign: "center", margin: "20px" }}>
              <p>
                In recognition of them cleaning {beach.name} for TIME___ hours.
              </p>
              <p>
                During their time with Beach Buddies, they have helped clean up
                this much trash:
              </p>
            </div>

            {/* <Summary /> */}

            <div style={{paddingLeft:50,paddingRight:50}}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <TableCell>Type of Trash</TableCell>
                    <TableCell align="right">Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trashList.map((value) => (
                    <TableRow
                      key={value.name}
                      sx={{ border: 0 }}
                    >
                      <TableCell component="th" scope="row">
                        {value.name}
                      </TableCell>
                      <TableCell align="right">{value.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            </div>

            {/** bottom date, signature */}
            <div
              style={{
                margin: "20px",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <p>Date {time}</p>
              </div>

              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <p>Signature</p>
                <img
                  src={NPOSignature}
                  alt="Italian Trulli"
                  height="50px"
                  width="50px"
                />
              </div>
            </div>

            {/** bottom image */}
            <div style={{ margin: "20px", textAlign: "right" }}>
              <img
                src={BBlogo}
                style={{ height: "89px", width: "136px", opacity: "0.7" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/** download button */}
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
        <Button variant="outlined" onClick={printDocument} style={{marginBottom:20,borderBlockColor:"#355598", borderColor:"#355598", color:"#355598", justifyContent: "center", alignItem:'center'}}>Print</Button>
      </div>
    </div>
  );
};
export default Certificate;
