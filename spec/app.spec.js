const connection = require('../connection');
const app = require('../app');
const chai = require('chai');
const {expect} = chai;
const request = require('supertest');



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
        })
    })