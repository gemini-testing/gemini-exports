'use strict';

const _ = require('lodash');
const assert = require('assert');

/**
 * Вызов всех методов должен осуществляться в контексте объекта actions
 */
module.exports = {
    /**
     * Удаляет cookie с указанным именем
     *
     * @param {String} name -- название удаляемой cookie
     */
    deleteCookie: function (name) {
        assert(name && _.isString(name), 'Cookie\'s name should be non-empty string');

        this._pushAction(this.deleteCookie, function (browser) {
            return browser._wd.deleteCookie(name);
        });
        return this;
    },

    /**
     * Открывает страницу с указанным URL
     *
     * @param {String} url -- строковое представление URL, который нужно открыть
     */
    open: function (url) {
        assert(url && _.isString(url), 'Cookie\'s name should be non-empty string');

        this._pushAction(this.open, function (browser) {
            return browser.open(url);
        });
        return this;
    },

    /**
     * Открывает страницу с указанным URL, относительно rootUrl (из конфига browser)
     *
     * @param {String} url -- строковое представление URL, который нужно открыть
     */
    openRelative: function (url) {
        assert(url && _.isString(url), 'Cookie\'s name should be non-empty string');

        this._pushAction(open, function (browser) {
            return browser.openRelative(url);
        });
        return this;
    }
}
