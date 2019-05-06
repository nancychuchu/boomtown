import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';

function FullScreenLoader(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CircularProgress color="primary" size={100} thickness={2} />{' '}
        <Typography className={classes.quote}>
          Unleashing your internet's superpowers...
        </Typography>
      </div>
    </div>
  );
}

FullScreenLoader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullScreenLoader);
