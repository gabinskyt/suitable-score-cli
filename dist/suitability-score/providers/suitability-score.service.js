"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuitabilityScoreService = void 0;
var _csv = require("../../lib/handlers/csv.handler");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Class responsible for providing a data origin service
 * 
 * NOTES: This class was created in order to follow the SOLID - Liskov Substitution Principle
 * providing a class which can be replaced with an API, FILE, microservice, DBMS 
 * or any other data origin without braking the implementation.
 */
var SuitabilityScoreService = /*#__PURE__*/function () {
  // DataPath is set up and injected in the constructor, ready to be used
  function SuitabilityScoreService(_ref) {
    var DataPath = _ref.DataPath;
    _classCallCheck(this, SuitabilityScoreService);
    _defineProperty(this, "dataPath", void 0);
    _defineProperty(this, "csvHandler", void 0);
    // This may be replaced with any AWS or DB open connection method invocation.
    this.dataPath = DataPath;
    this.csvHandler = new _csv.CsvHandler();
  }

  /**
   * Retrieves the list of shipment destinations
   * 
   * @returns {Promise<[string]>} shipmentDestinationList
   */
  _createClass(SuitabilityScoreService, [{
    key: "getShipmentDestinationList",
    value: function getShipmentDestinationList() {
      return this.csvHandler.getRows(this.dataPath.shipmentDestinationListPath)["catch"](function () {
        return console.warn("An error ocurred during file reading, make sure you are entering a valid path");
      });
    }

    /**
     * Retrieves the list of driver names
     * 
     * @returns {Promise<[string]>} driverList
     */
  }, {
    key: "getDriverList",
    value: function getDriverList() {
      return this.csvHandler.getRows(this.dataPath.driverListPath)["catch"](function () {
        return console.warn("An error ocurred during file reading, make sure you are entering a valid path");
      });
    }
  }]);
  return SuitabilityScoreService;
}();
exports.SuitabilityScoreService = SuitabilityScoreService;