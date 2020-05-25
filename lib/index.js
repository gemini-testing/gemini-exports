'use strict';

const _ = require('lodash');
const suiteController = require('./suiteController');

module.exports = gemini => {
    gemini.on(gemini.events.AFTER_FILE_READ, path => {
        const obj = require(path);
        const suite = obj && obj.__esModule ? obj.default : obj;

        if (_.keys(suite).length) {
            try {
                suiteController.createSuite(suite);
            } catch (e) {
                e.message = [
                    "Error creating suite from file: ",
                    path,
                    e.message,
                ].join("\n");
                throw e;
            }
        }
    });
};
