"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _jquery = _interopRequireDefault(require("jquery"));

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var RRangeSliderContext = /*#__PURE__*/(0, _react.createContext)();

class RRangeSlider extends _react.Component {
  constructor(props) {
    super(props);
    var {
      direction
    } = this.props;
    this.touch = 'ontouchstart' in document.documentElement;

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

    this.dom = /*#__PURE__*/(0, _react.createRef)();
    this.state = {
      isDown: false
    };
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


  fix(number) {
    let dotPos = this.props.step.toString().indexOf('.');
    let a = dotPos === -1 ? 0 : this.props.step.toString().length - dotPos - 1;
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

  getValidPoints() {
    let {
      points,
      start,
      end,
      min = start,
      max = end,
      step
    } = this.props;

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

  getOffset(x, y, size, e) {
    var {
      start,
      end,
      step
    } = this.props,
        client = this.getClient(e);
    return Math.round((end - start) * this.getDiff(x, y, client) / size / step) * step;
  }

  getValue(value, param = this.props) {
    return typeof value === 'function' ? value(param) : value;
  }

  getPercents() {
    var {
      start,
      end
    } = this.props;
    var percents = this.points.map((o, i) => [this.getPercentByValue(i ? this.points[i - 1] : start, start, end), this.getPercentByValue(o, start, end)]);
    percents.push([percents[percents.length - 1][1], 100]);
    return percents;
  }

  decreaseAll(step = this.props.step) {
    var start = this.props.start;
    var {
      min = start
    } = this.props;
    var offset = Math.min(step, this.points[0] - this.getValue(min));

    for (var i = 0; i < this.points.length; i++) {
      this.points[i] -= offset;
      this.points[i] = this.fix(this.points[i]);
    }

    this.moved = true;
  }

  increaseAll(step = this.props.step) {
    var end = this.props.end;
    var {
      max = end
    } = this.props;
    var offset = Math.min(step, this.getValue(max) - this.points[this.points.length - 1]);

    for (var i = 0; i < this.points.length; i++) {
      this.points[i] += offset;
      this.points[i] = this.fix(this.points[i]);
    }

    this.moved = true;
  }

  mouseDown(e, index, type) {
    e.preventDefault();
    var {
      start,
      end,
      min = start,
      max = end,
      onChange,
      disabled
    } = this.props;

    if (!onChange || disabled) {
      return;
    }

    var {
      x,
      y
    } = this.getClient(e),
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
      let pointContainer = pointContainers.eq(index);
      pointContainer.css({
        zIndex: 100
      });
      pointContainer.find('.r-range-slider-point').addClass('active');
      var current = this.points[index];
      var before = index === 0 ? min : this.points[index - 1];
      var after = index === this.points.length - 1 ? max : this.points[index + 1];
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
          index: this.points.map((o, i) => i),
          value: this.points.map(o => o),
          startLimit: min - this.points[0],
          endLimit: max - this.points[length - 1]
        };
      } else {
        var point1 = this.points[index - 1],
            point2 = this.points[index];
        var before = index === 1 ? min : this.points[index - 2]; //مقدار قبلی رنج

        var after = index === length - 1 ? max : this.points[index + 1]; //مقدار بعدی رنج

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

  mouseMove(e) {
    let {
      onChange
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
      let Index = index[i],
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

  mouseUp() {
    this.eventHandler('window', 'mousemove', this.mouseMove, 'unbind');
    this.eventHandler('window', 'mouseup', this.mouseUp, 'unbind');
    let {
      onChange
    } = this.props;
    var points = (0, _jquery.default)(this.dom.current).find('.r-range-slider-point');
    points.removeClass('active');
    this.setState({
      isDown: false
    });

    if (this.moved) {
      onChange(this.points, false);
    }
  }

  getContext() {
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

  getStyle() {
    let {
      attrs
    } = this.props;
    let {
      style = {}
    } = attrs;
    var obj = { ...style
    };
    obj = { ...obj
    };
    obj.direction = 'ltr';
    obj.flexDirection = this.flexDirection;
    return obj;
  }

  getClassName() {
    let {
      attrs
    } = this.props;
    let {
      className
    } = attrs;
    return `r-range-slider ${this.context.oriention}${className ? ' ' + className : ''}`;
  }

  render() {
    this.points = this.getValidPoints();
    this.context = this.getContext();
    var {
      labelStep,
      scaleStep,
      attrs
    } = this.props;
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
    }, /*#__PURE__*/_react.default.createElement(RRangeSliderLine, null), labelStep && /*#__PURE__*/_react.default.createElement(RRangeSliderLabels, null), scaleStep && /*#__PURE__*/_react.default.createElement(RRangeSliderScales, null), this.points.map((o, i) => /*#__PURE__*/_react.default.createElement(RRangeSliderFill, {
      key: i,
      index: i,
      percent: percents[i]
    })), /*#__PURE__*/_react.default.createElement(RRangeSliderFill, {
      key: this.points.length,
      index: this.points.length,
      percent: percents[this.points.length]
    }), this.points.map((o, i) => /*#__PURE__*/_react.default.createElement(RRangeSliderPoint, {
      key: i,
      index: i,
      percent: percents[i]
    })))));
  }

}

exports.default = RRangeSlider;
RRangeSlider.defaultProps = {
  direction: 'right',
  editLabel: a => a,
  labelStyle: () => {
    return {};
  },
  labelRotate: () => {
    return 0;
  },
  points: [0],
  scaleStyle: () => {
    return {};
  },
  getPointHTML: () => '',
  style: () => {},
  start: 0,
  end: 100,
  step: 1,
  activegetPointStyle: {},
  getText: () => {
    return '';
  },
  attrs: {},
  pointStyle: () => {
    return {};
  },
  lineStyle: () => {
    return {};
  },
  fillStyle: () => {
    return {};
  },
  valueStyle: () => {
    return {};
  },
  textStyle: {},
  editValue: (value, index) => value,
  textStyle: () => {}
};

class RRangeSliderLine extends _react.Component {
  render() {
    var {
      lineStyle
    } = this.context;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-line",
      style: lineStyle(this.context)
    });
  }

}

