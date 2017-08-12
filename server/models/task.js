'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TaskSchema = new Schema({
    name: {
        type: String,
        Required: 'Kindly enter the name of the task'
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'ongoing', 'completed']
        }],
        default: ['pending']
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    modified_date: {
        type: Date,
        default: Date.now
    },
}, {
    versionKey: false
});

module.exports = mongoose.model('Tasks', TaskSchema);