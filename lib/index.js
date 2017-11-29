'use strict';

const _ = require('lodash');
const suiteController = require('./suiteController');
const actionsBuilder = require('gemini/lib/tests-api/actions-builder');

actionsBuilder.prototype.open =
    function(url) {
        this._pushAction(this.open, function open(browser) {
            return browser.open(url);
        });
        return this;
    };

module.exports = gemini => {
    gemini.on(gemini.events.AFTER_FILE_READ, path => {
        const suite = require(path);

        if (_.keys(suite).length) {
            _.defaults(suite, {'topUrl': gemini.config._configs.chrome.rootUrl});
            suiteController.createSuite(suite);
        }
    });
};