_defineProperty(RRangeSliderLine, "contextType", RRangeSliderContext);

class RRangeSliderFill extends _react.Component {
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
      mouseDown,
      rangeEvents = {},
      fillStyle,
      getText,
      textStyle,
      touch
    } = this.context;
    var {
      index
    } = this.props;
    var containerProps = {
      'data-index': index,
      className: 'r-range-slider-fill-container',
      [touch ? 'onTouchStart' : 'onMouseDown']: e => {
        mouseDown(e, index, 'fill');
      },
      style: this.getContainerStyle()
    };

    for (let prop in rangeEvents) {
      containerProps[prop] = () => rangeEvents[prop](index);
    }

    let text = getText(index, this.context);
    return /*#__PURE__*/_react.default.createElement("div", containerProps, /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-fill",
      style: fillStyle(index, this.context),
      "data-index": index
    }), text !== undefined && /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-text",
      style: textStyle(index)
    }, text));
  }

}

_defineProperty(RRangeSliderFill, "contextType", RRangeSliderContext);

class RRangeSliderPoint extends _react.Component {
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
      showValue,
      isDown,
      valueStyle
    } = this.context;
    var {
      index
    } = this.props;

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

  render() {
    var {
      points,
      mouseDown,
      editValue,
      pointEvents,
      getPointHTML,
      pointStyle,
      touch,
      fix
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
        mouseDown(e, index, 'point');
      }
    };

    for (let prop in pointEvents) {
      props[prop] = () => pointEvents[prop](index);
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
    let html = getPointHTML(index, this.context);
    return /*#__PURE__*/_react.default.createElement("div", props, /*#__PURE__*/_react.default.createElement("div", pointProps, html), /*#__PURE__*/_react.default.createElement("div", valueProps, editValue(fix(point), index)));
  }

}

