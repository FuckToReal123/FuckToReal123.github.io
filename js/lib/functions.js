import constants from "./constants";

var randomInt = function (min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
};

var functions = {
    randomInt: randomInt
};

export default functions;