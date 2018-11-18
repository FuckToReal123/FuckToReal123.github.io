import constants from "../lib/constants";

//применяем синглтон
var View = (function () {
    var instance;//экземпляр класса

    var refreshField =  function (field) {
        var fieldHtmlElement = document.getElementById(constants.GAME_FIELD_HTML_CLASS);
        var HTML = '';

        setTimeout(function () {
            var oldEllements = fieldHtmlElement.getElementsByClassName(constants.GAME_ITEM_HTML_CLASS);//выбираем все старые элементы

            while (oldEllements[0]) {
                oldEllements[0].parentNode.removeChild(oldEllements[0]);//удаляем старые элементы, не затрагивая подложку
            }

            field.elements.forEach(function (item) {//заполняем поле новыми элементами
                HTML += '<div class="' + constants.GAME_ITEM_HTML_CLASS + ' t' + item.value + '" id="' + item.id + '" style="top: ' + item.position.vertical + 'px; left: ' +
                    item.position.horizontal + 'px;"></div>';
            });

            fieldHtmlElement.innerHTML += HTML;
        }, constants.GAME_FIELD_REFRESH_DURATION);

    };

    var moveGameItem = function (gameItem) {
        var gameItemHtmlElement = document.getElementById(gameItem.id);

        $(gameItemHtmlElement).animate({
            left: gameItem.position.horizontal + 'px',
            top: gameItem.position.vertical + 'px'
        }, constants.GAME_ITEM_MOVE_DURATION);
    };

    var createInstance = function () { //создаём экземпляр класса
        return {
            refreshField: refreshField,
            moveGameItem: moveGameItem
        }
    };

    return {
        getInstance: function () {// если экземпляр создан, то возврааем его иначе создаём новый и возвращаем
            return instance || (instance = createInstance());
        }
    }
})();

export default View;