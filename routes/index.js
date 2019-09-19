const express = require('express');
const app = express();
const router = express.Router();

const userController = require ('../controllers/user');


  router.get('/users', userController.listUsers);

  router.get('/users/:id', userController.getUser);

  router.post('/users', userController.createUser);

  router.delete('/users/:id', userController.deleteUser);

  router.post('/login', userController.login);


  
  router.get('/health', (req, res) => {
    res.send('OK');
  });
  module.exports = router;

