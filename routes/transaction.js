const express = require('express');
const app = express();
const router = express.Router();

const transactionCtrl = require('../controllers/transaction');
const validateToken = require('../helpers/validateToken');

router.get('/transact', transactionCtrl.listTransactions);

router.get('/sms', transactionCtrl.sendmsg);

router.get('/transact/users/:id', transactionCtrl.UserId);

router.get('/transact/:id', transactionCtrl.getTransaction);

router.post('/transact', validateToken.verifyToken, transactionCtrl.createTransaction, transactionCtrl.sendmsg);

router.delete('/transact/:id', transactionCtrl.deleteTransaction);


router.get('/health', (req, res) => {
  res.send('OK');
});
module.exports = router;

