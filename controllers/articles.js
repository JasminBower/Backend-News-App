const {fetchSingleArticle, modifiedArticle, insertComment, fetchAllAssociatedComments, fetchAllArticles, updateVotes} = require('../models/articles');

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
       
        next(err)
    })
};

exports.getAllCommentsByArticleId = (req, res, next) => {
     const {article_id} = req.params;
     const {sort_by} = req.query;
     const {order} = req.query;

    fetchAllAssociatedComments(article_id, sort_by, order)
    .then(comments => {
        res.status(200).send({comments})
    }) 
    .catch(err => {
        
        next(err)
    })

};

exports.getAllArticles = (req, res, next) =>{
    const query = req.query;
    console.log(query)

    fetchAllArticles(query)
    .then(articles => {
        res.status(200).send({articles})
    })
    .catch(err => {
        next(err)
    })
};


