const { fetchSingleUser} = require('../models/users_model');

exports.getUser = (req, res, next) => {
    const {username} = req.params;
    fetchSingleUser(username)
    .then(user => {
        res.status(200).send({user})
        
    })
    .catch(err => {
        next(err)
    })
};