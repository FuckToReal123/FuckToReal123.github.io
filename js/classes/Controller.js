import Field from './Field.js';

function Controller(fieldSize) {
    this.field = new Field(fieldSize);
    this.moveVector = {
        x: 0,
        y: 0,
        compareFunc: undefined
    };
}

Controller.prototype.validatePosition = function (position) {
    var result = {
        vertical: 0,
        horizontal: 0
    };

    var gameItemSize = 100;

    if(position.vertical > (this.field.size - 1) * gameItemSize){
        result.vertical = (this.field.size - 1) * gameItemSize;
    } else {
        if(position.vertical < 0){
            result.vertical = 0;
        } else {
            result.vertical = position.vertical;
        }
    }

    if(position.horizontal > (this.field.size - 1) * gameItemSize){
        result.horizontal = (this.field.size - 1) * gameItemSize
    } else {
        if(position.horizontal < 0){
            result.horizontal = 0;
        } else {
            result.horizontal = position.horizontal;
        }
    }


    return result;
};

Controller.prototype.isMoveAvalible = function (position) {
    var self = this;
    var validatedPosition = self.validatePosition(position);
    return self.field.isCellFree(position) && position.vertical == validatedPosition.vertical && position.horizontal == validatedPosition.horizontal;
};

//смещает все элементы в направлении moveVector
Controller.prototype.moveElements = function () {
    var self = this;

    var gameItemSize = 100;

    var vertical = self.moveVector.y * gameItemSize;
    var horizontal = self.moveVector.x * gameItemSize;

    var moves = 0;


    self.field.elements.sort(self.moveVector.compareFunc);

    self.field.elements.forEach(function (element, number, array) {
        var position = {
            vertical: element.position.vertical + vertical,
            horizontal: element.position.horizontal + horizontal
        };

        while (self.isMoveAvalible(position)) {
            moves += 1;

            position.vertical += vertical;
            position.horizontal += horizontal;
        }

        var checkedElement = self.field.getElementByPosition(self.validatePosition(position));

        if (!!checkedElement && element.value == checkedElement.value && element.id != checkedElement.id) {
            checkedElement.setValue(element.value * 2);

            var vertShift = self.moveVector.y == 0 ? 0 : gameItemSize / 2;
            var horizShift = self.moveVector.x == 0 ? 0 : gameItemSize / 2;

            var mergedPosition = {
                vertical: self.validatePosition(position).vertical - vertShift,
                horizontal: self.validatePosition(position).horizontal - horizShift
            };

            element.move(mergedPosition);
            array[number].merged = true;
            moves += 1;
        } else {
            var lastAvaliblePosition = {
                vertical: position.vertical - vertical,
                horizontal: position.horizontal - horizontal
            };
            element.move(self.validatePosition(lastAvaliblePosition));
        }
    });

    self.field.elements = self.field.elements.filter(function(element) { return !element.merged; });

    if(moves !== 0){
        self.field.addElement();
    } else {
        if(!this.field.isFreeCells()){
            alert('Game Over!');
        }
    }
};

Controller.prototype.init = function () {
    var self = this;

    var mouseStartHorizCoord = 0;
    var mouseStartVertCoord = 0;
    var mouseEndHorizCoord = 0;
    var mouseEndVertCoord = 0;

    window.onmousedown = function (event) {
        mouseStartHorizCoord = event.clientX;
        mouseStartVertCoord = event.clientY;
    };

    window.onmouseup = function (event) {
        mouseEndHorizCoord = event.clientX;
        mouseEndVertCoord = event.clientY;

        if(Math.abs(mouseStartHorizCoord - mouseEndHorizCoord) > 50 || Math.abs(mouseStartVertCoord - mouseEndVertCoord) > 50){
            self.getMoveVector(mouseStartHorizCoord, mouseEndHorizCoord, mouseStartVertCoord, mouseEndVertCoord);
            self.moveElements();
        }
    };

    self.field.addElement();
};

//получает вектор направления движения
Controller.prototype.getMoveVector = function (horizStart, horizEnd, vertStart, vertEnd) {
    var self = this;

    if(Math.abs(horizEnd - horizStart) > Math.abs(vertEnd - vertStart)){
        if(horizStart < horizEnd){
            self.moveVector.x = 1;
            self.moveVector.y = 0;
            self.moveVector.compareFunc = function (el1, el2) {
                return el2.position.horizontal - el1.position.horizontal;
            };
        } else {
            self.moveVector.x = -1;
            self.moveVector.y = 0;
            self.moveVector.compareFunc = function (el1, el2) {
                return el1.position.horizontal - el2.position.horizontal;
            };
        }
    } else {
        if(vertStart < vertEnd){
            self.moveVector.x = 0;
            self.moveVector.y = 1;
            self.moveVector.compareFunc = function (el1, el2) {
                return el2.position.vertical - el1.position.vertical;
            };
        } else {
            self.moveVector.x = 0;
            self.moveVector.y = -1;
            self.moveVector.compareFunc = function (el1, el2) {
                return el1.position.vertical - el2.position.vertical;
            };
        }
    }
};

export default Controller;