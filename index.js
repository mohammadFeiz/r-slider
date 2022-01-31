"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RRangeSliderContext = /*#__PURE__*/(0, _react.createContext)();

var RRangeSlider = /*#__PURE__*/function (_Component) {
  _inherits(RRangeSlider, _Component);

  var _super = _createSuper(RRangeSlider);

  function RRangeSlider(props) {
    var _this;

    _classCallCheck(this, RRangeSlider);

    _this = _super.call(this, props);
    var direction = _this.props.direction;
    _this.touch = 'ontouchstart' in document.documentElement;

    if (direction === 'left') {
      _this.getDiff = function (x, y, client) {
        return x - client.x;
      };

      _this.oriention = 'horizontal';
    } else if (direction === 'right') {
      _this.getDiff = function (x, y, client) {
        return client.x - x;
      };

      _this.oriention = 'horizontal';
    } else if (direction === 'top') {
      _this.getDiff = function (x, y, client) {
        return y - client.y;
      };

      _this.oriention = 'vertical';
      _this.flexDirection = 'column-reverse';
    } else {
      _this.getDiff = function (x, y, client) {
        return client.y - y;
      };

      _this.oriention = 'vertical';
      _this.flexDirection = 'column';
    }

    _this.dom = /*#__PURE__*/(0, _react.createRef)();
    _this.state = {
      isDown: false
    };
    return _this;
  }

  _createClass(RRangeSlider, [{
    key: "getClient",
    value: function getClient(e) {
      return this.touch ? {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      } : {
        x: e.clientX,
        y: e.clientY
      };
    }
  }, {
    key: "getPercentByValue",
    value: function getPercentByValue(value, start, end) {
      return 100 * (value - start) / (end - start);
    } //getPercentByValue

  }, {
    key: "fix",
    value: function fix(number) {
      var dotPos = this.props.step.toString().indexOf('.');
      var a = dotPos === -1 ? 0 : this.props.step.toString().length - dotPos - 1;
      return parseFloat(number.toFixed(a));
    }
  }, {
    key: "getStartByStep",
    value: function getStartByStep(start, step) {
      var a = Math.round((start - step) / step) * step;

      while (a < start) {
        a += step;
      }

      return a;
    }
  }, {
    key: "eventHandler",
    value: function eventHandler(selector, event, action) {
      var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'bind';
      var me = {
        mousedown: "touchstart",
        mousemove: "touchmove",
        mouseup: "touchend"
      };
      event = this.touch ? me[event] : event;
      var element = typeof selector === "string" ? selector === "window" ? (0, _jquery.default)(window) : (0, _jquery.default)(selector) : selector;
      element.unbind(event, action);

      if (type === 'bind') {
        element.bind(event, action);
      }
    }
  }, {
    key: "getValidPoints",
    value: function getValidPoints() {
      var _this$props = this.props,
          points = _this$props.points,
          start = _this$props.start,
          end = _this$props.end,
          _this$props$min = _this$props.min,
          min = _this$props$min === void 0 ? start : _this$props$min,
          _this$props$max = _this$props.max,
          max = _this$props$max === void 0 ? end : _this$props$max,
          step = _this$props.step;

      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        point = Math.round((point - start) / step) * step + start;

        if (point < min) {
          point = min;
        }

        if (point > max) {
          point = max;
        }

        points[i] = point;
      }

      return points;
    }
  }, {
    key: "getOffset",
    value: function getOffset(x, y, size, e) {
      var _this$props2 = this.props,
          start = _this$props2.start,
          end = _this$props2.end,
          step = _this$props2.step,
          client = this.getClient(e);
      return Math.round((end - start) * this.getDiff(x, y, client) / size / step) * step;
    }
  }, {
    key: "getValue",
    value: function getValue(value) {
      var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.props;
      return typeof value === 'function' ? value(param) : value;
    }
  }, {
    key: "getPercents",
    value: function getPercents() {
      var _this2 = this;

      var _this$props3 = this.props,
          start = _this$props3.start,
          end = _this$props3.end;
      var percents = this.points.map(function (o, i) {
        return [_this2.getPercentByValue(i ? _this2.points[i - 1] : start, start, end), _this2.getPercentByValue(o, start, end)];
      });
      percents.push([percents[percents.length - 1][1], 100]);
      return percents;
    }
  }, {
    key: "decreaseAll",
    value: function decreaseAll() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.step;
      var start = this.props.start;
      var _this$props$min2 = this.props.min,
          min = _this$props$min2 === void 0 ? start : _this$props$min2;
      var offset = Math.min(step, this.points[0] - this.getValue(min));

      for (var i = 0; i < this.points.length; i++) {
        this.points[i] -= offset;
        this.points[i] = this.fix(this.points[i]);
      }

      this.moved = true;
    }
  }, {
    key: "increaseAll",
    value: function increaseAll() {
      var step = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.step;
      var end = this.props.end;
      var _this$props$max2 = this.props.max,
          max = _this$props$max2 === void 0 ? end : _this$props$max2;
      var offset = Math.min(step, this.getValue(max) - this.points[this.points.length - 1]);

      for (var i = 0; i < this.points.length; i++) {
        this.points[i] += offset;
        this.points[i] = this.fix(this.points[i]);
      }

      this.moved = true;
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e, index, type) {
      e.preventDefault();
      var _this$props4 = this.props,
          start = _this$props4.start,
          end = _this$props4.end,
          _this$props4$min = _this$props4.min,
          min = _this$props4$min === void 0 ? start : _this$props4$min,
          _this$props4$max = _this$props4.max,
          max = _this$props4$max === void 0 ? end : _this$props4$max,
          onChange = _this$props4.onChange,
          disabled = _this$props4.disabled;

      if (!onChange || disabled) {
        return;
      }

      var _this$getClient = this.getClient(e),
          x = _this$getClient.x,
          y = _this$getClient.y,
          dom = (0, _jquery.default)(this.dom.current);

      var pointContainers = dom.find('.r-range-slider-point-container');
      var size = dom.find('.r-range-slider-line')[this.oriention === 'horizontal' ? 'width' : 'height']();
      var length = this.points.length;
      this.eventHandler('window', 'mousemove', _jquery.default.proxy(this.mouseMove, this));
      this.eventHandler('window', 'mouseup', _jquery.default.proxy(this.mouseUp, this));
      this.moved = false;
      this.setState({
        isDown: true
      });
      pointContainers.css({
        zIndex: 10
      });

      if (type === 'point') {
        var pointContainer = pointContainers.eq(index);
        pointContainer.css({
          zIndex: 100
        });
        pointContainer.find('.r-range-slider-point').addClass('active');
        var current = this.points[index];
        var before = index === 0 ? min : this.points[index - 1];
        var after = index === this.points.length - 1 ? max : this.points[index + 1];
        this.startOffset = {
          x: x,
          y: y,
          size: size,
          index: [index],
          value: [current],
          startLimit: before - current,
          endLimit: after - current
        };
      } else {
        var pointContainer1 = pointContainers.eq(index - 1);
        var pointContainer2 = pointContainers.eq(index);
        pointContainer1.css({
          zIndex: 100
        });
        pointContainer2.css({
          zIndex: 100
        });
        var p1 = pointContainer1.find('.r-range-slider-point');
        var p2 = pointContainer2.find('.r-range-slider-point');
        p1.addClass('active');
        p2.addClass('active');

        if (index === 0) {
          this.decreaseAll();
        } else if (index === length) {
          this.increaseAll();
        }

        if (index === 0 || index === length) {
          this.startOffset = {
            x: x,
            y: y,
            size: size,
            index: this.points.map(function (o, i) {
              return i;
            }),
            value: this.points.map(function (o) {
              return o;
            }),
            startLimit: min - this.points[0],
            endLimit: max - this.points[length - 1]
          };
        } else {
          var point1 = this.points[index - 1],
              point2 = this.points[index];
          var before = index === 1 ? min : this.points[index - 2]; //مقدار قبلی رنج

          var after = index === length - 1 ? max : this.points[index + 1]; //مقدار بعدی رنج

          this.startOffset = {
            x: x,
            y: y,
            size: size,
            index: [index - 1, index],
            value: [point1, point2],
            startLimit: before - point1,
            endLimit: after - point2
          };
        }
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var onChange = this.props.onChange;
      var _this$startOffset = this.startOffset,
          x = _this$startOffset.x,
          y = _this$startOffset.y,
          size = _this$startOffset.size,
          value = _this$startOffset.value,
          startLimit = _this$startOffset.startLimit,
          endLimit = _this$startOffset.endLimit,
          index = _this$startOffset.index;
      var offset = this.getOffset(x, y, size, e);

      if (offset < startLimit) {
        offset = startLimit;
      } else if (offset > endLimit) {
        offset = endLimit;
      }

      for (var i = 0; i < value.length; i++) {
        var Index = index[i],
            Value = value[i],
            newValue = parseFloat(Value) + offset;

        if (this.points[Index] === newValue) {
          return;
        }

        this.points[Index] = this.fix(newValue);
      }

      this.moved = true;
      onChange(this.points, true);
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      this.eventHandler('window', 'mousemove', this.mouseMove, 'unbind');
      this.eventHandler('window', 'mouseup', this.mouseUp, 'unbind');
      var onChange = this.props.onChange;
      var points = (0, _jquery.default)(this.dom.current).find('.r-range-slider-point');
      points.removeClass('active');
      this.setState({
        isDown: false
      });

      if (this.moved) {
        onChange(this.points, false);
      }
    }
  }, {
    key: "getContext",
    value: function getContext() {
      var context = { ...this.props
      };
      context.touch = this.touch;
      context.fix = this.fix.bind(this);
      context.oriention = this.oriention;
      context.getValue = this.getValue.bind(this);
      context.isDown = this.state.isDown;
      context.mouseDown = this.mouseDown.bind(this);
      context.getStartByStep = this.getStartByStep.bind(this);
      context.getPercentByValue = this.getPercentByValue.bind(this);
      context.points = this.points;
      return context;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var attrs = this.props.attrs;
      var _attrs$style = attrs.style,
          style = _attrs$style === void 0 ? {} : _attrs$style;
      var obj = { ...style
      };
      obj = { ...obj
      };
      obj.direction = 'ltr';
      obj.flexDirection = this.flexDirection;
      return obj;
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var attrs = this.props.attrs;
      var className = attrs.className;
      return "r-range-slider ".concat(this.context.oriention).concat(className ? ' ' + className : '');
    }
  }, {
    key: "render",
    value: function render() {
      this.points = this.getValidPoints();
      this.context = this.getContext();
      var _this$props5 = this.props,
          labelStep = _this$props5.labelStep,
          scaleStep = _this$props5.scaleStep,
          attrs = _this$props5.attrs;
      var percents = this.getPercents();
      return /*#__PURE__*/_react.default.createElement(RRangeSliderContext.Provider, {
        value: this.context
      }, /*#__PURE__*/_react.default.createElement("div", _extends({
        ref: this.dom
      }, attrs, {
        style: this.getStyle(),
        className: this.getClassName()
      }), /*#__PURE__*/_react.default.createElement("div", {
        style: {
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }
      }, /*#__PURE__*/_react.default.createElement(RRangeSliderLine, null), labelStep && /*#__PURE__*/_react.default.createElement(RRangeSliderLabels, null), scaleStep && /*#__PURE__*/_react.default.createElement(RRangeSliderScales, null), this.points.map(function (o, i) {
        return /*#__PURE__*/_react.default.createElement(RRangeSliderFill, {
          key: i,
          index: i,
          percent: percents[i]
        });
      }), /*#__PURE__*/_react.default.createElement(RRangeSliderFill, {
        key: this.points.length,
        index: this.points.length,
        percent: percents[this.points.length]
      }), this.points.map(function (o, i) {
        return /*#__PURE__*/_react.default.createElement(RRangeSliderPoint, {
          key: i,
          index: i,
          percent: percents[i]
        });
      }))));
    }
  }]);

  return RRangeSlider;
}(_react.Component);

