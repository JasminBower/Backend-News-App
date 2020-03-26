const {fetchSingleArticle, modifiedArticle, insertComment, fetchAllAssociatedComments} = require('../models/articles');

exports.getArticle = (req, res, next) => {
  const {article_id} = req.params;
  fetchSingleArticle(article_id)
  .then(article => {
      res.status(200).send({article})
  })
  .catch(err => {
      next(err)
  })
};

exports.patchArticle = (req, res, next) => {
    const {article_id} = req.params;
    const {inc_votes} = req.body;

    modifiedArticle(article_id, inc_votes)
    .then(article => {
        res.status(200).send({article});
    })
    .catch(err => {
        next(err)
    })
};

exports.postComment = (req, res, next) => {
    const {article_id} = req.params;
    const comment = req.body;
    insertComment(article_id, comment)
    .then(comment => {
        res.status(201).send({comment})
    })
    .catch(err => {
        if(err.code === '23503'){
            res.status(404).send({msg: 'article not found'})
        }
        next(err)
    })
};

exports.getAllCommentsByArticleId = (req, res, next) => {
     const {article_id} = req.params;
     const {query} = req.query;

    fetchAllAssociatedComments(query, article_id)
    .then(comments => {
        res.status(200).send({comments})
    }) 
    .catch(err => {
        
        next(err)
    })

};