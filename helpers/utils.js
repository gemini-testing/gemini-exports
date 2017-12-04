'use strict';

const url = require('url');
const _ = require('lodash');
const assert = require('assert');
const extendedActions = require('./extendedActions');

module.exports = {

    /**
     * Разлогин через удаление cookie
     */
    logout: function() {
        return (actions, find) => {
            extendedActions.deleteCookie.call(actions, 'Session_id');
        };
    },

    /**
     * Добавление авторизации в before и разлогина в after
     *
     * @param {Object} suite -- объект сьюта
     * @param {Object} options -- опции для логина
     * @param {Object} options.login -- логин пользователя
     * @param {Object} options.password -- пароль пользователя
     * @param {Object} options.url -- URL, который откроется после завершения авторизации
     */
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
 * @param {String} passportHost -- хост паспорта для авторизации
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
