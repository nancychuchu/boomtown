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

// function tagsQueryString(tags, itemid, result){
// tags.map(tag=>`(${tag.id'},${itemid})`).join(",")
//   }

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text:
          'INSERT INTO users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *',
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
        //find user where the email matches provided email.
        text: 'SELECT * FROM users WHERE email = $1',
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
        text: `SELECT * FROM items WHERE itemowner != $1 ORDER BY created DESC`,
        values: idToOmit ? [idToOmit] : []
      };
      try {
        const items = await postgres.query(findItems);
        return items.rows;
      } catch (e) {
        throw 'Error fetching items available';
      }
    },

    async getItemsForUser(id) {
      const findUserItems = {
        text: `SELECT * FROM items WHERE itemowner = $1`,
        values: [id]
      };
      try {
        const items = await postgres.query(findUserItems);
        return items.rows;
      } catch (e) {
        throw 'Error fetching user items';
      }
    },

    async getBorrowedItemsForUser(id) {
      const findBorrowedItems = {
        text: `SELECT * FROM items WHERE borrower = $1`,
        values: [id]
      };
      try {
        const items = await postgres.query(findBorrowedItems);
        return items.rows;
      } catch (e) {
        throw 'Error fetching borrowed items';
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

              console.log(user);
              // Generate new Item query - Stretch Goal
              const newItemQuery = {
                text:
                  'INSERT INTO items (title, description, itemowner) VALUES ($1, $2, $3) RETURNING *',
                values: [title, description, user]
              };

              const newItem = await client.query(newItemQuery);

              const newTagsQuery = {
                text: `INSERT INTO itemtags (tagid, itemid) VALUES ${tagsQueryString(
                  [...tags],
                  newItem.rows[0].id,
                  ''
                )}`,
                values: tags.map(tag => tag.id)
              };

              const newTags = await client.query(newTagsQuery);

              // Commit the entire transaction!
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                // release the client back to the pool
                done();
                resolve(newItem.rows[0]);
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
    },

    async updateItemBorrower({ item, user }) {
      const { id } = item;
      const updateBorrowerQuery = {
        text: 'UPDATE items SET borrower = $1 WHERE id = $2',
        values: [user, id]
      };
      try {
        const items = await postgres.query(updateBorrowerQuery);
        return items.rows;
      } catch (e) {
        throw 'Error updating borrower for item';
      }
    }
  };
};
