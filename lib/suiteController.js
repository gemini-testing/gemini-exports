'use strict';

const url = require('url');
const queryString = require('querystring');
const path = require('path');
const _ = require('lodash');

module.exports = {
    /**
     * @param {TestSuiteOptions} options
     * @param {string} suitePath
     *
     */
    createSuite(options, suitePath) {
        let {pathname, query} = url.parse(options.path || '/');
        let {
            suiteName = path.relative('.', suitePath),
            expFlags,
        } = options;

        if (_.size(expFlags)) {
            query = _.merge(queryString.parse(query), {exp_flags: expFlags});

            suiteName += this._buildSuiteName(expFlags);
        }

        global.gemini.suite(suiteName, suite => {
            suite
                .setUrl(url.format({pathname, query}))
                .setCaptureElements(options.selector);

            if (_.isFunction(options.capture)) {
                suite.capture('plain', options.capture);
            } else if (_.isObject(options.capture)) {
                _.each(options.capture, key => suite.capture(key, options.capture[key]));
            } else {
                suite.capture('plain');
            }

            if (options.ignore) {
                suite.ignoreElements(options.ignore);
            }

            if (options.skip) {
                _.each(options.skip, skip => suite.skip(skip.browser || /.*/, skip.reason));
            }

            if (options.browsers) {
                suite.browsers(options.browsers);
            }
        });
    },

    _buildSuiteName(expFlags) {
        const flags = _.each(expFlags, flag => flag.replace(/[^\w\/-]/g, '_')).join(', ');

        return ` | With flag${_.size(expFlags) > 1 ? 's' : ''}: ${flags}`;
    }
};

/**
 * Декларация тест-сьюта.
 *
 * @typedef {Object} TestSuiteOptions
 * @property {string[]|string} selector Селектор DOM ноды, скриншоты которой будет проверяться.
 * @property {String} [suiteName] Имя сьюта. По умолчанию именем является путь к файлу сьюта относительно рабочей директории.
 * @property {string} [path='/'] Путь URL для открытия.
 * @property {string[]|string} [ignore] Селектор DOM ноды, которая будет проигнорирована при сравнении.
 * @property {Function|Object} [capture] Функция capture, на случай если стандартная не устраивает.
 *                                       Если передан объект, то ключ это название (например "plain"),
 *                                       а значение это функция для capture.
 * @property {string[]|string} [expFlags] Флаг эксперимента, или список флагов.
 * @property {string[]|string|RegExp} [browsers] Запускать тесты только в определенных браузерах.
 * @property {boolean|Object|Object[]} [skip] Выключает тест.
 * @property {string|RegExp} [skip.browser] Выключает тест для указанных браузеров.
 * @property {string} [skip.reason] Позволяет указать причину выключения теста.
 */
