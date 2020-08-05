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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RRangeSliderContext = /*#__PURE__*/(0, _react.createContext)();

class RRangeSlider extends _react.Component {
  constructor(props) {
    super(props);
    var {
      direction,
      points,
      htmlStyle
    } = this.props;

    if (['left', 'right', 'top', 'bottom'].indexOf(direction) === -1) {
      console.error('r-range-slider direction props is not valid');
    } //direction requirments


    if (direction === 'left') {
      this.getDiff = function (x, y, client) {
        return x - client.x;
      };

      this.oriention = 'horizontal';
    } else if (direction === 'right') {
      this.getDiff = function (x, y, client) {
        return client.x - x;
      };

      this.oriention = 'horizontal';
    } else if (direction === 'top') {
      this.getDiff = function (x, y, client) {
        return y - client.y;
      };

      this.oriention = 'vertical';
      this.flexDirection = 'column-reverse';
    } else {
      this.getDiff = function (x, y, client) {
        return client.y - y;
      };

      this.oriention = 'vertical';
      this.flexDirection = 'column';
    }

    this.htmlStyle = _jquery.default.extend({}, {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }, htmlStyle);
    this.touch = this.isMobile();
    this.dom = /*#__PURE__*/(0, _react.createRef)();
    var {
      start,
      end,
      min = start,
      max = end,
      step
    } = this.props;
    this.state = {
      isDown: false,
      points: this.getValidPoints(points, start, end, min, max, step),
      getValidPoints: this.getValidPoints.bind(this)
    };
    var step = this.props.step.toString();
    var dotPos = step.indexOf('.');
    this.fixValue = dotPos === -1 ? 0 : step.length - dotPos - 1;
  }

  isMobile() {
    return 'ontouchstart' in document.documentElement;
  }

  getClient(e) {
    return this.touch ? {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    } : {
      x: e.clientX,
      y: e.clientY
    };
  }

  getPercentByValue(value, start, end) {
    return 100 * (value - start) / (end - start);
  } //getPercentByValue


  fix(number, a = 6) {
    return parseFloat(number.toFixed(a));
  }

  getStartByStep(start, step) {
    var a = Math.round((start - step) / step) * step;

    while (a < start) {
      a += step;
    }

    return a;
  }