exports.default = RRangeSlider;
RRangeSlider.defaultProps = _defineProperty({
  direction: 'right',
  editLabel: function editLabel(a) {
    return a;
  },
  labelStyle: function labelStyle() {
    return {};
  },
  labelRotate: function labelRotate() {
    return 0;
  },
  points: [0],
  scaleStyle: function scaleStyle() {
    return {};
  },
  getPointHTML: function getPointHTML() {
    return '';
  },
  style: function style() {},
  start: 0,
  end: 100,
  step: 1,
  activegetPointStyle: {},
  getText: function getText() {
    return '';
  },
  attrs: {},
  pointStyle: function pointStyle() {
    return {};
  },
  lineStyle: function lineStyle() {
    return {};
  },
  fillStyle: function fillStyle() {
    return {};
  },
  valueStyle: function valueStyle() {
    return {};
  },
  textStyle: {},
  editValue: function editValue(value, index) {
    return value;
  }
}, "textStyle", function textStyle() {});

var RRangeSliderLine = /*#__PURE__*/function (_Component2) {
  _inherits(RRangeSliderLine, _Component2);

  var _super2 = _createSuper(RRangeSliderLine);

  function RRangeSliderLine() {
    _classCallCheck(this, RRangeSliderLine);

    return _super2.apply(this, arguments);
  }

  _createClass(RRangeSliderLine, [{
    key: "render",
    value: function render() {
      var lineStyle = this.context.lineStyle;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-range-slider-line",
        style: lineStyle(this.context)
      });
    }
  }]);

  return RRangeSliderLine;
}(_react.Component);

