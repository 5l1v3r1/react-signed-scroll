"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _logger = _interopRequireDefault(require("../utils/logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Section = /*#__PURE__*/function (_React$Component) {
  _inherits(Section, _React$Component);

  var _super = _createSuper(Section);

  function Section(props) {
    var _this;

    _classCallCheck(this, Section);

    _this = _super.call(this, props);
    var _this$props = _this.props,
        debug = _this$props.debug,
        id = _this$props.id;
    _this.log = (0, _logger["default"])(debug, 'Section');
    _this._section = document.getElementById(id);
    _this.state = {// windowHeight: 0,
    };
    return _this;
  }

  _createClass(Section, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.log('componentDidMount()');
      this.handleResize();
      window.addEventListener('resize', function () {
        return _this2.handleResize();
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      this.log('componentWillUnmount()');
      window.removeEventListener('resize', function () {
        return _this3.handleResize();
      });
    }
  }, {
    key: "handleResize",
    value: function handleResize() {
      this.log('handleResize()'); // this.setState({
      // 	windowHeight: window.innerHeight,
      // });
    }
  }, {
    key: "render",
    value: function render() {
      var state = this.state,
          _this$props2 = this.props,
          children = _this$props2.children,
          id = _this$props2.id,
          className = _this$props2.className,
          sectionClassName = this.context.sectionClassName;
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: id,
        style: {
          height: '100%',
          width: '100%',
          paddingTop: this.context.sectionPaddingTop,
          paddingBottom: this.context.sectionPaddingBottom
        },
        className: sectionClassName + (className ? " ".concat(sectionClassName, "--").concat(className) : '')
      }, children);
    }
  }]);

  return Section;
}(_react["default"].Component);

Section.propTypes = {
  id: _propTypes["default"].string,
  debug: _propTypes["default"].bool,
  children: _propTypes["default"].node
};
Section.contextTypes = {
  sectionClassName: _propTypes["default"].string,
  sectionPaddingTop: _propTypes["default"].string,
  sectionPaddingBottom: _propTypes["default"].string
};
var _default = Section;
exports["default"] = _default;