const Transaction = require('../models/transaction');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/users');

module.exports.UserId = (req, res) => {
    const { _id } = req.params;

    User.findById(_id)
        .then(user => res.status(200)
            .json({
                status: true,
                message: 'User exist'
            }))
        .catch(err => res.send(err));
}

module.exports.createTransaction = (req, res, next) => {

    const Otp = crypto.randomBytes(3).toString('hex');


    req.body.otp = Otp;

    Transaction.create(req.body)
        .then(res => {

            if (res) {
                next()
            }
            else {
                res.status(401)
                    .json({
                        status: false,
                        message: 'Something went wrong',
                        Otp
                    })
            }
        })

}

module.exports.sendmsg = (req, res) => {
    const OTP = res.otp;
    const accountSid = 'AC0cd730d98693ccc89c368b3ee88e913d';
    const authToken = '4e269bc5f1c9ecf66a65b5c1b2355c4c';
    const client = require('twilio')(accountSid, authToken);

    client.messages
        .create({
            body: 'Otp Code From ajo card is ' + OTP,
            from: '+19386666264',
            to: '+2347033718271'
        })
        .then(message =>
            console.log(message.sid),
            res.status(200)
                .json({
                    status: true,
                    message: 'Transaction successful and Otp sent to phone number'
                })

        )
        .then(err => res.send(err));
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
        .catch(err => res.send(err));
}

module.exports.updateTransaction = (req, res) => {
    Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(Transaction => res.status(200)
            .json({
                status: true,
                message: (Transaction)
            }))
        .catch(err => res.send(err));
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
        .catch(err => res.send(err));
}




