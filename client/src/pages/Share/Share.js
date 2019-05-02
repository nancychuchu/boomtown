import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';
import styles from './styles';

const Share = ({ classes, tags }) => {
  return (
    <Grid
      container
      className={classes.root}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} sm={12} md={6} className={classes.itemPreview}>
        <ShareItemPreview />
      </Grid>

      <Grid item xs={12} sm={12} md={6} className={classes.itemForm}>
        <ShareItemForm tags={tags} />
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Share);
