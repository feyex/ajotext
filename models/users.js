const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    name: { type: String, required: true},
    phoneNumber: { type: Number,required: true, unique:true},
    agentId: { type: String},
    password:{ type: String, required: true}

}, {
    timestamps: true,
    collection: 'users'
});



// Events
userSchema.pre('save', function (next) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.password, salt, (err, hash) => {
            this.password = hash;
            this.saltSecret = salt;
            next();
        });
    });
});



const User = mongoose.model ('User', userSchema);
module.exports = User;

