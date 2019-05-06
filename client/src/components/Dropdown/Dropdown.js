import React from 'react';
import { withStyles, Menu, MenuItem, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { MoreVert, Fingerprint, PowerSettingsNew } from '@material-ui/icons';
import ProfileContainer from '../../pages/Profile';
import styles from './styles';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { Mutation, graphql, compose } from 'react-apollo';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 48;

class Dropdown extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes, logoutMutation } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVert />
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
          <Link to="profile">
            <MenuItem key={ProfileContainer} onClick={this.handleClose}>
              <Fingerprint className={classes.icon} /> Profile
            </MenuItem>
          </Link>

          <Mutation mutation={LOGOUT_MUTATION}>
            {logout => (
              <MenuItem onClick={logoutMutation}>
                <PowerSettingsNew className={classes.icon} /> Logout
              </MenuItem>
            )}
          </Mutation>
        </Menu>
      </div>
    );
  }
}

Dropdown.propTypes = {
  classes: PropTypes.object.isRequired
};

const refetchQueries = [{ query: VIEWER_QUERY }];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: { refetchQueries },
    name: 'logoutMutation'
  }),
  withStyles(styles)
)(Dropdown);
