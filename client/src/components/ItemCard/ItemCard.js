import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './Styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Gravatar from 'react-gravatar';

const ItemCard = ({ classes, item }) => {
  return (
    <Card className={classes.card}>
      {/* <CardActionArea> */}
      <CardMedia
        className={classes.media}
        image={item.imageurl}
        title="A look at the item "
      />
      {/* <CardContent
        avatar={
          <Gravatar className={classes.gravatar} email={item.itemowner.email} />
        }
        owner={<Typography>{item.itemowner.fullname}</Typography>}
        date={<Typography variant="caption">{item.created}</Typography>}
      /> */}

      <CardContent className={classes.mainContainer}>
        
        <CardContent className={classes.ownerSection}>
          <Gravatar className={classes.gravatar} email={item.itemowner.email} />
         
          <CardContent className={classes.ownerInfo}>
            <Typography>{item.itemowner.fullname}</Typography>
            <Typography variant="caption">{item.created}</Typography>
          </CardContent>
        
        </CardContent>

        <Typography gutterBottom variant="headline" component="h2">
          {item.title}
        </Typography>

        <CardContent className={classes.tags}>
          {item.tags.map(tag => (
            <Typography key={tag.id} variant="caption">
              {tag.title}
            </Typography>
          ))}
        </CardContent>

        <Typography component="p">{item.description}</Typography>
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

export default withStyles(styles)(ItemCard);
