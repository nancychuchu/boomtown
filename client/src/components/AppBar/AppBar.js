import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
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
import { Link } from 'react-router-dom';
// import { Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Dropdown from '../Dropdown';

import { graphql, compose } from 'react-apollo';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.navbar}>
          <Link to="/items">
            <IconButton className={classes.logoButton}>
              <img src={logo} alt="Boomtown" className={classes.logo} />
            </IconButton>
          </Link>
          <div className={classes.spacer} />
          <Link to="/share">
            <Button
              variant="text"
              className={classes.shareButton}
              color="inherit"
            >
              <AddIcon className={classes.addIcon} />
              SHARE SOMETHING
            </Button>
          </Link>
          <Dropdown />
          {/* <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MoreVertIcon />
          </IconButton> */}

          {/* <div>
            <IconButton
              aria-label="More"
              aria-owns={open ? 'long-menu' : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {options.map(option => (
                <MenuItem
                  key={option}
                  selected={option === 'Pyxis'}
                  onClick={this.handleClose}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </div> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

const refetchQueries = [{ query: VIEWER_QUERY }];

export default withRouter(
  compose(
    graphql(LOGOUT_MUTATION, {
      options: { refetchQueries },
      name: 'logoutMutation'
    }),
    withStyles(styles)
  )(ButtonAppBar)
);
