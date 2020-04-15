const {fetchAllEndpoints} = require('../models/api_model');


exports.getAllEndpoints = (req, res, next) => {
    const endpoints = fetchAllEndpoints();
    res.status(200).send({endpoints})

};