_defineProperty(RRangeSliderLine, "contextType", RRangeSliderContext);

var RRangeSliderFill = /*#__PURE__*/function (_Component3) {
  _inherits(RRangeSliderFill, _Component3);

  var _super3 = _createSuper(RRangeSliderFill);

  function RRangeSliderFill() {
    _classCallCheck(this, RRangeSliderFill);

    return _super3.apply(this, arguments);
  }

  _createClass(RRangeSliderFill, [{
    key: "getContainerStyle",
    value: function getContainerStyle() {
      var _this$context = this.context,
          oriention = _this$context.oriention,
          direction = _this$context.direction,
          percent = this.props.percent;
      var obj = {};
      obj[{
        right: 'left',
        left: 'right',
        top: 'bottom',
        bottom: 'top'
      }[direction]] = percent[0] + '%';

      if (oriention === 'horizontal') {
        obj.width = percent[1] - percent[0] + '%';
      } else {
        obj.height = percent[1] - percent[0] + '%';
      }

      return obj;
    }
  }, {
    key: "render",
    value: function render() {
      var _containerProps;

      var _this$context2 = this.context,
          mouseDown = _this$context2.mouseDown,
          _this$context2$rangeE = _this$context2.rangeEvents,
          rangeEvents = _this$context2$rangeE === void 0 ? {} : _this$context2$rangeE,
          fillStyle = _this$context2.fillStyle,
          getText = _this$context2.getText,
          textStyle = _this$context2.textStyle,
          touch = _this$context2.touch;
      var index = this.props.index;
      var containerProps = (_containerProps = {
        'data-index': index,
        className: 'r-range-slider-fill-container'
      }, _defineProperty(_containerProps, touch ? 'onTouchStart' : 'onMouseDown', function (e) {
        mouseDown(e, index, 'fill');
      }), _defineProperty(_containerProps, "style", this.getContainerStyle()), _containerProps);

      var _loop = function _loop(prop) {
        containerProps[prop] = function () {
          return rangeEvents[prop](index);
        };
      };

      for (var prop in rangeEvents) {
        _loop(prop);
      }

      var text = getText(index, this.context);
      return /*#__PURE__*/_react.default.createElement("div", containerProps, /*#__PURE__*/_react.default.createElement("div", {
        className: "r-range-slider-fill",
        style: fillStyle(index, this.context),
        "data-index": index
      }), text !== undefined && /*#__PURE__*/_react.default.createElement("div", {
        className: "r-range-slider-text",
        style: textStyle(index)
      }, text));
    }
  }]);

  return RRangeSliderFill;
}(_react.Component);

