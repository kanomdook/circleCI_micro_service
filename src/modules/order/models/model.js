'use strict';

var Model = "Order";
exports.model = Model;

// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ModelSchema = new Schema({
    docno: {
        type: String,
        default: new Date().getTime()
    },
    docdate: {
        type: Date,
        default: Date.now
    },
    shop: {
        type: {
            _id: String,
            name: String
        }
    },
    items: {
        type: [{
            product: {
                type: [{
                    _id: String,
                    name: String,
                    price: Number
                }]
            },
            qty: Number,
            amount: Number
        }]
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayName: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayName: {
            type: String
        }
    }
});

mongoose.model(Model, ModelSchema);