'use strict';

const url = require('url');
const path = require('path');
const _ = require('lodash');
const assert = require('assert');

module.exports = {
    /**
     * @param {TestSuiteOptions} options
     */
    createSuite(options) {
        options = Object.create(options);

        assert(options.suiteName, 'suiteName should be non-empty');

        global.gemini.suite(options.suiteName, suite => {
            if (_.isObject(options.url)) {
                options.url = url.format(options.url);
            }

            suite
                .setUrl(options.url || '/')
                .setCaptureElements(options.selector ? options.selector : '*');

            if (_.isFunction(options.capture)) {
                suite.capture('plain', options.capture);
            } else if (_.isObject(options.capture)) {
                _.forEach(options.capture, (capture, key) => suite.capture(key, capture));
            }

            if (options.ignore) {
                suite.ignoreElements(options.ignore);
            }

            if (options.skip) {
                _.forEach(options.skip, skip => suite.skip(skip.browser || /.*/, skip.reason));
            }

            if (options.browsers) {
                suite.browsers(options.browsers);
            }

            _.forEach(options.childSuites, (childSuite) => {
                this.createSuite(_.assign(_.pick(options, ['url', 'selector']), childSuite));
            })
        });
    }
};

/**
 * Декларация тест-сьюта.
 *
 * @typedef {Object} TestSuiteOptions
 * @property {string[]|string} selector Селектор DOM ноды, скриншоты которой будет проверяться.
 * @property {string} [suiteName] Имя сьюта. По умолчанию именем является путь к файлу сьюта относительно рабочей директории.
 * @property {URL|string} [url='/'] URL для открытия.
 * @property {string[]|string} [ignore] Селектор DOM ноды, которая будет проигнорирована при сравнении.
 * @property {Function|Object} [capture] Функция capture, на случай если стандартная не устраивает.
 *                                       Если передан объект, то ключ это название (например "plain"),
 *                                       а значение это функция для capture.
 * @property {Object[]} [childSuites] Список дочерних сьютов.
 * @property {string[]|string|RegExp} [browsers] Запускать тесты только в определенных браузерах.
 * @property {boolean|Object|Object[]} [skip] Выключает тест.
 * @property {string|RegExp} [skip.browser] Выключает тест для указанных браузеров.
 * @property {string} [skip.reason] Позволяет указать причину выключения теста.
 */
