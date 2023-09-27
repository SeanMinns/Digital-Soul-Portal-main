import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import SignIn from './SignIn';

const useStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(5),
    paddingTop: theme.spacing(13),
    [theme.breakpoints.only('sm')]: {
      marginLeft:  ('4.5rem'),
    },
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
}));

const Container = ({ tabletOpen }) => {
  const classes = useStyles({ tab: tabletOpen });

  return (
    <div className={classes.container}>
        <Switch>
          <Route exact path='/'>
            <SignIn />
          </Route>
          <Route exact path='/dashboard'>
            <Dashboard />
          </Route>
        </Switch>
    </div>
  );
};

export default Container;
