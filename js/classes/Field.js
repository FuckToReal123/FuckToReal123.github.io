import GameItem from './GameItem.js';
import constants from '../lib/constants.js';
import functions from '../lib/functions.js';
import View from  "./View.js";

function Field(size) {
    this.size = size;//размер стороны поля
    this.elements = [];//массив массивов с объектами GameItem
}

//вставка нового элемента
Field.prototype.insertElement = function (element) {
    this.elements.push(element);
};

//возвращает позицию случайно клетки поля, доступной для заполнения
Field.prototype.getRandomFreeCell = function () {
    var self = this;
    var avalibleCells = [];

    var gameItemSize = constants.DEFAULT_GAME_ITEM_SIZE;

    for (var i = 0; i < self.size; i++) {
        for (var j = 0; j < self.size; j++) {
            var checkedPosition = {//проверяемая позиция
                vertical: i * gameItemSize,
                horizontal: j * gameItemSize
            };
            if (self.isCellFree(checkedPosition)) {//если позиция не занята
                avalibleCells.push(checkedPosition);
            }
        }
    }

    var randomNumber = functions.randomInt(0, avalibleCells.length - 1);//получаем случайный номер от 0 до длинны массива доступных ячеек

    return avalibleCells[randomNumber];//возвращаем случайную доступную ячейку
};

//есть ли свободные клетки на поле?
Field.prototype.isFreeCells = function () {
    return this.elements.length !== Math.pow(this.size, 2);
};

//метод добавления нового элемента на поле
Field.prototype.addElement = function () {
    var self = this;

    if (self.isFreeCells()) {//если есть свободные клетки
        var probability = Math.random();//определяем вероятность выпадения элемента с номиналом 4
        if (probability < 0.9) {//если вероятность меньше 9/10
            self.insertElement(new GameItem(2, self.getRandomFreeCell()));
        } else {//если вероятность больше либо равна 9/10
            self.insertElement(new GameItem(4, self.getRandomFreeCell()));
        }
    }
};

//проверяет свободна ли клетка
Field.prototype.isCellFree = function (position) {
    var self = this;
    var result = true;

    if (self.getElementByPosition(position)) {
        result = false;
    }

    return result;
};

//возвращает элемент с указанной позицией
Field.prototype.getElementByPosition = function (position) {
    var self = this;
    var result = null;

    result = self.elements.find(function (element) {
        return !element.merged && (element.position.vertical == position.vertical && element.position.horizontal == position.horizontal)
    });

    return result;
};

export default Field;