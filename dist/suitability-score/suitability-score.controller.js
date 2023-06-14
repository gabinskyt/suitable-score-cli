"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuitabilityScoreController = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/**
 * Class responsible of providing the logics methods and implementing the business algorithm
 * 
 * Notes: As noticed in the module file, the instance of the service are injected in the constructor
 * including the cli setup, so it is ready to use
 */
var SuitabilityScoreController = /*#__PURE__*/function () {
  // Instance injected in the constructor, 
  // Note: In a "more development time" scenario it may be created a decorator for 
  // automatically injecting the needed providers without using the constructor args
  // i.e. @inject(SuitabilityScoreService)
  function SuitabilityScoreController(_ref) {
    var SuitabilityScoreService = _ref.SuitabilityScoreService;
    _classCallCheck(this, SuitabilityScoreController);
    _defineProperty(this, "suitabilityScoreService", void 0);
    this.suitabilityScoreService = SuitabilityScoreService;
  }

  /**
   * Implements the algorithm for generating the destination list by driver name
   * 
   * @returns {Object<{ [string: DriverName]: { destination: Object, suitabilityScore: number }}>}
   */
  _createClass(SuitabilityScoreController, [{
    key: "getSuitabilityScoreList",
    value: function getSuitabilityScoreList() {
      return Promise.all([this.suitabilityScoreService.getShipmentDestinationList(), this.suitabilityScoreService.getDriverList()]).then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
          shipmentDestinationList = _ref3[0],
          driverList = _ref3[1];
        return (
          // Iterates through destinations generating the assignedDrivers
          shipmentDestinationList.reduce(function (assignedDrivers, destination) {
            // Iterates through driver names returning the highest match between destination and driver
            driverList.reduce(function (match, driver) {
              // If the driver is already assigned will skip
              if (driver.DriverName in assignedDrivers) return match;

              // Calculate the suitability score with the given method 
              var suitabilityScore;
              if (destination.StreetName.length % 2 == 0) suitabilityScore = driver.DriverName.match(/[aeiou]/gi).length * 1.5;else suitabilityScore = driver.DriverName.match(/[bcdfghjklmnpqrstvwxys]/gi).length;
              if (destination.StreetName.length > 1 && destination.StreetName.length == driver.DriverName.length) suitabilityScore += suitabilityScore * 0.5;

              // If the new match suitabilityScore is higher than the previous then replace it and mark the previous driver as available 
              if (suitabilityScore > match.suitabilityScore) {
                assignedDrivers[driver.DriverName] = {
                  destination: destination,
                  suitabilityScore: suitabilityScore
                };
                delete assignedDrivers[match.driver.DriverName];
                return {
                  suitabilityScore: suitabilityScore,
                  driver: driver
                };
              }
              // If the previous match is higher then keep it
              else return match;
            }, {
              driver: {},
              suitabilityScore: 0
            });
            return assignedDrivers;
          }, {})
        );
      }).then(function (assignedDrivers) {
        return console.log(assignedDrivers);
      });
    }
  }]);
  return SuitabilityScoreController;
}();
exports.SuitabilityScoreController = SuitabilityScoreController;