"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

var _RRangeSlider$default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var RRangeSliderContext = (0, _react.createContext)();

var RRangeSlider =
/*#__PURE__*/
function (_Component) {
  _inherits(RRangeSlider, _Component);

  function RRangeSlider(props) {
    var _this;

    _classCallCheck(this, RRangeSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RRangeSlider).call(this, props));
    var _this$props = _this.props,
        direction = _this$props.direction,
        points = _this$props.points,
        htmlStyle = _this$props.htmlStyle; //direction requirments

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

    _this.htmlStyle = _jquery.default.extend({}, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }, htmlStyle);
    _this.touch = _this.isMobile();
    _this.dom = (0, _react.createRef)();
    _this.state = {
      isDown: false,
      points: _this.getValidPoints(points),
      getValidPoints: _this.getValidPoints.bind(_assertThisInitialized(_this))
    };

    var step = _this.props.step.toString();

    var dotPos = step.indexOf('.');
    _this.fixValue = dotPos === -1 ? 0 : step.length - dotPos - 1;
    return _this;
  }

  _createClass(RRangeSlider, [{
    key: "isMobile",
    value: function isMobile() {
      return 'ontouchstart' in document.documentElement;
    }
  }, {
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
      var a = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
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
    value: function getValidPoints(points) {
      var _this$props2 = this.props,
          start = _this$props2.start,
          end = _this$props2.end,
          _this$props2$min = _this$props2.min,
          min = _this$props2$min === void 0 ? start : _this$props2$min,
          _this$props2$max = _this$props2.max,
          max = _this$props2$max === void 0 ? end : _this$props2$max,
          step = _this$props2.step;

      for (var i = 0; i < points.length; i++) {
        var point = points[i];
        point.value = Math.round((point.value - start) / step) * step + start;

        if (point.value < min) {
          point.value = min;
        }

        if (point.value > max) {
          point.value = max;
        }
      }

      return points;
    }
  }, {
    key: "update",
    value: function update(points, final, context) {
      var _this$props3 = this.props,
          onchange = _this$props3.onchange,
          ondrag = _this$props3.ondrag;

      if (final && onchange) {
        onchange(context);
      } else if (ondrag) {
        ondrag(context);
      } else {
        this.setState({
          points: points
        });
      }
    }
  }, {
    key: "getOffset",
    value: function getOffset(x, y, size, e) {
      var _this$props4 = this.props,
          start = _this$props4.start,
          end = _this$props4.end,
          step = _this$props4.step,
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

      var _this$props5 = this.props,
          start = _this$props5.start,
          end = _this$props5.end,
          points = this.state.points;
      var percents = points.map(function (p, i) {
        return [_this2.getPercentByValue(i ? points[i - 1].value : start, start, end), _this2.getPercentByValue(p.value, start, end)];
      });
      percents.push([percents[percents.length - 1][1], 100]);
      return percents;
    }
  }, {
    key: "decreaseAll",
    value: function decreaseAll() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.step;
      var _this$props6 = this.props,
          start = _this$props6.start,
          _this$props6$min = _this$props6.min,
          min = _this$props6$min === void 0 ? start : _this$props6$min;
      var points = this.state.points;
      var offset = Math.min(value, points[0].value - this.getValue(min));

      for (var i = 0; i < points.length; i++) {
        points[i].value -= offset;
        points[i].value = this.fix(points[i].value, this.fixValue);
      }

      this.moved = true;
    }
  }, {
    key: "increaseAll",
    value: function increaseAll() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props.step;
      var _this$props7 = this.props,
          end = _this$props7.end,
          _this$props7$max = _this$props7.max,
          max = _this$props7$max === void 0 ? end : _this$props7$max;
      var points = this.state.points;
      var offset = Math.min(value, this.getValue(max) - points[points.length - 1].value);

      for (var i = 0; i < points.length; i++) {
        points[i].value += offset;
        points[i].value = this.fix(points[i].value, this.fixValue);
      }

      this.moved = true; //update(points,true,this.context);
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e, index, type) {
      e.preventDefault();
      var points = this.state.points,
          _this$props8 = this.props,
          start = _this$props8.start,
          end = _this$props8.end,
          _this$props8$min = _this$props8.min,
          min = _this$props8$min === void 0 ? start : _this$props8$min,
          _this$props8$max = _this$props8.max,
          max = _this$props8$max === void 0 ? end : _this$props8$max,
          onmousedown = _this$props8.onmousedown;

      if (onmousedown) {
        onmousedown(this.props);
      }

      var _this$getClient = this.getClient(e),
          x = _this$getClient.x,
          y = _this$getClient.y,
          dom = (0, _jquery.default)(this.dom.current);

      var pointContainers = dom.find('.r-range-slider-point-container');
      var size = dom.find('.r-range-slider-line')[this.oriention === 'horizontal' ? 'width' : 'height']();
      var length = points.length;
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
        var current = points[index].value;
        var before = index === 0 ? min : points[index - 1].value;
        var after = index === points.length - 1 ? max : points[index + 1].value;
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
            index: points.map(function (p, i) {
              return i;
            }),
            value: points.map(function (p) {
              return p.value;
            }),
            startLimit: min - points[0].value,
            endLimit: max - points[length - 1].value
          };
        } else {
          var point1 = points[index - 1].value,
              point2 = points[index].value;
          var before = index === 1 ? min : points[index - 2]; //مقدار قبلی رنج

          var after = index === length - 1 ? max : points[index + 1].value; //مقدار بعدی رنج

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
      var points = this.state.points;
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
            point = points[Index],
            newValue = parseFloat(Value) + offset;

        if (point.value === newValue) {
          return;
        }

        point.value = this.fix(newValue, this.fixValue);
      }

      this.moved = true;
      this.update(points, false, this.context);
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      this.eventHandler('window', 'mousemove', this.mouseMove, 'unbind');
      this.eventHandler('window', 'mouseup', this.mouseUp, 'unbind');
      var points = (0, _jquery.default)(this.dom.current).find('.r-range-slider-point');
      points.removeClass('active');
      this.setState({
        isDown: false
      });

      if (this.moved) {
        this.update(this.state.points, true, this.context);
      }

      if (this.props.onmouseup) {
        this.props.onmouseup(this.props);
      }
    }
  }, {
    key: "getContext",
    value: function getContext() {
      var context = { ...this.props
      };
      context.oriention = this.oriention;
      context.getValue = this.getValue.bind(this);
      context.isDown = this.state.isDown;
      context.mouseDown = this.mouseDown.bind(this);
      context.getStartByStep = this.getStartByStep.bind(this);
      context.getPercentByValue = this.getPercentByValue.bind(this);
      context.touch = this.touch;
      context.update = this.update.bind(this);
      context.points = this.state.points;
      return context;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var obj = this.getValue(this.props.style) || {};
      obj = { ...obj
      };
      obj.direction = 'ltr';
      obj.flexDirection = this.flexDirection;
      return obj;
    }
  }, {
    key: "render",
    value: function render() {
      var points = this.state.points;
      this.context = this.getContext();
      var _this$props9 = this.props,
          startHtml = _this$props9.startHtml,
          endHtml = _this$props9.endHtml,
          className = _this$props9.className,
          id = _this$props9.id;
      var percents = this.getPercents();
      return _react.default.createElement(RRangeSliderContext.Provider, {
        value: this.context
      }, _react.default.createElement("div", {
        ref: this.dom,
        id: id,
        className: "r-range-slider ".concat(this.context.oriention).concat(className ? ' ' + className : ''),
        style: this.getStyle()
      }, startHtml && _react.default.createElement("div", {
        style: this.htmlStyle
      }, this.getValue(startHtml)), _react.default.createElement("div", {
        style: {
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }
      }, _react.default.createElement(RRangeSliderLine, null), _react.default.createElement(RRangeSliderLabels, null), _react.default.createElement(RRangeSliderPins, null), points.map(function (p, i) {
        return _react.default.createElement(RRangeSliderFill, {
          key: i,
          index: i,
          percent: percents[i]
        });
      }), _react.default.createElement(RRangeSliderFill, {
        key: points.length,
        index: points.length,
        percent: percents[points.length]
      }), points.map(function (p, i) {
        return _react.default.createElement(RRangeSliderPoint, {
          key: i,
          index: i,
          percent: percents[i]
        });
      })), endHtml && _react.default.createElement("div", {
        style: this.htmlStyle
      }, this.getValue(endHtml))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        points: state.getValidPoints(props.points)
      };
    }
  }]);

  return RRangeSlider;
}(_react.Component);

