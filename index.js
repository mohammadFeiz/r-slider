"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
    _this.state = {
      points: _this.props.points
    };
    return _this;
  }

  _createClass(Slider, [{
    key: "update",
    value: function update(points) {
      this.setState({
        points: points
      });
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
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          className = _this$props3.className,
          id = _this$props3.id;
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
          _this$context$margin = _this$context.margin,
          margin = _this$context$margin === void 0 ? 0 : _this$context$margin,
          styleName = _this$context.styleName;
      var Thickness = styleName.Thickness,
          Thickness_r = styleName.Thickness_r,
          StartSide = styleName.StartSide,
          OtherSide = styleName.OtherSide;
      var size = this.context['point_' + Thickness] || 10;
      var size_r = this.context['point_' + Thickness_r] || 10;
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
          _this$context2$labelP = _this$context2.labelPosition,
          labelPosition = _this$context2$labelP === void 0 ? {} : _this$context2$labelP;
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
    value: function getPinStyle(value) {
      var _ref2;

      var _this$context3 = this.context,
          styleName = _this$context3.styleName,
          getPercentByValue = _this$context3.getPercentByValue,
          _this$context3$thickn = _this$context3.thickness,
          thickness = _this$context3$thickn === void 0 ? 4 : _this$context3$thickn;
      var Thickness = styleName.Thickness,
          Thickness_r = styleName.Thickness_r,
          OtherSide = styleName.OtherSide,
          StartSide = styleName.StartSide;
      return _ref2 = {
        position: 'absolute'
      }, _defineProperty(_ref2, Thickness, '1px'), _defineProperty(_ref2, Thickness_r, thickness + 4), _defineProperty(_ref2, OtherSide, 'calc(50% - ' + (thickness + 4) / 2 + 'px)'), _defineProperty(_ref2, StartSide, getPercentByValue(value) + '%'), _ref2;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$context4 = this.context,
          endRange = _this$context4.endRange,
          points = _this$context4.points,
          pinStep = _this$context4.pinStep,
          start = _this$context4.start,
          end = _this$context4.end,
          labelStep = _this$context4.labelStep,
          _this$context4$labels = _this$context4.labels,
          labels = _this$context4$labels === void 0 ? [] : _this$context4$labels;
      var ranges = points.map(function (value, i) {
        return _react.default.createElement(Range, {
          index: i,
          key: i
        });
      });
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
            style: this.getPinStyle(pinValue),
            key: pinIndex
          }));
          pinValue += pinStep;
          pinIndex++;
        }
      }

      if (labelStep) {
        var Labels = [];
        var labelValue = start;
        var labelIndex = 0;

        while (labelValue <= end) {
          if (customLabels.indexOf(labelValue) === -1) {
            Labels.push(_react.default.createElement("div", {
              className: "r-slider-label",
              style: this.getLabelStyle(labelValue),
              key: labelIndex
            }, _react.default.createElement("div", {
              style: {
                width: '200px',
                position: 'absolute',
                left: '-100px'
              }
            }, labelValue)));
          }

          labelValue += labelStep;
          labelIndex++;
        }
      }

      var textLabels = [];

      for (var i = 0; i < labels.length; i++) {
        var tl = labels[i];
        textLabels.push(_react.default.createElement("div", {
          className: "r-slider-label",
          style: this.getLabelStyle(tl.value, tl.color),
          key: tl.value + 'label'
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
      }, pins, labelStep && Labels, textLabels, _react.default.createElement(Line, null), ranges, _react.default.createElement(Range, {
        index: points.length
      }));
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
      var _ref3;

      var _this$context5 = this.context,
          styleName = _this$context5.styleName,
          _this$context5$thickn = _this$context5.thickness,
          thickness = _this$context5$thickn === void 0 ? 3 : _this$context5$thickn,
          _this$context5$emptyC = _this$context5.emptyColor,
          emptyColor = _this$context5$emptyC === void 0 ? '#ddd' : _this$context5$emptyC;
      var StartSide = styleName.StartSide,
          OtherSide = styleName.OtherSide,
          Thickness = styleName.Thickness,
          Thickness_r = styleName.Thickness_r;
      return _ref3 = {
        position: 'absolute'
      }, _defineProperty(_ref3, StartSide, 0), _defineProperty(_ref3, OtherSide, 'calc(50% - ' + thickness / 2 + 'px)'), _defineProperty(_ref3, Thickness_r, thickness + 'px'), _defineProperty(_ref3, Thickness, '100%'), _defineProperty(_ref3, "background", emptyColor), _defineProperty(_ref3, "zIndex", 1), _ref3;
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

var Range =
/*#__PURE__*/
function (_Component4) {
  _inherits(Range, _Component4);

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
function (_Component5) {
  _inherits(Space, _Component5);

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
      var _ref4;

      var _this$context6 = this.context,
          start = _this$context6.start,
          _this$context6$min = _this$context6.min,
          min = _this$context6$min === void 0 ? start : _this$context6$min,
          end = _this$context6.end,
          _this$context6$max = _this$context6.max,
          max = _this$context6$max === void 0 ? end : _this$context6$max,
          points = _this$context6.points,
          styleName = _this$context6.styleName,
          getPercentByValue = _this$context6.getPercentByValue;
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
      return _ref4 = {
        position: 'absolute',
        zIndex: 100,
        overflow: 'hidden',
        cursor: 'pointer'
      }, _defineProperty(_ref4, Thickness, percent - beforePercent + '%'), _defineProperty(_ref4, Thickness_r, '100%'), _defineProperty(_ref4, OtherSide, 0), _defineProperty(_ref4, StartSide, beforePercent + '%'), _ref4;
    }
  }, {
    key: "getFillStyle",
    value: function getFillStyle() {
      var _ref5;

      var _this$context7 = this.context,
          styleName = _this$context7.styleName,
          _this$context7$thickn = _this$context7.thickness,
          thickness = _this$context7$thickn === void 0 ? 3 : _this$context7$thickn,
          points = _this$context7.points,
          endRange = _this$context7.endRange,
          getValue = _this$context7.getValue;
      var index = this.props.index;
      var length = points.length;
      var value = index === length ? endRange : points[index];
      return _ref5 = {
        position: 'absolute',
        zIndex: 10,
        cursor: 'pointer'
      }, _defineProperty(_ref5, styleName.StartSide, 0), _defineProperty(_ref5, styleName.OtherSide, 'calc(50% - ' + thickness / 2 + 'px)'), _defineProperty(_ref5, styleName.Thickness_r, thickness + 'px'), _defineProperty(_ref5, styleName.Thickness, '100%'), _defineProperty(_ref5, "background", value && getValue(value.fillColor)), _ref5;
    }
  }, {
    key: "getTextStyle",
    value: function getTextStyle() {
      var _this$context8 = this.context,
          styleName = _this$context8.styleName,
          _this$context8$point_ = _this$context8.point_height,
          point_height = _this$context8$point_ === void 0 ? 10 : _this$context8$point_,
          points = _this$context8.points;
      var StartSide = styleName.StartSide,
          OtherSide = styleName.OtherSide,
          Thickness = styleName.Thickness,
          EndSide = styleName.EndSide;
      var index = this.props.index;
      var size = this.context['point_' + Thickness] || 10;
      var obj = {
        position: 'absolute',
        textAlign: 'center',
        zIndex: 10,
        lineHeight: point_height + 'px'
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
      var _this$context9 = this.context,
          points = _this$context9.points,
          showValue = _this$context9.showValue,
          start = _this$context9.start,
          end = _this$context9.end,
          _this$context9$min = _this$context9.min,
          min = _this$context9$min === void 0 ? start : _this$context9$min,
          _this$context9$max = _this$context9.max,
          max = _this$context9$max === void 0 ? end : _this$context9$max,
          styleName = _this$context9.styleName,
          changable = _this$context9.changable;

      if (changable === false) {
        return;
      }

      var Thickness = styleName.Thickness;
      var length = points.length;
      var space = (0, _jquery.default)(this.dom.current);
      var index = this.props.index;

      if (showValue !== false) {
        space.parent('.r-slider-container').find('.r-slider-number').show();
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
          width: (0, _jquery.default)(this.dom.current).parent('.r-slider-container')[Thickness]()
        };
        (0, _jquery.default)(window).bind('mousemove', _jquery.default.proxy(this.mouseMove, this));
        (0, _jquery.default)(window).bind('mouseup', _jquery.default.proxy(this.mouseUp, this));
      }
    }
  }, {
    key: "mouseMove",
    value: function mouseMove(e) {
      var _this$context10 = this.context,
          start = _this$context10.start,
          end = _this$context10.end,
          step = _this$context10.step,
          styleName = _this$context10.styleName,
          points = _this$context10.points,
          onchange = _this$context10.onchange,
          update = _this$context10.update;
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
        onchange(this.context, false);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      (0, _jquery.default)(window).unbind('mousemove', this.mouseMove);
      (0, _jquery.default)(window).unbind('mouseup', this.mouseUp);
      var _this$context11 = this.context,
          onchange = _this$context11.onchange,
          fixValue = _this$context11.fixValue;

      if (!fixValue) {
        var space = (0, _jquery.default)(this.dom.current);
        space.parent('.r-slider-container').find('.r-slider-number').hide();
      }

      if (onchange) {
        onchange(this.context, true);
      }
    }
  }, {
    key: "decreaseAll",
    value: function decreaseAll() {
      var _this$context12 = this.context,
          start = _this$context12.start,
          _this$context12$min = _this$context12.min,
          min = _this$context12$min === void 0 ? start : _this$context12$min,
          step = _this$context12.step,
          points = _this$context12.points,
          onchange = _this$context12.onchange,
          update = _this$context12.update;
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
      var _this$context13 = this.context,
          end = _this$context13.end,
          _this$context13$max = _this$context13.max,
          max = _this$context13$max === void 0 ? end : _this$context13$max,
          step = _this$context13.step,
          points = _this$context13.points,
          onchange = _this$context13.onchange,
          update = _this$context13.update;
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
      var _this$context14 = this.context,
          points = _this$context14.points,
          showFill = _this$context14.showFill,
          endRange = _this$context14.endRange;
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
function (_Component6) {
  _inherits(Button, _Component6);

  function Button(props) {
    var _this4;

    _classCallCheck(this, Button);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this, props));
    _this4.dom = (0, _react.createRef)();
    return _this4;
  }

  _createClass(Button, [{
    key: "getStyle",
    value: function getStyle() {
      var _ref6;

      var _this$context15 = this.context,
          points = _this$context15.points,
          styleName = _this$context15.styleName,
          getPercentByValue = _this$context15.getPercentByValue,
          _this$context15$point = _this$context15.point_width,
          point_width = _this$context15$point === void 0 ? 10 : _this$context15$point,
          _this$context15$point2 = _this$context15.point_height,
          point_height = _this$context15$point2 === void 0 ? 10 : _this$context15$point2,
          getValue = _this$context15.getValue;
      var StartSide = styleName.StartSide,
          OtherSide = styleName.OtherSide,
          Thickness = styleName.Thickness;
      var index = this.props.index;
      var value = points[index];
      var percent = getPercentByValue(value.value);
      var size = this.context['point_' + Thickness] || 10;
      return _ref6 = {
        border: 'none',
        position: 'absolute',
        borderRadius: value.rounded === false ? 0 : undefined,
        zIndex: 1000,
        cursor: 'pointer',
        background: getValue(value.pointColor),
        height: point_height + 'px',
        width: point_width + 'px'
      }, _defineProperty(_ref6, StartSide, 'calc(' + percent + '% - ' + size / 2 + 'px)'), _defineProperty(_ref6, OtherSide, 0), _ref6;
    }
  }, {
    key: "getNumberStyle",
    value: function getNumberStyle() {
      var fixValue = this.context.fixValue;
      return {
        zIndex: 1000,
        display: fixValue !== true ? 'none' : 'block'
      };
    }
  }, {
    key: "mouseDown",
    value: function mouseDown(e) {
      var _this$context16 = this.context,
          update = _this$context16.update,
          changable = _this$context16.changable,
          start = _this$context16.start,
          end = _this$context16.end,
          points = _this$context16.points,
          _this$context16$min = _this$context16.min,
          min = _this$context16$min === void 0 ? start : _this$context16$min,
          _this$context16$max = _this$context16.max,
          max = _this$context16$max === void 0 ? end : _this$context16$max,
          showValue = _this$context16.showValue,
          styleName = _this$context16.styleName,
          onpointmousedown = _this$context16.onpointmousedown;
      var Thickness = styleName.Thickness;
      var index = this.props.index;

      if (changable === false) {
        return;
      }

      var button = (0, _jquery.default)(this.dom.current);

      if (showValue !== false) {
        button.parent('.r-slider-container').find('.r-slider-number').show();
      }

      var value = points[index].value;
      this.startOffset = {
        x: e.clientX,
        y: e.clientY,
        startLimit: index === 0 ? min : points[index - 1].value,
        endLimit: index === points.length - 1 ? max : points[index + 1].value,
        index: index,
        value: value,
        width: (0, _jquery.default)(this.dom.current).parent('.r-slider-container')[Thickness]()
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
      var _this$context17 = this.context,
          styleName = _this$context17.styleName,
          onchange = _this$context17.onchange,
          update = _this$context17.update,
          start = _this$context17.start,
          end = _this$context17.end,
          step = _this$context17.step,
          points = _this$context17.points;
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
        onchange(this.context, true);
      }
    }
  }, {
    key: "mouseUp",
    value: function mouseUp() {
      (0, _jquery.default)(window).unbind('mousemove', this.mouseMove);
      (0, _jquery.default)(window).unbind('mouseup', this.mouseUp);
      var _this$context18 = this.context,
          fixValue = _this$context18.fixValue,
          onchange = _this$context18.onchange;

      if (!fixValue) {
        var button = (0, _jquery.default)(this.dom.current);
        button.parent('.r-slider-container').find('.r-slider-number').hide();
      }

      if (onchange) {
        onchange(this.context, true);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var index = this.props.index;
      var _this$context19 = this.context,
          points = _this$context19.points,
          showValue = _this$context19.showValue,
          showButton = _this$context19.showButton;

      if (showButton === false) {
        return '';
      }

      var value = points[index];
      return _react.default.createElement("div", {
        ref: this.dom,
        className: "r-slider-point",
        style: this.getStyle(),
        onMouseDown: this.mouseDown.bind(this)
      }, showValue !== false && _react.default.createElement("div", {
        style: this.getNumberStyle(),
        className: "r-slider-number"
      }, value.value), value.html || '');
    }
  }]);

  return Button;
}(_react.Component);

_defineProperty(Button, "contextType", ctx);