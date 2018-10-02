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

Field.prototype.insertElement = function (element) {
    this.elements.push(element);
};

//возвращает позицию случайно клетки поля, доступной для заполнения
Field.prototype.getRandomFreeCell = function () {
    var self = this;
    var avalibleCells = [];

    var gameItemSize = 100;

   for(var i = 0; i < self.size; i++) {
       for(var j = 0; j < self.size; j++) {
           var checkedPosition = {
               vertical: i * gameItemSize,
               horizontal: j * gameItemSize
           };
           if(self.isCellFree(checkedPosition)){
              avalibleCells.push(checkedPosition);
           }
       }
   }

   var randomNumber = parseInt(Math.random() * gameItemSize % avalibleCells.length);

   return avalibleCells[randomNumber];
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
            self.insertElement(new GameItem(2, self.getRandomFreeCell()));
        } else {
            self.insertElement(new GameItem(4, self.getRandomFreeCell()));
        }
        self.refresh();
    }
};

//проверяет свободна ли клетка
Field.prototype.isCellFree = function (position) {
    var self = this;
    var result = true;
    
    if(self.getElementByPosition(position)){
        result = false;
    }

    return result;
};

Field.prototype.getElementByPosition = function (position) {
    var self = this;
    var result = null;

    result = self.elements.find(function (element) {
        return !element.merged && (element.position.vertical == position.vertical && element.position.horizontal == position.horizontal)
    });

    return result;
};

export default Field;