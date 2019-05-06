import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';
import Moment from 'moment';
import { Link } from 'react-router-dom';

const ItemCard = ({ classes, item }) => {
  const dateFrom = Moment(item.created).fromNow();
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={item.imageurl} />

      <CardContent className={classes.mainContainer}>
        <Link to={`/profile/${item.itemowner.id}`}>
          <CardContent className={classes.ownerSection}>
            <Gravatar
              className={classes.gravatar}
              email={item.itemowner.email}
            />

            <CardContent className={classes.ownerInfo}>
              <Typography>{item.itemowner.fullname}</Typography>
              <Typography variant="caption">{dateFrom}</Typography>
            </CardContent>
          </CardContent>
        </Link>

        <Typography gutterBottom variant="headline" component="h2">
          {item.title}
        </Typography>

        <Typography variant="caption" className={classes.tags}>
          {item.tags.map(tag => tag.title).join(', ')}
        </Typography>

        <Typography component="p">{item.description}</Typography>
      </CardContent>

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

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired
};

ItemCard.defaultProps = {
  item: {
    id: 10,
    title: 'tbd',
    imageurl: 'https://loremflickr.com/320/240/dog',
    description: 'To be added',
    itemowner: {
      id: 100,
      fullname: 'TBD',
      email: 'anonymous@anonymous.com'
    },
    tags: [
      {
        id: 100,
        title: 'To Be Determined'
      }
    ],
    created: '2019-04-29'
  }
};
export default withStyles(styles)(ItemCard);
