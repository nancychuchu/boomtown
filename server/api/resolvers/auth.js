const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function setCookie({ tokenName, token, res }) {
  //res is the express response object with a cookie method.
  res.cookie(tokenName, token, {
    httpOnly: true, //this protects the cookie.
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 // 2h. How cookie should live.
  });
}

//create token for user who's logged in
function generateToken(user, secret) {
  const { id, email, fullname, bio } = user; // Omit the password from the token
  //sign is encrypting it with a secret (key) and specifies expiration time
  return jwt.sign({ id, email, fullname, bio }, secret, { expiresIn: '2h' });
}

module.exports = app => {
  return {
    async signup(parent, args, context) {
      const {} = args;
      try {
        // Use bcrypt to generate a cryptographic hash to conceal the user's password before storing it.
        const hashedPassword = await bcrypt.hash(args.user.password, 10);

        const user = await context.pgResource.createUser({
          fullname: args.user.fullname,
          email: args.user.email,
          password: hashedPassword
        });

        const encodedToken = generateToken(user, app.get('JWT_SECRET'));

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: encodedToken,
          res: context.req.res
        });

        return {
          id: user.id
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      const { email, password } = args.user;
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        );
        if (!user) throw 'User was not found ';
        const valid = await bcrypt.compare(password, user.password);

        if (!valid || !user) throw 'User /Password combination was not found.';
        const encodedToken = generateToken(user, app.get('JWT_SECRET'));
        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: encodedToken,
          res: context.req.res
        });

        return {
          id: user.id,
          fullname: user.fullname,
          email: user.email
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
