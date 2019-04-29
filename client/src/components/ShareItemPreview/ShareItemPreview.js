import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';
// import Moment from 'moment';

const ItemPreview = ({ classes }) => {
  // const dateFrom = Moment(
  //   item.created.substring(0, 9).replace('-', '/')
  // ).fromNow();

  return (
    <Card className={classes.card}>
      {/* <CardActionArea> */}
      <CardMedia
        className={classes.media}
        image="https://loremflickr.com/320/240/dog"
        title="A look at the item "
      />

      <CardContent className={classes.mainContainer}>
        <CardContent className={classes.ownerSection}>
          <Gravatar className={classes.gravatar} email="trial@gmail.com" />

          <CardContent className={classes.ownerInfo}>
            <Typography>To be filled </Typography>
            <Typography variant="caption">Many years ago</Typography>
          </CardContent>
        </CardContent>

        <Typography gutterBottom variant="headline" component="h2">
          New Item
        </Typography>

        <Typography variant="caption" className={classes.tags}>
          To be determined
        </Typography>

        <Typography component="p">This will autofill. </Typography>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions>
        <Button
          className={classes.button}
          variant="outlined"
          size="small"
          color="primary"
        >
          Borrow
        </Button>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles)(ItemPreview);
