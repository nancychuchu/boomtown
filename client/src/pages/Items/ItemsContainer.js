import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
// import FullScreenLoader from '../../components/FullScreenLoader';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { Query } from 'react-apollo';

class ItemsContainer extends Component {
  render() {
    return (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: 2 }}>
        {({ loading, error, data }) => {
          if (loading) return 'Loading...'; //later we'll change Loading... to a loading screen.
          if (error) return `Error! ${error.message}`;
          if (data) {
            console.log(data);
            return <Items classes={this.props.classes} items={data.items} />;
          }
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(ItemsContainer);
