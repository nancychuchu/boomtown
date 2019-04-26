import React, { Fragment } from 'react';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import Share from '../pages/Share';
import Items from '../pages/Items';
import { Route, Switch } from 'react-router';

// const profile = ({match}) => {
//   return <div>
//     <Route path={`${match.url}/:userid`} render = {({match})=> <div> A {`${userid}`}}/>
//     </div>
// }

export default () => (
  <Fragment>
    {/* @TODO: Add your menu component here */}
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/share" component={Share} />

      <Route path="/items" component={Items} />
      {/* <Redirect from="/*" to="/items" />
      <Route path="/items" component={Redirect} /> */}
    </Switch>
  </Fragment>
);
