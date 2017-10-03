Gemini Exports
=======

## Index

- [Description](https://github.yandex-team.ru/market/gemini-exports#description)
- [Using](https://github.yandex-team.ru/market/gemini-exports#using)
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

## Suite Declaration:
Описание ключей декларации:

##### `{string[]|string} selector`
Селектор DOM-элемента или массив селекторов, скриншоты которых будут проверяться.

___

##### `{string} [suiteName]`
Имя сьюта.

**По-умолчанию:** Путь к файлу сьюта относительно рабочей директории.

___

##### `{URL|string} [url]`
URL для открытия.

**По-умолчанию:** `'/'`.

___

##### `{string[]|string} [ignore]`
Селектор DOM-элемента или массив селекторов, которые будут проигнорированы при сравнении.

___

##### `{Function|Object} [capture]`
Функция capture, на случай если стандартная не устраивает. Если передан объект, то ключ это название (например "plain"), а значение это функция для capture.

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
