//jshint esversion: 6

function tagsQueryString(tags, itemid, result) {
  /**
   * Challenge:
   * This function is more than a little complicated.
   *  - Can you refactor it to be simpler / more readable?
   *  - Is this
   */
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: '', // @TODO: Authentication - Server
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },

    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: '', // @TODO: Authentication - Server
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },

    async getUserById(id) {
      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1', 
        values: id ? [id] : []
      };
      try {
        const user = await postgres.query(findUserQuery);
        return user.rows[0];
      } catch (e) {
        throw 'User was not found';
      }
    },

    async getItems(idToOmit) {
      const findItems = {
        text: 'SELECT * FROM items WHERE itemowner != $1',
        values: idToOmit ? [idToOmit] : []
      };

      try {
        const items = await postgres.query(findItems);
        return items.rows;
      } catch (e) {
        throw 'Error fetching items';
      }
    },

    async getItemsForUser(id) {
      const findUserItems = {
        text: `SELECT * FROM items LEFT JOIN users ON items.itemowner = users.id WHERE itemowner = $1`,
        values: id ? [id] : []
      };

      try {
        const items = await postgres.query(findUserItems);
        return items.rows;
      } catch (e) {
        throw 'Error fetching items';
      }
    },

    async getBorrowedItemsForUser(id) {
      const findBorrowedItems = {
        text: `SELECT * FROM items LEFT JOIN users ON items.itemowner = users.id WHERE borrower = $1`,
        values: id ? [id] : []
      };
      try {
        const items = await postgres.query(findUserBorrowed);
        return items.rows;
      } catch (e) {
        throw 'Error fetching items';
      }
    },

    async getTags() {
      try {
        const tags = await postgres.query('SELECT * FROM tags');
        return tags.rows;
      } catch (e) {
        throw 'Error fetching tags';
      }
    },

    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT * FROM itemtags as it INNER JOIN tags ON it.tagid = tags.id WHERE itemid=$1`,
        values: id ? [id] : []
      };
      try {
        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (e) {
        throw 'Error fetching tags for item';
      }
    },

    async saveNewItem({ item, user }) {
      /**
       *  @TODO: Adding a New Item
       *
       *  Adding a new Item to Posgtres is the most advanced query.
       *  It requires 3 separate INSERT statements.
       *
       *  All of the INSERT statements must:
       *  1) Proceed in a specific order.
       *  2) Succeed for the new Item to be considered added
       *  3) If any of the INSERT queries fail, any successful INSERT
       *     queries should be 'rolled back' to avoid 'orphan' data in the database.
       *
       *  To achieve #3 we'll ue something called a Postgres Transaction!
       *  The code for the transaction has been provided for you, along with
       *  helpful comments to help you get started.
       *
       *  Read the method and the comments carefully before you begin.
       */

      return new Promise((resolve, reject) => {
        /**
         * Begin transaction by opening a long-lived connection
         * to a client from the client pool.
         * - Read about transactions here: https://node-postgres.com/features/transactions
         */
        postgres.connect((err, client, done) => {
          try {
            // Begin postgres transaction
            client.query('BEGIN', async err => {
              const { title, description, tags } = item;

              // Generate new Item query
              // @TODO
              // -------------------------------

              client.query('SELECT * FROM items', (err, res) => {
                if (err) {
                  console.log(err.stack);
                } else {
                  console.log(res.rows[0]);
                }
              });

              // Insert new Item
              // @TODO
              // -------------------------------

              // Generate tag relationships query (use the'tagsQueryString' helper function provided)
              // @TODO
              // -------------------------------

              // Insert tags
              // @TODO
              // -------------------------------

              // Commit the entire transaction!
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                // Uncomment this resolve statement when you're ready!
                // resolve(newItem.rows[0])
                // -------------------------------
              });
            });
          } catch (e) {
            // Something went wrong
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }
              // release the client back to the pool
              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
