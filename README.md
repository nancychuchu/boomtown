# Boomtown 🏙

## Summary

This webapp is a platform that allows users to upload items and view other members' items to loan and borrow them, thus encouraging a share economy.

## ![Image of Boomtown](https://github.com/nancychuchu)

## Server

These commands must be run from the `server` directory:

### Installation

```bash
npm install
```

### Run

```bash
npm run start:dev
```

## Client

These commands must be run from the `client` directory:

### Installation

```bash
npm install
```

### Run

```bash
npm start
```

## Technologies Used

- JavaScript
- Apollo Server and Client
- GraphQL
- Node.js
- PostGreSQL
- CLI
- Express
- Git
- React
- Final Form
- Material-UI
- Gravatar
- bcrypt
- Redux

## Personal Learnings

Part 1 of this project trained back-end development skills through setting up a node express app. The app uses GraphQL for data query which provided the practice of creating a schema and setting up the necessary resolvers. The node PG library was used to establish a connection with my Postgres database and helper methods were set up with SQL queries to call data from it. This project also provided experience with using a GraphQL Playground to live test the GraphQL API and debug any errors.

Part 2 of boomtown focused on developping the client end of the webapp using react. React router enabled the navigation between components to create multiple endpoints: a welcome page, items page, share page and profile pages for each user. Redux and React's Context API were used for state management to store data for the Share Item Preview Card and the webapp's viewer identity respectively. The latter allows the website to load data according to the viewer logged in, specifically by hiding the items which they are loaning on the items page (users shouldn't borrow their own items). Server and client side authentication was implemented to allow for logging in and providing access to routes on the app.

## Author

[Nancy Chu](https://github.com/nancychuchu), App Developer student at [RED Academy](https://redacademy.com/vancouver/)

Connect with me on [LinkedIn](https://www.linkedin.com/in/chunancy/).

## Acknowledgements

Many thanks to our fearless instructors Sid, Ben and Gary for their endless patience.