  eventHandler(selector, event, action, type = 'bind') {
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

  static getDerivedStateFromProps(props, state) {
    var {
      start,
      end,
      min = start,
      max = end,
      step
    } = props;
    var points = state.getValidPoints(props.points, start, end, min, max, step);
    return {
      points
    };
  }

  getValidPoints(points, start, end, min, max, step) {
    if (this.props.values) {
      return points;
    }

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

  update(points, final, context) {
    var {
      onchange,
      ondrag
    } = this.props;

    if (final && onchange) {
      onchange(context);
    } else if (ondrag) {
      ondrag(context);
    } else {
      this.setState({
        points
      });
    }
  }

  getOffset(x, y, size, e) {
    var {
      start,
      end,
      step,
      values
    } = this.props,
        client = this.getClient(e);

    if (values) {
      start = 0;
      end = values.length - 1;
    }

    return Math.round((end - start) * this.getDiff(x, y, client) / size / step) * step;
  }

  getValue(value, param = this.props) {
    return typeof value === 'function' ? value(param) : value;
  }

  getPercents() {
    var {
      start,
      end,
      values
    } = this.props,
        {
      points
    } = this.state;

    if (values) {
      start = 0;
      end = values.length - 1;
      var indexes = points.map((p, i) => values.indexOf(p.value));
      var percents = indexes.map((index, i) => [this.getPercentByValue(i ? indexes[i - 1] : start, start, end), this.getPercentByValue(index, start, end)]);
      percents.push([percents[percents.length - 1][1], 100]);
      return percents;
    }

    var percents = points.map((p, i) => [this.getPercentByValue(i ? points[i - 1].value : start, start, end), this.getPercentByValue(p.value, start, end)]);
    percents.push([percents[percents.length - 1][1], 100]);
    return percents;
  }

  decreaseAll(value = this.props.step) {
    var {
      points
    } = this.state;
    var {
      values
    } = this.props;

    if (values) {
      var start = 0;
      var {
        min = start
      } = this.props;
      var offset = values.indexOf(points[0].value) === values.indexOf(min) ? 0 : 1;

      for (var i = 0; i < points.length; i++) {
        var index = values.indexOf(points[i].value);
        points[i].value = values[index - offset];
      }
    } else {
      var start = this.props.start;
      var {
        min = start
      } = this.props;
      var offset = Math.min(value, points[0].value - this.getValue(min));

      for (var i = 0; i < points.length; i++) {
        points[i].value -= offset;
        points[i].value = this.fix(points[i].value, this.fixValue);
      }
    }

    this.moved = true;
  }

  increaseAll(value = this.props.step) {
    var {
      points
    } = this.state;
    var {
      values
    } = this.props;

    if (values) {
      var end = points.length - 1;
      var {
        max = end
      } = this.props;
      var offset = values.indexOf(points[points.length - 1].value) === values.indexOf(max) ? 0 : 1;

      for (var i = 0; i < points.length; i++) {
        var index = values.indexOf(points[i].value);
        points[i].value = values[index + offset];
      }
    } else {
      var end = this.props.end;
      var {
        max = end
      } = this.props;
      var offset = Math.min(value, this.getValue(max) - points[points.length - 1].value);

      for (var i = 0; i < points.length; i++) {
        points[i].value += offset;
        points[i].value = this.fix(points[i].value, this.fixValue);
      }
    }

    this.moved = true; //update(points,true,this.context);
  }

  mouseDown(e, index, type) {
    e.preventDefault();
    var {
      points
    } = this.state,
        {
      start,
      end,
      min = start,
      max = end,
      onmousedown,
      editable
    } = this.props;

    if (onmousedown) {
      onmousedown(e, index, this.props);
    }

    if (!editable) {
      return;
    }

    var {
      x,
      y
    } = this.getClient(e),
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
      let pointContainer = pointContainers.eq(index);
      pointContainer.css({
        zIndex: 100
      });
      pointContainer.find('.r-range-slider-point').addClass('active');
      var current = points[index].value;
      var before = index === 0 ? min : points[index - 1].value;
      var after = index === points.length - 1 ? max : points[index + 1].value;
      this.startOffset = {
        x,
        y,
        size,
        index: [index],
        value: [current],
        startLimit: before - current,
        endLimit: after - current
      };
    } else {
      let pointContainer1 = pointContainers.eq(index - 1);
      let pointContainer2 = pointContainers.eq(index);
      pointContainer1.css({
        zIndex: 100
      });
      pointContainer2.css({
        zIndex: 100
      });
      let p1 = pointContainer1.find('.r-range-slider-point');
      let p2 = pointContainer2.find('.r-range-slider-point');
      p1.addClass('active');
      p2.addClass('active');

      if (index === 0) {
        this.decreaseAll();
      } else if (index === length) {
        this.increaseAll();
      }

      if (index === 0 || index === length) {
        this.startOffset = {
          x,
          y,
          size,
          index: points.map((p, i) => i),
          value: points.map(p => p.value),
          startLimit: min - points[0].value,
          endLimit: max - points[length - 1].value
        };
      } else {
        var point1 = points[index - 1].value,
            point2 = points[index].value;
        var before = index === 1 ? min : points[index - 2]; //مقدار قبلی رنج

        var after = index === length - 1 ? max : points[index + 1].value; //مقدار بعدی رنج

        this.startOffset = {
          x,
          y,
          size,
          index: [index - 1, index],
          value: [point1, point2],
          startLimit: before - point1,
          endLimit: after - point2
        };
      }
    }
  }

  mouseDownByValues(e, index, type) {
    e.preventDefault();
    var {
      points
    } = this.state,
        {
      values
    } = this.props,
        start = values[0],
        end = values[values.length - 1],
        {
      min = start,
      max = end,
      onmousedown
    } = this.props;

    if (onmousedown) {
      onmousedown(this.props);
    }

    var {
      x,
      y
    } = this.getClient(e),
        dom = (0, _jquery.default)(this.dom.current);
    var pointContainers = dom.find('.r-range-slider-point-container');
    var size = dom.find('.r-range-slider-line')[this.oriention === 'horizontal' ? 'width' : 'height']();
    var length = points.length;
    this.eventHandler('window', 'mousemove', _jquery.default.proxy(this.mouseMoveByValues, this));
    this.eventHandler('window', 'mouseup', _jquery.default.proxy(this.mouseUp, this));
    this.moved = false;
    this.setState({
      isDown: true
    });
    pointContainers.css({
      zIndex: 10
    });
    min = values.indexOf(min);
    max = values.indexOf(max);

    if (type === 'point') {
      let pointContainer = pointContainers.eq(index);
      pointContainer.css({
        zIndex: 100
      });
      pointContainer.find('.r-range-slider-point').addClass('active');
      var current = values.indexOf(points[index].value);
      var before = index === 0 ? min : values.indexOf(points[index - 1].value);
      var after = index === points.length - 1 ? max : values.indexOf(points[index + 1].value);
      this.startOffset = {
        x,
        y,
        size,
        index: [index],
        value: [current],
        startLimit: before - current,
        endLimit: after - current
      };
    } else {
      let pointContainer1 = pointContainers.eq(index - 1);
      let pointContainer2 = pointContainers.eq(index);
      pointContainer1.css({
        zIndex: 100
      });
      pointContainer2.css({
        zIndex: 100
      });
      let p1 = pointContainer1.find('.r-range-slider-point');
      let p2 = pointContainer2.find('.r-range-slider-point');
      p1.addClass('active');
      p2.addClass('active');

      if (index === 0) {
        this.decreaseAll();
      } else if (index === length) {
        this.increaseAll();
      }

      if (index === 0 || index === length) {
        this.startOffset = {
          x,
          y,
          size,
          index: points.map((p, i) => i),
          value: points.map(p => values.indexOf(p.value)),
          startLimit: min - values.indexOf(points[0].value),
          endLimit: max - values.indexOf(points[length - 1].value)
        };
      } else {
        var point1 = values.indexOf(points[index - 1].value),
            point2 = values.indexOf(points[index].value);
        var before = index === 1 ? min : values.indexOf(points[index - 2].value); //مقدار قبلی رنج

        var after = index === length - 1 ? max : values.indexOf(points[index + 1].value); //مقدار بعدی رنج

        this.startOffset = {
          x,
          y,
          size,
          index: [index - 1, index],
          value: [point1, point2],
          startLimit: before - point1,
          endLimit: after - point2
        };
      }
    }
  }

  sliderMouseMove(e, index) {
    var {
      onmousemove
    } = this.props;

    if (onmousemove) {
      onmousemove(e, index);
    }
  }

  mouseMove(e) {
    var {
      points
    } = this.state;
    var {
      x,
      y,
      size,
      value,
      startLimit,
      endLimit,
      index
    } = this.startOffset;
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

  mouseMoveByValues(e) {
    var {
      points
    } = this.state,
        {
      values
    } = this.props;
    var {
      x,
      y,
      size,
      value,
      startLimit,
      endLimit,
      index
    } = this.startOffset;
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
          newValue = Value + offset;

      if (point.value === values[newValue]) {
        return;
      }

      point.value = values[newValue];
    }

    this.moved = true;
    this.update(points, false, this.context);
  }

  mouseUp() {
    this.eventHandler('window', 'mousemove', this.mouseMove, 'unbind');
    this.eventHandler('window', 'mousemove', this.mouseMoveByValues, 'unbind');
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

  getContext() {
    var context = _objectSpread({}, this.props);

    context.oriention = this.oriention;
    context.getValue = this.getValue.bind(this);
    context.isDown = this.state.isDown;
    context.mouseDown = this.mouseDown.bind(this);
    context.mouseMove = this.sliderMouseMove.bind(this);
    context.mouseDownByValues = this.mouseDownByValues.bind(this);
    context.getStartByStep = this.getStartByStep.bind(this);
    context.getPercentByValue = this.getPercentByValue.bind(this);
    context.touch = this.touch;
    context.update = this.update.bind(this);
    context.points = this.state.points;
    return context;
  }

  getStyle() {
    var obj = this.getValue(this.props.style) || {};
    obj = _objectSpread({}, obj);
    obj.direction = 'ltr';
    obj.flexDirection = this.flexDirection;
    return obj;
  }

  render() {
    var {
      points
    } = this.state;
    this.context = this.getContext();
    var {
      startHtml,
      endHtml,
      className,
      id
    } = this.props;
    var percents = this.getPercents();
    return /*#__PURE__*/_react.default.createElement(RRangeSliderContext.Provider, {
      value: this.context
    }, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.dom,
      id: id,
      className: `r-range-slider ${this.context.oriention}${className ? ' ' + className : ''}`,
      style: this.getStyle()
    }, startHtml && /*#__PURE__*/_react.default.createElement("div", {
      style: this.htmlStyle
    }, this.getValue(startHtml)), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }
    }, /*#__PURE__*/_react.default.createElement(RRangeSliderLine, null), /*#__PURE__*/_react.default.createElement(RRangeSliderLabels, null), /*#__PURE__*/_react.default.createElement(RRangeSliderPins, null), points.map((p, i) => /*#__PURE__*/_react.default.createElement(RRangeSliderFill, {
      key: i,
      index: i,
      percent: percents[i]
    })), /*#__PURE__*/_react.default.createElement(RRangeSliderFill, {
      key: points.length,
      index: points.length,
      percent: percents[points.length]
    }), points.map((p, i) => /*#__PURE__*/_react.default.createElement(RRangeSliderPoint, {
      key: i,
      index: i,
      percent: percents[i]
    }))), endHtml && /*#__PURE__*/_react.default.createElement("div", {
      style: this.htmlStyle
    }, this.getValue(endHtml))));
  }

}

