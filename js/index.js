import Controller from './classes/Controller.js';
import constants from './lib/constants.js'

var defaultGameFieldSize = constants.DEFAULT_GAME_FIELD_SIZE;

var controller = new Controller(defaultGameFieldSize);

controller.init();