exports.default = RRangeSlider;
RRangeSlider.defaultProps = (_RRangeSlider$default = {
  direction: 'right',
  points: [{
    value: 0
  }],
  start: -50,
  end: 50,
  step: 1,
  endRange: {},
  style: {},
  activePointStyle: {},
  pointStyle: {},
  lineStyle: {},
  fillStyle: {},
  valueStyle: {}
}, _defineProperty(_RRangeSlider$default, "style", {}), _defineProperty(_RRangeSlider$default, "textStyle", {}), _defineProperty(_RRangeSlider$default, "showValue", true), _RRangeSlider$default);

var RRangeSliderLine =
/*#__PURE__*/
function (_Component2) {
  _inherits(RRangeSliderLine, _Component2);

  function RRangeSliderLine() {
    _classCallCheck(this, RRangeSliderLine);

    return _possibleConstructorReturn(this, _getPrototypeOf(RRangeSliderLine).apply(this, arguments));
  }

  _createClass(RRangeSliderLine, [{
    key: "render",
    value: function render() {
      var _this$context = this.context,
          oriention = _this$context.oriention,
          lineStyle = _this$context.lineStyle;
      return _react.default.createElement("div", {
        className: "r-range-slider-line",
        style: lineStyle
      });
    }
  }]);

  return RRangeSliderLine;
}(_react.Component);

