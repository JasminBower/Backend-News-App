const knex = require('../connection');



exports.fetchSingleArticle = (article_id) => {
    return knex
    .select('articles.*')
    .from('articles')
    .where('articles.article_id', article_id)
    .count('comments.comment_id AS comment_count')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .then(article => {
      if(article.length === 0){
          return Promise.reject({status: 404, msg: 'Article Id Not Found'})
      } else {
        return article[0]
      }
        
    })

};

exports.modifiedArticle = (article_id, inc_votes) => {
     if(!inc_votes || typeof inc_votes !== "number") return Promise.reject({status: 400, msg: 'Invalid Body Sent'})
    return knex('articles')
    .select('*')
    .where({article_id})
    .increment('votes', inc_votes)
    .returning('*')
    .then(([article]) => {
        if(!article){
            return Promise.reject({status: 404, msg: 'Article Id Invalid'})
        }

        return article;

    })

};

exports.insertComment = (article_id, comment) => {
    if(!comment.username || !comment.body) return Promise.reject({status: 400, msg: 'Invalid Body Sent'});
    return knex('comments')
    .where({article_id})
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
    console.log(article_id)
    //if(typeof {article_id} !== "number") return Promise.reject({status: 400, msg: 'Bad Request'});
   //write a check if article_id exists func
    return knex('comments')
    .where({article_id})
    .returning('*')
    .orderBy(sort_by, order)
    .then(comments => {
        console.log(comments)
        comments.forEach(comment => {
            delete comment.article_id;
            return comment;
            //supposed to be no logic in then block, sorry I ran out of time :(!!!!!
        })
        if(!comments) return Promise.reject({status: 404, msg: 'article not found'})
        
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
