const { getData } = require("../models/data");
const path = require('path');

const dataFolderPath = path.join(__dirname, '..', 'data');
const loanJsonPath = path.join(dataFolderPath, 'loan.json');
const loansData = getData(loanJsonPath);

exports.getAllLoans = (req, res) => {
    const userRole = req.user.role;
    let loans = [];
    if (userRole !== 'admin' && userRole !== 'superadmin') {
        loans = loansData.map(loan => ({ ...loan, applicant: { name: loan.applicant.name } }));
    }
    res.status(200).send(loans);
};

exports.getLoansByStatus = (req, res) => {
    const { status } = req.query;
    const loans = loansData.filter(loan => loan.status === status);
    res.status(200).send(loans);
};

exports.getUserLoansByEmail = (req, res) => {
    const { userEmail } = req.params;
    const userLoans = loansData.filter(loan => loan.applicant.email === userEmail);
    res.status(200).send({ loans: userLoans });
};

exports.getExpiredLoans = (req, res) => {
    const currentDate = new Date();
    const expiredLoans = loansData.filter(loan => new Date(loan.maturityDate) < currentDate);
    res.status(200).send(expiredLoans);
};

exports.deleteLoanById = (req, res) => {
    const { loanId } = req.params;
    const userRole = req.user.role; 

    if (userRole !== 'superadmin') {
        return res.status(403).send({ message: "Forbidden" });
    }
    const index = loansData.findIndex(loan => loan.id === loanId);
    if (index !== -1) {
        loansData.splice(index, 1);
        res.status(200).send({ message: "Loan deleted successfully" });
    } else {
        res.status(404).send({ message: "Loan not found" });
    }
};