_defineProperty(RRangeSliderLine, "contextType", RRangeSliderContext);

var RRangeSliderFill =
/*#__PURE__*/
function (_Component3) {
  _inherits(RRangeSliderFill, _Component3);

  function RRangeSliderFill() {
    _classCallCheck(this, RRangeSliderFill);

    return _possibleConstructorReturn(this, _getPrototypeOf(RRangeSliderFill).apply(this, arguments));
  }

  _createClass(RRangeSliderFill, [{
    key: "getFillStyle",
    value: function getFillStyle() {
      var _this$context2 = this.context,
          getValue = _this$context2.getValue,
          points = _this$context2.points,
          fillStyle = _this$context2.fillStyle,
          endRange = _this$context2.endRange,
          index = this.props.index;
      var point = index === points.length ? endRange : points[index];
      return _jquery.default.extend({}, getValue(fillStyle), getValue(point.fillStyle || {}));
    }
  }, {
    key: "getContainerStyle",
    value: function getContainerStyle() {
      var _this$context3 = this.context,
          oriention = _this$context3.oriention,
          direction = _this$context3.direction,
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

      var _this$context4 = this.context,
          touch = _this$context4.touch,
          mouseDown = _this$context4.mouseDown,
          points = _this$context4.points,
          endRange = _this$context4.endRange,
          getValue = _this$context4.getValue,
          endRange = _this$context4.endRange;
      var index = this.props.index;
      var point = index === points.length ? endRange : points[index];
      var containerProps = (_containerProps = {
        'data-index': index,
        className: 'r-range-slider-fill-container'
      }, _defineProperty(_containerProps, touch ? 'onTouchStart' : 'onMouseDown', function (e) {
        mouseDown(e, index, 'fill');
      }), _defineProperty(_containerProps, "style", this.getContainerStyle()), _containerProps);
      return _react.default.createElement("div", containerProps, _react.default.createElement("div", {
        className: "r-range-slider-fill",
        style: this.getFillStyle()
      }), point.text && _react.default.createElement("div", null, getValue(point.text)));
    }
  }]);

  return RRangeSliderFill;
}(_react.Component);

