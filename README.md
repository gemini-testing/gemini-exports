Gemini Exports
=======

## Index

- [Description](https://github.yandex-team.ru/market/gemini-exports#description)
- [Using](https://github.yandex-team.ru/market/gemini-exports#using)
- [Nested Suites](https://github.yandex-team.ru/market/gemini-exports#nested-suites)
- [Suite Declaration](https://github.yandex-team.ru/market/gemini-exports#suite-declaration)

## Description
Плагин для [Gemini](https://github.com/gemini-testing/gemini/), реализующий поддержку интерфейса exports для тестов: вместо обращения к API Gemini, файл теста может экспортировать объект-декларацию.
 
 Интерфейс обратносовместим со стандартными сценариями, использующими API Gemini. Это позволяет распологать файлы тестов, использующих различные интерфейсы, в одной директории.

## Using
Просто экспортируй декларацию кейса, а плагин сформирует из неё тест-сьют:

```js
module.exports = {
    suiteName: 'My Suite',
    selector: '.my-block',
    url: '/pathname',
    capture(actions, find) {
        actions.click(find('.my-block__elem'));
    }
}
```

Эквивалентно:

```js
gemini.suite('My Suite', (suite) => {
    suite
        .setUrl('/pathname')
        .setCaptureElements('.my-block')
        .capture((actions, find) => {
            actions.click(find('.my-block__elem'));
        });
});
```
## Nested Suites
Интерфейс поддерживает декларацию дочерниих сьютов.
Дочерние сьюты наследуют значения полей `url` и `selector`, которые могут быть переопределены.
Также наследуются хуки `before` и `after`, но при указании их в дочернем сьюте они будут дополнены, а не переопределены.
 
Пример использования:
```js
module.exports = {
    // Не будет выполнено никаких действий, потому что нет capture
    suiteName: 'Parent suite',
    url: '/some/path',
    selector: '.selector1',
    before(actions, find) {
        // ...
    },
    after(actions, find) {
        // ...
    },
    childSuites: [
        {
            suiteName: 'Child suite #1',
            // переопределяет url; selector наследуется из родительского
            url: '/another/path',
            // Порядок выполнения: сначала родительский блок before, потом свой
            before(actions, find) {
                // ...
            },
            // Порядок выполнения: сначала свой блок after, потом родительский
            after(actions, find) {
                // ...
            },
            capture() {}
        },
        {
            suiteName: 'Child suite #2',
            // переопределяет selector; url наследуется из родительского
            selector: '.selector2',
            // будут выполнены родительские блоки before (до capture) и after(после capture)
            capture() {}
        }
    ]
};
```

## Suite Declaration:
Описание ключей декларации:

##### `{string} suiteName`
Имя сьюта.

___

##### `{string[]|string} [selector]`
Селектор DOM-элемента или массив селекторов, скриншоты которых будут проверяться.

**По-умолчанию:** `'*'` вся страница.

___

##### `{URL|string} [url]`
URL для открытия.

**По-умолчанию:** `'/'`.

___

##### `{string[]|string} [ignore]`
Селектор DOM-элемента или массив селекторов, которые будут проигнорированы при сравнении.

___

##### `{Function} [before]`
Функция, выполняющаяся до выполнения `capture`, но после открытия страницы, указанной в `url`.

___

##### `{Function|Object} [capture]`
Функция capture, на случай если стандартная не устраивает. Если передан объект, то ключ это название (например "plain"), а значение это функция для capture.

___

##### `{Function} [after]`
Функция, выполняющаяся после выполнения `capture`.

___

##### `{Object[]} [childSuites]`
Массив дочерних сьютов.

___

##### `{string[]|string|RegExp} [browsers]`
Запускать тесты только в определенных браузерах.

___

##### `{boolean|Object|Object[]} [skip]`
Выключает тест.

___

##### `{string|RegExp} [skip.browser]`
Выключает тест для указанных браузеров.

**По-умолчанию:** `/.*/`.

___

##### `{string} [skip.reason]`
Позволяет указать причину выключения теста.

___
