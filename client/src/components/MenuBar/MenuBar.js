import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import styles from './styles';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  withStyles
} from '@material-ui/core';
import logo from '../../images/boomtown.svg';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Dropdown from '../Dropdown';
import { graphql, compose } from 'react-apollo';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';

function MenuBar(props) {
  const { classes } = props;

  const endPoint = props.location.pathname;

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
          {endPoint !== '/share' && (
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
          )}

          <Dropdown />
        </Toolbar>
      </AppBar>
    </div>
  );
}

MenuBar.propTypes = {
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
  )(MenuBar)
);
