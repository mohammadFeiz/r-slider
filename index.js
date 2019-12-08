"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

var _rActions = _interopRequireDefault(require("r-actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _ref = new _rActions.default(),
    getPercentByValue = _ref.getPercentByValue,
    getClient = _ref.getClient,
    eventHandler = _ref.eventHandler,
    getStartByStep = _ref.getStartByStep;

var ctx = (0, _react.createContext)();

var Slider =
/*#__PURE__*/
function (_Component) {
  _inherits(Slider, _Component);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, props));
    _this.dom = (0, _react.createRef)();
    _this.touch = 'ontouchstart' in document.documentElement;
    _this.styleName = _this.getStyleName();
    _this.state = {
      points: _this.props.points
    };
    return _this;
  }

  _createClass(Slider, [{
    key: "update",
    value: function update(points, final, context) {
      var _this$props = this.props,
          onchange = _this$props.onchange,
          ondrag = _this$props.ondrag;

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
    key: "componentDidMount",
    value: function componentDidMount() {
      var position = (0, _jquery.default)(this.dom.current).css('position');

      if (position === 'static') {
        (0, _jquery.default)(this.dom.current).css('position', 'relative');
      }
    }
  }, {
    key: "getStyleName",
    value: function getStyleName() {
      var _this$props$direction = this.props.direction,
          direction = _this$props$direction === void 0 ? 'right' : _this$props$direction;

      if (direction === "right") {
        return {
          Thickness: 'width',
          StartSide: 'left',
          direction: 'row'
        };
      } else if (direction === "left") {
        return {
          Thickness: 'width',
          StartSide: 'right',
          direction: 'row-reverse'
        };
      } else if (direction === "down") {
        return {
          Thickness: 'height',
          StartSide: 'top',
          direction: 'column'
        };
      } else if (direction === "up") {
        return {
          Thickness: 'height',
          StartSide: 'bottom',
          direction: 'column-reverse'
        };
      }
    }
  }, {
    key: "getOffset",
    value: function getOffset(mousePosition, size, e) {
      var _this$props2 = this.props,
          d = _this$props2.direction,
          start = _this$props2.start,
          end = _this$props2.end,
          step = _this$props2.step,
          client = getClient(e),
          offset;

      if (d === 'left') {
        offset = mousePosition.x - client.x;
      } else if (d === 'right') {
        offset = client.x - mousePosition.x;
      } else if (d === 'up') {
        offset = mousePosition.y - client.y;
      } else if (d === 'down') {
        offset = client.y - mousePosition.y;
      }

      return Math.round((end - start) * offset / size / step) * step;
    }
  }, {
    key: "getClassName",
    value: function getClassName(className) {
      var direction = this.props.direction;
      var oriention = direction === "left" || direction === "right" ? "horizontal" : "vertical";
      return 'r-slider ' + oriention + (className && typeof className === 'string' ? ' ' + className : '');
    }
  }, {
    key: "getValue",
    value: function getValue(value) {
      return typeof value === 'function' ? value(this.props) : value;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$props3 = this.props,
          _this$props3$style = _this$props3.style,
          style = _this$props3$style === void 0 ? {} : _this$props3$style,
          backgroundColor = _this$props3.backgroundColor;
      return _jquery.default.extend({}, {
        background: this.getValue(backgroundColor)
      }, style);
    }
  }, {
    key: "getValidPoints",
    value: function getValidPoints(points, min, max) {
      for (var i = 0; i < points.length; i++) {
        var point = points[i];

        if (point.value < min) {
          point.value = min;
        }

        if (point.value > max) {
          point.value = max;
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          className = _this$props4.className,
          id = _this$props4.id,
          start = _this$props4.start,
          end = _this$props4.end,
          _this$props4$min = _this$props4.min,
          min = _this$props4$min === void 0 ? start : _this$props4$min,
          _this$props4$max = _this$props4.max,
          max = _this$props4$max === void 0 ? end : _this$props4$max;
      var points = this.state.points;
      this.getValidPoints(points, min, max);
      var contextValue = { ...this.props
      };
      contextValue.points = points;
      contextValue.styleName = this.styleName;
      contextValue.update = this.update.bind(this);
      contextValue.getValue = this.getValue.bind(this);
      contextValue.getOffset = this.getOffset.bind(this);
      contextValue.touch = this.touch;
      return _react.default.createElement(ctx.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        style: this.getStyle(),
        className: this.getClassName(className),
        ref: this.dom,
        id: id
      }, _react.default.createElement(SliderContainer, null)));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        points: props.points
      };
    }
  }]);

  return Slider;
}(_react.Component);

