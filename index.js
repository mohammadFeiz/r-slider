"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    return _this;
  }

  _createClass(Slider, [{
    key: "update",
    value: function update() {
      this.setState({});
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
    key: "getPercentByValue",
    value: function getPercentByValue(value) {
      var _this$props = this.props,
          start = _this$props.start,
          end = _this$props.end;
      return 100 * (value - start) / (end - start);
    }
  }, {
    key: "getStyleName",
    value: function getStyleName() {
      var _this$props$direction = this.props.direction,
          direction = _this$props$direction === void 0 ? 'right' : _this$props$direction;
      var sn = {
        Thickness: direction === 'left' || direction === 'right' ? 'width' : 'height',
        Thickness_r: direction === 'left' || direction === 'right' ? 'height' : 'width',
        OtherSide: direction === 'left' || direction === 'right' ? 'top' : 'left',
        OtherSide_r: direction === 'left' || direction === 'right' ? 'bottom' : 'right',
        Axis: direction === 'left' || direction === 'right' ? 'x' : 'y',
        Sign: direction === 'right' || direction === 'down' ? 1 : -1
      };

      if (direction === "right") {
        sn['StartSide'] = "left";
        sn['EndSide'] = "right";
      } else if (direction === "left") {
        sn['StartSide'] = "right";
        sn['EndSide'] = "left";
      } else if (direction === "down") {
        sn['StartSide'] = "top";
        sn['EndSide'] = "bottom";
      } else if (direction === "up") {
        sn['StartSide'] = "bottom";
        sn['EndSide'] = "top";
      }

      return sn;
    }
  }, {
    key: "getClassName",
    value: function getClassName(className) {
      var _this$props$direction2 = this.props.direction,
          direction = _this$props$direction2 === void 0 ? 'right' : _this$props$direction2;
      var oriention = direction === "left" || direction === "right" ? "horizontal" : "vertical";
      return 'r-slider ' + oriention + (className && typeof className === 'string' ? ' ' + className : '');
    }
  }, {
    key: "getValue",
    value: function getValue(value) {
      if (typeof value === 'function') {
        return value(this.props);
      } else {
        return value;
      }
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      var _this$props2 = this.props,
          _this$props2$style = _this$props2.style,
          style = _this$props2$style === void 0 ? {} : _this$props2$style,
          backgroundColor = _this$props2.backgroundColor;
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
      var _this$props3 = this.props,
          className = _this$props3.className,
          id = _this$props3.id,
          points = _this$props3.points,
          start = _this$props3.start,
          end = _this$props3.end,
          _this$props3$min = _this$props3.min,
          min = _this$props3$min === void 0 ? start : _this$props3$min,
          _this$props3$max = _this$props3.max,
          max = _this$props3$max === void 0 ? end : _this$props3$max;
      this.getValidPoints(points, min, max);
      var contextValue = { ...this.props
      };
      contextValue.styleName = this.getStyleName();
      contextValue.getPercentByValue = this.getPercentByValue.bind(this);
      contextValue.update = this.update.bind(this);
      contextValue.getValue = this.getValue.bind(this);
      return _react.default.createElement(ctx.Provider, {
        value: contextValue
      }, _react.default.createElement("div", {
        style: this.getStyle(),
        className: this.getClassName(className),
        ref: this.dom,
        id: id
      }, _react.default.createElement(SliderContainer, null)));
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
  point_width: 10,
  point_height: 10,
  margin: 0,
  thixkness: 2,
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
    key: "getStyle",
    value: function getStyle() {
      var _this$context = this.context,
          margin = _this$context.margin,
          styleName = _this$context.styleName,
          getValue = _this$context.getValue;
      var Thickness = styleName.Thickness,
          Thickness_r = styleName.Thickness_r,
          StartSide = styleName.StartSide,
          OtherSide = styleName.OtherSide;
      var size = getValue(this.context['point_' + Thickness]);
      var size_r = getValue(this.context['point_' + Thickness_r]);
      var obj = {
        position: 'absolute'
      };
      obj[StartSide] = size / 2 + margin + 'px';
      obj[OtherSide] = 'calc(50% - ' + size_r / 2 + 'px)';
      obj[Thickness] = 'calc(100% - ' + (size + margin * 2) + 'px';
      obj[Thickness_r] = size_r + 'px';
      obj['userSelect'] = 'none';
      return obj;
    }
    /**
     * @param {d} string (direction of slider)
     */

  }, {
    key: "getLabelStyle",
    value: function getLabelStyle(value, color) {
      var _ref;

      var _this$context2 = this.context,
          styleName = _this$context2.styleName,
          getPercentByValue = _this$context2.getPercentByValue,
          labelPosition = _this$context2.labelPosition;
      var StartSide = styleName.StartSide;
      var _labelPosition$x = labelPosition.x,
          x = _labelPosition$x === void 0 ? 0 : _labelPosition$x,
          _labelPosition$y = labelPosition.y,
          y = _labelPosition$y === void 0 ? 0 : _labelPosition$y;
      return _ref = {
        position: 'absolute',
        lineHeight: 0,
        textAlign: 'center',
        width: '4px',
        height: '4px',
        color: color
      }, _defineProperty(_ref, StartSide, getPercentByValue(value) + '%'), _defineProperty(_ref, "transform", 'translate(' + x + 'px,' + y + 'px)'), _ref;
    }
  }, {
    key: "getPinStyle",
    value: function getPinStyle(value, index) {
      var _$$extend;

      var _this$context3 = this.context,
          styleName = _this$context3.styleName,
          getPercentByValue = _this$context3.getPercentByValue,
          _this$context3$thickn = _this$context3.thickness,
          thickness = _this$context3$thickn === void 0 ? 4 : _this$context3$thickn,
          pinStyle = _this$context3.pinStyle,
          _this$context3$pinPos = _this$context3.pinPosition,
          pinPosition = _this$context3$pinPos === void 0 ? {} : _this$context3$pinPos;
      var Thickness = styleName.Thickness,
          Thickness_r = styleName.Thickness_r,
          OtherSide = styleName.OtherSide,
          StartSide = styleName.StartSide;
      return _jquery.default.extend({}, (_$$extend = {
        position: 'absolute'
      }, _defineProperty(_$$extend, Thickness, '1px'), _defineProperty(_$$extend, Thickness_r, thickness + 4), _defineProperty(_$$extend, OtherSide, 'calc(50% - ' + (thickness + 4) / 2 + 'px)'), _defineProperty(_$$extend, StartSide, getPercentByValue(value) + '%'), _defineProperty(_$$extend, "transform", "translate(".concat(pinPosition.x || 0, "px,").concat(pinPosition.y || 0, "px)")), _$$extend), typeof pinStyle === 'function' ? pinStyle(value, index) : pinStyle);
    }
  }, {
    key: "labelMouseDown",
    value: function labelMouseDown(e) {
      var _this$context4 = this.context,
          points = _this$context4.points,
          update = _this$context4.update,
          onchange = _this$context4.onchange;
      var value = parseFloat((0, _jquery.default)(e.currentTarget).attr('data-value'));
      var index = 0;
      var diff = Math.abs(points[0].value - value);

      for (var i = 1; i < points.length; i++) {
        var point = points[i];

        if (Math.abs(point.value - value) < diff) {
          index = i;
        }
      }

      points[index].value = value;
      update(points);

      if (onchange) {
        onchange(this.context, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context5 = this.context,
          endRange = _this$context5.endRange,
          points = _this$context5.points,
          pinStep = _this$context5.pinStep,
          start = _this$context5.start,
          end = _this$context5.end,
          labelStep = _this$context5.labelStep,
          _this$context5$labels = _this$context5.labels,
          labels = _this$context5$labels === void 0 ? [] : _this$context5$labels,
          getValue = _this$context5.getValue;
      var customLabels = labels.map(function (label) {
        return label.value;
      });
      var pins = [];

      if (pinStep) {
        var pinValue = start;
        var pinIndex = 0;

        while (pinValue <= end) {
          pins.push(_react.default.createElement("div", {
            className: "r-slider-pin",
            style: this.getPinStyle(pinValue, pinIndex),
            key: pinIndex
          }));
          pinValue += pinStep;
          pinIndex++;
        }
      }

      if (labelStep) {
        var Labels = [];
        var labelStart = Math.round((start - labelStep) / labelStep) * labelStep;
        var labelValue = labelStart;
        var labelIndex = 0;

        while (labelValue <= end) {
          if (customLabels.indexOf(labelValue) === -1 && labelValue >= start) {
            Labels.push(_react.default.createElement("div", {
              className: "r-slider-label",
              style: this.getLabelStyle(labelValue),
              key: labelIndex,
              onMouseDown: this.labelMouseDown.bind(this),
              "data-value": labelValue
            }, _react.default.createElement("div", {
              style: {
                width: '200px',
                position: 'absolute',
                left: '-100px'
              }
            }, labelValue)));
          }

          labelValue += labelStep;
          labelValue = parseFloat(labelValue.toFixed(6));
          labelIndex++;
        }
      }

      var textLabels = [];

      for (var i = 0; i < labels.length; i++) {
        var tl = labels[i];

        if (tl.value < start || tl.value > end) {
          continue;
        }

        textLabels.push(_react.default.createElement("div", {
          className: "r-slider-label",
          style: this.getLabelStyle(tl.value, getValue(tl.color)),
          key: tl.value + 'label',
          onMouseDown: this.labelMouseDown.bind(this),
          "data-value": tl.value
        }, _react.default.createElement("div", {
          style: {
            width: '200px',
            position: 'absolute',
            left: '-100px'
          }
        }, tl.text)));
        pins.push(_react.default.createElement("div", {
          className: "r-slider-pin",
          style: this.getPinStyle(tl.value),
          key: tl.value + 'pin'
        }));
      }

      return _react.default.createElement("div", {
        className: "r-slider-container",
        style: this.getStyle(),
        ref: this.dom
      }, pins, labelStep && Labels, textLabels, _react.default.createElement(Line, null), _react.default.createElement(Ranges, null));
    }
  }]);

  return SliderContainer;
}(_react.Component);

_defineProperty(SliderContainer, "contextType", ctx);

var Line =
/*#__PURE__*/
function (_Component3) {
  _inherits(Line, _Component3);

  function Line() {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _getPrototypeOf(Line).apply(this, arguments));
  }

  _createClass(Line, [{
    key: "getStyle",
    value: function getStyle() {
      var _ref2;

      var _this$context6 = this.context,
          styleName = _this$context6.styleName,
          _this$context6$thickn = _this$context6.thickness,
          thickness = _this$context6$thickn === void 0 ? 3 : _this$context6$thickn,
          emptyColor = _this$context6.emptyColor;
      var StartSide = styleName.StartSide,
          OtherSide = styleName.OtherSide,
          Thickness = styleName.Thickness,
          Thickness_r = styleName.Thickness_r;
      return _ref2 = {
        position: 'absolute'
      }, _defineProperty(_ref2, StartSide, 0), _defineProperty(_ref2, OtherSide, 'calc(50% - ' + thickness / 2 + 'px)'), _defineProperty(_ref2, Thickness_r, thickness + 'px'), _defineProperty(_ref2, Thickness, '100%'), _defineProperty(_ref2, "background", emptyColor), _defineProperty(_ref2, "zIndex", 1), _ref2;
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "r-slider-line",
        style: this.getStyle()
      });
    }
  }]);

  return Line;
}(_react.Component);

