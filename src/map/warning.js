import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const beach = props.beach;
  console.log("props 2")
  console.log("beach", beach)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseCancel = () => {
    setOpen(false);
  };

  // const handleCloseAgree = () => {
  //   // return <Redirect to="/" />;
  // };

  return (
    <div>
      <button className="stopwatch-btn stopwatch-btn-warning" variant="outlined" onClick={handleClickOpen}>
        Finish
      </button>
      <div style={{paddingBottom:30}}></div>
      <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{style:{borderRadius: 20, maxWidth: 300} }}
      >
        <DialogTitle id="alert-dialog-title" style={{color:"#355598"}}>
          {"Are you sure you want to exit your cleaning session?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{color:"#355598"}}>
            Your timed progress accumulated during your session will be added to your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCloseCancel} style={{marginBottom: 15, marginRight:15, borderBlockColor:"#355598", borderColor:"#355598", color:"#355598"}}>Cancel</Button>
          <Button component={Link} to="/congratulations" style={{marginBottom: 15, borderBlockColor:"#355598", borderColor:"#355598", color:"#355598"}} variant="outlined" state={"variable"}>AGREE</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
