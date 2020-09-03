"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _default = function _default(debug, componentName) {
  return debug ? function () {
    var _console;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (_console = console).log.apply(_console, ["<".concat(componentName, "/> Debug Log: ")].concat(args));
  } : function () {};
};

exports["default"] = _default;