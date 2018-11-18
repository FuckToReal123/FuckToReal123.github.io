import View from  "./View.js"

var id = 0;

function GameItem (value, position) {
    this.value = value;//номинал элемента
    this.position = {//объект с координатами элемента
        vertical: position.vertical,
        horizontal: position.horizontal
    };
    this.id = id;
    id += 1;
}

GameItem.prototype.move = function (position) {
    this.position.horizontal = position.horizontal;
    this.position.vertical = position.vertical;

    var self = this;

    View.moveGameItem(self);
};

GameItem.prototype.setValue = function (value) {
    this.value =  value;
};

export default GameItem;