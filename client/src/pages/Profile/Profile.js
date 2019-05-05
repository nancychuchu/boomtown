import React from 'react';
import { withStyles, Typography } from '@material-ui/core';
import styles from './styles';
import { Grid } from '@material-ui/core';
import ItemsGrid from '../../components/ItemsGrid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Gravatar from 'react-gravatar';

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
                  <Typography>{user.fullname}</Typography>
                </CardContent>
              </CardContent>

              <Typography gutterBottom variant="headline" component="h2">
                {user.items.length} items shared {user.borrowed.length} items
                Borrowed.
              </Typography>

              <Typography component="p">{user.bio}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Typography variant="headline" className="classes.header">
          {' '}
          Shared Items:{' '}
        </Typography>
        <Grid item xs={12}>
          <Grid container justify="center">
            <ItemsGrid items={user.items} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Profile);
