import Field from './Field.js';
import GameItem from "./GameItem";

function Controller(fieldSize) {
    this.field = new Field(fieldSize);
    this.moveVector = {//объект хранящий 4 bool значения: top, bottom, left, right
        top: false,
        bottom: false,
        right: false,
        left: false
    };
}

//смещает все элементы в направлении moveVector
Controller.prototype.moveElements = function (callback) {
    var self = this;

    var vertical = 0;
    var horizontal = 0;

    if(self.moveVector.top) {
        vertical -= 100;
    }
    if(self.moveVector.bottom) {
        vertical += 100;
    }
    if(self.moveVector.left) {
        horizontal -= 100;
    }
    if(self.moveVector.right) {
        horizontal += 100;
    }




    self.field.elements.forEach(function (element, number) {
        var position = {
            vertical: element.position.vertical + vertical,
            horizontal: element.position.horizontal + horizontal
        };


        while (self.field.isCellFree(position)) {
            element.move(vertical, horizontal);

            position.horizontal += horizontal;
            position.vertical += vertical;

            if(position.horizontal > 300){
                position.horizontal = 300;
            }
            if(position.horizontal < 0){
                position.horizontal = 0;
            }
            if(position.vertical > 300){
                position.vertical = 300;
            }
            if(position.vertical < 0){
                position.vertical = 0;
            }
        }

        if(!self.field.isCellFree(position)){
            var checkedElement = self.field.getElementByPosition(position);

            if(element.value == checkedElement.value && element.id != checkedElement.id){
                checkedElement.setValue(element.value * 2);
                element = null;
            }
        }
    });

    if(callback !== undefined){
        callback();
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

        console.log('X1:' + event.clientX);
        console.log('Y1:' + event.clientY);

    };

    window.onmouseup = function (event) {
        mouseEndHorizCoord = event.clientX;
        mouseEndVertCoord = event.clientY;

        console.log('X2:' + event.clientX);
        console.log('Y2:' + event.clientY);


        if(Math.abs(mouseStartHorizCoord - mouseEndHorizCoord) > 50 || Math.abs(mouseStartVertCoord - mouseEndVertCoord) > 50){
            self.getMoveVector(mouseStartHorizCoord, mouseEndHorizCoord, mouseStartVertCoord, mouseEndVertCoord, function () {
                self.moveElements(function () {
                    self.field.addElement();
                });
            });
        }
    };

    self.field.addElement();
};

//получает вектор направления движения
Controller.prototype.getMoveVector = function (horizStart, horizEnd, vertStart, vertEnd, callback) {
    var self = this;

    console.log(Math.abs(horizStart - horizEnd));
    console.log(Math.abs(vertStart - vertEnd));

    if(Math.abs(horizEnd - horizStart) > Math.abs(vertEnd - vertStart)){
        if(horizStart < horizEnd){
            console.log('право');
            self.moveVector.right = true;
            self.moveVector.top = false;
            self.moveVector.bottom = false;
            self.moveVector.left = false;
        } else {
            console.log('лево');
            self.moveVector.left = true;
            self.moveVector.bottom = false;
            self.moveVector.top = false;
            self.moveVector.right = false;
        }
    } else {
        if(vertStart < vertEnd){
            console.log('низ');
            self.moveVector.bottom = true;
            self.moveVector.right = false;
            self.moveVector.top = false;
            self.moveVector.left = false;
        } else {
            console.log('верх');
            self.moveVector.top = true;
            self.moveVector.left = false;
            self.moveVector.bottom = false;
            self.moveVector.right = false;
        }
    }
    console.log(self.moveVector);
    if(callback != undefined){
        callback();
    }
};

export default Controller;