import React from 'react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function DialogBox({
  open,
  handleClose,
  handleClick,
}) {
  let title = '';
  let content = '';
  title = 'Are you sure you wish to logout?';
  content = 'If you Agree, you will be logged out from all devices...';

  const handleDialog = () => {
    handleClick();
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Disagree
          </Button>
          <Button onClick={handleDialog} color='secondary' autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

DialogBox.defaultProps = {
  handleClick: null,
};
