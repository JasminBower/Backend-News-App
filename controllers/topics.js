const {fetchAllTopics} = require('../models/topics');



exports.getAllTopics = (req, res, next) => {
    console.log('in the topics controller')
    
    fetchAllTopics()
    .then(topics => {
        res.status(200).send({topics});
      })
      .catch(err => {
          next(err)
      })
};