_defineProperty(RRangeSliderFill, "contextType", RRangeSliderContext);

var RRangeSliderPoint =
/*#__PURE__*/
function (_Component4) {
  _inherits(RRangeSliderPoint, _Component4);

  function RRangeSliderPoint() {
    _classCallCheck(this, RRangeSliderPoint);

    return _possibleConstructorReturn(this, _getPrototypeOf(RRangeSliderPoint).apply(this, arguments));
  }

  _createClass(RRangeSliderPoint, [{
    key: "getPointStyle",
    value: function getPointStyle() {
      var _this$context5 = this.context,
          getValue = _this$context5.getValue,
          points = _this$context5.points,
          pointStyle = _this$context5.pointStyle,
          index = this.props.index;
      return _jquery.default.extend({}, getValue(pointStyle), getValue(points[index].pointStyle));
    }
  }, {
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
      var _this$context6 = this.context,
          points = _this$context6.points,
          showValue = _this$context6.showValue,
          isDown = _this$context6.isDown,
          getValue = _this$context6.getValue,
          valueStyle = _this$context6.valueStyle;
      var index = this.props.index;
      var point = points[index];

      if (showValue === false) {
        return {
          display: 'none'
        };
      } else if (showValue === 'fixed') {
        return _jquery.default.extend({}, getValue(valueStyle, point.value), getValue(point.valueStyle, point.value));
      } else if (isDown) {
        return _jquery.default.extend({}, getValue(valueStyle, point.value), getValue(point.valueStyle, point.value));
      } else {
        return {
          display: 'none'
        };
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context7 = this.context,
          points = _this$context7.points,
          touch = _this$context7.touch,
          mouseDown = _this$context7.mouseDown,
          editValue = _this$context7.editValue;
      var index = this.props.index;
      var point = points[index];

      var props = _defineProperty({
        style: this.getContainerStyle(),
        'data-index': index,
        className: 'r-range-slider-point-container'
      }, touch ? 'onTouchStart' : 'onMouseDown', function (e) {
        mouseDown(e, index, 'point');
      });

      var pointProps = {
        className: 'r-range-slider-point',
        style: this.getPointStyle()
      };
      var valueProps = {
        style: this.getValueStyle(),
        className: 'r-range-slider-value'
      };
      return _react.default.createElement("div", props, _react.default.createElement("div", pointProps, point.html && point.html), _react.default.createElement("div", valueProps, editValue ? editValue(point, index) : point.value));
    }
  }]);

  return RRangeSliderPoint;
}(_react.Component);

_defineProperty(RRangeSliderPoint, "contextType", RRangeSliderContext);

