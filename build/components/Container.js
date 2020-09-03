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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Container = /*#__PURE__*/function (_React$Component) {
  _inherits(Container, _React$Component);

  var _super = _createSuper(Container);

  function Container(props) {
    var _this;

    _classCallCheck(this, Container);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "onMouseWheel", function (e) {
      var _assertThisInitialize = _assertThisInitialized(_this),
          _sectionsCount = _assertThisInitialize._sectionsCount,
          _assertThisInitialize2 = _assertThisInitialize.state,
          isTransitionOn = _assertThisInitialize2.isTransitionOn,
          activeSectionIndex = _assertThisInitialize2.activeSectionIndex;

      var delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
      var sectionIndex = activeSectionIndex - delta;

      if (!isTransitionOn && sectionIndex < _sectionsCount && sectionIndex >= 0) {
        _this.log('onMouseWheel()');

        _this.setHash(sectionIndex);

        _this.handleTransition(sectionIndex);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onHashChange", function (e) {
      var _assertThisInitialize3 = _assertThisInitialized(_this),
          activeSectionIndex = _assertThisInitialize3.state.activeSectionIndex,
          anchors = _assertThisInitialize3.props.options.anchors;

      var hash = window.location.hash.substring(1);
      var sectionIndex = anchors.indexOf(hash);

      if (sectionIndex !== activeSectionIndex) {
        _this.log('onHashChange()');

        _this.handleTransition(sectionIndex);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setHash", function (sectionIndex) {
      var _assertThisInitialize4 = _assertThisInitialized(_this),
          anchors = _assertThisInitialize4.props.options.anchors;

      var hash = anchors[sectionIndex];

      if (hash) {
        _this.log('setHash()');

        window.location.hash = "#".concat(hash);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleTransition", function (sectionIndex) {
      var _assertThisInitialize5 = _assertThisInitialized(_this),
          isTransitionOn = _assertThisInitialize5.state.isTransitionOn,
          _container = _assertThisInitialize5._container,
          _isVertical = _assertThisInitialize5._isVertical,
          _sectionsCount = _assertThisInitialize5._sectionsCount;

      if (!isTransitionOn && sectionIndex >= 0 && sectionIndex < _sectionsCount) {
        _this.log('handleTransition()');

        var position = _isVertical ? 0 - sectionIndex * _container.offsetHeight : 0 - sectionIndex * _container.offsetWidth;

        _this.setState({
          isTransitionOn: true,
          activeSectionIndex: sectionIndex,
          translateDistance: position
        });

        _this.setIsTransitonOnOff();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setIsTransitonOnOff", function () {
      var transitionDelay = _this.props.options.transitionDelay;

      _this.clearSetIsTransitonOnOffTimer();

      _this._setIsTransitionOffTimer = setTimeout(function () {
        _this.setState({
          isTransitionOn: false
        });
      }, transitionDelay + 300);
    });

    _defineProperty(_assertThisInitialized(_this), "clearSetIsTransitonOnOffTimer", function () {
      if (_this._setIsTransitionOffTimer) {
        clearTimeout(_this._setIsTransitionOffTimer);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      _this.log('onResize()');

      var _assertThisInitialize6 = _assertThisInitialized(_this),
          _container = _assertThisInitialize6._container,
          _isVertical = _assertThisInitialize6._isVertical,
          activeSectionIndex = _assertThisInitialize6.state.activeSectionIndex;

      var position = _isVertical ? 0 - activeSectionIndex * _container.offsetHeight : 0 - activeSectionIndex * _container.offsetWidth;

      _this.setState({
        isTransitionOn: true,
        translateDistance: position
      });

      _this.setIsTransitonOnOff();
    });

    _defineProperty(_assertThisInitialized(_this), "addChildrenWithAnchorId", function () {
      var _this$props = _this.props,
          debug = _this$props.debug,
          children = _this$props.children,
          anchors = _this$props.options.anchors;
      return _react["default"].Children.map(children, function (child, index) {
        return anchors[index] ? /*#__PURE__*/_react["default"].cloneElement(child, {
          debug: debug,
          id: anchors[index]
        }) : child;
      });
    });

    var _this$props2 = _this.props,
        _debug = _this$props2.debug,
        initialSectionIndex = _this$props2.options.initialSectionIndex;
    _this.log = (0, _logger["default"])(_debug, 'Container');
    _this._container = null;
    _this._isVertical = null;
    _this._sectionsCount = 0;
    _this._setIsTransitionOffTimer = null;
    _this.state = {
      translateDistance: 0,
      isTransitionOn: false,
      activeSectionIndex: initialSectionIndex
    };
    return _this;
  }

  _createClass(Container, [{
    key: "getChildContext",
    value: function getChildContext() {
      var _this$props3 = this.props,
          sectionPaddingTop = _this$props3.sectionPaddingTop,
          sectionPaddingBottom = _this$props3.sectionPaddingBottom,
          sectionClassName = _this$props3.options.sectionClassName;
      return {
        sectionClassName: sectionClassName,
        sectionPaddingTop: sectionPaddingTop,
        sectionPaddingBottom: sectionPaddingBottom
      };
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.log('componentDidMount()');
      var _this$props4 = this.props,
          _this$props4$options = _this$props4.options,
          scrollDirection = _this$props4$options.scrollDirection,
          containerId = _this$props4$options.containerId,
          initialSectionIndex = _this$props4$options.initialSectionIndex,
          children = _this$props4.children;
      this._sectionsCount = children.length;
      this._isVertical = scrollDirection === 'vertical';
      this._container = document.getElementById(containerId);
      window.addEventListener('resize', this.onResize);
      window.addEventListener('mousewheel', this.onMouseWheel, false);
      window.addEventListener('hashchange', this.onHashChange, false);
      window.addEventListener('DOMMouseScroll', this.onMouseWheel, false);
      this.onResize();
      this.handleTransition(initialSectionIndex);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.log('componentWillUnmount()');
      window.removeEventListener('resize', this.onResize);
      window.removeEventListener('mousewheel', this.onMouseWheel);
      window.removeEventListener('hashchange', this.onHashChange);
      window.removeEventListener('DOMMouseScroll', this.onMouseWheel);
      this.clearSetIsTransitonOnOffTimer();
    } // addActiveClass = () => {
    // 	this.removeActiveClass();
    // 	const hash = window.location.hash.substring(1);
    // 	const activeLinks = document.querySelectorAll(`a[href="#${hash}"]`);
    // 	for (let i = 0; i < activeLinks.length; i++) {
    // 		activeLinks[i].className = `${
    // 			activeLinks[i].className +
    // 			(activeLinks[i].className.length > 0 ? ' ' : '')
    // 		}${this.props.activeSectionClassName}`;
    // 	}
    // };
    // removeActiveClass = () => {
    // 	const activeLinks = document.querySelectorAll(
    // 		`a:not([href="#${
    // 			this.props.anchors[this.state.activeSectionIndex]
    // 		}"])`
    // 	);
    // 	for (let i = 0; i < activeLinks.length; i++) {
    // 		activeLinks[i].className = activeLinks[i].className.replace(
    // 			/\b ?active/g,
    // 			''
    // 		);
    // 	}
    // };

  }, {
    key: "render",
    value: function render() {
      var _sectionsCount = this._sectionsCount,
          translateDistance = this.state.translateDistance,
          _this$props5 = this.props,
          _this$props5$options = _this$props5.options,
          scrollDirection = _this$props5$options.scrollDirection,
          transitionDelay = _this$props5$options.transitionDelay,
          transitionFunction = _this$props5$options.transitionFunction,
          containerId = _this$props5$options.containerId,
          containerClassName = _this$props5$options.containerClassName,
          children = _this$props5.children;
      var isVertical = scrollDirection === 'vertical';
      return /*#__PURE__*/_react["default"].createElement("div", {
        id: containerId,
        className: containerClassName,
        style: {
          height: '100%',
          overflowX: isVertical ? 'hidden' : 'scroll',
          overflowY: isVertical ? 'scroll' : 'hidden',
          scrollbarWidth: 'none',
          width: '100%'
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(containerClassName, "__sections"),
        style: {
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          height: isVertical ? "calc(100% * ".concat(_sectionsCount, ")") : '100%',
          transform: isVertical ? "translateY(".concat(translateDistance, "px)") : "translateX(".concat(translateDistance, "px)"),
          transition: "all ".concat(transitionDelay, "ms ").concat(transitionFunction),
          width: scrollDirection === 'vertical' ? '100%' : "calc(100% * ".concat(_sectionsCount, ")")
        }
      }, children));
    }
  }]);

  return Container;
}(_react["default"].Component);

Container.defaultProps = {
  debug: false,
  options: {
    // General
    scrollDirection: 'vertical',
    // Container Related Options
    containerId: 'signed-container',
    containerClassName: 'signed-container',
    // Section Related Options
    anchors: [],
    initialSectionIndex: 0,
    sectionClassName: 'signed-section',
    // Transition Related Options
    transitionDelay: 300,
    transitionFunction: 'ease'
  },
  sectionPaddingTop: '0',
  sectionPaddingBottom: '0'
};
Container.propTypes = {
  debug: _propTypes["default"].bool,
  options: _propTypes["default"].shape({
    scrollDirection: _propTypes["default"].oneOf(['horizontal', 'vertical']),
    // Container Related Options
    containerId: _propTypes["default"].string,
    containerClassName: _propTypes["default"].string,
    // Section Related Options
    sectionClassName: _propTypes["default"].string,
    initialSectionIndex: _propTypes["default"].number,
    anchors: _propTypes["default"].arrayOf(_propTypes["default"].string),
    // Transition Related Options
    transitionDelay: _propTypes["default"].number,
    transitionFunction: _propTypes["default"].string
  }),
  children: _propTypes["default"].node.isRequired,
  sectionPaddingTop: _propTypes["default"].string,
  sectionPaddingBottom: _propTypes["default"].string
};
Container.childContextTypes = {
  debug: _propTypes["default"].bool,
  sectionClassName: _propTypes["default"].string,
  sectionPaddingTop: _propTypes["default"].string,
  sectionPaddingBottom: _propTypes["default"].string
};
var _default = Container;
exports["default"] = _default;