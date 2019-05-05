import React from 'react';
import Profile from './Profile';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import FullScreenLoader from '../../components/FullScreenLoader';
import { Query } from 'react-apollo';
import { ALL_USER_ITEMS_QUERY } from '../../apollo/queries';
import { ViewerContext } from '../../context/ViewerProvider';

const ProfileContainer = ({ match }) => {
  if (!match.params.userId) {
    return (
      <ViewerContext.Consumer>
        {({ loading, viewer }) => {
          if (loading) return <FullScreenLoader />;
          return (
            <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: viewer.id }}>
              {({ loading, error, data }) => {
                if (loading) return <FullScreenLoader />;
                if (error) return `Error! ${error.message}`;
                if (data) {
                  console.log(data);
                  return <Profile user={data.user} />;
                }
              }}
            </Query>
          );
        }}
      </ViewerContext.Consumer>
    );
  } else {
    return (
      <Query
        query={ALL_USER_ITEMS_QUERY}
        variables={{ id: match.params.userId }}
      >
        {({ loading, error, data }) => {
          if (loading) return <FullScreenLoader />;
          if (error) return `Error! ${error.message}`;
          if (data) {
            console.log(data);
            return <Profile user={data.user} />;
          }
        }}
      </Query>
    );
  }
};

export default withStyles(styles)(ProfileContainer);