var RRangeSliderLabels =
/*#__PURE__*/
function (_Component5) {
  _inherits(RRangeSliderLabels, _Component5);

  function RRangeSliderLabels() {
    _classCallCheck(this, RRangeSliderLabels);

    return _possibleConstructorReturn(this, _getPrototypeOf(RRangeSliderLabels).apply(this, arguments));
  }

  _createClass(RRangeSliderLabels, [{
    key: "getLabelsByStep",
    value: function getLabelsByStep() {
      var _this$context8 = this.context,
          start = _this$context8.start,
          _this$context8$label = _this$context8.label,
          label = _this$context8$label === void 0 ? {} : _this$context8$label,
          end = _this$context8.end,
          getStartByStep = _this$context8.getStartByStep;
      var _label$items = label.items,
          items = _label$items === void 0 ? [] : _label$items,
          step = label.step,
          style = label.style,
          edit = label.edit,
          rotate = label.rotate;
      var customLabels = items.map(function (item) {
        return item.value;
      });
      var Style = typeof style === 'function' ? function (val) {
        return style(val);
      } : function (val) {
        return style;
      };
      var Labels = [];
      var value = getStartByStep(start, step);
      var key = 0;

      while (value <= end) {
        var index = customLabels.indexOf(value);

        if (index === -1) {
          Labels.push(_react.default.createElement(RRangeSliderLabel, {
            key: key,
            label: {
              value: value,
              text: value,
              edit: edit
            },
            rotate: rotate,
            style: Style(value),
            type: "step"
          }));
        }

        value += step;
        value = parseFloat(value.toFixed(6));
        key++;
      }

      return Labels;
    }
  }, {
    key: "getLabels",
    value: function getLabels() {
      var _this$context9 = this.context,
          _this$context9$label = _this$context9.label,
          label = _this$context9$label === void 0 ? {} : _this$context9$label,
          start = _this$context9.start,
          end = _this$context9.end;
      var _label$items2 = label.items,
          items = _label$items2 === void 0 ? [] : _label$items2,
          style = label.style,
          rotate = label.rotate;
      var Labels = [];
      var Style = typeof style === 'function' ? function (val) {
        return style(val);
      } : function (val) {
        return style;
      };

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (item.value < start || item.value > end) {
          continue;
        }

        Labels.push(_react.default.createElement(RRangeSliderLabel, {
          rotate: rotate,
          label: item,
          key: item.value + 'label',
          style: _jquery.default.extend({}, Style(item.value), item.style),
          type: "list"
        }));
      }

      return Labels;
    }
  }, {
    key: "render",
    value: function render() {
      var label = this.context.label;

      if (!label) {
        return null;
      }

      var step = label.step;
      return _react.default.createElement("div", {
        className: "r-range-slider-labels"
      }, step && this.getLabelsByStep(), this.getLabels());
    }
  }]);

  return RRangeSliderLabels;
}(_react.Component);

_defineProperty(RRangeSliderLabels, "contextType", RRangeSliderContext);

var RRangeSliderLabel =
/*#__PURE__*/
function (_Component6) {
  _inherits(RRangeSliderLabel, _Component6);

  function RRangeSliderLabel() {
    _classCallCheck(this, RRangeSliderLabel);

    return _possibleConstructorReturn(this, _getPrototypeOf(RRangeSliderLabel).apply(this, arguments));
  }

  _createClass(RRangeSliderLabel, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context10 = this.context,
          start = _this$context10.start,
          end = _this$context10.end,
          getPercentByValue = _this$context10.getPercentByValue,
          direction = _this$context10.direction,
          style = _this$context10.style;
      var _this$props10 = this.props,
          label = _this$props10.label,
          rotate = _this$props10.rotate,
          style = _this$props10.style;
      var _label = label,
          value = _label.value;
      var obj = { ...style
      };
      obj[{
        right: 'left',
        left: 'right',
        top: 'bottom',
        bottom: 'top'
      }[direction]] = getPercentByValue(value, start, end) + '%';

      if (rotate) {
        obj.transform = "rotate(".concat(rotate + 'deg', ")");
        obj.justifyContent = rotate > 0 ? 'flex-start' : 'flex-end';
      }

      return obj;
    }
  }, {
    key: "click",
    value: function click(e) {
      var _this$context11 = this.context,
          points = _this$context11.points,
          update = _this$context11.update;
      var value = this.props.label.value; //get nearest point to this value

      var point = points[0];
      var diff = Math.abs(points[0].value - value);

      for (var i = 1; i < points.length; i++) {
        if (Math.abs(points[i].value - value) < diff) {
          point = points[i];
        }
      }

      point.value = value;
      update(points, true, this.context);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props11 = this.props,
          label = _this$props11.label,
          type = _this$props11.type;
      var text = label.text,
          id = label.id,
          className = label.className,
          edit = label.edit;
      return _react.default.createElement("div", {
        id: id,
        className: "r-range-slider-label".concat(className ? ' ' + className : ''),
        style: this.getStyle(),
        onClick: this.click.bind(this)
      }, edit && type === 'step' ? edit(text) : text);
    }
  }]);

  return RRangeSliderLabel;
}(_react.Component);

