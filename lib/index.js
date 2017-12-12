'use strict';

const _ = require('lodash');
const suiteController = require('./suiteController');

module.exports = gemini => {
    gemini.on(gemini.events.AFTER_FILE_READ, path => {
        const suite = require(path);

        if (_.keys(suite).length) {
            suiteController.createSuite(suite);
        }
    });
};
