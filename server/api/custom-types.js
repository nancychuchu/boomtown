const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// @TOOD: Refactor this into a custom DATE scalar type using new GraphQLScalarType()
const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value); // ast value is always in string format
    }
    return null;
  }
});
// -------------------------------

module.exports = {
  DateScalar
};
