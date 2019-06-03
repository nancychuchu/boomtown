import React, { Fragment } from 'react';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import Items from '../pages/Items';
import MenuBar from '../components/MenuBar';
import { Route, Switch, Redirect } from 'react-router';
import { ViewerContext } from '../context/ViewerProvider';
import FullScreenLoader from '../components/FullScreenLoader';

export default () => (
  <ViewerContext.Consumer>
    {({ loading, viewer }) => {
      if (loading) return <FullScreenLoader />;
      if (!viewer) {
        return (
          <Switch>
            <Route exact path="/welcome" name="home" component={Home} />
            <Redirect from="*" to="/welcome" />
          </Switch>
        );
      }
      return (
        <Fragment>
          <MenuBar />
          <Switch>
            <Route exact path="/items" name="items" component={Items} />
            <Route
              exact
              path="/profile/:userId"
              name="profile"
              component={Profile}
            />
            <Route exact path="/share" name="share" component={Share} />
            <Redirect from="*" to="/items" />
          </Switch>
        </Fragment>
      );
    }}
  </ViewerContext.Consumer>
);
