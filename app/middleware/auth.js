const jwt = require('jsonwebtoken');
const config = require("../config/auth.config");

exports.authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, config.secret, (err, userObject) => {
      if (err) {
          return res.status(401).send({ message: 'Unauthorized' });
      }

      req.user = userObject;
      next();
  });
};

