'use strict';
var request = require('supertest'),
    assert = require('assert'),
    mongoose = require('mongoose'),
    _model = require('../models/model').model,
    app = require('../../../config/express'),
    mongooseConfig = require('../../../config/mongoose'),
    Model = mongoose.model(_model);

var item,
    token;

describe(_model + ' mongodb connect', function () {

    it('connected..', function (done) {
        mongooseConfig.connection(function () {
            done();
        });
    });

});

describe(_model + ' CRUD routes tests', function () {

    before(function (done) {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJ0ZXN0IiwibGFzdE5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsInByb2ZpbGVJbWFnZVVSTCI6Imh0dHA6Ly9yZXMuY2xvdWRpbmFyeS5jb20vaGZsdmxhdjA0L2ltYWdlL3VwbG9hZC92MTQ4NzgzNDE4Ny9nM2h3eWllYjdkbDd1Z2RnajN0Yi5wbmciLCJyb2xlcyI6WyJ1c2VyIl0sIl9pZCI6IjVhZDk3MGM3NTQwY2RiMDY1MDkzYTYyYSIsInVzZXJuYW1lIjoidGVzdCIsImNyZWF0ZWQiOiIyMDE4LTA0LTIwVDA0OjQ3OjAzLjY3MloiLCJwcm92aWRlciI6ImxvY2FsIiwiZGlzcGxheU5hbWUiOiJ0ZXN0IHRlc3QiLCJfX3YiOjAsImxvZ2luVG9rZW4iOiIifQ.pclJ4vdoEdU81Or3cTX_fN-WEsGP2gALU1JJSbJt5w4';
        item = {
            shop: {
                _id: '999999',
                name: 'ร้านกาแฟ'
            },
            items: [
                {
                    product: [
                        {
                            _id: '1',
                            name: 'คาปูชิโน',
                            price: 50
                        }
                    ],
                    qty: 1,
                    amount: 50
                }
            ],
            updated: '2018-04-03T07:00:43.297Z',
            createby: {
                _id: '5ad970c7540cdb065093a62a',
                username: 'test',
                displayName: 'test test'
            },
            updateby: {
                _id: '5ad970c7540cdb065093a62a',
                username: 'test',
                displayName: 'test test'
            }
        };
        done();
    });

    it('should be ' + _model + ' get', function (done) {

        request(app)
            .get('/api/' + _model)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 400);
                assert.equal(resp.data.length, 0);
                done();
            });

    });

    it('should be ' + _model + ' get by id', function (done) {

        request(app)
            .post('/api/' + _model)
            .set('Authorization', 'Bearer ' + token)
            .send(item)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/' + _model + '/' + resp.data._id)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.shop._id, item.shop._id);
                        assert.equal(resp.data.shop.name, item.shop.name);
                        assert.equal(resp.data.items[0].product[0]._id, item.items[0].product[0]._id);
                        assert.equal(resp.data.items[0].product[0].name, item.items[0].product[0].name);
                        assert.equal(resp.data.items[0].product[0].price, item.items[0].product[0].price);
                        assert.equal(resp.data.items[0].qty, item.items[0].qty);
                        assert.equal(resp.data.items[0].amount, item.items[0].amount);
                        assert.equal(resp.data.updated, item.updated);
                        assert.equal(resp.data.createby._id, item.createby._id);
                        assert.equal(resp.data.createby.username, item.createby.username);
                        assert.equal(resp.data.createby.displayName, item.createby.displayName);
                        assert.equal(resp.data.updateby._id, item.updateby._id);
                        assert.equal(resp.data.updateby.username, item.updateby.username);
                        assert.equal(resp.data.updateby.displayName, item.updateby.displayName);
                        done();
                    });
            });

    });

    it('should be ' + _model + ' post use token', function (done) {

        request(app)
            .post('/api/' + _model)
            .set('Authorization', 'Bearer ' + token)
            .send(item)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.shop._id, item.shop._id);
                assert.equal(resp.data.shop.name, item.shop.name);
                assert.equal(resp.data.items[0].product[0]._id, item.items[0].product[0]._id);
                assert.equal(resp.data.items[0].product[0].name, item.items[0].product[0].name);
                assert.equal(resp.data.items[0].product[0].price, item.items[0].product[0].price);
                assert.equal(resp.data.items[0].qty, item.items[0].qty);
                assert.equal(resp.data.items[0].amount, item.items[0].amount);
                assert.equal(resp.data.updated, item.updated);
                assert.equal(resp.data.createby._id, item.createby._id);
                assert.equal(resp.data.createby.username, item.createby.username);
                assert.equal(resp.data.createby.displayName, item.createby.displayName);
                assert.equal(resp.data.updateby._id, item.updateby._id);
                assert.equal(resp.data.updateby.username, item.updateby.username);
                assert.equal(resp.data.updateby.displayName, item.updateby.displayName);
                done();
            });

    });

    it('should be ' + _model + ' put use token', function (done) {

        request(app)
            .post('/api/' + _model)
            .set('Authorization', 'Bearer ' + token)
            .send(item)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    items: [
                        {
                            product: [
                                {
                                    _id: '2',
                                    name: 'โกโก้ปั่น',
                                    price: 60
                                }
                            ],
                            qty: 1,
                            amount: 60
                        }
                    ]
                };
                request(app)
                    .put('/api/' + _model + '/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.items[0].product[0]._id, update.items[0].product[0]._id);
                        assert.equal(resp.data.items[0].product[0].name, update.items[0].product[0].name);
                        assert.equal(resp.data.items[0].product[0].price, update.items[0].product[0].price);
                        assert.equal(resp.data.items[0].qty, update.items[0].qty);
                        assert.equal(resp.data.items[0].amount, update.items[0].amount);
                        done();
                    });
            });

    });

    it('should be ' + _model + ' delete use token', function (done) {

        request(app)
            .post('/api/' + _model)
            .set('Authorization', 'Bearer ' + token)
            .send(item)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/' + _model + '/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be ' + _model + ' post not use token', function (done) {

        request(app)
            .post('/api/' + _model)
            .send(item)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be ' + _model + ' put not use token', function (done) {

        request(app)
            .post('/api/' + _model)
            .set('Authorization', 'Bearer ' + token)
            .send(item)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    items: [
                        {
                            product: [
                                {
                                    _id: '2',
                                    name: 'โกโก้ปั่น',
                                    price: 60
                                }
                            ],
                            qty: 1,
                            amount: 60
                        }
                    ]
                };
                request(app)
                    .put('/api/' + _model + '/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be ' + _model + ' delete not use token', function (done) {

        request(app)
            .post('/api/' + _model)
            .set('Authorization', 'Bearer ' + token)
            .send(item)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/' + _model + '/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Model.remove().exec(done);
    });

});

describe(_model + ' mongodb disconnect', function () {

    it('disconnected..', function (done) {
        mongooseConfig.dropDatabase(function () {
            mongooseConfig.disconnect(done);
        });
    });

});