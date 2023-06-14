"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setupData = void 0;
var _readline = require("readline");
var _dataPath = require("./data-path.model");
/**
 * Initial setup for getting the file directories
 * 
 * @returns {Promise<DataPath>} dataPath
 */
var setupData = function setupData() {
  var inputReader = (0, _readline.createInterface)({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(function (resolve) {
    return inputReader.question('Insert shipment destination list directory: ', function (shipmentDestinationListPath) {
      return resolve(shipmentDestinationListPath);
    });
  }).then(function (shipmentDestinationListPath) {
    return new Promise(function (resolve) {
      return inputReader.question('Insert driver list directory: ', function (driverListPath) {
        return resolve({
          shipmentDestinationListPath: shipmentDestinationListPath,
          driverListPath: driverListPath
        });
      });
    });
  }).then(function (dataPath) {
    inputReader.close();
    return new _dataPath.DataPath(dataPath);
  });
};
exports.setupData = setupData;