_defineProperty(Line, "contextType", ctx);

var Ranges =
/*#__PURE__*/
function (_Component4) {
  _inherits(Ranges, _Component4);

  function Ranges() {
    _classCallCheck(this, Ranges);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ranges).apply(this, arguments));
  }

  _createClass(Ranges, [{
    key: "render",
    value: function render() {
      var points = this.context.points;
      var ranges = points.map(function (value, i) {
        return _react.default.createElement(Range, {
          index: i,
          key: i
        });
      });
      return _react.default.createElement("div", {
        className: "r-slider-ranges"
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
function (_Component5) {
  _inherits(Range, _Component5);

  function Range() {
    _classCallCheck(this, Range);

    return _possibleConstructorReturn(this, _getPrototypeOf(Range).apply(this, arguments));
  }

  _createClass(Range, [{
    key: "render",
    value: function render() {
      var points = this.context.points;
      var index = this.props.index;
      var length = points.length;
      return _react.default.createElement(_react.Fragment, null, _react.default.createElement(Space, {
        index: index
      }), index < length && _react.default.createElement(Button, {
        index: index
      }));
    }
  }]);

  return Range;
}(_react.Component);

_defineProperty(Range, "contextType", ctx);

var Space =
/*#__PURE__*/
function (_Component6) {
  _inherits(Space, _Component6);

  function Space(props) {
    var _this3;

    _classCallCheck(this, Space);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Space).call(this, props));
    _this3.dom = (0, _react.createRef)();
    return _this3;
  }

  _createClass(Space, [{
    key: "getStyle",
    value: function getStyle() {
      var _ref3;

      var _this$context7 = this.context,
          start = _this$context7.start,
          _this$context7$min = _this$context7.min,
          min = _this$context7$min === void 0 ? start : _this$context7$min,
          end = _this$context7.end,
          _this$context7$max = _this$context7.max,
          max = _this$context7$max === void 0 ? end : _this$context7$max,
          points = _this$context7.points,
          styleName = _this$context7.styleName,
          getPercentByValue = _this$context7.getPercentByValue;
      var Thickness = styleName.Thickness,
          Thickness_r = styleName.Thickness_r,
          OtherSide = styleName.OtherSide,
          StartSide = styleName.StartSide;
      var index = this.props.index;
      var length = points.length;
      var value = index === length ? max : points[index].value;
      var beforeValue = index === 0 ? start : points[index - 1].value;
      var percent = getPercentByValue(value);
      var beforePercent = getPercentByValue(beforeValue);
      return _ref3 = {
        position: 'absolute',
        zIndex: 1,
        overflow: 'hidden',
        cursor: 'pointer'
      }, _defineProperty(_ref3, Thickness, percent - beforePercent + '%'), _defineProperty(_ref3, Thickness_r, '100%'), _defineProperty(_ref3, OtherSide, 0), _defineProperty(_ref3, StartSide, beforePercent + '%'), _ref3;
    }
  }, {
    key: "getFillStyle",
    value: function getFillStyle() {
      var _ref4;

      var _this$context8 = this.context,
          styleName = _this$context8.styleName,
          _this$context8$thickn = _this$context8.thickness,
          thickness = _this$context8$thickn === void 0 ? 3 : _this$context8$thickn,
          points = _this$context8.points,
          endRange = _this$context8.endRange,
          getValue = _this$context8.getValue;
      var index = this.props.index;
      var length = points.length;
      var value = index === length ? endRange : points[index];
      return _ref4 = {
        position: 'absolute',
        zIndex: 10,
        cursor: 'pointer'
      }, _defineProperty(_ref4, styleName.StartSide, 0), _defineProperty(_ref4, styleName.OtherSide, 'calc(50% - ' + thickness / 2 + 'px)'), _defineProperty(_ref4, styleName.Thickness_r, thickness + 'px'), _defineProperty(_ref4, styleName.Thickness, '100%'), _defineProperty(_ref4, "background", value && getValue(value.fillColor)), _ref4;
    }
  }, {
    key: "getTextStyle",
    value: function getTextStyle() {
      var _this$context9 = this.context,
          styleName = _this$context9.styleName,
          _this$context9$point_ = _this$context9.point_height,
          point_height = _this$context9$point_ === void 0 ? 10 : _this$context9$point_,
          points = _this$context9.points,
          getValue = _this$context9.getValue;
      var StartSide = styleName.StartSide,
          OtherSide = styleName.OtherSide,
          Thickness = styleName.Thickness,
          EndSide = styleName.EndSide;
      var index = this.props.index;
      var size = getValue(this.context['point_' + Thickness]);
      var obj = {
        position: 'absolute',
        textAlign: 'center',
        zIndex: 10,
        lineHeight: getValue(point_height) + 'px'
      };

      if (index === 0) {
        obj[Thickness] = 'calc(100% - ' + size / 2 + 'px)';
        obj[StartSide] = 0;
        obj[OtherSide] = 0;
      } else if (index === points.length) {
        obj[Thickness] = 'calc(100% - ' + size / 2 + 'px)';
        obj[EndSide] = 0;
        obj[OtherSide] = 0;
      } else {
        obj[Thickness] = '100%';
      }

      return obj;
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this$context10 = this.context,
          points = _this$context10.points,
          showValue = _this$context10.showValue,
          start = _this$context10.start,
          end = _this$context10.end,
          _this$context10$min = _this$context10.min,
          min = _this$context10$min === void 0 ? start : _this$context10$min,
          _this$context10$max = _this$context10.max,
          max = _this$context10$max === void 0 ? end : _this$context10$max,
          styleName = _this$context10.styleName,
          changable = _this$context10.changable;

      if (changable === false) {
        return;
      }

      var Thickness = styleName.Thickness;
      var length = points.length;
      var space = (0, _jquery.default)(this.dom.current);
      var container = space.parents('.r-slider-container');
      var index = this.props.index;
      (0, _jquery.default)('.r-slider-point').css({
        zIndex: 10
      });
      space.next('.r-slider-point').css({
        zIndex: 100
      });
      space.prev('.r-slider-point').css({
        zIndex: 100
      });

      if (showValue !== false) {
        container.find('.r-slider-number').show();
      }

      if (index === 0) {
        this.decreaseAll();
      } else if (index === length) {
        this.increaseAll();
      } else {
        this.startOffset = {
          x: e.clientX,
          y: e.clientY,
          startLimit: index === 1 ? min : points[index - 2].value,
          endLimit: index === length - 1 ? max : points[index + 1].value,
          index: index,
          startValue: points[index - 1].value,
          endValue: points[index].value,
          width: container[Thickness]()
        };
        (0, _jquery.default)(window).bind('mousemove', _jquery.default.proxy(this.mouseMove, this));
        (0, _jquery.default)(window).bind('mouseup', _jquery.default.proxy(this.mouseUp, this));
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this$context11 = this.context,
          start = _this$context11.start,
          end = _this$context11.end,
          step = _this$context11.step,
          styleName = _this$context11.styleName,
          points = _this$context11.points,
          onchange = _this$context11.onchange,
          update = _this$context11.update;
      var so = this.startOffset;
      var offset = {
        x: e.clientX - so.x,
        y: e.clientY - so.y
      };
      offset = offset[styleName.Axis] * styleName.Sign;
      offset = (end - start) * offset / so.width;
      offset = Math.round(offset / step) * step; //var startDistance = points[so.index-1].value - so.startLimit;
      //var endDistance = so.endLimit - points[so.index].value;

      points[so.index - 1].value = offset + so.startValue;
      points[so.index].value = offset + so.endValue;

      if (points[so.index - 1].value < so.startLimit) {
        points[so.index - 1].value = so.startLimit;
        points[so.index].value = so.startLimit + (so.endValue - so.startValue);
      }

      if (points[so.index].value > so.endLimit) {
        points[so.index].value = so.endLimit;
        points[so.index - 1].value = so.endLimit - (so.endValue - so.startValue);
      }

      update(points);

      if (onchange) {
        var st = false;
        onchange(this.context, st);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      (0, _jquery.default)(window).unbind('mousemove', this.mouseMove);
      (0, _jquery.default)(window).unbind('mouseup', this.mouseUp);
      var _this$context12 = this.context,
          onchange = _this$context12.onchange,
          showValue = _this$context12.showValue;

      if (showValue !== 'fix') {
        var space = (0, _jquery.default)(this.dom.current);
        space.parents('.r-slider-container').find('.r-slider-number').hide();
      }

      if (onchange) {
        onchange(this.context, true);
      }
    }
  }, {
    key: "decreaseAll",
    value: function decreaseAll() {
      var _this$context13 = this.context,
          start = _this$context13.start,
          _this$context13$min = _this$context13.min,
          min = _this$context13$min === void 0 ? start : _this$context13$min,
          step = _this$context13.step,
          points = _this$context13.points,
          onchange = _this$context13.onchange,
          update = _this$context13.update;
      var offset = Math.min(step, points[0].value - min);

      for (var i = 0; i < points.length; i++) {
        points[i].value -= offset;
      }

      update(points);

      if (onchange) {
        onchange(this.context, true);
      }
    }
  }, {
    key: "increaseAll",
    value: function increaseAll() {
      var _this$context14 = this.context,
          end = _this$context14.end,
          _this$context14$max = _this$context14.max,
          max = _this$context14$max === void 0 ? end : _this$context14$max,
          step = _this$context14.step,
          points = _this$context14.points,
          onchange = _this$context14.onchange,
          update = _this$context14.update;
      var offset = Math.min(step, max - points[points.length - 1].value);

      for (var i = 0; i < points.length; i++) {
        points[i].value += offset;
      }

      update(points);

      if (onchange) {
        onchange(this.context, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context15 = this.context,
          points = _this$context15.points,
          showFill = _this$context15.showFill,
          endRange = _this$context15.endRange;
      var index = this.props.index;
      var length = points.length;
      var value = index === length ? endRange : points[index];

      if (showFill === false) {
        return '';
      }

      return _react.default.createElement("div", {
        ref: this.dom,
        className: "r-slider-space",
        style: this.getStyle(),
        onMouseDown: this.mouseDown.bind(this)
      }, _react.default.createElement("div", {
        className: "r-slider-fill",
        "data-index": index,
        style: this.getFillStyle()
      }), _react.default.createElement("div", {
        className: "r-slider-text",
        style: this.getTextStyle()
      }, value && value.text ? value.text : ''));
    }
  }]);

  return Space;
}(_react.Component);

_defineProperty(Space, "contextType", ctx);

var Button =
/*#__PURE__*/
function (_Component7) {
  _inherits(Button, _Component7);

  function Button(props) {
    var _this4;

    _classCallCheck(this, Button);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this, props));
    _this4.dom = (0, _react.createRef)();
    return _this4;
  }

  _createClass(Button, [{
    key: "getStyle",
    value: function getStyle(style) {
      var _$$extend2;

      var _this$context16 = this.context,
          points = _this$context16.points,
          styleName = _this$context16.styleName,
          getPercentByValue = _this$context16.getPercentByValue,
          point_width = _this$context16.point_width,
          point_height = _this$context16.point_height,
          getValue = _this$context16.getValue;
      var StartSide = styleName.StartSide,
          OtherSide = styleName.OtherSide,
          Thickness = styleName.Thickness;
      var index = this.props.index;
      var value = points[index];
      var percent = getPercentByValue(value.value);
      var size = getValue(this.context['point_' + Thickness]);
      return _jquery.default.extend({}, (_$$extend2 = {
        border: 'none',
        position: 'absolute',
        borderRadius: value.rounded === false ? 0 : undefined,
        zIndex: 10,
        cursor: 'pointer',
        background: getValue(value.pointColor),
        height: getValue(point_height) + 'px',
        width: getValue(point_width) + 'px'
      }, _defineProperty(_$$extend2, StartSide, 'calc(' + percent + '% - ' + size / 2 + 'px)'), _defineProperty(_$$extend2, OtherSide, 0), _$$extend2), style);
    }
  }, {
    key: "getNumberStyle",
    value: function getNumberStyle() {
      var showValue = this.context.showValue;
      return {
        zIndex: 1000,
        display: showValue !== 'fix' ? 'none' : 'block'
      };
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this$context17 = this.context,
          update = _this$context17.update,
          changable = _this$context17.changable,
          start = _this$context17.start,
          end = _this$context17.end,
          points = _this$context17.points,
          _this$context17$min = _this$context17.min,
          min = _this$context17$min === void 0 ? start : _this$context17$min,
          _this$context17$max = _this$context17.max,
          max = _this$context17$max === void 0 ? end : _this$context17$max,
          showValue = _this$context17.showValue,
          styleName = _this$context17.styleName,
          onpointmousedown = _this$context17.onpointmousedown;
      var Thickness = styleName.Thickness;
      var index = this.props.index;

      if (changable === false) {
        return;
      }

      var button = (0, _jquery.default)(this.dom.current);
      (0, _jquery.default)('.r-slider-point').css({
        zIndex: 10
      });
      button.css({
        zIndex: 100
      });
      var container = button.parents('.r-slider-container');

      if (showValue !== false) {
        container.find('.r-slider-number').show();
      }

      var value = points[index].value;
      this.startOffset = {
        x: e.clientX,
        y: e.clientY,
        startLimit: index === 0 ? min : points[index - 1].value,
        endLimit: index === points.length - 1 ? max : points[index + 1].value,
        index: index,
        value: value,
        width: container[Thickness]()
      };

      if (onpointmousedown) {
        onpointmousedown(this.context);
      }

      if (points.length === 1 && start === 0 && end === 1) {
        points[0].value = points[0].value === 0 ? 1 : 0;
        update(points);
      } else {
        (0, _jquery.default)(window).bind('mousemove', _jquery.default.proxy(this.mouseMove, this));
      }

      (0, _jquery.default)(window).bind('mouseup', _jquery.default.proxy(this.mouseUp, this));
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this$context18 = this.context,
          styleName = _this$context18.styleName,
          onchange = _this$context18.onchange,
          update = _this$context18.update,
          start = _this$context18.start,
          end = _this$context18.end,
          step = _this$context18.step,
          points = _this$context18.points;
      var Axis = styleName.Axis,
          Sign = styleName.Sign;
      var so = this.startOffset;
      var offset = {
        x: e.clientX - so.x,
        y: e.clientY - so.y
      };
      offset = offset[Axis] * Sign;
      offset = (end - start) * offset / so.width;
      offset = Math.round(offset / step) * step;
      var newValue = parseFloat(so.value) + offset;

      if (newValue < so.startLimit) {
        newValue = so.startLimit;
      }

      if (newValue > so.endLimit) {
        newValue = so.endLimit;
      }

      if (points[so.index].value === newValue) {
        return;
      }

      points[so.index].value = newValue;
      update(points);

      if (onchange) {
        onchange(this.context, false);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      (0, _jquery.default)(window).unbind('mousemove', this.mouseMove);
      (0, _jquery.default)(window).unbind('mouseup', this.mouseUp);
      var _this$context19 = this.context,
          showValue = _this$context19.showValue,
          onchange = _this$context19.onchange;

      if (showValue !== 'fix') {
        var button = (0, _jquery.default)(this.dom.current);
        button.parents('.r-slider-container').find('.r-slider-number').hide();
      }

      if (onchange) {
        onchange(this.context, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var index = this.props.index;
      var _this$context20 = this.context,
          points = _this$context20.points,
          showValue = _this$context20.showValue,
          showButton = _this$context20.showButton,
          getValue = _this$context20.getValue;

      if (showButton === false) {
        return '';
      }

      var value = points[index];
      return _react.default.createElement("div", {
        ref: this.dom,
        className: "r-slider-point",
        style: this.getStyle(value.style),
        onMouseDown: this.mouseDown.bind(this)
      }, showValue !== false && _react.default.createElement("div", {
        style: this.getNumberStyle(),
        className: "r-slider-number"
      }, value.value), getValue(value.html) || '');
    }
  }]);

  return Button;
}(_react.Component);

_defineProperty(Button, "contextType", ctx);