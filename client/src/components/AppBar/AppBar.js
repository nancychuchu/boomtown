import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { withRouter } from 'react-router';
import styles from './styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import logo from '../../images/boomtown.svg';
// import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
// import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// import { Typography } from '@material-ui/core';

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.navbar}>
          <IconButton className={classes.logoButton}>
            <img src={logo} alt="Boomtown" className={classes.logo} />
          </IconButton>
          <div className={classes.spacer} />
          <Button
            variant="text"
            className={classes.shareButton}
            color="inherit"
          >
            <AddIcon className={classes.addIcon} />
            SHARE SOMETHING
          </Button>

          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MoreVertIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ButtonAppBar);
