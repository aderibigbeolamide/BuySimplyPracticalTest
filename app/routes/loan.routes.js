const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middleware/index');
const { getAllLoans, getLoansByStatus, getUserLoansByEmail, getExpiredLoans, deleteLoanById } = require('../controllers/loan.controller');

router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.use(authenticateUser);

router.get('/loans', getAllLoans);
router.get('/loans', getLoansByStatus);
router.get('/loans/:userEmail/get', getUserLoansByEmail);
router.get('/loans/expired', getExpiredLoans);
router.delete('/loan/:loanId/delete', deleteLoanById);

module.exports = router;
