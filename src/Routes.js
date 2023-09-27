/* eslint-disable react/jsx-curly-newline */
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import NavBar from './components/Navbar';
import SignIn from './components/SignIn';
import Container from './components/Container';
import PageNotFound from './PageNotFound';

const Routes = () => {
  // All the routes of our app, excluding login
  const allRoutes = [
    '/',
    '/dashboard',
  ];

  return (
    <Router>
        <Switch>
          {/* Route handling for login */}
          <PrivateRoute exact path='/login'>
            <SignIn />
          </PrivateRoute>
          {/* Route handling for all routes in allRoutes variable */}
          <PrivateRoute exact path={allRoutes}>
            <NavBar />
            <Container />
          </PrivateRoute>
          <Route component={PageNotFound} />
        </Switch>
    </Router>
  );
};

// Private Route Component
// eslint-disable-next-line consistent-return
const PrivateRoute = ({ children, path, ...rest }) => {
  const tokenExists = !!localStorage.getItem('token');

  // User cannot directly open homepage if token doesnt exist in local Storage.
  // It aslo redirects the user to login page

  if (path !== '/login') {
    return (
      <Route
        path={path}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        render={({ location }) =>
          tokenExists ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  // User cannot directly open login page if token exists in local Storage.
  // It aslo redirects the user to homepage

  if (path === '/login') {
    return (
      <Route
        path={path}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
        render={({ location }) =>
          tokenExists ? (
            <Redirect
              to={{
                pathname: '/',
                state: { from: location },
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }
};

export default Routes;