_defineProperty(RRangeSliderFill, "contextType", RRangeSliderContext);

var RRangeSliderPoint = /*#__PURE__*/function (_Component4) {
  _inherits(RRangeSliderPoint, _Component4);

  var _super4 = _createSuper(RRangeSliderPoint);

  function RRangeSliderPoint() {
    _classCallCheck(this, RRangeSliderPoint);

    return _super4.apply(this, arguments);
  }

  _createClass(RRangeSliderPoint, [{
    key: "getContainerStyle",
    value: function getContainerStyle() {
      var direction = this.context.direction,
          percent = this.props.percent;
      return _defineProperty({}, {
        right: 'left',
        left: 'right',
        top: 'bottom',
        bottom: 'top'
      }[direction], percent[1] + '%');
    }
  }, {
    key: "getValueStyle",
    value: function getValueStyle() {
      var _this$context3 = this.context,
          showValue = _this$context3.showValue,
          isDown = _this$context3.isDown,
          valueStyle = _this$context3.valueStyle;
      var index = this.props.index;

      if (showValue === false) {
        return {
          display: 'none'
        };
      }

      if (showValue === true || isDown) {
        return valueStyle(index, this.context);
      }

      return {
        display: 'none'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context4 = this.context,
          points = _this$context4.points,
          mouseDown = _this$context4.mouseDown,
          editValue = _this$context4.editValue,
          pointEvents = _this$context4.pointEvents,
          getPointHTML = _this$context4.getPointHTML,
          pointStyle = _this$context4.pointStyle,
          touch = _this$context4.touch,
          fix = _this$context4.fix;
      var index = this.props.index;
      var point = points[index];

      var props = _defineProperty({
        style: this.getContainerStyle(),
        'data-index': index,
        className: 'r-range-slider-point-container'
      }, touch ? 'onTouchStart' : 'onMouseDown', function (e) {
        mouseDown(e, index, 'point');
      });

      var _loop2 = function _loop2(prop) {
        props[prop] = function () {
          return pointEvents[prop](index);
        };
      };

      for (var prop in pointEvents) {
        _loop2(prop);
      }

      var pointProps = {
        className: 'r-range-slider-point',
        style: pointStyle(index, this.context),
        'data-index': index
      };
      var valueProps = {
        style: this.getValueStyle(),
        className: 'r-range-slider-value'
      };
      var html = getPointHTML(index, this.context);
      return /*#__PURE__*/_react.default.createElement("div", props, /*#__PURE__*/_react.default.createElement("div", pointProps, html), /*#__PURE__*/_react.default.createElement("div", valueProps, editValue(fix(point), index)));
    }
  }]);

  return RRangeSliderPoint;
}(_react.Component);

_defineProperty(RRangeSliderPoint, "contextType", RRangeSliderContext);

var RRangeSliderLabels = /*#__PURE__*/function (_Component5) {
  _inherits(RRangeSliderLabels, _Component5);

  var _super5 = _createSuper(RRangeSliderLabels);

  function RRangeSliderLabels(props) {
    var _this3;

    _classCallCheck(this, RRangeSliderLabels);

    _this3 = _super5.call(this, props);
    _this3.dom = /*#__PURE__*/(0, _react.createRef)();
    (0, _jquery.default)(window).on('resize', _this3.update.bind(_assertThisInitialized(_this3)));
    return _this3;
  }

  _createClass(RRangeSliderLabels, [{
    key: "getLabelsByStep",
    value: function getLabelsByStep() {
      var _this$context5 = this.context,
          start = _this$context5.start,
          _this$context5$label = _this$context5.label,
          label = _this$context5$label === void 0 ? {} : _this$context5$label,
          end = _this$context5.end,
          getStartByStep = _this$context5.getStartByStep,
          labelStep = _this$context5.labelStep;
      var Labels = [];
      var value = getStartByStep(start, labelStep);
      var key = 0;

      while (value <= end) {
        Labels.push( /*#__PURE__*/_react.default.createElement(RRangeSliderLabel, {
          key: key,
          value: value
        }));
        value += labelStep;
        value = parseFloat(value.toFixed(6));
        key++;
      }

      return Labels;
    }
  }, {
    key: "update",
    value: function update() {
      var container = (0, _jquery.default)(this.dom.current);
      var labels = container.find('.r-range-slider-label div');

      if (!labels.length) {
        return;
      }

      var _this$context6 = this.context,
          direction = _this$context6.direction,
          _this$context6$label = _this$context6.label,
          label = _this$context6$label === void 0 ? {} : _this$context6$label;
      var firstLabel = labels.eq(0);
      var firstLabelThickness = firstLabel.attr('datarotated') === 'yes' ? 'height' : 'width';

      if (direction === 'right') {
        var end = firstLabel.offset().left + firstLabel[firstLabelThickness]();

        for (var i = 1; i < labels.length; i++) {
          var label = labels.eq(i);
          var thickness = label.attr('datarotated') === 'yes' ? 'height' : 'width';
          label.css({
            display: 'block'
          });
          var left = label.offset().left;
          var width = label[thickness]();

          if (left < end + 5) {
            label.css({
              display: 'none'
            });
          } else {
            end = left + width;
          }
        }
      } else if (direction === 'left') {
        var end = firstLabel.offset().left;

        for (var i = 1; i < labels.length; i++) {
          var label = labels.eq(i);

          var _thickness = label.attr('datarotated') === 'yes' ? 'height' : 'width';

          label.css({
            display: 'block'
          });
          var left = label.offset().left;

          var width = label[_thickness]();

          var right = left + width;

          if (right > end - 5) {
            label.css({
              display: 'none'
            });
          } else {
            end = left;
          }
        }
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.update();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.update();
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-range-slider-labels",
        ref: this.dom
      }, this.getLabelsByStep());
    }
  }]);

  return RRangeSliderLabels;
}(_react.Component);

