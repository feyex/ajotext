const User = require('../models/users');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

module.exports.createUser = (req, res) => {
   
    const agentID = crypto.randomBytes(6).toString('hex');
    
    
    req.body.agentId = agentID;
  
    User.create(req.body)
        .then(() => res.status(200)
            .json({
                status: true,
                message: 'user saved successfully',
                agentID
            }))
        .catch(err => res.send({
            message: 'something went wrong ',
            err: err
        }));
}



module.exports.listUsers = (req, res) => {
    User.find({})
        .then(user => res.status(200)
            .json({
                status: true,
                message: (user)
            }))
        .then(err => res.send(err));
}

module.exports.getUser = (req, res) => {
    const { id } = req.params;

    User.findById(id)
        .then(user => res.status(200)
            .json({
                status: true,
                message: (user)
            }))
        .then(err => res.send(err));
}

module.exports.updateUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(user => res.status(200)
            .json({
                status: true,
                message: (user)
            }))
        .then(err => res.send(err));
}

module.exports.deleteUser = (req, res) => {
    const { id } = req.params;
    User.findByIdAndRemove({ id })
        .then(user => res.status(200)
            .json({
                status: true,
                message: 'user fetched',
                user
            }))
        .then(err => res.send(err));
}

module.exports.login = (req, res) => {
    const agentId = req.body.agentId;

    User.findOne({ 'agentId': agentId })
        .then(async (user) => {
            if (!user) {
                return res.status(200).send({
                    message: 'agentId does not exist'
                });
            }
            else {
                const password = req.body.password;
                bcrypt.compare(password, user.password)
                    .then(result => {
                        if (result) {
                            const token = jwt.sign({ sub: user.id, role: user.role }, config.secret,
                                {
                                    expiresIn: 3600 // expires soon
                                });
                            const id = user._id;

                            return res.status(201).json({
                                status: true,
                                message: 'user logged in',
                                token,
                                
                            });
                        }
                        else {
                            return res.status(201).json({
                                status: false,
                                message: 'failed to log in'
                            });
                        }

                    })
            }
        })

}


