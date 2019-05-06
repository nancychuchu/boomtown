import React from 'react';
import { withStyles, Typography, Grid, Divider, Card } from '@material-ui/core';
import styles from './styles';
import ItemsGrid from '../../components/ItemsGrid';
import CardContent from '@material-ui/core/CardContent';
import Gravatar from 'react-gravatar';
import PropTypes from 'prop-types';

const Profile = ({ classes, user }) => {
  return (
    <div className={classes.profile}>
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardContent className={classes.mainContainer}>
              <CardContent className={classes.ownerSection}>
                <Gravatar className={classes.gravatar} email={user.email} />
                <CardContent className={classes.ownerInfo}>
                  <Typography variant="display1">{user.fullname}</Typography>
                </CardContent>
              </CardContent>

              <Typography gutterBottom variant="headline" component="h1">
                {user.items.length} items shared {user.borrowed.length} items
                borrowed.
              </Typography>

              <Typography component="p">{user.bio}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Typography
          variant="display2"
          className="classes.header"
          color="primary"
        >
          {' '}
          Shared Items:{' '}
        </Typography>
        <Grid item xs={12}>
          <Grid container justify="center">
            <ItemsGrid items={user.items} />
          </Grid>
        </Grid>

        <Divider color="primary" />

        <Typography
          variant="display2"
          className="classes.header"
          color="primary"
        >
          {' '}
          Borrowed Items:{' '}
        </Typography>

        <Grid item xs={12}>
          <Grid container justify="center">
            <ItemsGrid items={user.borrowed} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
