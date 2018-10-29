import constants from "../lib/constants";

var id = 0;

function GameItem (value, position) {
    this.value = value;//номинал элемента
    this.position = {//объект с координатами элемента
        vertical: position.vertical,
        horizontal: position.horizontal
    };
    this.htmlElement;
    this.id = id;
    id += 1;
}

GameItem.prototype.move = function (position) {
    this.htmlElemnt = document.getElementById(this.id);
    this.position.horizontal = position.horizontal;
    this.position.vertical = position.vertical;

    var self = this;

    $(self.htmlElemnt).animate({
        left: self.position.horizontal + 'px',
        top: self.position.vertical + 'px'
    }, constants.GAME_ITEM_MOVE_DURATION);
};

GameItem.prototype.setValue = function (value) {
    this.value =  value;
};

export default GameItem;