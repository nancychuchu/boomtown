import React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import styles from './styles';
import ItemCard from '../ItemCard';
import PropTypes from 'prop-types';

const ItemsGrid = ({ classes, items }) => {
  return (
    <Grid container spacing={16} className={classes.root}>
      <Grid item xs={12}>
        <Grid container justify="center">
          {items.map(item => <ItemCard key={item.id} item={item} />)}
        </Grid>
      </Grid>
    </Grid>
  );
};

ItemsGrid.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired
};

export default withStyles(styles)(ItemsGrid);
