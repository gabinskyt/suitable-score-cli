"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;
var _data = require("./lib/config/data.config");
var _dataPath = require("./lib/config/data-path.model");
var _suitabilityScore = require("./suitability-score/suitability-score.module");
/**
 * Setups the CLI and executes the app
 */
var App = function App() {
  (0, _data.setupData)().then(function (dataPath) {
    var suitabilityScoreModule = new _suitabilityScore.SuitabilityScoreModule({
      injectables: [{
        provide: _dataPath.DataPath,
        useValue: dataPath
      }]
    });
    suitabilityScoreModule.controllers.SuitabilityScoreController.getSuitabilityScoreList();
  });
};
exports.App = App;