_defineProperty(RRangeSliderPoint, "contextType", RRangeSliderContext);

class RRangeSliderLabels extends _react.Component {
  constructor(props) {
    super(props);
    this.dom = /*#__PURE__*/(0, _react.createRef)();
    (0, _jquery.default)(window).on('resize', this.update.bind(this));
  }

  getLabelsByStep() {
    var {
      start,
      label = {},
      end,
      getStartByStep,
      labelStep
    } = this.context;
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

  update() {
    var container = (0, _jquery.default)(this.dom.current);
    var labels = container.find('.r-range-slider-label div');

    if (!labels.length) {
      return;
    }

    var {
      direction,
      label = {}
    } = this.context;
    var firstLabel = labels.eq(0);
    var firstLabelThickness = firstLabel.attr('datarotated') === 'yes' ? 'height' : 'width';

    if (direction === 'right') {
      var end = firstLabel.offset().left + firstLabel[firstLabelThickness]();

      for (var i = 1; i < labels.length; i++) {
        var label = labels.eq(i);
        let thickness = label.attr('datarotated') === 'yes' ? 'height' : 'width';
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
        let thickness = label.attr('datarotated') === 'yes' ? 'height' : 'width';
        label.css({
          display: 'block'
        });
        var left = label.offset().left;
        var width = label[thickness]();
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

  componentDidMount() {
    this.update();
  }

  componentDidUpdate() {
    this.update();
  }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-labels",
      ref: this.dom
    }, this.getLabelsByStep());
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
      labelStyle,
      labelRotate
    } = this.context;
    var {
      value
    } = this.props;
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
    let rotate = labelRotate(value);

    if (rotate) {
      obj.transform = `rotate(${rotate + 'deg'})`;
      obj.justifyContent = rotate > 0 ? 'flex-start' : 'flex-end';
    }

    return obj;
  }

  click(e) {
    var {
      onLabelClick
    } = this.context;
    e.stopPropagation();

    if (!onLabelClick) {
      return;
    }

    var {
      value
    } = this.props;
    onLabelClick(value);
  }

  render() {
    let {
      editLabel,
      labelRotate
    } = this.context;
    let {
      value
    } = this.props;
    let rotate = labelRotate(value);
    let text;

    try {
      text = editLabel(value);
    } catch {
      text = '';
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      onClick: this.click.bind(this),
      style: this.getStyle(),
      className: `r-range-slider-label`
    }, /*#__PURE__*/_react.default.createElement("div", {
      datarotated: rotate ? 'yes' : 'no',
      className: "r-range-slider-label-text"
    }, text));
  }

}

_defineProperty(RRangeSliderLabel, "contextType", RRangeSliderContext);

class RRangeSliderScales extends _react.Component {
  getScalesByStep(scaleStep) {
    var {
      start,
      end,
      getStartByStep
    } = this.context;
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

  getScales(scaleStep) {
    return scaleStep.map(o => /*#__PURE__*/_react.default.createElement(RRangeSliderScale, {
      value: o,
      key: o
    }));
  }

  render() {
    let {
      scaleStep
    } = this.context;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-scales"
    }, Array.isArray(scaleStep) ? this.getScales(scaleStep) : this.getScalesByStep(scaleStep));
  }

}

_defineProperty(RRangeSliderScales, "contextType", RRangeSliderContext);

class RRangeSliderScale extends _react.Component {
  getStyle() {
    var {
      scaleStyle
    } = this.context;
    var {
      start,
      end,
      direction,
      getPercentByValue
    } = this.context,
        {
      value
    } = this.props;
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

  render() {
    let {
      getScaleHTML
    } = this.context;
    let {
      value
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "r-range-slider-scale",
      style: this.getStyle()
    }, getScaleHTML && getScaleHTML(value));
  }

}

_defineProperty(RRangeSliderScale, "contextType", RRangeSliderContext);