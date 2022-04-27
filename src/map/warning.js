import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

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
      <Dialog
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to exit your cleaning session?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your timed progress accumulated during your session will be added to your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel}>Cancel</Button>
          <Button> 
          <Button component={Link} to="/congratulations">AGREE</Button>
          {/* <Button component={Link} to="/congratulations" style={{marginBottom: 15}} variant="outlined" state={"variable"}>AGREE</Button> */}
          </Button>
          {/* <Button onClick={handleCloseAgree} autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
