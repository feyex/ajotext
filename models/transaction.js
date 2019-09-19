const mongoose = require('mongoose');
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    user_id: {type:Schema.Types.ObjectId, required:true, ref:'User'},
    amount: { type: Number, required: true},
    pin: { type: Number,required: true},
    walletId: { type: String,required: true},
    otp:{ type: String, required: true}

}, {
    timestamps: true,
});

const Transaction = mongoose.model ('Transaction', transactionSchema);
module.exports = Transaction;