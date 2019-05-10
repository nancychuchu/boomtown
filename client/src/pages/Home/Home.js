import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import AccountForm from '../../components/AccountForm';
import PropTypes from 'prop-types';

const Home = ({ classes }) => {
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} sm={12} md={6}>
        <Typography
          variant="button"
          gutterBottom
          className={classes.subheading}
        >
          Boomtown
        </Typography>
        <Typography variant="display4" className={classes.headline}>
          Share. Borrow. Prosper.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Typography gutterBottom variant="headline">
          Welcome home.
        </Typography>
        <AccountForm />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  classes: PropTypes.object
};

export default Home;
