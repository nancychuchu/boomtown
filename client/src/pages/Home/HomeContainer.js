import React, { Component } from 'react';
import Home from './Home';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import { Query } from 'react-apollo';
//import { ALL_TAGS_QUERY } from '../../apollo/queries';
//import gql from 'graphql-tag';
//import { ALL_ITEMS_QUERY } from '../../apollo/queries';

class HomeContainer extends Component {
  render() {
    //return <Home classes={this.props.classes} />;
    // return (
    //   <Query query={ALL_ITEMS_QUERY} variables={{ filter: 5 }}>
    //     {({ loading, error, data }) => {
    //       if (loading) return 'Loading...'; //later we'll change Loading... to a loading screen.
    //       if (error) return `Error! ${error.message}`;
    //       if (data) {
    //         console.log(data);
    //         return <Home classes={this.props.classes} />;
    //       }
    //     }}
    //   </Query>
    // );
  }
}
export default withStyles(styles)(HomeContainer);
