const connection = require('../connection');
const app = require('../app');
const chai = require('chai');
const chaiSorted = require( "chai-sorted");
const {expect} = chai;
const request = require('supertest');
chai.use(require('sams-chai-sorted'));
chai.use(chaiSorted);



beforeEach(() => connection.seed.run());
after(() => connection.destroy());


    describe('/api', () => {
       describe('/topics', () => {
            describe('GET', () => {
                it('status 200: returns an object with a key of topics', () => {
                    return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then(res => {
                        expect(res.body).to.be.an('Object');
                        expect(res.body.topics).to.be.an("Array");
                        expect(res.body.topics[0]).to.contain.keys(
                            'description',
                            'slug'
                        )
                    })
                });
                it('status 404', () => {
                    return request(app)
                    .get('/api/topikz')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.eql({msg: 'Path not found'})
                    })

                })
                

            });

        });
        describe('/users/:username', () => {
            describe('GET', () => {
                it('status 200: responds with a user object', () => {
                    return request(app)
                    .get('/api/users/lurker')
                    .expect(200)
                    .then(res => {
                        expect(res.body.user).to.be.an('Object');
                        expect(res.body.user).to.contain.keys('username', 'name', 'avatar_url');
                    })
                });
                it('Status 404: user not found', () => {
                    return request(app)
                    .get('/api/users/lurkerrrrrrr')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.eql({msg: 'Path not found'});
                    })

                })
            })
        });

        describe('/articles', () => {
            describe('GET', () => {
                it('Status 200: responds with an article object', () => {
                    return request(app)
                    .get('/api/articles/1')
                    .expect(200)
                    .then(res => {
                        expect(res.body.article).to.be.an('Object')
                        expect(res.body.article).to.contain.keys(
                            "author",
                            "title",
                            "body",
                            "article_id",
                            "topic",
                            "created_at",
                            "votes",
                            "comment_count"
                            );
                            expect(res.body.article.comment_count).to.eql('13');
                    })
                });
                it('Status 404: responds when article id doesnt exist', () => {
                    return request(app)
                    .get('/api/articles/567876')
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.eql({msg: 'Path not found'});
                    })
                })
            });
            describe('PATCH', () => {
                it('Status 200: responds with the updated article including new votes', () => {
                    return request(app)
                    .patch('/api/articles/1')
                    .send({inc_votes: 42})
                    .expect(200)
                    .then(({body : {article}}) => {
                        expect(article.votes).to.eql(142);
                        expect(article.votes).to.not.eql(100);

                    })
                });
                it('Status 404: when article id does not exist', () => {
                    return request(app)
                    .patch('/api/articles/9564')
                    .send({inc_votes: 42})
                    .expect(404)
                    .then(res => {
                        expect(res.body).to.eql({msg: 'Path not found'})
                    })
                })
            });
            describe('POST', () => {
                describe('/:article_id/comments', () => {
                    it('POST: Status 201: responds with correct created comment', () => {
                        return request(app)
                        .post('/api/articles/1/comments')
                        .send({username: 'lurker',
                               body:'I like brie, its my fave cheese'})
                        .expect(201)
                        .then(({body: {comment}}) => {
                            expect(comment.body).to.eql('I like brie, its my fave cheese');
                            expect(comment.author).to.eql('lurker');
                            expect(comment.body).to.not.eql('Cheddar is superior');
                        })
                    })
                    it('STATUS 404: article not found', () => {
                        return request(app)
                        .post('/api/articles/789542/comments')
                        .send({username: 'lurker',
                        body:'I like brie, its my fave cheese'})
                        .expect(404)
                        .then(res => {
                            
                            expect(res.body).to.eql({msg: 'article not found'})
                        })
                    });
                    describe('GET /:article_id/comments', () => {
                        it('Staus 200: responds with an array of all comments by article_id', () => {
                           return request(app)
                           .get('/api/articles/5/comments')
                           .expect(200)
                           .then(({body: {comments}}) => {
                               expect(comments[0]).to.have.keys(
                                   'comment_id',
                                   'votes',
                                   'created_at',
                                   'author',
                                   'body'
                               );
                               expect(comments).to.have.lengthOf(2);
                               
                           });
                        
                        });
                        it("Status 200: returns an array of empty comments if the article exists but there are no comments", () => {
                            return request(app)
                            .get("/api/articles/2/comments")
                            .expect(200)
                            .then(({body:{comments}})=>{
                              expect(comments).to.eql([])
                            })
                        })
                        it('Status 200: accepts queries and sorts by them', () => {
                            return request(app)
                            .get('/api/articles/5/comments?sort_by=votes')
                            .expect(200)
                            .then(({body: {comments}}) => {
                                expect(comments).to.be.sortedBy('votes');
                                expect(comments[0].author).to.eql('butter_bridge')
                            });

                        });
                        it('Status 200: accepts quieries and order and sorts by them', () => {
                            return request(app)
                            .get('/api/articles/5/comments?sort_by=votes&&order=asc')
                            .expect(200)
                            .then(({body: {comments}}) => {
                                expect(comments).to.be.sortedBy('votes');
                                expect(comments[1].votes).to.eql(16)
                            });

                        })
                        
                 
                     });

                     

                })
            });
            describe('allArticles /api/articles', () => {
                describe('GET', () => {
                    it('Status 200: responds with an array of article objects', () => {
                        return request(app)
                        .get('/api/articles')
                        .expect(200)
                        .then(({body: {articles}} )=> {
                            expect(articles[0]).to.have.keys(
                                'author',
                                'title',
                                'created_at',
                                'topic',
                                'article_id',
                                'votes',
                                'comment_count'
                            );
                            expect(articles).to.have.lengthOf(12)
                        })
                    });
                    it('Status 200: default sort_by created_at descending', () => {
                        return request(app)
                        .get('/api/articles')
                        .expect(200)
                        .then(({body: {articles}}) => {
                            expect(articles).to.be.descendingBy('created_at')
                        })

                    })
                    it('Status 200: Accepts queries and correctly sorts by them', () => {
                        return request(app)
                        .get('/api/articles?sort_by=author')
                        .expect(200)
                        .then(({body: {articles}}) => {
                            expect(articles).to.be.descendingBy('author')
                        })

                    });
                    it('Status 404: Path not found', () => {
                        return request(app)
                        .get('/api/articlezzzzz')
                        .expect(404)
                        .then(({body:{msg}}) => {
                            expect(msg).to.eql('Path not found')
                        })
                    })
                    it('Status 400: Bad request, column not found', () => {
                        return request(app)
                        .get('/api/articles?sort_by=bobismydogandheiscool')
                        .expect(400)
                        .then(({body:{msg}}) => {
                            expect(msg).to.eql('Bad Request')
                        })
                    })
                })
                
            });

            describe('/api/comments/:comment_id', () => {
                describe('PATCH', () => {
                    it('Status 200: responds with updated updated comment', () => {
                    return request(app)
                    .patch('/api/comments/1')
                    .send({inc_votes: 54})
                    .expect(200)
                    .then(({body : {comment}}) => {
                        expect(comment.votes).to.eql(70);
                        expect(comment.votes).to.not.eql(100);

                    })

  
                    })
                })
                describe('DELETE', () => {
                    it('Status 204: No content deleted comment by id', () => {
                        return request(app)
                        .delete('/api/comments/1')
                        .expect(204);
                    });
                    it('Status 404: not found, when passed a comment_id that does not exist', () => {
                        return request(app)
                        .delete('/api/comments/1')
                        .expect(404)
                        .then(({body:{msg}}) => {
                        expect(msg).to.eql('Path not found')
                        })
                    })
                })

            })



        });
        


    })