//jshint esversion: 6

const { ApolloServer } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const jwt = require('jsonwebtoken');
const { AuthDirective } = require('../api/custom-directives');

const typeDefs = require('../api/schema'); //type definitiions fancy desig for schema
let resolvers = require('../api/resolvers');

module.exports = ({
  app,
  pgResource
}) => {
  resolvers = resolvers(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    schemaDirectives: {
      auth: AuthDirective
    }
  });

  const apolloServer = new ApolloServer({
    //context is passed as the third argument in resolvers.
    context: ({ req }) => {
      //console.log(req.cookies);

      //retrieve token using cookie-parser middleware
      const tokenName = app.get('JWT_COOKIE_NAME');
      const encodedToken = req ? req.cookies[tokenName] : undefined; //returns string
      const token = encodedToken
        ? jwt.decode(encodedToken, app.get('JWT_SECRET')) //returns decoded token payload.
        : undefined;

      //console.log(token);

      return {
        req,
        token,
        pgResource
      };
    },
    schema
  });

  apolloServer.applyMiddleware({
    app,
    cors: app.get('CORS_CONFIG')
  });
};