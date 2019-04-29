import React, { Fragment } from 'react';
import Home from '../pages/Home';
// import Profile from '../pages/Profile';
import Share from '../pages/Share';
import Items from '../pages/Items';
import AppBar from '../components/AppBar';
import { Route, Switch, Redirect } from 'react-router';

const Profile = ({ match }) => (
  <div>
    <Route
      path={`${match.url}/:userid`}
      render={({ match }) => <div> Profile page for {match.params.userid}</div>}
    />
  </div>
);

export default () => (
  <Fragment>
    <Route path="/" component={AppBar} />
    <Switch>
      <Route path="/welcome" component={Home} />
      <Route path="/items" component={Items} />
      <Route path="/profile" component={Profile} />

      <Route path="/share" component={Share} />

      <Redirect from="/*" to="/items" />
      {/**
       * @TODO:
       * Later, we'll add logic to send users to one set of routes if they're logged in,
       * or only view the /welcome page if they are not.
       */}
    </Switch>
  </Fragment>
);
