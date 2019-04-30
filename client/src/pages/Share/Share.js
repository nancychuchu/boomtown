import React from 'react';
import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
import ShareItemForm from '../../components/ShareItemForm';
import ShareItemPreview from '../../components/ShareItemPreview';

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

export default Share;
