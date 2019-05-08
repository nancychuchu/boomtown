import React from 'react';
import {
  withStyles,
  CardActions,
  CardContent,
  Card,
  CardMedia,
  Button,
  Typography
} from '@material-ui/core';
import PropTypes from 'prop-types';
import styles from './styles';
import Gravatar from 'react-gravatar';
import Moment from 'moment';
import { Link } from 'react-router-dom';
import { BORROW_ITEM_MUTATION } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';
import { Mutation, graphql, compose } from 'react-apollo';
import FullScreenLoader from '../FullScreenLoader';

const ItemCard = ({ classes, item, borrowMutation }) => {
  const dateFrom = Moment(item.created).fromNow();
  return (
    <ViewerContext.Consumer>
      {({ loading, viewer }) => {
        if (loading) return <FullScreenLoader />;
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
              <Mutation mutation={BORROW_ITEM_MUTATION}>
                {borrowItem => (
                  <Button
                    className={classes.button}
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() =>
                      borrowMutation({
                        variables: {
                          item: item.id
                        }
                      }).catch(error => {
                        throw Error(error);
                      })
                    }
                  >
                    Borrow
                  </Button>
                )}
              </Mutation>
            </CardActions>
          </Card>
        );
      }}
    </ViewerContext.Consumer>
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

export default compose(
  graphql(BORROW_ITEM_MUTATION, {
    name: 'borrowMutation'
  }),
  withStyles(styles)
)(ItemCard);
