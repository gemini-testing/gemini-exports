'use strict';

const url = require('url');
const _ = require('lodash');
const assert = require('assert');
const extendedActions = require('./extendedActions');

module.exports = {

    logout: function() {
        return (actions, find) => {
            extendedActions.deleteCookie.call(actions, 'Session_id');
        };
    },

    addAuth: function(suite, options) {
        suite
            .before(authAction(options))
            .after(this.logout())
    }
};

function authAction(options) {
    return (actions, find) => {
        authorize.call(actions, options.login, options.password, options.url || '/');
    };
}

function authorize(login, password, url) {
    assert(login && _.isString(login), 'login should be non-empty string');
    assert(password && _.isString(password), 'password should be non-empty string');

    this._pushAction(authorize, function get(browser) {
        return browser
            .open(authRequest(login, password))
            .then(() => browser.openRelative(url));
    });

    return this;
}

/**
 * Функция формирует URL для авторизации
 *
 * @param {String} login -- логин пользователя
 * @param {String} password -- пароль пользователя
 * @param {String} passportHost -- логин пользователя
 *
 * @returns {String} строковое представление URL для авторизации;
 */
function authRequest(login, password, passportHost='https://passport.yandex.ru/passport') {
    return url.format({
        protocol: 'http',
        host: 'aqua.yandex-team.ru',
        pathname: 'auth.html',
        query: {
            mode: 'auth',
            login: login,
            passwd: password,
            host: passportHost
        }
    })
}