_defineProperty(RRangeSliderLabels, "contextType", RRangeSliderContext);

var RRangeSliderLabel = /*#__PURE__*/function (_Component6) {
  _inherits(RRangeSliderLabel, _Component6);

  var _super6 = _createSuper(RRangeSliderLabel);

  function RRangeSliderLabel() {
    _classCallCheck(this, RRangeSliderLabel);

    return _super6.apply(this, arguments);
  }

  _createClass(RRangeSliderLabel, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context7 = this.context,
          start = _this$context7.start,
          end = _this$context7.end,
          getPercentByValue = _this$context7.getPercentByValue,
          direction = _this$context7.direction,
          labelStyle = _this$context7.labelStyle,
          labelRotate = _this$context7.labelRotate;
      var value = this.props.value;
      var obj = labelStyle(value, this.context);

      if (!obj) {
        obj = {};
      }

      obj[{
        right: 'left',
        left: 'right',
        top: 'bottom',
        bottom: 'top'
      }[direction]] = getPercentByValue(value, start, end) + '%';
      var rotate = labelRotate(value);

      if (rotate) {
        obj.transform = "rotate(".concat(rotate + 'deg', ")");
        obj.justifyContent = rotate > 0 ? 'flex-start' : 'flex-end';
      }

      return obj;
    }
  }, {
    key: "click",
    value: function click(e) {
      var onLabelClick = this.context.onLabelClick;
      e.stopPropagation();

      if (!onLabelClick) {
        return;
      }

      var value = this.props.value;
      onLabelClick(value);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context8 = this.context,
          editLabel = _this$context8.editLabel,
          labelRotate = _this$context8.labelRotate;
      var value = this.props.value;
      var rotate = labelRotate(value);
      var text;

      try {
        text = editLabel(value);
      } catch {
        text = '';
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        onClick: this.click.bind(this),
        style: this.getStyle(),
        className: "r-range-slider-label"
      }, /*#__PURE__*/_react.default.createElement("div", {
        datarotated: rotate ? 'yes' : 'no',
        className: "r-range-slider-label-text"
      }, text));
    }
  }]);

  return RRangeSliderLabel;
}(_react.Component);

