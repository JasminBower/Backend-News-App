exports.formatDates = list => {
   const arrayCopy = [...list];
   const updatedComment = [];

   arrayCopy.forEach(comment => {
       const commentCopy = {...comment};
       
       commentCopy.created_at = new Date(commentCopy.created_at);
      
       updatedComment.push(commentCopy);
   });
   return updatedComment;

};

exports.makeRefObj = list => {
    const arrayCopy = [...list];

    const updatedItem = {};

    arrayCopy.forEach(item => {
      updatedItem[item.title] = item.article_id;

    });
    return updatedItem
    
};

exports.formatComments = (comments, articleRef) => {
    const commentsCopy = comments.map(comment => {
        return {...comment}
    });

    const modifiedComments = [];

    commentsCopy.forEach(comment => {
        
         for(let key in articleRef){
            if(key === comment.belongs_to){
                comment.author = comment.created_by;
                comment.created_at = new Date(comment.created_at);
                comment.article_id = articleRef[key];
                delete comment.belongs_to;
                delete comment.created_by;
               
               
            }
          
        }
        modifiedComments.push(comment)
   })
   
    return modifiedComments;

};