exports.default = RRangeSlider;
RRangeSlider.defaultProps = {
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
  valueStyle: {},
  style: {},
  textStyle: {},
  showValue: true,
  editable: true
};

class RRangeSliderLine extends _react.Component {
  render() {
    var {
      oriention,
      lineStyle
    } = this.context;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-line",
      style: lineStyle
    });
  }

}

_defineProperty(RRangeSliderLine, "contextType", RRangeSliderContext);

class RRangeSliderFill extends _react.Component {
  getFillStyle() {
    var {
      getValue,
      points,
      fillStyle,
      endRange
    } = this.context,
        {
      index
    } = this.props;
    var point = index === points.length ? endRange : points[index];
    return _jquery.default.extend({}, getValue(fillStyle), getValue(point.fillStyle || {}));
  }

  getContainerStyle() {
    var {
      oriention,
      direction
    } = this.context,
        {
      percent
    } = this.props;
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

  render() {
    var {
      touch,
      mouseDown,
      mouseMove,
      mouseDownByValues,
      points,
      endRange,
      getValue,
      endRange,
      values,
      rangeEvents = {}
    } = this.context;
    var {
      index
    } = this.props;
    var point = index === points.length ? endRange : points[index];
    var containerProps = {
      'data-index': index,
      className: 'r-range-slider-fill-container',
      [touch ? 'onTouchStart' : 'onMouseDown']: e => {
        if (values) {
          mouseDownByValues(e, index, 'fill');
        } else {
          mouseDown(e, index, 'fill');
        }
      },
      onMouseMove: e => mouseMove(e, index),
      style: this.getContainerStyle()
    };

    for (let prop in rangeEvents) {
      containerProps[prop] = () => rangeEvents[prop](index);
    }

    return /*#__PURE__*/_react.default.createElement("div", containerProps, /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-fill",
      style: this.getFillStyle()
    }), point.text && /*#__PURE__*/_react.default.createElement("div", null, getValue(point.text)));
  }

}

