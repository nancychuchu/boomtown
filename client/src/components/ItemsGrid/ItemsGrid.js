import React from 'react';
import { withStyles } from '@material-ui/core';
import styles from './Styles';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import ItemCard from '../ItemCard';

const ItemsGrid = ({ items }) => {
  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Grid container justify="center">
          {items.map(item => (
            // <Grid key={item.value} item>
            <ItemCard key={item.id} item={item} />
            // </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(ItemsGrid);