exports.default = Slider;
Slider.defaultProps = {
  start: 0,
  step: 1,
  end: 100,
  points: [{
    value: 0
  }],
  direction: 'right',
  labels: [],
  margin: 0,
  labelPosition: {
    x: 0,
    y: 0
  }
};

var SliderContainer =
/*#__PURE__*/
function (_Component2) {
  _inherits(SliderContainer, _Component2);

  function SliderContainer(props) {
    var _this2;

    _classCallCheck(this, SliderContainer);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(SliderContainer).call(this, props));
    _this2.dom = (0, _react.createRef)();
    return _this2;
  }

  _createClass(SliderContainer, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "r-slider-container",
        ref: this.dom
      }, _react.default.createElement(RSliderPins, null), _react.default.createElement(RSliderLabels, null), _react.default.createElement(Line, null), _react.default.createElement(Ranges, null));
    }
  }]);

  return SliderContainer;
}(_react.Component);

_defineProperty(SliderContainer, "contextType", ctx);

var RSliderPins =
/*#__PURE__*/
function (_Component3) {
  _inherits(RSliderPins, _Component3);

  function RSliderPins() {
    _classCallCheck(this, RSliderPins);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSliderPins).apply(this, arguments));
  }

  _createClass(RSliderPins, [{
    key: "getPins",
    value: function getPins() {
      var _this$context = this.context,
          start = _this$context.start,
          end = _this$context.end,
          pin = _this$context.pin;
      var step = pin.step,
          style = pin.style;
      var value = getStartByStep(start, step);
      var key = 0;
      var pins = [];
      var Style = typeof style === 'function' ? function (val) {
        return style(val);
      } : function (val) {
        return style;
      };

      while (value <= end) {
        pins.push(_react.default.createElement(RSliderPin, {
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
    key: "render",
    value: function render() {
      var _this$context$pin = this.context.pin,
          pin = _this$context$pin === void 0 ? {} : _this$context$pin;
      var step = pin.step;

      if (!step) {
        return '';
      }

      return _react.default.createElement("div", {
        className: "r-slider-pins"
      }, this.getPins());
    }
  }]);

  return RSliderPins;
}(_react.Component);

_defineProperty(RSliderPins, "contextType", ctx);

var RSliderPin =
/*#__PURE__*/
function (_Component4) {
  _inherits(RSliderPin, _Component4);

  function RSliderPin() {
    _classCallCheck(this, RSliderPin);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSliderPin).apply(this, arguments));
  }

  _createClass(RSliderPin, [{
    key: "getStyle",
    value: function getStyle(style) {
      var _this$context2 = this.context,
          styleName = _this$context2.styleName,
          start = _this$context2.start,
          end = _this$context2.end;
      var StartSide = styleName.StartSide;
      var value = this.props.value;
      return _jquery.default.extend({}, _defineProperty({}, StartSide, getPercentByValue(value, start, end) + '%'), style);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props,
          value = _this$props5.value,
          style = _this$props5.style;
      return _react.default.createElement("div", {
        className: "r-slider-pin",
        style: this.getStyle(style)
      });
    }
  }]);

  return RSliderPin;
}(_react.Component);

_defineProperty(RSliderPin, "contextType", ctx);

var RSliderLabels =
/*#__PURE__*/
function (_Component5) {
  _inherits(RSliderLabels, _Component5);

  function RSliderLabels() {
    _classCallCheck(this, RSliderLabels);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSliderLabels).apply(this, arguments));
  }

  _createClass(RSliderLabels, [{
    key: "getLabelsByStep",
    value: function getLabelsByStep() {
      var _this$context3 = this.context,
          start = _this$context3.start,
          _this$context3$label = _this$context3.label,
          label = _this$context3$label === void 0 ? {} : _this$context3$label,
          end = _this$context3.end;
      var _label$items = label.items,
          items = _label$items === void 0 ? [] : _label$items,
          step = label.step,
          style = label.style;
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
          Labels.push(_react.default.createElement(RSliderLabel, {
            key: key,
            label: {
              value: value,
              text: value
            },
            style: Style(value)
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
      var _this$context4 = this.context,
          _this$context4$label = _this$context4.label,
          label = _this$context4$label === void 0 ? {} : _this$context4$label,
          start = _this$context4.start,
          end = _this$context4.end,
          pin = _this$context4.pin;
      var _label$items2 = label.items,
          items = _label$items2 === void 0 ? [] : _label$items2,
          style = label.style;
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

        Labels.push(_react.default.createElement(RSliderLabel, {
          label: item,
          key: item.value + 'label',
          style: Style(item.value)
        }));
      }

      return Labels;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context$label = this.context.label,
          label = _this$context$label === void 0 ? {} : _this$context$label;
      var step = label.step;
      return _react.default.createElement("div", {
        className: "r-slider-labels"
      }, step && this.getLabelsByStep(), this.getLabels());
    }
  }]);

  return RSliderLabels;
}(_react.Component);

_defineProperty(RSliderLabels, "contextType", ctx);

var RSliderLabel =
/*#__PURE__*/
function (_Component6) {
  _inherits(RSliderLabel, _Component6);

  function RSliderLabel() {
    _classCallCheck(this, RSliderLabel);

    return _possibleConstructorReturn(this, _getPrototypeOf(RSliderLabel).apply(this, arguments));
  }

  _createClass(RSliderLabel, [{
    key: "getStyle",
    value: function getStyle(style) {
      var _$$extend2;

      var _this$context5 = this.context,
          styleName = _this$context5.styleName,
          start = _this$context5.start,
          end = _this$context5.end,
          getValue = _this$context5.getValue;
      var StartSide = styleName.StartSide;
      var _this$props$label = this.props.label,
          value = _this$props$label.value,
          color = _this$props$label.color;
      return _jquery.default.extend({}, (_$$extend2 = {}, _defineProperty(_$$extend2, StartSide, getPercentByValue(value, start, end) + '%'), _defineProperty(_$$extend2, "color", getValue(color)), _$$extend2), style);
    }
  }, {
    key: "click",
    value: function click(e) {
      var _this$context6 = this.context,
          points = _this$context6.points,
          update = _this$context6.update;
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
      var _this$props6 = this.props,
          label = _this$props6.label,
          style = _this$props6.style;
      var text = label.text,
          id = label.id,
          className = label.className;
      return _react.default.createElement("div", {
        id: id,
        className: "r-slider-label".concat(className ? ' ' + className : ''),
        style: this.getStyle(style),
        onClick: this.click.bind(this)
      }, text);
    }
  }]);

  return RSliderLabel;
}(_react.Component);

_defineProperty(RSliderLabel, "contextType", ctx);

var Line =
/*#__PURE__*/
function (_Component7) {
  _inherits(Line, _Component7);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _getPrototypeOf(Line).apply(this, arguments));
  }

  _createClass(Line, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "r-slider-line"
      });
    }
  }]);

  return Line;
}(_react.Component);

