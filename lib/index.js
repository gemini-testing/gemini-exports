'use strict';

const _ = require('lodash');
const suiteController = require('./suiteController');

module.exports = gemini => {
    gemini.on(gemini.events.AFTER_FILE_READ, path => {
        const obj = require(path);
        const suite = obj && obj.default ? obj.default : obj;

        if (_.keys(suite).length) {
            suiteController.createSuite(suite);
        }
    });
};
