const express = require('express');
const apiRouter = express.Router();
const {topicsRouter} = require('./topics_router');
const {usersRouter} = require('./user_router')



apiRouter.use('/topics', topicsRouter);
apiRouter.use('/users', usersRouter)






module.exports = {apiRouter};