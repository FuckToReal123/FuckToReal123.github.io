var randomInt = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
};

var functions = {
    randomInt: randomInt
};

export default functions;