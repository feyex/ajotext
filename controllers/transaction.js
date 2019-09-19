const Transaction = require('../models/transaction');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports.createTransaction = (req, res) => {
   
    const Otp = crypto.randomBytes(3).toString('hex');
    
    
    req.body.otp = Otp;
  
    Transaction.create(req.body)
        .then(() => res.status(200)
            .json({
                status: true,
                message: 'Transaction saved successfully',
                Otp
            }))
        .catch(err => res.send({
            message: 'something went wrong ',
            err: err
        }));
}



module.exports.listTransactions = (req, res) => {
    Transaction.find({})
        .then(Transaction => res.status(200)
            .json({
                status: true,
                message: (Transaction)
            }))
        .then(err => res.send(err));
}

module.exports.getTransaction = (req, res) => {
    const { id } = req.params;

    Transaction.findById(id)
        .then(Transaction => res.status(200)
            .json({
                status: true,
                message: (Transaction)
            }))
        .then(err => res.send(err));
}

module.exports.updateTransaction = (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(Transaction => res.status(200)
            .json({
                status: true,
                message: (Transaction)
            }))
        .then(err => res.send(err));
}

module.exports.deleteTransaction = (req, res) => {
    const { id } = req.params;
    Transaction.findByIdAndRemove({ id })
        .then(Transaction => res.status(200)
            .json({
                status: true,
                message: 'Transaction fetched',
                Transaction
            }))
        .then(err => res.send(err));
}




