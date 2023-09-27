import React from 'react';
import { withRouter } from "react-router";
import { useHistory } from 'react-router-dom';
import DialogBox from './DialogBox';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();


  return (
    props.location.pathname === '/login' || props.location.pathname === '/' ? null :
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            DigitalSoul
          </Typography>
          <AlertDialog />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar);

// Confirms user logout.
function AlertDialog() {
  const [open, setOpen] = React.useState(false);
  // used to programmatically change url
  const history = useHistory();
  // true if in tablet mode

  // function to handle logout
  // token is passed in header to server and then removed from localStorage
  // then user is redirected to login page
  const handleClick = async () => {
    localStorage.removeItem('token');
    history.push('/login');
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
          <Button color='inherit' onClick={handleClickOpen}>
            {'Logout'}
          </Button>
          <DialogBox
            open={open}
            handleClose={handleClose}
            handleClick={handleClick}
          />
    </div>
  );
}