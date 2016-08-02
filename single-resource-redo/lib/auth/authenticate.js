const jwt = require('jsonwebtoken');

module.exports = function getAuth() {
  return function auth(req, res, next) {

    let token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, process.env.secret, (err, decoded) => {
        if (err) {
          return res.json({success: false, message: 'Authentication failed. Token invalid.'});
        } else {
          //If authentication passes, save to request for use in other routes.
          req.decoded = decoded;
          next();
        }
      });
    } else {
      //We're here if no token was passed to a protected route.
      return res.status(403).send({success: false, message: 'No token passed.'});
    }
  };
};
