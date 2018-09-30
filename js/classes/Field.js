import GameItem from './GameItem.js'

function Field(size) {
    this.htmlElemnt = document.getElementById('playfield');//элемент в вёрстке
    this.size = size;//размер стороны поля
    this.elements = [];//массив массивов с объектами GameItem
}

//метод обновления состояния поля
Field.prototype.refresh = function () {
    var self = this;
    var HTML = '';

    var oldEllements = self.htmlElemnt.getElementsByClassName('thing');

    while (oldEllements[0]){
        oldEllements[0].parentNode.removeChild(oldEllements[0]);
    }

    self.elements.forEach(function (item) {
        HTML += '<div class="thing t' + item.value + '" style="top: ' + item.position.vertical + 'px; left: ' +
            item.position.horizontal + 'px;"></div>';
    });

    self.htmlElemnt.innerHTML += HTML;
};

Field.prototype.insertElement = function (element, callback) {
    this.elements.push(element);
    if(callback != undefined){
        callback();
    }
};

//возвращает позицию случайно клетки поля, доступной для заполнения
Field.prototype.getRandomFreeCell = function () {
    var self = this;
    var result;

    var randomNumberHoriz = parseInt(Math.random() * 10 % 4);
    var randomNumberVert = parseInt(Math.random() * 10 % 4);

   if(self.elements.length == 0){
       result = {
           horizontal: 100 * randomNumberHoriz,
           vertical: 100 * randomNumberVert
       }
   } else {
       for(var i = 0; i < self.elements.length; i++){
           var item = self.elements[i];
           if(item.position.vertical == 100 * randomNumberVert && item.position.horizontal == 100 * randomNumberHoriz){
               return self.getRandomFreeCell();
           }
       }
       result = {
           horizontal: 100 * randomNumberHoriz,
           vertical: 100 * randomNumberVert
       }
   }

   return result;
};

//есть ли свободные клетки на поле?
Field.prototype.isFreeCells = function () {
    return this.elements.length !== Math.pow(this.size, 2);
};

//метод добавления нового элемента на поле
Field.prototype.addElement = function () {
    var self = this;

    if (self.isFreeCells()) {
        var probability = Math.random();
        if (probability < 0.9) {
            self.insertElement(new GameItem(2, self.getRandomFreeCell()), function () {
                self.refresh();
            });
        } else {
            self.insertElement(new GameItem(4, self.getRandomFreeCell()), function () {
                self.refresh();
            });
        }
    }
};

//проверяет свободна ли клетка
Field.prototype.isCellFree = function (position) {
    var self = this;
    var result = true;

    self.elements.forEach(function (item) {
        if(!item.merged){
            if(item.position.vertical == position.vertical && item.position.horizontal == position.horizontal){
                result = false;
            }
        }
    });

    return result;
};

Field.prototype.getElementByPosition = function (position) {
    var self = this;
    var result = null;

    self.elements.forEach(function (element) {
        if(element.position.horizontal == position.horizontal && element.position.vertical == position.vertical){
            result = element;
        }
    });

    return result;
};

export default Field;