_defineProperty(Line, "contextType", ctx);

var Ranges =
/*#__PURE__*/
function (_Component8) {
  _inherits(Ranges, _Component8);

  function Ranges() {
    _classCallCheck(this, Ranges);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ranges).apply(this, arguments));
  }

  _createClass(Ranges, [{
    key: "render",
    value: function render() {
      var _this$context7 = this.context,
          points = _this$context7.points,
          styleName = _this$context7.styleName;
      var ranges = points.map(function (value, i) {
        return _react.default.createElement(Range, {
          index: i,
          key: i
        });
      });
      return _react.default.createElement("div", {
        className: "r-slider-ranges",
        style: {
          flexDirection: styleName.direction
        }
      }, ranges, _react.default.createElement(Range, {
        key: points.length,
        index: points.length
      }));
    }
  }]);

  return Ranges;
}(_react.Component);

_defineProperty(Ranges, "contextType", ctx);

var Range =
/*#__PURE__*/
function (_Component9) {
  _inherits(Range, _Component9);

  function Range() {
    _classCallCheck(this, Range);

    return _possibleConstructorReturn(this, _getPrototypeOf(Range).apply(this, arguments));
  }

  _createClass(Range, [{
    key: "render",
    value: function render() {
      var _this$context8 = this.context,
          points = _this$context8.points,
          showPoint = _this$context8.showPoint;
      var index = this.props.index;
      var length = points.length;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(RSiderSpace, {
        index: index
      }), index < length && showPoint !== false && _react.default.createElement(RSliderPoint, {
        index: index
      }));
    }
  }]);

  return Range;
}(_react.Component);

