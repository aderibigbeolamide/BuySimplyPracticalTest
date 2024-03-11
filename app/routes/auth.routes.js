const express = require('express');
const router = express.Router();
const { signin, signout } = require('../controllers/auth.controller');

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
router.post('/auth/signin', signin);
router.post('/auth/signout', signout);

module.exports = router;
