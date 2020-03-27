const knex = require('../connection');

exports.fetchSingleArticle = (article_id) => {
    return knex
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', article_id)
    .count('comments.comment_id AS comment_count')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(([article]) => {
      if(!article){
          return Promise.reject()
      }
        return article
    })

};

exports.modifiedArticle = (article_id, inc_votes) => {
  
    return knex('articles')
    .select('*')
    .where('article_id', article_id)
    .increment('votes', inc_votes)
    .returning('*')
    .then(([article]) => {
        if(!article){
            return Promise.reject()
        }

        return article;

    })

};

exports.insertComment = (article_id, comment) => {
    return knex('comments')
    .where('article_id', article_id)
    .insert({
        body: comment.body,
        author: comment.username,
        article_id: article_id,
        votes: 0,
      })
    .returning('*')
    .then(([comment]) => {
        return comment
    })
};

exports.fetchAllAssociatedComments = (article_id, ...{sort_by = 'created_at', order = 'dsc'}) => {
    return knex('comments')
    .where({article_id})
    .returning('*')
    .orderBy(sort_by, order)
    .then(comments => {
        comments.forEach(comment => {
            delete comment.article_id;
            return comment;
        })
        return comments
    })
};

exports.fetchAllArticles = ({sort_by = 'created_at', order = 'desc', author, topic}) => {
    
    return knex
    .select('articles.*')
    .from('articles')
    .count('comments.comment_id AS comment_count')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .modify(query => {
        if(topic) query.where({'articles.topic': topic});
        if(author) query.where({'articles.author': author})
    })
    .orderBy(sort_by, order)
    .then(articles => {
        articles.forEach(article => {
            delete article.body;
            return article;
        })
     
        return articles
    })
    
};