_defineProperty(RRangeSliderFill, "contextType", RRangeSliderContext);

class RRangeSliderPoint extends _react.Component {
  getPointStyle() {
    var {
      getValue,
      points,
      pointStyle
    } = this.context,
        {
      index
    } = this.props;
    return _jquery.default.extend({}, getValue(pointStyle), getValue(points[index].pointStyle));
  }

  getContainerStyle() {
    var {
      direction
    } = this.context,
        {
      percent
    } = this.props;
    return {
      [{
        right: 'left',
        left: 'right',
        top: 'bottom',
        bottom: 'top'
      }[direction]]: percent[1] + '%'
    };
  }

  getValueStyle() {
    var {
      points,
      showValue,
      isDown,
      getValue,
      valueStyle
    } = this.context;
    var {
      index
    } = this.props;
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

  render() {
    var {
      points,
      touch,
      mouseDown,
      mouseMove,
      mouseDownByValues,
      editValue,
      values,
      pointEvents
    } = this.context;
    var {
      index
    } = this.props;
    var point = points[index];
    var props = {
      style: this.getContainerStyle(),
      'data-index': index,
      className: 'r-range-slider-point-container',
      [touch ? 'onTouchStart' : 'onMouseDown']: e => {
        if (values) {
          mouseDownByValues(e, index, 'point');
        } else {
          mouseDown(e, index, 'point');
        }
      },
      onMouseMove: e => mouseMove(e, index)
    };

    for (let prop in pointEvents) {
      props[prop] = () => pointEvents[prop](index);
    }

    var pointProps = {
      className: 'r-range-slider-point',
      style: this.getPointStyle()
    };
    var valueProps = {
      style: this.getValueStyle(),
      className: 'r-range-slider-value'
    };
    return /*#__PURE__*/_react.default.createElement("div", props, /*#__PURE__*/_react.default.createElement("div", pointProps, point.html && point.html), /*#__PURE__*/_react.default.createElement("div", valueProps, editValue ? editValue(point, index) : point.value));
  }

}

_defineProperty(RRangeSliderPoint, "contextType", RRangeSliderContext);

class RRangeSliderLabels extends _react.Component {
  getLabelsByStep() {
    var {
      start,
      label = {},
      end,
      getStartByStep,
      values
    } = this.context;

    if (values) {
      start = 0;
      end = values.length - 1;
    }

    var {
      items = [],
      step,
      style,
      edit,
      rotate,
      ignoreStep
    } = label;
    var customLabels = values ? items.map(item => values.indexOf(item.value)) : items.map(item => item.value);
    var Style = typeof style === 'function' ? val => {
      return style(val, this.context);
    } : function (val) {
      return style;
    };
    var Labels = [];
    var value = getStartByStep(start, step);
    var key = 0;

    while (value <= end) {
      var index = customLabels.indexOf(value);

      if (index === -1) {
        Labels.push( /*#__PURE__*/_react.default.createElement(RRangeSliderLabel, {
          key: key,
          label: {
            value,
            text: values ? values[value] : value,
            edit
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

  getLabels() {
    var {
      label = {},
      values
    } = this.context,
        Labels = [],
        {
      items = [],
      style,
      rotate,
      ignoreStep
    } = label;
    var Style = typeof style === 'function' ? val => {
      return style(val, this.context);
    } : function (val) {
      return style;
    };

    if (values) {
      var start = 0,
          end = values.length - 1;

      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var index = values.indexOf(item.value);

        if (index === -1) {
          continue;
        }

        Labels.push( /*#__PURE__*/_react.default.createElement(RRangeSliderLabel, {
          rotate: rotate,
          label: {
            value: index,
            text: item.text
          },
          key: item.value + 'label',
          style: _jquery.default.extend({}, Style(item.value), item.style),
          type: "list"
        }));
      }
    } else {
      var {
        start,
        end
      } = this.context;

      for (var i = 0; i < items.length; i++) {
        if (ignoreStep && i % igonreStep !== 0) {
          continue;
        }

        var item = items[i];

        if (item.value < start || item.value > end) {
          continue;
        }

        Labels.push( /*#__PURE__*/_react.default.createElement(RRangeSliderLabel, {
          rotate: rotate,
          label: item,
          key: item.value + 'label',
          style: _jquery.default.extend({}, Style(item.value), item.style),
          type: "list"
        }));
      }
    }

    return Labels;
  }

  render() {
    var {
      label
    } = this.context;

    if (!label) {
      return null;
    }

    var {
      step
    } = label;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-labels"
    }, step && this.getLabelsByStep(), this.getLabels());
  }

}

_defineProperty(RRangeSliderLabels, "contextType", RRangeSliderContext);

class RRangeSliderLabel extends _react.Component {
  getStyle() {
    var {
      start,
      end,
      getPercentByValue,
      direction,
      style,
      values
    } = this.context;

    if (values) {
      start = 0;
      end = values.length - 1;
    }

    var {
      label,
      rotate,
      style
    } = this.props;
    var {
      value
    } = label;

    var obj = _objectSpread({}, style);

    obj[{
      right: 'left',
      left: 'right',
      top: 'bottom',
      bottom: 'top'
    }[direction]] = getPercentByValue(value, start, end) + '%';

    if (rotate) {
      obj.transform = `rotate(${rotate + 'deg'})`;
      obj.justifyContent = rotate > 0 ? 'flex-start' : 'flex-end';
    }

    return obj;
  }

  click(e) {
    var {
      points,
      update,
      editable
    } = this.context;

    if (!editable) {
      return;
    }

    var {
      value
    } = this.props.label; //get nearest point to this value

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

  render() {
    var {
      label,
      type
    } = this.props;
    var {
      text,
      id,
      className,
      edit
    } = label;
    return /*#__PURE__*/_react.default.createElement("div", {
      id: id,
      onClick: this.click.bind(this),
      style: this.getStyle(),
      className: `r-range-slider-label${className ? ' ' + className : ''}`
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-label-text"
    }, edit && type === 'step' ? edit(text) : text));
  }

}

_defineProperty(RRangeSliderLabel, "contextType", RRangeSliderContext);

class RRangeSliderPins extends _react.Component {
  getPinsByStep() {
    var {
      start,
      end,
      pin,
      getStartByStep,
      values
    } = this.context,
        {
      step,
      style = {}
    } = pin;

    if (values) {
      start = 0;
      end = values.length - 1;
    }

    var value = getStartByStep(start, step);
    var key = 0,
        pins = [];
    var Style = typeof style === 'function' ? val => style(val, this.context) : () => style;

    while (value <= end) {
      pins.push( /*#__PURE__*/_react.default.createElement(RRangeSliderPin, {
        value: value,
        key: key,
        style: Style(value)
      }));
      value += step;
      key++;
    }

    return pins;
  }

  getPins() {
    var {
      pin = {},
      start,
      end
    } = this.context;
    var {
      items = [],
      style
    } = pin;
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

      Pins.push( /*#__PURE__*/_react.default.createElement(RRangeSliderPin, {
        value: item.value,
        key: item.value + 'pin',
        style: _jquery.default.extend({}, Style(item.value), item.style)
      }));
    }

    return Pins;
  }

  render() {
    var {
      pin = {}
    } = this.context;
    var {
      step,
      items
    } = pin;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-pins"
    }, step && this.getPinsByStep(), items && this.getPins());
  }

}

_defineProperty(RRangeSliderPins, "contextType", RRangeSliderContext);

class RRangeSliderPin extends _react.Component {
  getStyle() {
    var {
      start,
      end,
      direction,
      getPercentByValue,
      values
    } = this.context,
        {
      value,
      style
    } = this.props;

    if (values) {
      start = 0;
      end = values.length - 1;
    }

    var obj = _objectSpread({}, style);

    obj[{
      right: 'left',
      left: 'right',
      top: 'bottom',
      bottom: 'top'
    }[direction]] = getPercentByValue(value, start, end) + '%';
    return obj;
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-pin",
      style: this.getStyle()
    });
  }

}

_defineProperty(RRangeSliderPin, "contextType", RRangeSliderContext);