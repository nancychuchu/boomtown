import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import { Menu } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ProfileContainer from '../../pages/Profile';
import styles from './styles';
import { LOGOUT_MUTATION, VIEWER_QUERY } from '../../apollo/queries';
import { Mutation, graphql, compose } from 'react-apollo';

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
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
          <Link to="profile">
            <MenuItem key={ProfileContainer} onClick={this.handleClose}>
              <i className="fas fa-id-card" /> Profile
            </MenuItem>
          </Link>

          <Mutation mutation={LOGOUT_MUTATION}>
            {logout => (
              <MenuItem onClick={logoutMutation}>
                <i className="fas fa-log-out-alt" /> Logout
              </MenuItem>
            )}
          </Mutation>
        </Menu>
      </div>
    );
  }
}
const refetchQueries = [{ query: VIEWER_QUERY }];

export default compose(
  graphql(LOGOUT_MUTATION, {
    options: { refetchQueries },
    name: 'logoutMutation'
  }),
  withStyles(styles)
)(LongMenu);
