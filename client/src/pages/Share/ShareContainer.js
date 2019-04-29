import React, { Component } from 'react';
import Share from './Share';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_TAGS_QUERY } from '../../apollo/queries';

class ShareContainer extends Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'; //later we'll change Loading... to a loading screen.
          if (error) return `Error! ${error.message}`;
          if (data) {
            console.log(data);
            return <Share classes={this.props.classes} tags={data.tags} />;
          }
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ShareContainer);
