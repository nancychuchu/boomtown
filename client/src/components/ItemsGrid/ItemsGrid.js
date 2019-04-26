import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './Styles';
import Grid from '@material-ui/core/Grid';
import ItemCard from '../ItemCard';

const ItemsGrid = ({ classes, items }) => {
  return (
    <Grid container spacing={16} className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          {items.map(item => (
            <ItemCard key={item.id} item={item} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ItemsGrid);
