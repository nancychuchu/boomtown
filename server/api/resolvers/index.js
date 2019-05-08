//jshint esversion:6

const { ApolloError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');

//takes everything from auth.js file
const authMutations = require('./auth');
const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    Date: DateScalar,

    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
          return context.token;
        }
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
      //authMutations gets loaded.
      ...authMutations(app),

      async addItem(parent, { item }, context, info) {
        try {
          const user = context.token.id;
          const addedItem = await context.pgResource.saveNewItem({
            item: item,
            user
          });
          return addedItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      },

      async borrowItem(parent, { item }, context, info) {
        try {
          const user = context.token.id;
          const borrowedItem = await context.pgResource.updateItemBorrower({
            itemid: item,
            user
          });
          return borrowedItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }

      //adding image to new item. *Leaving here as future stretch goal.*

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
