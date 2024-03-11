const { getData } = require("../models/data");
const config = require("../config/auth.config");
const path = require('path');

var jwt = require("jsonwebtoken");
const dataFolderPath = path.join(__dirname, '..', 'data');
const staffsJsonPath = path.join(dataFolderPath, 'staffs.json');

const users = getData(staffsJsonPath);

exports.signin = (req, res) => {
    users.findOne({
      where: {
        email: req.body.email
      }
    })
    .then(user => {
      if (!user || user.password !== req.body.password) {
        return res.status(404).send({ message: "User Not found." });
      }

      const token = jwt.sign({ email: user.email, role: user.role },
        config.secret,
        {
          algorithm: 'HS256',
          allowInsecureKeySizes: true,
          expiresIn: 86400
        });
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        roles: user.role,
        accessToken: token
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  if (expiredTokens.includes(token)) {
      return res.status(401).send({ message: "Token is already expired" });
  }
  expiredTokens.push(token);
  res.status(200).send({ message: "Logout successful" });
};