_defineProperty(Range, "contextType", ctx);

var RSiderSpace =
/*#__PURE__*/
function (_Component10) {
  _inherits(RSiderSpace, _Component10);

  function RSiderSpace(props) {
    var _this3;

    _classCallCheck(this, RSiderSpace);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(RSiderSpace).call(this, props));
    _this3.dom = (0, _react.createRef)();
    return _this3;
  }

  _createClass(RSiderSpace, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context9 = this.context,
          start = _this$context9.start,
          _this$context9$min = _this$context9.min,
          min = _this$context9$min === void 0 ? start : _this$context9$min,
          end = _this$context9.end,
          _this$context9$max = _this$context9.max,
          max = _this$context9$max === void 0 ? end : _this$context9$max,
          points = _this$context9.points;
      var index = this.props.index;
      var value = index === points.length ? max : points[index].value;
      var beforeValue = index === 0 ? start : points[index - 1].value;
      var percent = getPercentByValue(value, start, end);
      var beforePercent = getPercentByValue(beforeValue, start, end);
      return {
        flexGrow: percent - beforePercent
      };
    }
  }, {
    key: "getFillStyle",
    value: function getFillStyle() {
      var _this$context10 = this.context,
          points = _this$context10.points,
          endRange = _this$context10.endRange,
          getValue = _this$context10.getValue;
      var index = this.props.index;
      var value = index === points.length ? endRange : points[index];
      return {
        background: value && getValue(value.fillColor)
      };
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this$context11 = this.context,
          points = _this$context11.points,
          showValue = _this$context11.showValue,
          start = _this$context11.start,
          end = _this$context11.end,
          _this$context11$min = _this$context11.min,
          min = _this$context11$min === void 0 ? start : _this$context11$min,
          _this$context11$max = _this$context11.max,
          max = _this$context11$max === void 0 ? end : _this$context11$max,
          styleName = _this$context11.styleName,
          changable = _this$context11.changable;

      if (changable === false) {
        return;
      }

      var Thickness = styleName.Thickness;
      var length = points.length;
      var space = (0, _jquery.default)(this.dom.current);
      var container = space.parents('.r-slider-container');
      var index = this.props.index;
      (0, _jquery.default)('.r-slider-point-container').css({
        zIndex: 10
      });
      space.next('.r-slider-point-container').css({
        zIndex: 100
      });
      space.prev('.r-slider-point-container').css({
        zIndex: 100
      });

      if (showValue !== false) {
        container.find('.r-slider-value').show();
      }

      if (index === 0) {
        this.decreaseAll();
      } else if (index === length) {
        this.increaseAll();
      } else {
        this.startOffset = {
          mousePosition: getClient(e),
          startLimit: index === 1 ? min : points[index - 2].value,
          endLimit: index === length - 1 ? max : points[index + 1].value,
          index: index,
          startValue: points[index - 1].value,
          endValue: points[index].value,
          size: container[Thickness]()
        };
        eventHandler('window', 'mousemove', _jquery.default.proxy(this.mouseMove, this));
        eventHandler('window', 'mouseup', _jquery.default.proxy(this.mouseUp, this));
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this$context12 = this.context,
          points = _this$context12.points,
          update = _this$context12.update,
          getOffset = _this$context12.getOffset;
      var _this$startOffset = this.startOffset,
          mousePosition = _this$startOffset.mousePosition,
          index = _this$startOffset.index,
          size = _this$startOffset.size,
          startValue = _this$startOffset.startValue,
          endValue = _this$startOffset.endValue,
          startLimit = _this$startOffset.startLimit,
          endLimit = _this$startOffset.endLimit;
      var offset = getOffset(mousePosition, size, e);
      var lastPoint = points[index - 1],
          point = points[index];
      lastPoint.value = offset + startValue;
      point.value = offset + endValue;

      if (lastPoint.value < startLimit) {
        lastPoint.value = startLimit;
        point.value = startLimit + (endValue - startValue);
      }

      if (point.value > endLimit) {
        point.value = endLimit;
        lastPoint.value = endLimit - (endValue - startValue);
      }

      update(points, false, this.context);
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      eventHandler('window', 'mousemove', this.mouseMove, 'unbind');
      eventHandler('window', 'mouseup', this.mouseUp, 'unbind');
      var _this$context13 = this.context,
          update = _this$context13.update,
          showValue = _this$context13.showValue,
          points = _this$context13.points;

      if (showValue !== 'fix') {
        var space = (0, _jquery.default)(this.dom.current);
        space.parents('.r-slider-container').find('.r-slider-value').hide();
      }

      update(points, true, this.context);
    }
  }, {
    key: "decreaseAll",
    value: function decreaseAll() {
      var _this$context14 = this.context,
          start = _this$context14.start,
          _this$context14$min = _this$context14.min,
          min = _this$context14$min === void 0 ? start : _this$context14$min,
          step = _this$context14.step,
          points = _this$context14.points,
          update = _this$context14.update;
      var offset = Math.min(step, points[0].value - min);

      for (var i = 0; i < points.length; i++) {
        points[i].value -= offset;
      }

      update(points, true, this.context);
    }
  }, {
    key: "increaseAll",
    value: function increaseAll() {
      var _this$context15 = this.context,
          end = _this$context15.end,
          _this$context15$max = _this$context15.max,
          max = _this$context15$max === void 0 ? end : _this$context15$max,
          step = _this$context15.step,
          points = _this$context15.points,
          update = _this$context15.update;
      var offset = Math.min(step, max - points[points.length - 1].value);

      for (var i = 0; i < points.length; i++) {
        points[i].value += offset;
      }

      update(points, true, this.context);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context16 = this.context,
          points = _this$context16.points,
          showFill = _this$context16.showFill,
          endRange = _this$context16.endRange,
          touch = _this$context16.touch;
      var index = this.props.index;
      var length = points.length;
      var value = index === length ? endRange : points[index];

      if (showFill === false) {
        return '';
      }

      var props = _defineProperty({}, touch ? 'onTouchStart' : 'onMouseDown', this.mouseDown.bind(this));

      return _react.default.createElement("div", _extends({
        ref: this.dom,
        className: "r-slider-space",
        style: this.getStyle()
      }, props), _react.default.createElement("div", {
        className: "r-slider-fill",
        "data-index": index,
        style: this.getFillStyle()
      }), _react.default.createElement("div", {
        className: "r-slider-text"
      }, value && value.text ? value.text : ''));
    }
  }]);

  return RSiderSpace;
}(_react.Component);

