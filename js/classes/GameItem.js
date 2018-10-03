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

GameItem.prototype.move = function (vertical, horizontal) {
    this.position.horizontal += horizontal;
    this.position.vertical += vertical;
};

GameItem.prototype.setValue = function (value) {
    this.value =  value;
};

export default GameItem;