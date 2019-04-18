//jshint esversion: 6

const { Pool } = require('pg');

module.exports = (app) => {

   const c =  new Pool({
    host: app.get('PG_HOST'),
    user: app.get('PG_USER'),
    password: app.get('PG_PASSWORD'),
    database: app.get('PG_DB'),
    //define two properties to tell our libraries that if there's a bit of a delay, it's okay
    idleTimeoutMillis: 30000, //if something takes more than 3s to connect, break. 
    connectionTimeoutMillis: 2000, // when connection is made, and nothing happens after 2s, break connection.
  });
  
  return c; 
  
};