_defineProperty(RSiderSpace, "contextType", ctx);

var RSliderPoint =
/*#__PURE__*/
function (_Component11) {
  _inherits(RSliderPoint, _Component11);

  function RSliderPoint(props) {
    var _this4;

    _classCallCheck(this, RSliderPoint);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(RSliderPoint).call(this, props));
    _this4.dom = (0, _react.createRef)();
    return _this4;
  }

  _createClass(RSliderPoint, [{
    key: "getStyle",
    value: function getStyle() {
      var _this$context17 = this.context,
          points = _this$context17.points,
          styleName = _this$context17.styleName,
          start = _this$context17.start,
          end = _this$context17.end;
      var index = this.props.index;
      return _defineProperty({}, styleName.StartSide, getPercentByValue(points[index].value, start, end) + '%');
    }
  }, {
    key: "getNumberStyle",
    value: function getNumberStyle() {
      var showValue = this.context.showValue;
      return {
        display: showValue !== 'fix' ? 'none' : 'block'
      };
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this$context18 = this.context,
          update = _this$context18.update,
          changable = _this$context18.changable,
          start = _this$context18.start,
          end = _this$context18.end,
          points = _this$context18.points,
          _this$context18$min = _this$context18.min,
          min = _this$context18$min === void 0 ? start : _this$context18$min,
          _this$context18$max = _this$context18.max,
          max = _this$context18$max === void 0 ? end : _this$context18$max,
          showValue = _this$context18.showValue,
          styleName = _this$context18.styleName,
          onpointmousedown = _this$context18.onpointmousedown;
      var Thickness = styleName.Thickness;
      var index = this.props.index;

      if (changable === false) {
        return;
      }

      var button = (0, _jquery.default)(this.dom.current);
      (0, _jquery.default)('.r-slider-point-container').css({
        zIndex: 10
      });
      button.css({
        zIndex: 100
      });
      var container = button.parents('.r-slider-container');

      if (showValue !== false) {
        container.find('.r-slider-value').show();
      }

      var value = points[index].value;
      this.startOffset = {
        mousePosition: getClient(e),
        startLimit: index === 0 ? min : points[index - 1].value,
        endLimit: index === points.length - 1 ? max : points[index + 1].value,
        index: index,
        value: value,
        size: container[Thickness]()
      };

      if (onpointmousedown) {
        onpointmousedown(this.context);
      }

      if (points.length === 1 && start === 0 && end === 1) {
        points[0].value = points[0].value === 0 ? 1 : 0;
        update(points, true, this.context);
      } else {
        eventHandler('window', 'mousemove', _jquery.default.proxy(this.mouseMove, this));
      }

      eventHandler('window', 'mouseup', _jquery.default.proxy(this.mouseUp, this));
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this$context19 = this.context,
          update = _this$context19.update,
          points = _this$context19.points,
          getOffset = _this$context19.getOffset;
      var _this$startOffset2 = this.startOffset,
          mousePosition = _this$startOffset2.mousePosition,
          size = _this$startOffset2.size,
          value = _this$startOffset2.value,
          startLimit = _this$startOffset2.startLimit,
          endLimit = _this$startOffset2.endLimit,
          index = _this$startOffset2.index;
      var point = points[index];
      var newValue = parseFloat(value) + getOffset(mousePosition, size, e);

      if (newValue < startLimit) {
        newValue = startLimit;
      }

      if (newValue > endLimit) {
        newValue = endLimit;
      }

      if (point.value === newValue) {
        return;
      }

      point.value = newValue;
      update(points, false, this.context);
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      eventHandler('window', 'mousemove', this.mouseMove, 'unbind');
      eventHandler('window', 'mouseup', this.mouseUp, 'unbind');
      var _this$context20 = this.context,
          showValue = _this$context20.showValue,
          update = _this$context20.update,
          points = _this$context20.points;

      if (showValue !== 'fix') {
        var button = (0, _jquery.default)(this.dom.current);
        button.parents('.r-slider-container').find('.r-slider-value').hide();
      }

      update(points, true, this.context);
    }
  }, {
    key: "render",
    value: function render() {
      var _props2;

      var index = this.props.index;
      var _this$context21 = this.context,
          points = _this$context21.points,
          showValue = _this$context21.showValue,
          showButton = _this$context21.showButton,
          getValue = _this$context21.getValue,
          touch = _this$context21.touch;

      if (showButton === false) {
        return '';
      }

      var value = points[index];
      var props = (_props2 = {}, _defineProperty(_props2, touch ? 'onTouchStart' : 'onMouseDown', this.mouseDown.bind(this)), _defineProperty(_props2, "className", "r-slider-point-container"), _props2);
      return _react.default.createElement("div", _extends({
        ref: this.dom,
        style: this.getStyle()
      }, props), _react.default.createElement("div", {
        className: "r-slider-point".concat(value.className ? ' ' + value.className : ''),
        style: typeof value.style === 'function' ? value.style(value) : value.style
      }, showValue !== false && _react.default.createElement("div", {
        style: this.getNumberStyle(),
        className: "r-slider-value"
      }, value.value), getValue(value.html) || ''));
    }
  }]);

  return RSliderPoint;
}(_react.Component);

_defineProperty(RSliderPoint, "contextType", ctx);