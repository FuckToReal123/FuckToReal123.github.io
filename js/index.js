import Controller from './classes/Controller.js';
import constants from './lib/constants.js'

var controller = new Controller(constants.DEFAULT_GAME_FIELD_SIZE);

controller.init();