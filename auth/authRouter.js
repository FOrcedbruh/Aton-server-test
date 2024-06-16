const express = require('express');
const controller = require('./authController');

const authRouter = express.Router();

authRouter.post('/login', controller.login);
authRouter.post('/registration', controller.registration)
authRouter.post('/logout', controller.logout)


module.exports = authRouter;
