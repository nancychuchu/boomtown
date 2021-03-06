import React, { Component } from 'react';
import Items from './Items';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { ALL_ITEMS_QUERY } from '../../apollo/queries';
import { Query } from 'react-apollo';
import { ViewerContext } from '../../context/ViewerProvider';

class ItemsContainer extends Component {
  render() {
    return (
      <ViewerContext.Consumer>
        {({ loading, viewer }) => {
          if (loading) return <FullScreenLoader />;
          return (
            <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
              {({ loading, error, data }) => {
                if (loading) return <FullScreenLoader />;
                if (error) return `Error! ${error.message}`;
                if (data) {
                  return <Items items={data.items} />;
                }
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  }
}

export default withStyles(styles)(ItemsContainer);
