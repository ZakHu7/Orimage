require('dotenv').config();
const { ExpressOIDC } = require('@okta/oidc-middleware');
var okta = require("@okta/okta-sdk-nodejs");

const oktaClient = new okta.Client({
  orgUrl: process.env.OKTA_ORG_URL,
  token: process.env.OKTA_TOKEN
});

const oidc = new ExpressOIDC({
  appBaseUrl: process.env.HOST_URL,
  issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: `${process.env.CLIENT_URL || process.env.HOST_URL}/callback`,
  scope: 'openid profile',
  routes: {
    loginCallback: {
      path: '/callback'
    },
  }
});

const getUser = (req, res, next) => {
  if (!req.userContext) {
    if ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && process.env.DEV_USER === 'dev') {
      req.user = {
        profile: {
          firstName: "DEV",
          lastName: "DEV"
        },
        id: "DEV_ID"
      };
    }
    return next();
  }

  oktaClient.getUser(req.userContext.userinfo.sub)
    .then(user => {
      req.user = user;
      res.locals.user = user;
      next();
    }).catch(err => {
      next(err);
    });
}

module.exports = { oidc, getUser };