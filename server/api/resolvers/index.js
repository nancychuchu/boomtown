//jshint esversion:6

const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
// const authMutations = require("./auth")
// -------------------------------
const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    // Date: DateScalar,

    Query: {
      viewer() {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          if (!user) {
            throw 'User was not found.';
          }
          return user;
        } catch (e) {
          throw new ApolloError(e);
        }
      },

      async items(parent, { filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },

      async tags(parent, args, { pgResource }) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    User: {
      async items({ id }, args, { pgResource }) {
        try {
          const items = await pgResource.getItemsForUser(id);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },

      async borrowed({ id }, args, { pgResource }) {
        try {
          const items = await pgResource.getBorrowedItemsForUser(id);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Item: {
      async itemowner({ itemowner }, args, { pgResource }) {
        try {
          const owner = await pgResource.getUserById(itemowner);
          return owner;
        } catch (e) {
          throw new ApolloError(e);
        }
      },

      async tags(item, args, { pgResource }) {
        try {
          const tags = await pgResource.getTagsForItem(item.id);
          return tags;
        } catch (e) {
          throw new ApolloError(e);
        }
      },

      async borrower({ borrower }, args, { pgResource }) {
        if (!borrower) return null;
        try {
          const itemBorrower = await pgResource.getUserById(borrower);
          return itemBorrower;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      // ...authMutations(app),
      // -------------------------------

      //STRETCH GOAL : Try to addItem
      async addItem(parent, { item }, { pgResource }, info) {
        try {
          //user placeholder
          const user = 1;
          const addedItem = await pgResource.saveNewItem(item, user);
          return addedItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }

      // image = await image;
      // const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
      // const newItem = await context.pgResource.saveNewItem({
      //   item: args.item,
      //   image: args.image,
      //   user
      // });
      // return newItem;
      // }
    }
  };
};
