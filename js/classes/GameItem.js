var id = 0;

function GameItem (value, position) {
    this.htmlElemnt;//элемент в вёрстке
    this.value = value;//номинал элемента
    this.position = {//объект с координатами элемента
        vertical: position.vertical,
        horizontal: position.horizontal
    };
    this.id = id;
    id += 1;
}

GameItem.prototype.move = function (vertical, horizontal, callback) {
    this.position.horizontal += horizontal;
    this.position.vertical += vertical;
    if(this.position.horizontal > 300){
        this.position.horizontal = 300;
    }
    if(this.position.horizontal < 0){
        this.position.horizontal = 0;
    }
    if(this.position.vertical > 300){
        this.position.vertical = 300;
    }
    if(this.position.vertical < 0){
        this.position.vertical = 0;
    }
    if(callback !== undefined){
        callback();
    }
};

GameItem.prototype.setValue = function (value) {
    this.value =  value;
};

export default GameItem;