_defineProperty(RRangeSliderLabel, "contextType", RRangeSliderContext);

var RRangeSliderPins =
/*#__PURE__*/
function (_Component7) {
  _inherits(RRangeSliderPins, _Component7);

  function RRangeSliderPins() {
    _classCallCheck(this, RRangeSliderPins);

    return _possibleConstructorReturn(this, _getPrototypeOf(RRangeSliderPins).apply(this, arguments));
  }

  _createClass(RRangeSliderPins, [{
    key: "getPinsByStep",
    value: function getPinsByStep() {
      var _this$context12 = this.context,
          start = _this$context12.start,
          end = _this$context12.end,
          pin = _this$context12.pin,
          getStartByStep = _this$context12.getStartByStep,
          step = pin.step,
          _pin$style = pin.style,
          style = _pin$style === void 0 ? {} : _pin$style;
      var value = getStartByStep(start, step);
      var key = 0,
          pins = [];
      var Style = typeof style === 'function' ? function (val) {
        return style(val);
      } : function () {
        return style;
      };

      while (value <= end) {
        pins.push(_react.default.createElement(RRangeSliderPin, {
          value: value,
          key: key,
          style: Style(value)
        }));
        value += step;
        key++;
      }

      return pins;
    }
  }, {
    key: "getPins",
    value: function getPins() {
      var _this$context13 = this.context,
          _this$context13$pin = _this$context13.pin,
          pin = _this$context13$pin === void 0 ? {} : _this$context13$pin,
          start = _this$context13.start,
          end = _this$context13.end;
      var _pin$items = pin.items,
          items = _pin$items === void 0 ? [] : _pin$items,
          style = pin.style;
      var Pins = [];
      var Style = typeof style === 'function' ? function (val) {
        return style(val);
      } : function (val) {
        return style;
      };

      for (var i = 0; i < items.length; i++) {
        var item = items[i];

        if (item.value < start || item.value > end) {
          continue;
        }

        Pins.push(_react.default.createElement(RRangeSliderPin, {
          value: item.value,
          key: item.value + 'pin',
          style: _jquery.default.extend({}, Style(item.value), item.style)
        }));
      }

      return Pins;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context$pin = this.context.pin,
          pin = _this$context$pin === void 0 ? {} : _this$context$pin;
      var step = pin.step,
          items = pin.items;
      return _react.default.createElement("div", {
        className: "r-range-slider-pins"
      }, step && this.getPinsByStep(), items && this.getPins());
    }
  }]);

  return RRangeSliderPins;
}(_react.Component);

_defineProperty(RRangeSliderPins, "contextType", RRangeSliderContext);

var RRangeSliderPin =
/*#__PURE__*/
function (_Component8) {
  _inherits(RRangeSliderPin, _Component8);

  function RRangeSliderPin() {
    _classCallCheck(this, RRangeSliderPin);

    return _possibleConstructorReturn(this, _getPrototypeOf(RRangeSliderPin).apply(this, arguments));
  }

  _createClass(RRangeSliderPin, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context14 = this.context,
          start = _this$context14.start,
          end = _this$context14.end,
          direction = _this$context14.direction,
          getPercentByValue = _this$context14.getPercentByValue,
          _this$props12 = this.props,
          value = _this$props12.value,
          style = _this$props12.style;
      var obj = { ...style
      };
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
      return _react.default.createElement("div", {
        className: "r-range-slider-pin",
        style: this.getStyle()
      });
    }
  }]);

  return RRangeSliderPin;
}(_react.Component);

_defineProperty(RRangeSliderPin, "contextType", RRangeSliderContext);