_defineProperty(RRangeSliderLabel, "contextType", RRangeSliderContext);

var RRangeSliderScales = /*#__PURE__*/function (_Component7) {
  _inherits(RRangeSliderScales, _Component7);

  var _super7 = _createSuper(RRangeSliderScales);

  function RRangeSliderScales() {
    _classCallCheck(this, RRangeSliderScales);

    return _super7.apply(this, arguments);
  }

  _createClass(RRangeSliderScales, [{
    key: "getScalesByStep",
    value: function getScalesByStep() {
      var _this$context9 = this.context,
          start = _this$context9.start,
          end = _this$context9.end,
          getStartByStep = _this$context9.getStartByStep,
          scaleStep = _this$context9.scaleStep;
      var value = getStartByStep(start, scaleStep);
      var key = 0,
          scales = [];

      while (value <= end) {
        scales.push( /*#__PURE__*/_react.default.createElement(RRangeSliderScale, {
          value: value,
          key: key
        }));
        value += scaleStep;
        key++;
      }

      return scales;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-range-slider-scales"
      }, this.getScalesByStep());
    }
  }]);

  return RRangeSliderScales;
}(_react.Component);

_defineProperty(RRangeSliderScales, "contextType", RRangeSliderContext);

var RRangeSliderScale = /*#__PURE__*/function (_Component8) {
  _inherits(RRangeSliderScale, _Component8);

  var _super8 = _createSuper(RRangeSliderScale);

  function RRangeSliderScale() {
    _classCallCheck(this, RRangeSliderScale);

    return _super8.apply(this, arguments);
  }

  _createClass(RRangeSliderScale, [{
    key: "getStyle",
    value: function getStyle() {
      var scaleStyle = this.context.scaleStyle;
      var _this$context10 = this.context,
          start = _this$context10.start,
          end = _this$context10.end,
          direction = _this$context10.direction,
          getPercentByValue = _this$context10.getPercentByValue,
          value = this.props.value;
      var obj = scaleStyle(value, this.context);

      if (!obj) {
        obj = {};
      }

      obj[{
        right: 'left',
        left: 'right',
        top: 'bottom',
        bottom: 'top'
      }[direction]] = getPercentByValue(value, start, end) + '%';
      return obj;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "r-range-slider-scale",
        style: this.getStyle()
      });
    }
  }]);

  return RRangeSliderScale;
}(_react.Component);

_defineProperty(RRangeSliderScale, "contextType", RRangeSliderContext);